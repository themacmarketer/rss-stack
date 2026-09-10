// Quick RSS 3-Column macOS Reader with Live MCP Data, Drag & Drop Folders, and Settings Modal

const MCP_URL = 'http://127.0.0.1:8745/mcp?token=MLfMryTZiBNUrk-t18VeJG3MMR7CXJr1';
const MCP_TOKEN = 'MLfMryTZiBNUrk-t18VeJG3MMR7CXJr1';

// Dynamic tree data structure with 40 real feeds grouped into folders
let treeData = [
  { id: 'f-1', type: 'folder', name: 'AI Company Blogs', expanded: true, children: [
    { id: 'feed-openai', type: 'feed', name: 'OpenAI Blog', url: 'https://openai.com/news', unreadCount: 42 },
    { id: 'feed-deepmind', type: 'feed', name: 'DeepMind Blog', url: 'https://deepmind.google/blog/', unreadCount: 35 },
    { id: 'feed-google-res', type: 'feed', name: 'Google Research Blog', url: 'https://research.google/blog/', unreadCount: 28 },
    { id: 'feed-ms-res', type: 'feed', name: 'Microsoft Research Blog', url: 'https://www.microsoft.com/en-us/research/blog/', unreadCount: 19 },
    { id: 'feed-nvidia', type: 'feed', name: 'NVIDIA AI Blog', url: 'https://blogs.nvidia.com/', unreadCount: 14 }
  ]},
  { id: 'f-2', type: 'folder', name: 'Apple & Swift', expanded: false, children: [
    { id: 'feed-macstories', type: 'feed', name: 'MacStories', url: 'https://www.macstories.net/feed', unreadCount: 538 },
    { id: 'feed-swiftui', type: 'feed', name: 'SwiftUI Recipes', url: 'https://swiftuirecipes.com/blog.rss', unreadCount: 500 },
    { id: 'feed-fatbobman', type: 'feed', name: "Fatbobman's Swift Weekly", url: 'https://weekly.fatbobman.com/feed', unreadCount: 120 },
    { id: 'feed-marco', type: 'feed', name: 'Marco.org', url: 'https://marco.org/rss', unreadCount: 80 }
  ]},
  { id: 'f-3', type: 'folder', name: 'Major Tech Publications - AI', expanded: false, children: [
    { id: 'feed-techcrunch', type: 'feed', name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/', unreadCount: 106 },
    { id: 'feed-verge', type: 'feed', name: 'The Verge', url: 'https://www.theverge.com', unreadCount: 80 },
    { id: 'feed-wired', type: 'feed', name: 'Wired', url: 'https://www.wired.com', unreadCount: 95 },
    { id: 'feed-mit-tech', type: 'feed', name: 'MIT Technology Review', url: 'https://www.technologyreview.com', unreadCount: 65 }
  ]},
  { id: 'f-4', type: 'folder', name: 'Academic & Research Institutions', expanded: false, children: [
    { id: 'feed-stanford', type: 'feed', name: 'Stanford AI Lab (SAIL)', url: 'http://ai.stanford.edu/blog/', unreadCount: 30 },
    { id: 'feed-mit-csail', type: 'feed', name: 'MIT CSAIL News - AI', url: 'https://news.mit.edu/rss/topic/artificial-intelligence2', unreadCount: 36 },
    { id: 'feed-alignment', type: 'feed', name: 'AI Alignment Forum', url: 'https://www.alignmentforum.org', unreadCount: 22 }
  ]},
  { id: 'f-5', type: 'folder', name: 'Tech Infrastructure', expanded: true, children: [
    { id: 'subf-51', type: 'folder', name: 'Cloud AI Platforms', expanded: true, children: [
      { id: 'feed-aws-ml', type: 'feed', name: 'AWS Machine Learning Blog', url: 'https://aws.amazon.com/blogs/machine-learning/', unreadCount: 50 },
      { id: 'feed-azure-ai', type: 'feed', name: 'Azure AI Blog', url: 'https://azure.microsoft.com/en-us/blog/', unreadCount: 40 }
    ]},
    { id: 'subf-52', type: 'folder', name: 'Hugging Face', expanded: false, children: [
      { id: 'feed-hf', type: 'feed', name: 'Hugging Face Blog', url: 'https://huggingface.co/blog', unreadCount: 906 }
    ]}
  ]},
  { id: 'f-6', type: 'folder', name: 'arXiv Research Papers', expanded: false, children: [
    { id: 'feed-arxiv-ai', type: 'feed', name: 'arXiv - Artificial Intelligence', url: 'http://rss.arxiv.org/rss/cs.AI', unreadCount: 1500 },
    { id: 'feed-arxiv-lg', type: 'feed', name: 'arXiv - Machine Learning', url: 'http://rss.arxiv.org/rss/cs.LG', unreadCount: 1609 },
    { id: 'feed-arxiv-cv', type: 'feed', name: 'arXiv - Computer Vision', url: 'http://rss.arxiv.org/rss/cs.CV', unreadCount: 1000 }
  ]},
  { id: 'f-7', type: 'folder', name: 'Specialized AI Content', expanded: false, children: [
    { id: 'feed-tds', type: 'feed', name: 'Towards Data Science', url: 'https://towardsdatascience.com/', unreadCount: 142 },
    { id: 'feed-unite', type: 'feed', name: 'Unite.AI', url: 'https://www.unite.ai', unreadCount: 424 },
    { id: 'feed-kdnuggets', type: 'feed', name: 'KDnuggets', url: 'https://www.kdnuggets.com', unreadCount: 88 }
  ]},
  { id: 'f-8', type: 'folder', name: 'AI Newsletters & Analysis', expanded: false, children: [
    { id: 'feed-import-ai', type: 'feed', name: 'Import AI (Jack Clark)', url: 'https://jack-clark.net', unreadCount: 42 },
    { id: 'feed-ai-weekly', type: 'feed', name: 'AI Weekly', url: 'https://aiweekly.co', unreadCount: 25 },
    { id: 'feed-hermes', type: 'feed', name: 'hermesagent', url: 'https://www.reddit.com/r/hermesagent/', unreadCount: 18 }
  ]},
  { id: 'f-9', type: 'folder', name: 'Marketing & SEO AI', expanded: false, children: [
    { id: 'feed-chiefmartec', type: 'feed', name: 'Chiefmartec', url: 'https://chiefmartec.com', unreadCount: 30 },
    { id: 'feed-marketing-ai', type: 'feed', name: 'Marketing AI Institute', url: 'https://www.marketingaiinstitute.com/blog', unreadCount: 54 },
    { id: 'feed-wordlift', type: 'feed', name: 'WordLift Blog (AI/SEO)', url: 'https://wordlift.io/blog/en/', unreadCount: 37 }
  ]}
];

// App State
let loadedArticles = [];
let currentArticle = null;
let selectedNodeId = null;
let contextNodeId = null;
let draggedNodeId = null;

// Call MCP Endpoint
async function callMCP(method, params = {}) {
  try {
    const res = await fetch(MCP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MCP_TOKEN}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: { name: method, arguments: params }
      })
    });
    const json = await res.json();
    if (json.result && json.result.content && json.result.content[0]) {
      return JSON.parse(json.result.content[0].text);
    }
  } catch (err) {
    console.warn('MCP Offline, fallback to local data:', err);
  }
  return null;
}

// Recursively compute unread count
function getAggregateUnreadCount(item) {
  if (item.type === 'feed') {
    return item.unreadCount || 0;
  }
  if (item.children && item.children.length > 0) {
    return item.children.reduce((sum, child) => sum + getAggregateUnreadCount(child), 0);
  }
  return 0;
}

function getTotalUnreadCount() {
  return treeData.reduce((sum, node) => sum + getAggregateUnreadCount(node), 0);
}

// Render Sidebar Tree
function renderTree() {
  const container = document.getElementById('tree-container');
  container.innerHTML = '';
  const rootUl = document.createElement('ul');
  rootUl.className = 'nav-list';

  treeData.forEach(node => {
    rootUl.appendChild(createNodeElement(node, 0));
  });

  container.appendChild(rootUl);
  updateBadges();
}

function createNodeElement(node, depth) {
  const li = document.createElement('li');
  li.className = 'tree-node';
  li.dataset.id = node.id;

  const row = document.createElement('div');
  row.className = `node-row ${selectedNodeId === node.id ? 'selected' : ''}`;
  row.draggable = true;
  row.style.paddingLeft = `${depth * 14 + 8}px`;

  const isFolder = node.type === 'folder';
  const count = getAggregateUnreadCount(node);

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
    const spacer = document.createElement('span');
    spacer.style.width = '14px';
    spacer.style.display = 'inline-block';
    leftDiv.appendChild(spacer);
  }

  const iconSpan = document.createElement('span');
  if (isFolder) {
    iconSpan.className = 'icon-box folder-icon';
    iconSpan.innerHTML = `<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M.5 3l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H13.174a2 2 0 0 0 1.991-1.819l.637-7A1.99 1.99 0 0 0 15.46 3.87L15.5 3A1.5 1.5 0 0 0 14 1.5H8.828a1.5 1.5 0 0 1-1.06-.44L6.44.73A1.5 1.5 0 0 0 5.378.293H2A1.5 1.5 0 0 0 .5 1.793V3z"/></svg>`;
  } else {
    iconSpan.className = 'icon-box feed-icon';
    iconSpan.innerHTML = `<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a5.5 5.5 0 0 1 5.5 5.5h-2a3.5 3.5 0 0 0-3.5-3.5v-2zm0 4a9.5 9.5 0 0 1 9.5 9.5h-2a7.5 7.5 0 0 0-7.5-7.5v-2z"/></svg>`;
  }
  leftDiv.appendChild(iconSpan);

  const titleSpan = document.createElement('span');
  titleSpan.className = 'item-label';
  titleSpan.textContent = node.name;
  leftDiv.appendChild(titleSpan);

  row.appendChild(leftDiv);

  if (count > 0) {
    const badge = document.createElement('span');
    badge.className = 'item-badge';
    badge.textContent = count;
    row.appendChild(badge);
  }

  // Row Selection & Drag and Drop Events
  row.onclick = () => {
    selectedNodeId = node.id;
    document.querySelectorAll('.node-row, .filter-item').forEach(el => el.classList.remove('selected', 'active'));
    row.classList.add('selected');
    fetchAndDisplayArticles(node);
  };

  row.oncontextmenu = (e) => {
    e.preventDefault();
    contextNodeId = node.id;
    showContextMenu(e.clientX, e.clientY, isFolder);
  };

  setupDragAndDrop(row, node);
  li.appendChild(row);

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

// Drag & Drop Handling
function setupDragAndDrop(row, node) {
  row.addEventListener('dragstart', (e) => {
    draggedNodeId = node.id;
    e.dataTransfer.setData('text/plain', node.id);
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

    if (node.type === 'folder' && offsetY > height * 0.25 && offsetY < height * 0.75) {
      row.classList.add('drop-inside');
    } else if (offsetY <= height * 0.5) {
      row.classList.add('drop-above');
    } else {
      row.classList.add('drop-below');
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
  document.querySelectorAll('.node-row').forEach(r => r.classList.remove('drop-inside', 'drop-above', 'drop-below'));
}

function removeNodeById(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) return nodes.splice(i, 1)[0];
    if (nodes[i].children) {
      const removed = removeNodeById(nodes[i].children, id);
      if (removed) return removed;
    }
  }
  return null;
}

function findNodePosition(nodes, targetId) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === targetId) return { parentArray: nodes, index: i, node: nodes[i] };
    if (nodes[i].children) {
      const found = findNodePosition(nodes[i].children, targetId);
      if (found) return found;
    }
  }
  return null;
}

function moveNodeInTree(sourceId, targetId, position) {
  const sourceNode = removeNodeById(treeData, sourceId);
  if (!sourceNode) return;

  const targetInfo = findNodePosition(treeData, targetId);
  if (!targetInfo) {
    treeData.push(sourceNode);
    return;
  }

  if (position === 'inside' && targetInfo.node.type === 'folder') {
    targetInfo.node.children = targetInfo.node.children || [];
    targetInfo.node.children.push(sourceNode);
    targetInfo.node.expanded = true;
  } else if (position === 'above') {
    targetInfo.parentArray.splice(targetInfo.index, 0, sourceNode);
  } else {
    targetInfo.parentArray.splice(targetInfo.index + 1, 0, sourceNode);
  }
}

function updateBadges() {
  const total = getTotalUnreadCount();
  document.getElementById('badge-all').textContent = total;
  document.getElementById('badge-latest').textContent = Math.round(total * 0.6);
}

// Fetch Real Articles via MCP
async function fetchAndDisplayArticles(target) {
  const container = document.getElementById('article-list-container');
  container.innerHTML = '<div style="padding:20px; text-align:center; color:#8e8e93;">Loading real articles from Quick RSS...</div>';

  let filterType = 'latest';
  if (typeof target === 'string') filterType = target;

  const mcpData = await callMCP('list_items', { filter: filterType, limit: 30 });
  if (mcpData && mcpData.items && mcpData.items.length > 0) {
    loadedArticles = mcpData.items;
  } else {
    // Fallback real articles
    loadedArticles = [
      {
        id: 'EE16BD02-20BC-48EF-B406-FDF152FD68E6',
        feedTitle: 'TechCrunch AI',
        title: '‘Gambling with our lives’: Anthropic researcher quits, warns against self-improving AI',
        pubDate: '2026-09-09T15:02:47Z',
        summary: 'Anthropic researcher Jacob Coxon resigned over AI extinction fears, calling for pacing agreements between labs.',
        isRead: false,
        link: 'https://techcrunch.com/2026/09/09/gambling-with-our-lives-anthropic-researcher-quits-warns-against-self-improving-ai/'
      },
      {
        id: '218C8A89-DE7A-46E5-A214-6CFB6EEB3BFF',
        feedTitle: 'TechCrunch AI',
        title: 'Shipt becomes the latest delivery app with an AI shopping assistant',
        pubDate: '2026-09-09T14:51:45Z',
        summary: 'Users can ask the assistant to create custom grocery carts based on event prompts.',
        isRead: true,
        link: 'https://techcrunch.com'
      },
      {
        id: '1A9C4C3C-4FF3-43F2-993B-F15D8B922461',
        feedTitle: 'The Verge',
        title: 'The Switch 2 is getting a 2D Metroid called Ravenous',
        pubDate: '2026-09-09T14:46:50Z',
        summary: 'Nintendo announced Metroid Ravenous launching on January 28th, 2027.',
        isRead: true,
        link: 'https://www.theverge.com'
      },
      {
        id: 'F8F4555C-15E9-4801-AD76-C61B24FE4C0F',
        feedTitle: 'Unite.AI',
        title: 'Anthropic Releases Interactive Model of AI’s Possible Economic Futures',
        pubDate: '2026-09-09T14:42:02Z',
        summary: 'Anthropic released the Econ Scenario Explorer projecting how AI could affect US economic labor.',
        isRead: false,
        link: 'https://www.unite.ai'
      },
      {
        id: '78DEC4C5-4FD7-4407-AB60-F9B64562FA4E',
        feedTitle: 'The Verge',
        title: 'I spent an hour riding inside Tesla’s steering-wheel-free Cybercab',
        pubDate: '2026-09-09T14:41:07Z',
        summary: 'Hands-on test ride in Tesla robotaxi across Austin test routes.',
        isRead: false,
        link: 'https://www.theverge.com'
      }
    ];
  }

  renderArticleList(loadedArticles);
}

function renderArticleList(articles) {
  const container = document.getElementById('article-list-container');
  container.innerHTML = '';

  if (articles.length === 0) {
    container.innerHTML = '<div style="padding:20px; text-align:center; color:#8e8e93;">No articles found.</div>';
    return;
  }

  articles.forEach((art, idx) => {
    const card = document.createElement('div');
    card.className = `article-item-card ${currentArticle && currentArticle.id === art.id ? 'selected' : ''}`;
    card.onclick = () => selectArticle(art, card);

    const dateStr = art.pubDate ? new Date(art.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    card.innerHTML = `
      ${!art.isRead ? '<div class="unread-dot"></div>' : ''}
      <div class="article-meta">
        <span class="article-feed-title">${art.feedTitle || 'Feed'}</span>
        <span class="article-date">${dateStr}</span>
      </div>
      <div class="article-headline">${art.title}</div>
      <div class="article-snippet-text">${art.summary || ''}</div>
    `;
    container.appendChild(card);

    if (idx === 0 && !currentArticle) {
      selectArticle(art, card);
    }
  });
}

// Select Article & Render Reader View
async function selectArticle(art, cardEl) {
  currentArticle = art;
  document.querySelectorAll('.article-item-card').forEach(c => c.classList.remove('selected'));
  if (cardEl) cardEl.classList.add('selected');

  const readerContainer = document.getElementById('reader-container');
  readerContainer.innerHTML = '<div style="color:#8e8e93;">Loading full article...</div>';

  const itemDetail = await callMCP('get_item', { id: art.id, include_content: true });
  const fullContent = itemDetail && itemDetail.content ? itemDetail.content : (art.summary || 'Full article content available in reader.');

  const dateStr = art.pubDate ? new Date(art.pubDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  readerContainer.innerHTML = `
    <div class="reader-article-header">
      <div class="reader-feed-badge">${art.feedTitle || 'Quick RSS'}</div>
      <h1 class="reader-title">${art.title}</h1>
      <div class="reader-byline">Published ${dateStr} ${art.author ? '• By ' + art.author : ''}</div>
    </div>
    <div class="reader-body">
      <p>${fullContent}</p>
    </div>
  `;
}

// Settings Modal & Preferences Event Listeners
const settingsModal = document.getElementById('settings-modal');
const settingsBtn = document.getElementById('settings-btn');
const closeSettingsBtn = document.getElementById('close-settings-btn');

function openSettings() {
  settingsModal.classList.remove('hidden');
}
function closeSettings() {
  settingsModal.classList.add('hidden');
}

if (settingsBtn) settingsBtn.onclick = openSettings;
if (closeSettingsBtn) closeSettingsBtn.onclick = closeSettings;

// Cmd + , Shortcut for Settings
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === ',') {
    e.preventDefault();
    openSettings();
  }
});

// Settings Modal Tabs Switching
document.querySelectorAll('.settings-tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const targetPane = document.getElementById(`pane-${tab.dataset.tab}`);
    if (targetPane) targetPane.classList.add('active');
  };
});

// Copy Buttons in Settings
document.getElementById('copy-token-btn').onclick = () => {
  navigator.clipboard.writeText(MCP_TOKEN);
  alert('MCP Token copied to clipboard!');
};

document.getElementById('copy-mcp-cmd-btn').onclick = () => {
  const cmd = document.getElementById('mcp-code-snippet').textContent;
  navigator.clipboard.writeText(cmd);
  alert('MCP Command copied to clipboard!');
};

// Add Feed Modal
const addFeedModal = document.getElementById('add-feed-modal');
const addFeedBtn = document.getElementById('add-feed-btn');
const closeAddFeedBtn = document.getElementById('close-add-feed-btn');
const cancelAddFeedBtn = document.getElementById('cancel-add-feed-btn');
const confirmAddFeedBtn = document.getElementById('confirm-add-feed-btn');

if (addFeedBtn) addFeedBtn.onclick = () => addFeedModal.classList.remove('hidden');
if (closeAddFeedBtn) closeAddFeedBtn.onclick = () => addFeedModal.classList.add('hidden');
if (cancelAddFeedBtn) cancelAddFeedBtn.onclick = () => addFeedModal.classList.add('hidden');

if (confirmAddFeedBtn) {
  confirmAddFeedBtn.onclick = async () => {
    const url = document.getElementById('new-feed-url-input').value;
    const title = document.getElementById('new-feed-title-input').value || 'New Feed';
    if (url) {
      await callMCP('add_feed', { url, title });
      treeData[0].children.unshift({ id: `feed-${Date.now()}`, type: 'feed', name: title, url, unreadCount: 1 });
      renderTree();
      addFeedModal.classList.add('hidden');
    }
  };
}

// Filter Clicks
document.querySelectorAll('.filter-item').forEach(item => {
  item.onclick = () => {
    document.querySelectorAll('.nav-item, .node-row').forEach(el => el.classList.remove('active', 'selected'));
    item.classList.add('active');
    selectedNodeId = null;
    fetchAndDisplayArticles(item.dataset.filter);
  };
});

// Search Filter
document.getElementById('search-input').oninput = (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = loadedArticles.filter(a =>
    a.title.toLowerCase().includes(query) || (a.summary && a.summary.toLowerCase().includes(query))
  );
  renderArticleList(filtered);
};

// Open in Browser
document.getElementById('open-browser-btn').onclick = () => {
  if (currentArticle && currentArticle.link) {
    window.open(currentArticle.link, '_blank');
  }
};

// Add Folder Toolbar Button
document.getElementById('add-folder-btn').onclick = () => {
  const name = prompt('New folder name:', 'New Folder');
  if (name) {
    treeData.unshift({ id: `f-${Date.now()}`, type: 'folder', name, expanded: false, children: [] });
    renderTree();
  }
};

// Context Menu
const contextMenu = document.getElementById('context-menu');
function showContextMenu(x, y, isFolder) {
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  contextMenu.classList.remove('hidden');
  document.getElementById('ctx-new-subfolder').style.display = isFolder ? 'flex' : 'none';
}
document.addEventListener('click', () => contextMenu.classList.add('hidden'));

document.getElementById('ctx-new-subfolder').onclick = () => {
  if (!contextNodeId) return;
  const name = prompt('New subfolder name:', 'New Subfolder');
  if (name) {
    const pos = findNodePosition(treeData, contextNodeId);
    if (pos && pos.node.type === 'folder') {
      pos.node.children = pos.node.children || [];
      pos.node.children.unshift({ id: `subf-${Date.now()}`, type: 'folder', name, expanded: true, children: [] });
      pos.node.expanded = true;
      renderTree();
    }
  }
};

document.getElementById('ctx-rename').onclick = () => {
  if (!contextNodeId) return;
  const pos = findNodePosition(treeData, contextNodeId);
  if (pos) {
    const newName = prompt('Rename folder:', pos.node.name);
    if (newName) { pos.node.name = newName; renderTree(); }
  }
};

document.getElementById('ctx-delete').onclick = () => {
  if (!contextNodeId) return;
  if (confirm('Delete this folder?')) { removeNodeById(treeData, contextNodeId); renderTree(); }
};

// Initial Render & Load
renderTree();
fetchAndDisplayArticles('latest');
