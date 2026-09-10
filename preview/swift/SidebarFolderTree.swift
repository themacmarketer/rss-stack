//
//  SidebarFolderTree.swift
//  QuickRSS
//
//  Created for Quick RSS Drag & Drop Folders & Subfolders Support.
//

import SwiftUI
import SwiftData
import UniformTypeIdentifiers

// Custom Transferable Item for Drag & Drop
struct DragItemIdentifier: Codable, Transferable {
    let id: UUID
    let isFolder: Bool
    
    static var transferRepresentation: some TransferRepresentation {
        CodableRepresentation(for: DragItemIdentifier.self, contentType: .data)
    }
}

public struct SidebarFolderTree: View {
    @Query(filter: #Predicate<Folder> { $0.parentFolder == nil }, sort: \Folder.sortOrder)
    private var rootFolders: [Folder]
    
    @Environment(\.modelContext) private var modelContext
    @State private var selectedFolderID: UUID?
    
    public init() {}
    
    public var body: some View {
        List(selection: $selectedFolderID) {
            Section(header: Text("Filters")) {
                Label("All Articles", systemImage: "square.stack.3d.up.fill")
                    .badge(totalUnreadCount)
                Label("Read Articles", systemImage: "tray.full.fill")
                Label("Latest News", systemImage: "clock.fill")
                    .badge(totalUnreadCount / 2)
            }
            
            Section(header: Text("iCloud")) {
                OutlineGroup(rootFolders, children: \.subfolders) { folder in
                    FolderRow(folder: folder)
                        .draggable(DragItemIdentifier(id: folder.id, isFolder: true))
                        .dropDestination(for: DragItemIdentifier.self) { items, location in
                            handleDrop(droppedItems: items, targetFolder: folder)
                        } isTargeted: { isTargeted in
                            // Highlight state when hovering during drag
                        }
                }
            }
        }
        .listStyle(.sidebar)
    }
    
    private var totalUnreadCount: Int {
        rootFolders.reduce(0) { $0 + $1.aggregateUnreadCount }
    }
    
    private func handleDrop(droppedItems: [DragItemIdentifier], targetFolder: Folder) -> Bool {
        guard let item = droppedItems.first else { return false }
        
        if item.isFolder {
            // Find dropped folder entity
            let fetchDescriptor = FetchDescriptor<Folder>(predicate: #Predicate { $0.id == item.id })
            if let droppedFolder = try? modelContext.fetch(fetchDescriptor).first {
                // Prevent dropping folder into itself or its own descendants
                if droppedFolder.id != targetFolder.id {
                    droppedFolder.parentFolder = targetFolder
                    try? modelContext.save()
                    return true
                }
            }
        }
        return false
    }
}

struct FolderRow: View {
    let folder: Folder
    
    var body: some View {
        HStack {
            Image(systemName: folder.iconName)
                .foregroundColor(.green)
            
            Text(folder.title)
                .font(.body)
            
            Spacer()
            
            if folder.aggregateUnreadCount > 0 {
                Text("\(folder.aggregateUnreadCount)")
                    .font(.callout)
                    .foregroundColor(.secondary)
            }
        }
        .contextMenu {
            Button(action: createSubfolder) {
                Label("New Subfolder", systemImage: "folder.badge.plus")
            }
            Button(action: renameFolder) {
                Label("Rename", systemImage: "pencil")
            }
            Divider()
            Button(role: .destructive, action: deleteFolder) {
                Label("Delete Folder", systemImage: "trash")
            }
        }
    }
    
    private func createSubfolder() {
        let sub = Folder(title: "New Subfolder", parentFolder: folder)
        folder.subfolders.append(sub)
    }
    
    private func renameFolder() {
        // Trigger rename prompt
    }
    
    private func deleteFolder() {
        // Trigger deletion
    }
}
