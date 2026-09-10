// Quick RSS Drag & Drop Folders Engine

// Initial Tree Data matching screenshot exactly
let treeData = [
  { id: 'f-1', type: 'folder', name: 'AI Company Blogs', expanded: false, children: [
    { id: 'feed-101', type: 'feed', name: 'OpenAI Blog', unreadCount: 150, articles: [
      { id: 'a1', title: 'GPT-5 Architecture Overview', snippet: 'Deep dive into the latest multimodal frontier capabilities.', feed: 'OpenAI Blog' },
      { id: 'a2', title: 'Sora Video Model Update', snippet: 'Real-time high definition video generation improvements.', feed: 'OpenAI Blog' }
    ]},
    { id: 'feed-102', type: 'feed', name: 'Anthropic Research', unreadCount: 160, articles: [
      { id: 'a3', title: 'Economic Scenario Explorer', snippet: 'Interactive model projecting AI economic impact.', feed: 'Anthropic Research' }
    ]}
  ]},
  { id: 'f-2', type: 'folder', name: 'Apple', expanded: false, children: [
    { id: 'feed-201', type: 'feed', name: 'MacStories', unreadCount: 538, articles: [
      { id: 'a4', title: 'macOS 15 Sequoia Deep Dive', snippet: 'Exploring Window Tiling and new System Settings.', feed: 'MacStories' }
    ]},
    { id: 'feed-202', type: 'feed', name: 'SwiftUI Recipes', unreadCount: 500, articles: [
      { id: 'a5', title: 'Building Custom Outline Group Trees', snippet: 'Transferable drag-and-drop in macOS SwiftUI.', feed: 'SwiftUI Recipes' }
    ]}
  ]},
  { id: 'f-3', type: 'folder', name: 'Major Tech Publications - AI', expanded: false, children: [
    { id: 'feed-301', type: 'feed', name: 'TechCrunch AI', unreadCount: 106, articles: [
      { id: 'a6', title: 'Anthropic Researcher Warns on AI Pacing', snippet: 'Call for safety agreements across leading research labs.', feed: 'TechCrunch AI' }
    ]},
    { id: 'feed-302', type: 'feed', name: 'The Verge', unreadCount: 80, articles: [
      { id: 'a7', title: 'Hands-on with Tesla Cybercab', snippet: 'Riding inside the steering-wheel-free robotaxi.', feed: 'The Verge' }
    ]}
  ]},
  { id: 'f-4', type: 'folder', name: 'Academic & Research Institutions...', expanded: false, children: [
    { id: 'feed-401', type: 'feed', name: 'MIT CSAIL AI', unreadCount: 66, articles: [] }
  ]},
  { id: 'f-5', type: 'folder', name: 'Tech', expanded: true, children: [
    { id: 'subf-51', type: 'folder', name: 'Hardware', expanded: true, children: [
      { id: 'feed-501', type: 'feed', name: 'Ars Technica', unreadCount: 850, articles: [
        { id: 'a8', title: 'Next-Gen Silicon Architecture Trends', snippet: 'Efficiency gains in ARM and RISC-V computing.', feed: 'Ars Technica' }
      ]}
    ]},
    { id: 'subf-52', type: 'folder', name: 'Software & OS', expanded: false, children: [
      { id: 'feed-502', type: 'feed', name: 'Wired Tech', unreadCount: 851, articles: [] }
    ]}
  ]},
  { id: 'f-6', type: 'folder', name: 'arXiv Research Papers', expanded: false, children: [
    { id: 'feed-601', type: 'feed', name: 'cs.AI Feed', unreadCount: 2000, articles: [] },
    { id: 'feed-602', type: 'feed', name: 'cs.LG Feed', unreadCount: 2109, articles: [] }
  ]},
  { id: 'f-7', type: 'folder', name: 'Design', expanded: false, children: [
    { id: 'feed-701', type: 'feed', name: 'CozyClay 3D', unreadCount: 84, articles: [] }
  ]},
  { id: 'f-8', type: 'folder', name: 'Hugging Face', expanded: false, children: [
    { id: 'feed-801', type: 'feed', name: 'Hugging Face Blog', unreadCount: 906, articles: [] }
  ]},
  { id: 'f-9', type: 'folder', name: 'Specialized AI Content', expanded: false, children: [
    { id: 'feed-901', type: 'feed', name: 'Towards Data Science', unreadCount: 142, articles: [] }
  ]},
  { id: 'f-10', type: 'folder', name: 'AI Newsletters & Analysis', expanded: false, children: [
    { id: 'feed-1001', type: 'feed', name: 'Import AI (Jack Clark)', unreadCount: 42, articles: [] }
  ]},
  { id: 'f-11', type: 'folder', name: 'Marketing Technology Publications...', expanded: false, children: [
    { id: 'feed-1101', type: 'feed', name: 'MarTech Series', unreadCount: 69, articles: [] }
  ]},
  { id: 'f-12', type: 'folder', name: 'Marketing AI Specialized', expanded: false, children: [
    { id: 'feed-1201', type: 'feed', name: 'Marketing AI Institute', unreadCount: 54, articles: [] }
  ]},
  { id: 'f-13', type: 'folder', name: 'Content Marketing', expanded: false, children: [] },
  { id: 'f-14', type: 'folder', name: 'Cloud AI Platforms', expanded: false, children: [
    { id: 'feed-1401', type: 'feed', name: 'AWS ML Blog', unreadCount: 50, articles: [] }
  ]},
  { id: 'f-15', type: 'folder', name: 'Additional AI Sources', expanded: false, children: [] },
  { id: 'f-16', type: 'folder', name: 'AI & Automation', expanded: false, children: [
    { id: 'feed-1601', type: 'feed', name: 'Unite.AI', unreadCount: 424, articles: [] }
  ]},
  { id: 'f-17', type: 'folder', name: 'Ads & Marketing', expanded: false, children: [
    { id: 'feed-1701', type: 'feed', name: 'WordLift Blog', unreadCount: 37, articles: [] }
  ]}
];

// Helper: Calculate Aggregate Unread Count recursively
function getAggregateUnreadCount(item) {
  if (item.type === 'feed') {
    return item.unreadCount || 0;
  }
  if (item.children && item.children.length > 0) {
    return item.children.reduce((sum, child) => sum + getAggregateUnreadCount(child), 0);
  }
  return 0;
}

// Calculate total across all items
function getTotalArticlesCount() {
  return treeData.reduce((sum, node) => sum + getAggregateUnreadCount(node), 0);
}

// State variables
let draggedNodeId = null;
let selectedNodeId = null;
let contextNodeId = null;

const treeContainer = document.getElementById('tree-container');
const contextMenu = document.getElementById('context-menu');

// Render the tree hierarchy
function renderTree() {
  treeContainer.innerHTML = '';
  const rootUl = document.createElement('ul');
  rootUl.className = 'nav-list';

  treeData.forEach((node) => {
    rootUl.appendChild(createNodeElement(node, 0));
  });

  treeContainer.appendChild(rootUl);
  updateHeaderBadges();
}

function createNodeElement(node, depth) {
  const li = document.createElement('li');
  li.className = 'tree-node';
  li.dataset.id = node.id;
  li.dataset.type = node.type;

  const row = document.createElement('div');
  row.className = `node-row ${selectedNodeId === node.id ? 'selected' : ''}`;
  row.draggable = true;
  row.dataset.id = node.id;
  row.style.paddingLeft = `${depth * 16 + 8}px`;

  const isFolder = node.type === 'folder';
  const count = getAggregateUnreadCount(node);

  // Left side: Chevron (if folder), Icon, Title
  const leftDiv = document.createElement('div');
  leftDiv.className = 'item-left';

  if (isFolder) {
    const chevron = document.createElement('span');
    chevron.className = `chevron ${node.expanded ? 'expanded' : ''}`;
    chevron.innerHTML = `<svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>`;
    chevron.onclick = (e) => {
      e.stopPropagation();
      node.expanded = !node.expanded;
      renderTree();
    };
    leftDiv.appendChild(chevron);
  } else {
    // Spacer for feeds
    const spacer = document.createElement('span');
    spacer.style.width = '14px';
    spacer.style.display = 'inline-block';
    leftDiv.appendChild(spacer);
  }

  const iconSpan = document.createElement('span');
  if (isFolder) {
    iconSpan.className = 'folder-icon';
    iconSpan.innerHTML = `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M.5 3l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H13.174a2 2 0 0 0 1.991-1.819l.637-7A1.99 1.99 0 0 0 15.46 3.87L15.5 3A1.5 1.5 0 0 0 14 1.5H8.828a1.5 1.5 0 0 1-1.06-.44L6.44.73A1.5 1.5 0 0 0 5.378.293H2A1.5 1.5 0 0 0 .5 1.793V3z"/></svg>`;
  } else {
    iconSpan.className = 'feed-icon';
    iconSpan.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a5.5 5.5 0 0 1 5.5 5.5h-2a3.5 3.5 0 0 0-3.5-3.5v-2zm0 4a9.5 9.5 0 0 1 9.5 9.5h-2a7.5 7.5 0 0 0-7.5-7.5v-2z"/></svg>`;
  }
  leftDiv.appendChild(iconSpan);

  const titleSpan = document.createElement('span');
  titleSpan.className = 'node-title';
  titleSpan.textContent = node.name;
  leftDiv.appendChild(titleSpan);

  row.appendChild(leftDiv);

  // Right side: Count badge
  if (count > 0) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = count;
    row.appendChild(badge);
  }

  // Row Selection & Context Menu Events
  row.onclick = () => {
    selectedNodeId = node.id;
    document.querySelectorAll('.node-row, .nav-item').forEach(el => el.classList.remove('selected', 'active'));
    row.classList.add('selected');
    displayArticles(node);
  };

  row.oncontextmenu = (e) => {
    e.preventDefault();
    contextNodeId = node.id;
    showContextMenu(e.clientX, e.clientY, isFolder);
  };

  // Drag and Drop Event Listeners
  setupDragAndDrop(row, node);

  li.appendChild(row);

  // Render Subtree if folder expanded
  if (isFolder && node.children && node.children.length > 0) {
    const subUl = document.createElement('ul');
    subUl.className = `sub-tree ${node.expanded ? '' : 'collapsed'}`;
    node.children.forEach(child => {
      subUl.appendChild(createNodeElement(child, depth + 1));
    });
    li.appendChild(subUl);
  }

  return li;
}

// Drag & Drop Handling Logic
function setupDragAndDrop(row, node) {
  row.addEventListener('dragstart', (e) => {
    draggedNodeId = node.id;
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
    row.classList.add('dragging');
  });

  row.addEventListener('dragend', () => {
    row.classList.remove('dragging');
    clearDropIndicators();
  });

  row.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (draggedNodeId === node.id) return;

    clearDropIndicators();

    const rect = row.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const height = rect.height;

    // Determine drop position: top 25% = drop-above, bottom 25% = drop-below, middle = drop-inside (if folder)
    if (node.type === 'folder' && offsetY > height * 0.25 && offsetY < height * 0.75) {
      row.classList.add('drop-inside');
      e.dataTransfer.dropEffect = 'move';
    } else if (offsetY <= height * 0.5) {
      row.classList.add('drop-above');
      e.dataTransfer.dropEffect = 'move';
    } else {
      row.classList.add('drop-below');
      e.dataTransfer.dropEffect = 'move';
    }
  });

  row.addEventListener('dragleave', () => {
    row.classList.remove('drop-inside', 'drop-above', 'drop-below');
  });

  row.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedNodeId || draggedNodeId === node.id) {
      clearDropIndicators();
      return;
    }

    const rect = row.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const height = rect.height;

    let position = 'inside';
    if (offsetY <= height * 0.25) position = 'above';
    else if (offsetY >= height * 0.75) position = 'below';
    else if (node.type !== 'folder') position = offsetY < height * 0.5 ? 'above' : 'below';

    moveNodeInTree(draggedNodeId, node.id, position);
    draggedNodeId = null;
    clearDropIndicators();
    renderTree();
  });
}

function clearDropIndicators() {
  document.querySelectorAll('.node-row').forEach(row => {
    row.classList.remove('drop-inside', 'drop-above', 'drop-below');
  });
}

// Tree Mutation helper: Find & remove node from tree
function removeNodeById(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) {
      return nodes.splice(i, 1)[0];
    }
    if (nodes[i].children) {
      const removed = removeNodeById(nodes[i].children, id);
      if (removed) return removed;
    }
  }
  return null;
}

// Find parent array and target index
function findNodePosition(nodes, targetId) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === targetId) {
      return { parentArray: nodes, index: i, node: nodes[i] };
    }
    if (nodes[i].children) {
      const found = findNodePosition(nodes[i].children, targetId);
      if (found) return found;
    }
  }
  return null;
}

// Move node in tree structure
function moveNodeInTree(sourceId, targetId, position) {
  const sourceNode = removeNodeById(treeData, sourceId);
  if (!sourceNode) return;

  const targetInfo = findNodePosition(treeData, targetId);
  if (!targetInfo) {
    // Return to root if target not found
    treeData.push(sourceNode);
    return;
  }

  if (position === 'inside' && targetInfo.node.type === 'folder') {
    targetInfo.node.children = targetInfo.node.children || [];
    targetInfo.node.children.push(sourceNode);
    targetInfo.node.expanded = true;
  } else if (position === 'above') {
    targetInfo.parentArray.splice(targetInfo.index, 0, sourceNode);
  } else { // 'below'
    targetInfo.parentArray.splice(targetInfo.index + 1, 0, sourceNode);
  }
}

// Update Top Badge Counts
function updateHeaderBadges() {
  const total = getTotalArticlesCount();
  document.getElementById('badge-all').textContent = total;
  document.getElementById('badge-latest').textContent = Math.round(total * 0.55);
}

// Render Article List Preview in Main Panel
function displayArticles(node) {
  const titleEl = document.getElementById('current-view-title');
  const statsEl = document.getElementById('feed-count-info');
  const previewEl = document.getElementById('article-list-preview');

  titleEl.textContent = node.name;
  const count = getAggregateUnreadCount(node);
  statsEl.textContent = `${count} unread articles in ${node.name}`;

  previewEl.innerHTML = '';

  const articles = collectArticles(node);
  if (articles.length === 0) {
    previewEl.innerHTML = `<div class="article-card"><div class="article-title">No unread items in this folder</div></div>`;
    return;
  }

  articles.forEach(art => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <div class="article-feed-name">${art.feed}</div>
      <div class="article-title">${art.title}</div>
      <div class="article-snippet">${art.snippet}</div>
    `;
    previewEl.appendChild(card);
  });
}

function collectArticles(node) {
  let list = [];
  if (node.articles) list = list.concat(node.articles);
  if (node.children) {
    node.children.forEach(child => {
      list = list.concat(collectArticles(child));
    });
  }
  return list;
}

// Context Menu Handling
function showContextMenu(x, y, isFolder) {
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  contextMenu.classList.remove('hidden');

  document.getElementById('ctx-new-subfolder').style.display = isFolder ? 'flex' : 'none';
}

document.addEventListener('click', () => {
  contextMenu.classList.add('hidden');
});

// Toolbar Buttons Events
document.getElementById('add-folder-btn').onclick = () => {
  const folderName = prompt('Enter new folder name:', 'New Folder');
  if (folderName) {
    treeData.unshift({
      id: `f-${Date.now()}`,
      type: 'folder',
      name: folderName,
      expanded: false,
      children: []
    });
    renderTree();
  }
};

document.getElementById('expand-all-btn').onclick = () => {
  const toggleState = (nodes, expand) => {
    nodes.forEach(n => {
      if (n.type === 'folder') {
        n.expanded = expand;
        if (n.children) toggleState(n.children, expand);
      }
    });
  };
  const anyCollapsed = treeData.some(n => n.type === 'folder' && !n.expanded);
  toggleState(treeData, anyCollapsed);
  renderTree();
};

document.getElementById('ctx-new-subfolder').onclick = () => {
  if (!contextNodeId) return;
  const subName = prompt('Enter subfolder name:', 'New Subfolder');
  if (subName) {
    const targetInfo = findNodePosition(treeData, contextNodeId);
    if (targetInfo && targetInfo.node.type === 'folder') {
      targetInfo.node.children = targetInfo.node.children || [];
      targetInfo.node.children.unshift({
        id: `subf-${Date.now()}`,
        type: 'folder',
        name: subName,
        expanded: true,
        children: []
      });
      targetInfo.node.expanded = true;
      renderTree();
    }
  }
};

document.getElementById('ctx-rename').onclick = () => {
  if (!contextNodeId) return;
  const targetInfo = findNodePosition(treeData, contextNodeId);
  if (targetInfo) {
    const newName = prompt('Rename folder:', targetInfo.node.name);
    if (newName) {
      targetInfo.node.name = newName;
      renderTree();
    }
  }
};

document.getElementById('ctx-delete').onclick = () => {
  if (!contextNodeId) return;
  if (confirm('Delete this folder and its contents?')) {
    removeNodeById(treeData, contextNodeId);
    renderTree();
  }
};

// Initial Render
renderTree();
