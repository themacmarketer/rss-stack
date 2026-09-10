//
//  FolderDataModel.swift
//  QuickRSS
//
//  Created for Quick RSS Drag & Drop Folders & Subfolders Support.
//

import Foundation
import SwiftData

@Model
public final class Folder {
    public var id: UUID
    public var title: String
    public var iconName: String
    public var sortOrder: Int
    public var isExpanded: Bool
    
    // Relationships for nested hierarchy
    @Relationship(deleteRule: .nullify, inverse: \Folder.subfolders)
    public var parentFolder: Folder?
    
    @Relationship(deleteRule: .cascade)
    public var subfolders: [Folder]
    
    @Relationship(deleteRule: .cascade)
    public var feeds: [Feed]
    
    public init(title: String, iconName: String = "folder.fill", parentFolder: Folder? = nil) {
        self.id = UUID()
        self.title = title
        self.iconName = iconName
        self.sortOrder = 0
        self.isExpanded = false
        self.parentFolder = parentFolder
        self.subfolders = []
        self.feeds = []
    }
    
    /// Recursive unread count calculation across direct feeds and nested subfolders
    public var aggregateUnreadCount: Int {
        let directUnread = feeds.reduce(0) { $0 + $1.unreadCount }
        let subfoldersUnread = subfolders.reduce(0) { $0 + $1.aggregateUnreadCount }
        return directUnread + subfoldersUnread
    }
}

@Model
public final class Feed {
    public var id: UUID
    public var title: String
    public var feedURL: URL
    public var iconURL: URL?
    public var unreadCount: Int
    
    public var folder: Folder?
    
    public init(title: String, feedURL: URL, unreadCount: Int = 0, folder: Folder? = nil) {
        self.id = UUID()
        self.title = title
        self.feedURL = feedURL
        self.unreadCount = unreadCount
        self.folder = folder
    }
}
