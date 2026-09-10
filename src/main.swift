import AppKit
import WebKit

class AppDelegate: NSObject, NSApplicationDelegate, NSWindowDelegate {
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
        
        // Configure WebKit Preferences
        let config = WKWebViewConfiguration()
        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        config.defaultWebpagePreferences = prefs
        
        webView = WKWebView(frame: window.contentView!.bounds, configuration: config)
        webView.autoresizingMask = [.width, .height]
        
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
