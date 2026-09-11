import AppKit
import WebKit
import UniformTypeIdentifiers

class AppDelegate: NSObject, NSApplicationDelegate, NSWindowDelegate, WKScriptMessageHandler, WKUIDelegate, WKNavigationDelegate {
    var window: NSWindow!
    var webView: WKWebView!

    func applicationDidFinishLaunching(_ notification: Notification) {
        setupMenuBar()
        
        let windowMask: NSWindow.StyleMask = [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView]
        let windowRect = NSRect(x: 0, y: 0, width: 1180, height: 780)
        
        window = NSWindow(contentRect: windowRect, styleMask: windowMask, backing: .buffered, defer: false)
        window.center()
        window.title = "Quick RSS"
        window.titlebarAppearsTransparent = true
        window.titleVisibility = .hidden
        window.isMovableByWindowBackground = true
        window.minSize = NSSize(width: 900, height: 600)
        
        // Configure WebKit Preferences and Message Handler
        let config = WKWebViewConfiguration()
        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        config.defaultWebpagePreferences = prefs
        
        // Register Native Message Handlers
        config.userContentController.add(self, name: "openExternal")
        config.userContentController.add(self, name: "fetchURL")
        config.userContentController.add(self, name: "saveOPML")
        
        webView = WKWebView(frame: window.contentView!.bounds, configuration: config)
        webView.autoresizingMask = [.width, .height]
        webView.uiDelegate = self
        webView.navigationDelegate = self
        
        window.contentView?.addSubview(webView)
        
        if let htmlPath = Bundle.main.path(forResource: "index", ofType: "html") {
            let url = URL(fileURLWithPath: htmlPath)
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            let fallbackURL = URL(string: "http://localhost:8085")!
            webView.load(URLRequest(url: fallbackURL))
        }
        
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    // Handle JS postMessage calls (e.g. openExternal, fetchURL, saveOPML)
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "openExternal", let urlString = message.body as? String, let url = URL(string: urlString) {
            NSWorkspace.shared.open(url)
        } else if message.name == "saveOPML", let xmlContent = message.body as? String {
            let savePanel = NSSavePanel()
            savePanel.title = "Export OPML Subscriptions"
            savePanel.nameFieldStringValue = "quickrss_subscriptions.opml"
            savePanel.allowedContentTypes = [UTType.xml, UTType(filenameExtension: "opml")].compactMap { $0 }
            
            savePanel.begin { result in
                if result == .OK, let url = savePanel.url {
                    try? xmlContent.write(to: url, atomically: true, encoding: .utf8)
                }
            }
        } else if message.name == "fetchURL", let dict = message.body as? [String: Any], let urlString = dict["url"] as? String, let requestId = dict["requestId"] as? String, let url = URL(string: urlString) {
            
            var request = URLRequest(url: url, cachePolicy: .useProtocolCachePolicy, timeoutInterval: 10.0)
            request.setValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, Gecko) Chrome/122.0.0.0 Safari/537.36", forHTTPHeaderField: "User-Agent")
            request.setValue("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", forHTTPHeaderField: "Accept")
            
            let task = URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
                guard let self = self else { return }
                
                var jsCode = ""
                if let error = error {
                    let errEscaped = error.localizedDescription.replacingOccurrences(of: "'", with: "\\'")
                    jsCode = "if (window.onNativeURLFetched) { window.onNativeURLFetched('\(requestId)', null, '\(errEscaped)'); }"
                } else if let data = data, let htmlString = String(data: data, encoding: .utf8) ?? String(data: data, encoding: .ascii) {
                    if let jsonData = try? JSONSerialization.data(withJSONObject: [htmlString], options: []),
                       let jsonStr = String(data: jsonData, encoding: .utf8) {
                        let innerJson = String(jsonStr.dropFirst().dropLast()) // JSON escaped string payload
                        jsCode = "if (window.onNativeURLFetched) { window.onNativeURLFetched('\(requestId)', \(innerJson), null); }"
                    }
                }
                
                if !jsCode.isEmpty {
                    DispatchQueue.main.async {
                        self.webView.evaluateJavaScript(jsCode, completionHandler: nil)
                    }
                }
            }
            task.resume()
        }
    }

    // Native macOS File Picker Dialog (<input type="file">) for WKWebView
    func webView(_ webView: WKWebView, runOpenPanelWith parameters: WKOpenPanelParameters, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping ([URL]?) -> Void) {
        let openPanel = NSOpenPanel()
        openPanel.canChooseFiles = true
        openPanel.canChooseDirectories = false
        openPanel.allowsMultipleSelection = parameters.allowsMultipleSelection
        openPanel.allowedContentTypes = [UTType.xml, UTType(filenameExtension: "opml")].compactMap { $0 }
        
        openPanel.begin { result in
            if result == .OK {
                completionHandler(openPanel.urls)
            } else {
                completionHandler(nil)
            }
        }
    }


    // Handle window.open(...) in JavaScript to open in default Mac browser
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url {
            NSWorkspace.shared.open(url)
        }
        return nil
    }

    // Intercept link clicks targeting _blank or external URLs
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if navigationAction.navigationType == .linkActivated, let url = navigationAction.request.url {
            // If link click, open in default browser
            if url.scheme == "http" || url.scheme == "https" {
                NSWorkspace.shared.open(url)
                decisionHandler(.cancel)
                return
            }
        }
        decisionHandler(.allow)
    }

    func setupMenuBar() {
        let mainMenu = NSMenu()
        
        // App Menu
        let appMenuItem = NSMenuItem()
        mainMenu.addItem(appMenuItem)
        
        let appMenu = NSMenu()
        appMenuItem.submenu = appMenu
        
        appMenu.addItem(withTitle: "About Quick RSS", action: #selector(NSApplication.orderFrontStandardAboutPanel(_:)), keyEquivalent: "")
        appMenu.addItem(NSMenuItem.separator())
        
        let settingsItem = NSMenuItem(title: "Settings...", action: #selector(openSettings), keyEquivalent: ",")
        appMenu.addItem(settingsItem)
        
        appMenu.addItem(NSMenuItem.separator())
        appMenu.addItem(withTitle: "Quit Quick RSS", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        
        // File Menu
        let fileMenuItem = NSMenuItem()
        mainMenu.addItem(fileMenuItem)
        let fileMenu = NSMenu(title: "File")
        fileMenuItem.submenu = fileMenu
        fileMenu.addItem(withTitle: "New Feed...", action: #selector(openAddFeed), keyEquivalent: "n")
        fileMenu.addItem(withTitle: "New Folder...", action: #selector(openNewFolder), keyEquivalent: "N")
        
        NSApp.mainMenu = mainMenu
    }
    
    @objc func openSettings() {
        webView.evaluateJavaScript("openSettings()", completionHandler: nil)
    }
    
    @objc func openAddFeed() {
        webView.evaluateJavaScript("document.getElementById('add-feed-modal').classList.remove('hidden')", completionHandler: nil)
    }
    
    @objc func openNewFolder() {
        webView.evaluateJavaScript("document.getElementById('add-folder-btn').click()", completionHandler: nil)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
}

// App Entry Point
let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()

