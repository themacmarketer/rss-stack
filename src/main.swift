import AppKit
import WebKit
import UniformTypeIdentifiers
import Network

class AppDelegate: NSObject, NSApplicationDelegate, NSWindowDelegate, WKScriptMessageHandler, WKUIDelegate, WKNavigationDelegate {
    var window: NSWindow!
    var webView: WKWebView!
    var mcpServer: MCPServer?
    var pendingDeepLinkURL: URL?
    var isWebViewLoaded: Bool = false

    func applicationWillFinishLaunching(_ notification: Notification) {
        NSAppleEventManager.shared().setEventHandler(
            self,
            andSelector: #selector(handleGetURLEvent(_:withReplyEvent:)),
            forEventClass: AEEventClass(kInternetEventClass),
            andEventID: AEEventID(kAEGetURL)
        )
    }

    func application(_ sender: NSApplication, open urls: [URL]) {
        for url in urls {
            handleDeepLink(url)
        }
    }

    @objc func handleGetURLEvent(_ event: NSAppleEventDescriptor, withReplyEvent replyEvent: NSAppleEventDescriptor) {
        if let urlString = event.paramDescriptor(forKeyword: keyDirectObject)?.stringValue,
           let url = URL(string: urlString) {
            handleDeepLink(url)
        }
    }

    func handleDeepLink(_ url: URL) {
        let scheme = url.scheme?.lowercased() ?? ""
        guard scheme == "quickrss" || scheme == "quick-rss" else { return }

        DispatchQueue.main.async {
            if let win = self.window {
                win.makeKeyAndOrderFront(nil)
            }
            NSApp.activate(ignoringOtherApps: true)

            let absoluteUrlStr = url.absoluteString.replacingOccurrences(of: "'", with: "\\'")
            let jsCode = "if (window.handleDeepLink) { window.handleDeepLink('\(absoluteUrlStr)'); }"

            if self.isWebViewLoaded, let wv = self.webView {
                wv.evaluateJavaScript(jsCode, completionHandler: nil)
            } else {
                self.pendingDeepLinkURL = url
            }
        }
    }

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
        config.userContentController.add(self, name: "mcpResponse")
        
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
        
        // Start Local MCP HTTP Server on Port 8745
        mcpServer = MCPServer(webView: webView)
        mcpServer?.start()

        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    // Handle JS postMessage calls (e.g. openExternal, fetchURL, saveOPML, mcpResponse)
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "mcpResponse", let dict = message.body as? [String: Any], let requestId = dict["requestId"] as? String, let result = dict["result"] as? String {
            mcpServer?.handleMCPResponse(requestId: requestId, result: result)
        } else if message.name == "openExternal", let urlString = message.body as? String, let url = URL(string: urlString) {
            let scheme = url.scheme?.lowercased() ?? ""
            if scheme == "quickrss" || scheme == "quick-rss" {
                handleDeepLink(url)
            } else {
                NSWorkspace.shared.open(url)
            }
        } else if message.name == "saveOPML", let xmlContent = message.body as? String {
            let savePanel = NSSavePanel()
            savePanel.title = "Export OPML Subscriptions"
            savePanel.nameFieldStringValue = "quickrss_subscriptions.opml"
            savePanel.allowedContentTypes = [UTType.xml, UTType(filenameExtension: "opml")].compactMap { $0 }
            
            savePanel.begin { [weak self] result in
                guard let self = self else { return }
                if result == .OK, let url = savePanel.url {
                    do {
                        try xmlContent.write(to: url, atomically: true, encoding: .utf8)
                        let filename = url.lastPathComponent
                        let jsCode = "if (window.onNativeOPMLExported) { window.onNativeOPMLExported(true, '\(filename)'); }"
                        DispatchQueue.main.async { self.webView.evaluateJavaScript(jsCode, completionHandler: nil) }
                    } catch {
                        let errStr = error.localizedDescription.replacingOccurrences(of: "'", with: "\\'")
                        let jsCode = "if (window.onNativeOPMLExported) { window.onNativeOPMLExported(false, '\(errStr)'); }"
                        DispatchQueue.main.async { self.webView.evaluateJavaScript(jsCode, completionHandler: nil) }
                    }
                } else {
                    let jsCode = "if (window.onNativeOPMLExported) { window.onNativeOPMLExported(false, 'Export cancelled'); }"
                    DispatchQueue.main.async { self.webView.evaluateJavaScript(jsCode, completionHandler: nil) }
                }
            }
        } else if message.name == "fetchURL", let dict = message.body as? [String: Any], let urlString = dict["url"] as? String, let requestId = dict["requestId"] as? String, let url = URL(string: urlString) {
            
            var request = URLRequest(url: url, cachePolicy: .useProtocolCachePolicy, timeoutInterval: 10.0)
            if urlString.contains("reddit.com") {
                let timeToken = Int(Date().timeIntervalSince1970)
                request.setValue("desktop:com.quickrss.app:v1.0.0 (by /u/quickrss_\(timeToken))", forHTTPHeaderField: "User-Agent")
            } else {
                request.setValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, Gecko) Chrome/122.0.0.0 Safari/537.36", forHTTPHeaderField: "User-Agent")
            }
            request.setValue("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", forHTTPHeaderField: "Accept")
            
            let task = URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
                guard let self = self else { return }
                
                var jsCode = ""
                let httpStatus = (response as? HTTPURLResponse)?.statusCode ?? 200
                if let error = error {
                    let errEscaped = error.localizedDescription.replacingOccurrences(of: "'", with: "\\'")
                    jsCode = "if (window.onNativeURLFetched) { window.onNativeURLFetched('\(requestId)', null, '\(errEscaped)'); }"
                } else if httpStatus >= 400 {
                    jsCode = "if (window.onNativeURLFetched) { window.onNativeURLFetched('\(requestId)', null, 'HTTP \(httpStatus)'); }"
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

    // Native macOS Alert Dialog for JavaScript alert(...)
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = NSAlert()
        alert.messageText = "Quick RSS"
        alert.informativeText = message
        alert.alertStyle = .informational
        alert.addButton(withTitle: "OK")
        alert.runModal()
        completionHandler()
    }


    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        isWebViewLoaded = true
        if let pendingURL = pendingDeepLinkURL {
            pendingDeepLinkURL = nil
            handleDeepLink(pendingURL)
        }
    }

    // Handle window.open(...) in JavaScript to open in default Mac browser
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url {
            let scheme = url.scheme?.lowercased() ?? ""
            if scheme == "quickrss" || scheme == "quick-rss" {
                handleDeepLink(url)
            } else {
                NSWorkspace.shared.open(url)
            }
        }
        return nil
    }

    // Intercept link clicks targeting _blank or external URLs
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if let url = navigationAction.request.url {
            let scheme = url.scheme?.lowercased() ?? ""
            if scheme == "quickrss" || scheme == "quick-rss" {
                handleDeepLink(url)
                decisionHandler(.cancel)
                return
            }
            if navigationAction.navigationType == .linkActivated {
                if scheme == "http" || scheme == "https" {
                    NSWorkspace.shared.open(url)
                    decisionHandler(.cancel)
                    return
                }
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

// Native Local MCP HTTP Server on Port 8745
class MCPServer {
    private var listener: NWListener?
    private weak var webView: WKWebView?
    private let mcpQueue = DispatchQueue(label: "com.quickrss.mcp", qos: .userInitiated)
    let port: UInt16 = 8745
    let token = "MLfMryTZiBNUrk-t18VeJG3MMR7CXJr1"
    
    init(webView: WKWebView) {
        self.webView = webView
    }
    
    func start() {
        do {
            guard let nwPort = NWEndpoint.Port(rawValue: port) else { return }
            let listener = try NWListener(using: .tcp, on: nwPort)
            self.listener = listener
            
            listener.newConnectionHandler = { [weak self] connection in
                self?.handleConnection(connection)
            }
            
            listener.stateUpdateHandler = { state in
                switch state {
                case .ready:
                    print("✅ MCP Server listening on http://127.0.0.1:8745/mcp")
                case .failed(let err):
                    print("❌ MCP Server failed: \(err)")
                default:
                    break
                }
            }
            
            listener.start(queue: mcpQueue)
        } catch {
            print("❌ Failed to start MCP Server: \(error)")
        }
    }
    
    private func handleConnection(_ connection: NWConnection) {
        connection.start(queue: mcpQueue)
        receiveData(connection)
    }
    
    private func receiveData(_ connection: NWConnection) {
        connection.receive(minimumIncompleteLength: 1, maximumLength: 65536) { [weak self] data, context, isComplete, error in
            guard let self = self, let data = data, !data.isEmpty else {
                connection.cancel()
                return
            }
            
            let requestString = String(data: data, encoding: .utf8) ?? ""
            let response = self.processHTTPRequest(requestString)
            
            if let responseData = response.data(using: .utf8) {
                connection.send(content: responseData, completion: .contentProcessed({ _ in
                    connection.cancel()
                }))
            } else {
                connection.cancel()
            }
        }
    }
    
    private func processHTTPRequest(_ req: String) -> String {
        let lines = req.components(separatedBy: "\r\n")
        guard let firstLine = lines.first else {
            return makeHTTPResponse(status: 400, body: "{\"error\":\"Bad Request\"}")
        }
        
        let parts = firstLine.components(separatedBy: " ")
        guard parts.count >= 2 else {
            return makeHTTPResponse(status: 400, body: "{\"error\":\"Bad Request\"}")
        }
        
        let method = parts[0]
        let pathWithQuery = parts[1]
        
        // CORS Preflight
        if method == "OPTIONS" {
            return "HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\r\nAccess-Control-Allow-Headers: Content-Type, Authorization\r\nContent-Length: 0\r\n\r\n"
        }
        
        // Validate Token
        var tokenValid = pathWithQuery.contains("token=\(token)")
        if !tokenValid {
            for line in lines {
                if line.lowercased().hasPrefix("authorization:") && line.contains(token) {
                    tokenValid = true
                    break
                }
            }
        }
        
        if !tokenValid {
            return makeHTTPResponse(status: 401, body: "{\"jsonrpc\":\"2.0\",\"error\":{\"code\":-32001,\"message\":\"Unauthorized: Invalid Access Token\"}}")
        }
        
        if method == "GET" {
            let statusJson = "{\"status\":\"ok\",\"service\":\"Quick RSS MCP Server\",\"version\":\"1.0.0\",\"protocolVersion\":\"2024-11-05\"}"
            return makeHTTPResponse(status: 200, body: statusJson)
        }
        
        if method == "POST" {
            if let bodyRange = req.range(of: "\r\n\r\n") {
                let body = String(req[bodyRange.upperBound...])
                if let bodyData = body.data(using: .utf8),
                   let jsonObj = try? JSONSerialization.jsonObject(with: bodyData) as? [String: Any] {
                    let rpcMethod = jsonObj["method"] as? String ?? ""
                    let rpcId = jsonObj["id"] ?? 1
                    let responseBody = self.handleJSONRPC(method: rpcMethod, params: jsonObj["params"] as? [String: Any], id: rpcId)
                    return makeHTTPResponse(status: 200, body: responseBody)
                }
            }
            return makeHTTPResponse(status: 200, body: "{\"jsonrpc\":\"2.0\",\"id\":1,\"result\":{\"status\":\"ok\"}}")
        }
        
        return makeHTTPResponse(status: 404, body: "{\"error\":\"Not Found\"}")
    }
    
    private func handleJSONRPC(method: String, params: [String: Any]?, id: Any) -> String {
        switch method {
        case "initialize":
            let result: [String: Any] = [
                "protocolVersion": "2024-11-05",
                "capabilities": ["tools": [:]],
                "serverInfo": ["name": "Quick RSS", "version": "1.0.0"]
            ]
            let resDict: [String: Any] = ["jsonrpc": "2.0", "id": id, "result": result]
            if let data = try? JSONSerialization.data(withJSONObject: resDict), let str = String(data: data, encoding: .utf8) {
                return str
            }
        case "tools/list":
            let tools: [[String: Any]] = [
                [
                    "name": "get_unread_articles",
                    "description": "Fetch unread RSS articles from Quick RSS",
                    "inputSchema": ["type": "object", "properties": [:]]
                ],
                [
                    "name": "search_articles",
                    "description": "Search RSS articles by keyword across all feeds",
                    "inputSchema": [
                        "type": "object",
                        "properties": [
                            "query": ["type": "string", "description": "Search keyword or query"]
                        ],
                        "required": ["query"]
                    ]
                ],
                [
                    "name": "get_feed_tree",
                    "description": "Get complete folder and feed tree structure",
                    "inputSchema": ["type": "object", "properties": [:]]
                ],
                [
                    "name": "add_folder",
                    "description": "Create a new folder or subfolder",
                    "inputSchema": [
                        "type": "object",
                        "properties": [
                            "name": ["type": "string", "description": "Folder name"],
                            "parent_id": ["type": "string", "description": "Parent folder ID or 'root'"]
                        ],
                        "required": ["name"]
                    ]
                ],
                [
                    "name": "edit_folder",
                    "description": "Rename or move a folder",
                    "inputSchema": [
                        "type": "object",
                        "properties": [
                            "id": ["type": "string", "description": "Folder ID"],
                            "name": ["type": "string", "description": "New folder name"],
                            "parent_id": ["type": "string", "description": "New parent folder ID or 'root'"]
                        ],
                        "required": ["id"]
                    ]
                ],
                [
                    "name": "delete_folder",
                    "description": "Delete a folder and all its contents",
                    "inputSchema": [
                        "type": "object",
                        "properties": [
                            "id": ["type": "string", "description": "Folder ID"]
                        ],
                        "required": ["id"]
                    ]
                ],
                [
                    "name": "add_feed",
                    "description": "Subscribe to a new RSS feed",
                    "inputSchema": [
                        "type": "object",
                        "properties": [
                            "url": ["type": "string", "description": "RSS Feed URL"],
                            "title": ["type": "string", "description": "Feed Title"],
                            "folder_id": ["type": "string", "description": "Target folder ID or 'root'"]
                        ],
                        "required": ["url"]
                    ]
                ],
                [
                    "name": "edit_feed",
                    "description": "Edit title, URL, or parent folder of an RSS feed",
                    "inputSchema": [
                        "type": "object",
                        "properties": [
                            "id": ["type": "string", "description": "Feed ID"],
                            "title": ["type": "string", "description": "New feed title"],
                            "url": ["type": "string", "description": "New feed RSS URL"],
                            "folder_id": ["type": "string", "description": "New parent folder ID or 'root'"]
                        ],
                        "required": ["id"]
                    ]
                ],
                [
                    "name": "delete_feed",
                    "description": "Unsubscribe and delete an RSS feed by ID, URL, or Title",
                    "inputSchema": [
                        "type": "object",
                        "properties": [
                            "id": ["type": "string", "description": "Feed ID, RSS URL, or Title to delete"],
                            "url": ["type": "string", "description": "RSS Feed URL (optional alternative to id)"],
                            "title": ["type": "string", "description": "Feed Title (optional alternative to id)"]
                        ]
                    ]
                ],
                [
                    "name": "get_folder_articles",
                    "description": "Fetch articles for feeds inside a specific folder",
                    "inputSchema": [
                        "type": "object",
                        "properties": [
                            "folder_id": ["type": "string", "description": "Folder ID"]
                        ],
                        "required": ["folder_id"]
                    ]
                ],
                [
                    "name": "mark_read",
                    "description": "Mark an article as read",
                    "inputSchema": [
                        "type": "object",
                        "properties": ["id": ["type": "string"]],
                        "required": ["id"]
                    ]
                ],
                [
                    "name": "star",
                    "description": "Star an article",
                    "inputSchema": [
                        "type": "object",
                        "properties": ["id": ["type": "string"]],
                        "required": ["id"]
                    ]
                ],
                [
                    "name": "unstar",
                    "description": "Unstar an article",
                    "inputSchema": [
                        "type": "object",
                        "properties": ["id": ["type": "string"]],
                        "required": ["id"]
                    ]
                ],
                [
                    "name": "star_all",
                    "description": "Star all currently loaded/displayed articles in view",
                    "inputSchema": ["type": "object", "properties": [:]]
                ],
                [
                    "name": "unstar_all",
                    "description": "Unstar all currently loaded/displayed articles in view",
                    "inputSchema": ["type": "object", "properties": [:]]
                ],
                [
                    "name": "get_starred_articles",
                    "description": "Fetch all starred/favorite RSS articles",
                    "inputSchema": ["type": "object", "properties": [:]]
                ],
                [
                    "name": "chat_with_news",
                    "description": "Ask AI assistant questions about all currently loaded RSS articles and news content",
                    "inputSchema": [
                        "type": "object",
                        "properties": [
                            "query": ["type": "string", "description": "Question or prompt for AI news assistant"]
                        ],
                        "required": ["query"]
                    ]
                ]
            ]
            let result: [String: Any] = ["tools": tools]
            let resDict: [String: Any] = ["jsonrpc": "2.0", "id": id, "result": result]
            if let data = try? JSONSerialization.data(withJSONObject: resDict), let str = String(data: data, encoding: .utf8) {
                return str
            }
        case "tools/call":
            let toolName = (params?["name"] as? String) ?? ""
            let toolArgs = (params?["arguments"] as? [String: Any]) ?? [:]
            
            let textOutput = self.callJSTool(name: toolName, args: toolArgs)
            let content: [[String: Any]] = [["type": "text", "text": textOutput]]
            let result: [String: Any] = ["content": content]
            let resDict: [String: Any] = ["jsonrpc": "2.0", "id": id, "result": result]
            if let data = try? JSONSerialization.data(withJSONObject: resDict), let str = String(data: data, encoding: .utf8) {
                return str
            }
        default:
            let result: [String: Any] = ["status": "ok", "message": "Method \(method) handled"]
            let resDict: [String: Any] = ["jsonrpc": "2.0", "id": id, "result": result]
            if let data = try? JSONSerialization.data(withJSONObject: resDict), let str = String(data: data, encoding: .utf8) {
                return str
            }
        }
        
        return "{\"jsonrpc\":\"2.0\",\"id\":\(id),\"result\":{\"status\":\"ok\"}}"
    }
    
    private var mcpCallbacks: [String: (String) -> Void] = [:]
    private let callbackLock = NSLock()

    func handleMCPResponse(requestId: String, result: String) {
        callbackLock.lock()
        let cb = mcpCallbacks.removeValue(forKey: requestId)
        callbackLock.unlock()
        cb?(result)
    }

    private func callJSTool(name: String, args: [String: Any]) -> String {
        guard let webView = self.webView else {
            return "{\"error\":\"WKWebView not available\"}"
        }
        
        let requestId = "req_\(UUID().uuidString)"
        var resultJsonString = "[]"
        let semaphore = DispatchSemaphore(value: 0)
        
        callbackLock.lock()
        mcpCallbacks[requestId] = { resStr in
            resultJsonString = resStr
            semaphore.signal()
        }
        callbackLock.unlock()
        
        DispatchQueue.main.async {
            var argsJson = "{}"
            if let data = try? JSONSerialization.data(withJSONObject: args),
               let str = String(data: data, encoding: .utf8) {
                argsJson = str
            }
            
            let jsCode = "window.executeMCPToolNative('\(requestId)', '\(name)', \(argsJson))"
            webView.evaluateJavaScript(jsCode, completionHandler: nil)
        }
        
        _ = semaphore.wait(timeout: .now() + 5.0)
        
        callbackLock.lock()
        _ = mcpCallbacks.removeValue(forKey: requestId)
        callbackLock.unlock()
        
        return resultJsonString.isEmpty ? "[]" : resultJsonString
    }
    
    private func makeHTTPResponse(status: Int, body: String) -> String {
        let statusText = status == 200 ? "OK" : status == 401 ? "Unauthorized" : status == 400 ? "Bad Request" : "Not Found"
        let dataLength = body.utf8.count
        return "HTTP/1.1 \(status) \(statusText)\r\nContent-Type: application/json; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\r\nAccess-Control-Allow-Headers: Content-Type, Authorization\r\nContent-Length: \(dataLength)\r\nConnection: close\r\n\r\n\(body)"
    }
}

// App Entry Point
let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()

