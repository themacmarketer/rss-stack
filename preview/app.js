// Quick RSS Production Engine
// Live Per-Feed Article Database, HTML View Mode (Default), and Drag & Drop Tree

const MCP_URL = 'http://127.0.0.1:8745/mcp?token=MLfMryTZiBNUrk-t18VeJG3MMR7CXJr1';
const MCP_TOKEN = 'MLfMryTZiBNUrk-t18VeJG3MMR7CXJr1';

// App Preferences State
let defaultArticleViewMode = 'html'; // 'html' (Default) or 'text'
let activeArticleViewMode = 'html';  // Current active view mode

// Full Feed Tree Structure
let treeData = [
  { id: 'f-1', type: 'folder', name: 'AI Company Blogs', expanded: true, children: [
    { id: 'feed-openai', type: 'feed', name: 'OpenAI Blog', url: 'https://openai.com/news', unreadCount: 42 },
    { id: 'feed-deepmind', type: 'feed', name: 'DeepMind Blog', url: 'https://deepmind.google/blog/', unreadCount: 35 },
    { id: 'feed-google-res', type: 'feed', name: 'Google Research Blog', url: 'https://research.google/blog/', unreadCount: 28 },
    { id: 'feed-ms-res', type: 'feed', name: 'Microsoft Research Blog', url: 'https://www.microsoft.com/en-us/research/blog/', unreadCount: 19 },
    { id: 'feed-nvidia', type: 'feed', name: 'NVIDIA AI Blog', url: 'https://blogs.nvidia.com/', unreadCount: 14 }
  ]},
  { id: 'f-2', type: 'folder', name: 'Apple & Swift', expanded: true, children: [
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
  { id: 'f-6', type: 'folder', name: 'arXiv Research Papers', expanded: true, children: [
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

// Helper to open links natively in default browser (Safari/Chrome/Arc) via Swift message handler
function openInDefaultBrowser(url) {
  if (!url || url === '#' || url.startsWith('javascript:')) return;
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.openExternal) {
    window.webkit.messageHandlers.openExternal.postMessage(url);
  } else {
    window.open(url, '_blank');
  }
}

// Per-Feed Article Database
const articleDatabase = {
  'OpenAI Blog': [
    {
      id: 'OAI-1',
      feedTitle: 'OpenAI Blog',
      title: 'GPT-5 Architecture & Frontier Capabilities Deep Dive',
      pubDate: '2026-09-09T02:00:00Z',
      author: 'OpenAI Research Team',
      summary: 'Detailed research release on multimodal reasoning, extended context windows, and native tool invocation.',
      htmlContent: `<div style="font-family:-apple-system, BlinkMacSystemFont, 'Inter', sans-serif; padding:32px; line-height:1.6; max-width:800px; margin:0 auto;">
        <div style="font-size:12px; font-weight:700; color:#70b643; text-transform:uppercase; letter-spacing:0.5px;">OPENAI BLOG</div>
        <h1 style="font-size:28px; font-weight:700; margin:10px 0 6px 0; color:#1c1c1e;">GPT-5 Architecture & Frontier Capabilities Deep Dive</h1>
        <div style="font-size:13px; color:#8e8e93; margin-bottom:24px;">Published 9 Sep 2026 • By OpenAI Research Team</div>
        <hr style="border:none; border-top:1px solid rgba(0,0,0,0.08); margin-bottom:24px;" />
        <p style="font-size:16px; margin-bottom:18px; color:#1c1c1e;">Today we are sharing technical insights into our frontier model family, featuring enhanced reasoning capabilities and native tool invocation across complex workflows.</p>
        <p style="font-size:15px; margin-bottom:16px; color:#3a3a3c;">The architecture builds upon dynamic mixture-of-experts with latent reasoning tokens that execute self-correction prior to output streaming. This significantly reduces hallucinations in long-form synthesis and code generation tasks.</p>
        <div style="background:#f4f6f8; border-left:4px solid #10a37f; padding:16px 20px; border-radius:6px; margin:24px 0;">
          <h4 style="margin-bottom:6px; font-size:15px; color:#1c1c1e;">Key Benchmarks Achieved:</h4>
          <ul style="padding-left:20px; font-size:14px; color:#3a3a3c;">
            <li>SWE-bench Verified: 88.4% autonomous issue resolution</li>
            <li>MATH-500: 97.2% zero-shot accuracy</li>
            <li>Multimodal Long-Video QA: 91.5% accuracy over 4-hour video inputs</li>
          </ul>
        </div>
      </div>`,
      content: 'Today we are sharing technical insights into our frontier model family, featuring enhanced reasoning capabilities and native tool invocation.',
      isRead: false,
      link: 'https://openai.com/news/'
    },
    {
      id: 'OAI-2',
      feedTitle: 'OpenAI Blog',
      title: 'Introducing Operator: Autonomous Computer Use for Workflows',
      pubDate: '2026-09-08T18:00:00Z',
      author: 'OpenAI Product Team',
      summary: 'Operator performs complex multi-step browser and GUI tasks to automate repetitive developer and operations tasks.',
      htmlContent: `<div style="font-family:-apple-system, BlinkMacSystemFont, 'Inter', sans-serif; padding:32px; line-height:1.6; max-width:800px; margin:0 auto;">
        <div style="font-size:12px; font-weight:700; color:#10a37f; text-transform:uppercase;">OPENAI ANNOUNCEMENT</div>
        <h1 style="font-size:28px; font-weight:700; margin:10px 0;">Introducing Operator: Autonomous Computer Use for Workflows</h1>
        <div style="font-size:13px; color:#8e8e93; margin-bottom:24px;">Published 8 Sep 2026</div>
        <p style="font-size:16px;">We are excited to announce early preview access to Operator, an agentic AI assistant capable of executing GUI browser actions, filling complex web forms, and handling enterprise system tasks autonomously.</p>
      </div>`,
      content: 'We are excited to announce early preview access to Operator, an agentic AI assistant capable of executing GUI browser actions.',
      isRead: false,
      link: 'https://openai.com/index/'
    }
  ],
  'DeepMind Blog': [
    {
      id: 'DM-1',
      feedTitle: 'DeepMind Blog',
      title: 'AlphaFold 3.5: Predicting Complex Molecular Interactions and Drug Binding',
      pubDate: '2026-09-09T10:00:00Z',
      author: 'Demis Hassabis & DeepMind Science Team',
      summary: 'AlphaFold 3.5 introduces atomic-accuracy modeling for RNA, DNA, small molecule ligands, and post-translational modifications.',
      htmlContent: `<div style="font-family:-apple-system, sans-serif; padding:30px; line-height:1.6; max-width:800px; margin:0 auto;">
        <div style="font-size:12px; font-weight:700; color:#4285f4; text-transform:uppercase;">DEEPMIND SCIENCE</div>
        <h1 style="font-size:26px; font-weight:700; margin:8px 0;">AlphaFold 3.5: Predicting Complex Molecular Interactions</h1>
        <div style="font-size:12px; color:#8e8e93; margin-bottom:20px;">Published 9 Sep 2026</div>
        <p style="font-size:15px;">AlphaFold 3.5 expands structure prediction beyond proteins to full cellular machinery across nucleic acids, ions, and small molecules with unprecedented atomic resolution.</p>
      </div>`,
      content: 'AlphaFold 3.5 expands structure prediction beyond proteins to full cellular machinery across nucleic acids, ions, and small molecules.',
      isRead: false,
      link: 'https://deepmind.google/blog/'
    }
  ],
  'arXiv - Computer Vision': [
    {
      id: 'ARXIV-CV-1',
      feedTitle: 'arXiv - Computer Vision',
      title: 'cs.CV: 3D Gaussian Splatting for Real-Time Dynamic Scene Reconstruction',
      pubDate: '2026-09-10T08:00:00Z',
      author: 'cs.CV Research Team',
      summary: 'High-fidelity 60FPS rendering of complex dynamic scenes captured from sparse monocular video streams.',
      htmlContent: `<div style="font-family:system-ui; padding:30px; line-height:1.6; max-width:800px; margin:0 auto;">
        <div style="font-size:12px; font-weight:700; color:#70b643; text-transform:uppercase;">ARXIV - COMPUTER VISION</div>
        <h1 style="font-size:26px; font-weight:700; margin:8px 0;">cs.CV: 3D Gaussian Splatting for Real-Time Dynamic Scene Reconstruction</h1>
        <div style="font-size:12px; color:#8e8e93; margin-bottom:20px;">Published 10 Sep 2026 • By cs.CV Research Team</div>
        <hr style="border:none; border-top:1px solid #eee; margin-bottom:20px;" />
        <div style="background:#f4f6f8; border-left:4px solid #70b643; padding:16px; border-radius:4px; margin-bottom:20px; font-size:14px; color:#333;">
          <strong>Abstract:</strong> We present <em>4D-Splat</em>, extending 3D Gaussian Splatting to dynamic temporal dimensions with neural deformation fields.
        </div>
      </div>`,
      content: 'Abstract: We present 4D-Splat, extending 3D Gaussian Splatting to dynamic temporal dimensions with neural deformation fields.',
      isRead: false,
      link: 'https://arxiv.org/abs/2609.00301'
    }
  ],
  'arXiv - Artificial Intelligence': [
    {
      id: 'ARXIV-AI-1',
      feedTitle: 'arXiv - Artificial Intelligence',
      title: 'cs.AI: Neuro-Symbolic Integration in Frontier Reasoning Models',
      pubDate: '2026-09-10T08:30:00Z',
      author: 'cs.AI Research Team',
      summary: 'A hybrid framework combining formal logic solvers with self-attention layers for mathematical proofs.',
      htmlContent: `<div style="font-family:system-ui; padding:30px; line-height:1.6; max-width:800px; margin:0 auto;">
        <div style="font-size:12px; font-weight:700; color:#70b643; text-transform:uppercase;">ARXIV - ARTIFICIAL INTELLIGENCE</div>
        <h1 style="font-size:26px; font-weight:700; margin:8px 0;">cs.AI: Neuro-Symbolic Integration in Frontier Reasoning Models</h1>
        <div style="font-size:12px; color:#8e8e93; margin-bottom:20px;">Published 10 Sep 2026</div>
      </div>`,
      content: 'Abstract: We introduce NeuroSymbolic-R1, combining formal automated theorem provers directly into transformer self-attention computations.',
      isRead: false,
      link: 'https://arxiv.org/abs/2609.00101'
    }
  ],
  'Google Research Blog': [
    {
      id: 'GOOG-1',
      feedTitle: 'Google Research Blog',
      title: 'Scaling Multimodal Transformers for Long-Context Reasoning',
      pubDate: '2026-09-10T14:20:00Z',
      author: 'Jeff Dean & Gemini Team',
      summary: 'Exploring architecture enhancements in Gemini 1.5 Pro to maintain dynamic attention efficiency across 2,000,000 token context windows.',
      htmlContent: `<div style="font-family:system-ui; padding:30px; line-height:1.6; max-width:800px; margin:0 auto;">
        <div style="font-size:12px; font-weight:700; color:#70b643;">GOOGLE RESEARCH BLOG</div>
        <h1 style="font-size:26px; font-weight:700; margin:8px 0;">Scaling Multimodal Transformers for Long-Context Reasoning</h1>
        <div style="font-size:12px; color:#8e8e93; margin-bottom:20px;">Published 10 Sep 2026 • By Jeff Dean & Gemini Team</div>
        <p style="font-size:15px; margin-bottom:16px;">Long-context multimodal transformers enable novel agentic workflows across video, audio, and large codebase inputs.</p>
      </div>`,
      content: 'Long-context multimodal transformers enable novel agentic workflows across video, audio, and large codebase inputs.',
      isRead: false,
      link: 'https://research.google/blog/'
    }
  ]
};


// App State
let loadedArticles = [];
let currentArticle = null;
let selectedNodeId = null;
let contextNodeId = null;
let draggedNodeId = null;

// Call MCP Tool via HTTP API
async function callMCP(method, params = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

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
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const json = await res.json();
    if (json.result && json.result.content && json.result.content[0]) {
      return JSON.parse(json.result.content[0].text);
    }
  } catch (err) {}
  return null;
}

// Compute Aggregate Unread Count Recursively
function getAggregateUnreadCount(item) {
  if (item.type === 'feed') return item.unreadCount || 0;
  if (item.children && item.children.length > 0) {
    return item.children.reduce((sum, child) => sum + getAggregateUnreadCount(child), 0);
  }
  return 0;
}

function getTotalUnreadCount() {
  return treeData.reduce((sum, node) => sum + getAggregateUnreadCount(node), 0);
}

// Render Tree Hierarchy
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

  // Row Selection & Drag Events
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

// Helper to collect all feeds from tree recursively
function getAllFeedsFromTree(nodes = treeData) {
  let feeds = [];
  nodes.forEach(node => {
    if (node.type === 'feed') {
      feeds.push(node);
    } else if (node.children) {
      feeds = feeds.concat(getAllFeedsFromTree(node.children));
    }
  });
  return feeds;
}

// Get or auto-generate articles for a feed
function getArticlesForFeed(feed) {
  if (articleDatabase[feed.name]) {
    return articleDatabase[feed.name];
  }
  const pubDate = new Date(Date.now() - Math.floor(Math.random() * 86400000 * 3)).toISOString();
  return [
    {
      id: `art-${feed.id || Date.now()}-1`,
      feedTitle: feed.name,
      title: `${feed.name}: Frontier Research & Technology Update`,
      pubDate: pubDate,
      author: `${feed.name} Team`,
      summary: `Latest technical insights, software releases, and research updates from ${feed.name}.`,
      htmlContent: `<div style="font-family:-apple-system, BlinkMacSystemFont, 'Inter', sans-serif; padding:32px; line-height:1.6; max-width:800px; margin:0 auto;">
        <div style="font-size:12px; font-weight:700; color:#70b643; text-transform:uppercase; letter-spacing:0.5px;">${feed.name.toUpperCase()}</div>
        <h1 style="font-size:28px; font-weight:700; margin:10px 0 6px 0; color:#1c1c1e;">${feed.name}: Frontier Research & Technology Update</h1>
        <div style="font-size:13px; color:#8e8e93; margin-bottom:24px;">Published ${new Date(pubDate).toLocaleDateString()} • By ${feed.name} Team</div>
        <hr style="border:none; border-top:1px solid rgba(0,0,0,0.08); margin-bottom:24px;" />
        <p style="font-size:16px; margin-bottom:18px; color:#1c1c1e;">Welcome to the live RSS content stream for <strong>${feed.name}</strong>. Here we share technical articles, architectural insights, and release notes.</p>
        <div style="background:#f4f6f8; border-left:4px solid #007aff; padding:16px 20px; border-radius:6px; margin:24px 0;">
          <p style="font-size:14px; color:#1c1c1e; margin:0;"><strong>Highlighted Overview:</strong> Recent system optimizations have brought substantial improvements in performance and capabilities.</p>
        </div>
      </div>`,
      content: `Welcome to the live RSS content stream for ${feed.name}. Recent optimizations have brought substantial improvements in performance and capabilities.`,
      isRead: false,
      link: feed.url || 'https://news.ycombinator.com'
    }
  ];
}

// Fetch & Display Articles for Filter, Folder, or Feed
async function fetchAndDisplayArticles(target) {
  const container = document.getElementById('article-list-container');
  container.innerHTML = '<div style="padding:20px; text-align:center; color:#8e8e93;">Loading articles...</div>';

  let items = [];
  const allFeeds = getAllFeedsFromTree(treeData);

  // Build full pool across all feeds
  let pool = [];
  allFeeds.forEach(f => {
    pool = pool.concat(getArticlesForFeed(f));
  });

  if (typeof target === 'string') {
    if (target === 'read') {
      items = pool.filter(a => a.isRead);
    } else if (target === 'latest') {
      items = [...pool].sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    } else { // 'all' or default
      items = pool;
    }
  } else if (target && target.type === 'feed') {
    items = getArticlesForFeed(target);
  } else if (target && target.type === 'folder') {
    const folderFeeds = getAllFeedsFromTree(target.children || []);
    items = [];
    folderFeeds.forEach(f => {
      items = items.concat(getArticlesForFeed(f));
    });
  }

  loadedArticles = items;
  renderArticleList(loadedArticles);
}

function renderArticleList(articles) {
  const container = document.getElementById('article-list-container');
  container.innerHTML = '';

  if (!articles || articles.length === 0) {
    container.innerHTML = '<div style="padding:20px; text-align:center; color:#8e8e93;">No articles in this feed.</div>';
    return;
  }

  articles.forEach((art, idx) => {
    const card = document.createElement('div');
    card.className = `article-item-card ${currentArticle && currentArticle.id === art.id ? 'selected' : ''}`;
    
    card.addEventListener('click', (e) => {
      e.preventDefault();
      selectArticle(art, card);
    });

    const dateStr = art.pubDate ? new Date(art.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    card.innerHTML = `
      ${!art.isRead ? '<div class="unread-dot" id="dot-' + art.id + '"></div>' : ''}
      <div class="article-meta">
        <span class="article-feed-title">${art.feedTitle || 'Feed'}</span>
        <span class="article-date">${dateStr}</span>
      </div>
      <div class="article-headline">${art.title}</div>
      <div class="article-snippet-text">${art.summary || ''}</div>
    `;
    container.appendChild(card);

    if (idx === 0) {
      selectArticle(art, card);
    }
  });
}

// Render Reader View in Selected View Mode (HTML View vs Text View)
function selectArticle(art, cardEl) {
  currentArticle = art;
  document.querySelectorAll('.article-item-card').forEach(c => c.classList.remove('selected'));
  if (cardEl) cardEl.classList.add('selected');

  if (!art.isRead) {
    art.isRead = true;
    const dot = document.getElementById(`dot-${art.id}`);
    if (dot) dot.remove();
    callMCP('mark_read', { id: art.id });
  }

  const starBtn = document.getElementById('star-btn');
  if (starBtn) {
    if (art.isFavorite) starBtn.classList.add('starred');
    else starBtn.classList.remove('starred');
  }

  renderReaderBody();
}

// Native Swift URLSession Fetch Callback Bridge
const nativeFetchCallbacks = {};

window.onNativeURLFetched = (requestId, htmlContent, error) => {
  if (nativeFetchCallbacks[requestId]) {
    nativeFetchCallbacks[requestId](htmlContent, error);
    delete nativeFetchCallbacks[requestId];
  }
};

function fetchWebPageHTML(url) {
  return new Promise((resolve, reject) => {
    const requestId = 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    nativeFetchCallbacks[requestId] = (html, err) => {
      if (html) resolve(html);
      else reject(err || 'Failed to fetch');
    };

    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.fetchURL) {
      window.webkit.messageHandlers.fetchURL.postMessage({ url, requestId });
    } else {
      fetch(url)
        .then(res => res.text())
        .then(html => resolve(html))
        .catch(err => reject(err));
    }
  });
}

function renderReaderBody() {
  if (!currentArticle) return;
  const readerContainer = document.getElementById('reader-container');
  const art = currentArticle;

  if (activeArticleViewMode === 'html') {
    readerContainer.classList.remove('text-padding');
    
    const hasLiveUrl = art.link && art.link.startsWith('http');
    
    if (hasLiveUrl) {
      const containerId = `html-pane-${Date.now()}`;
      readerContainer.innerHTML = `
        <div class="html-view-container">
          <div class="html-view-bar">
            <span class="html-view-url-label">🌐 Web View: <a href="#" onclick="openInDefaultBrowser('${art.link}'); return false;">${art.link}</a></span>
            <button class="btn-sm-open" onclick="openInDefaultBrowser('${art.link}')">Open in Default Browser ↗</button>
          </div>
          <div id="${containerId}" class="html-view-scroll-pane">
            <div style="padding:50px; text-align:center; color:#8e8e93; font-size:14px;">
              <div style="margin-bottom:10px; font-weight:600; color:#1c1c1e; font-size:15px;">🌐 Fetching full original webpage...</div>
              <div style="font-size:12px; color:#007aff;">${art.link}</div>
            </div>
          </div>
        </div>
      `;

      fetchWebPageHTML(art.link)
        .then(rawHtml => {
          const targetPane = document.getElementById(containerId);
          if (!targetPane) return;
          
          let processedHtml = rawHtml;
          const baseTag = `<base href="${art.link}">`;
          if (processedHtml.includes('<head>')) {
            processedHtml = processedHtml.replace('<head>', `<head>${baseTag}`);
          } else if (processedHtml.includes('<html>')) {
            processedHtml = processedHtml.replace('<html>', `<html><head>${baseTag}</head>`);
          } else {
            processedHtml = `<head>${baseTag}</head>` + processedHtml;
          }

          const iframe = document.createElement('iframe');
          iframe.className = 'html-view-iframe';
          iframe.setAttribute('allow', 'autoplay; encrypted-media');
          targetPane.innerHTML = '';
          targetPane.appendChild(iframe);
          iframe.srcdoc = processedHtml;
        })
        .catch(err => {
          const targetPane = document.getElementById(containerId);
          if (!targetPane) return;
          targetPane.innerHTML = `
            <div class="formatted-html-view">
              <div class="reader-feed-badge">${art.feedTitle || 'Quick RSS'}</div>
              <h1 class="reader-title">${art.title}</h1>
              <div class="reader-byline">Published ${art.pubDate ? new Date(art.pubDate).toLocaleDateString() : ''} ${art.author ? '• By ' + art.author : ''}</div>
              <hr class="reader-divider" />
              <div class="reader-html-body">${art.htmlContent || art.content || art.summary || ''}</div>
            </div>
          `;
        });
    } else {
      const htmlBody = art.htmlContent || `
        <div class="formatted-html-view">
          <div class="reader-feed-badge">${art.feedTitle || 'Quick RSS'}</div>
          <h1 class="reader-title">${art.title}</h1>
          <div class="reader-byline">Published ${art.pubDate ? new Date(art.pubDate).toLocaleDateString() : ''} ${art.author ? '• By ' + art.author : ''}</div>
          <hr class="reader-divider" />
          <div class="reader-html-body">${art.content || art.summary || 'Full HTML article view.'}</div>
        </div>
      `;
      readerContainer.innerHTML = `<div class="html-view-container"><div class="html-view-scroll-pane">${htmlBody}</div></div>`;
    }
  } else {

    readerContainer.classList.add('text-padding');
    const dateStr = art.pubDate ? new Date(art.pubDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    const textContent = art.content || art.summary || 'Clean reader text content.';

    readerContainer.innerHTML = `
      <div class="reader-article-header">
        <div class="reader-feed-badge">${art.feedTitle || 'Quick RSS'}</div>
        <h1 class="reader-title">${art.title}</h1>
        <div class="reader-byline">Published ${dateStr} ${art.author ? '• By ' + art.author : ''}</div>
      </div>
      <div class="reader-body">
        <p>${textContent}</p>
      </div>
    `;
  }
}


// View Mode Toggle Handlers (HTML View vs Text Reader)
const btnHtmlView = document.getElementById('toggle-view-html');
const btnTextView = document.getElementById('toggle-view-text');

if (btnHtmlView && btnTextView) {
  btnHtmlView.onclick = () => {
    activeArticleViewMode = 'html';
    btnHtmlView.classList.add('active');
    btnTextView.classList.remove('active');
    renderReaderBody();
  };

  btnTextView.onclick = () => {
    activeArticleViewMode = 'text';
    btnTextView.classList.add('active');
    btnHtmlView.classList.remove('active');
    renderReaderBody();
  };
}

// Settings Default Article View Setting
const defaultViewSelect = document.getElementById('setting-default-view');
if (defaultViewSelect) {
  defaultViewSelect.onchange = (e) => {
    defaultArticleViewMode = e.target.value;
    activeArticleViewMode = defaultArticleViewMode;
    if (activeArticleViewMode === 'html') {
      btnHtmlView.classList.add('active');
      btnTextView.classList.remove('active');
    } else {
      btnTextView.classList.add('active');
      btnHtmlView.classList.remove('active');
    }
    renderReaderBody();
  };
}

// Star Button Click Handler
document.getElementById('star-btn').onclick = () => {
  if (!currentArticle) return;
  currentArticle.isFavorite = !currentArticle.isFavorite;
  const starBtn = document.getElementById('star-btn');
  if (currentArticle.isFavorite) {
    starBtn.classList.add('starred');
    callMCP('star', { id: currentArticle.id });
  } else {
    starBtn.classList.remove('starred');
    callMCP('unstar', { id: currentArticle.id });
  }
};

// Open in Browser
document.getElementById('open-browser-btn').onclick = () => {
  if (currentArticle && currentArticle.link) {
    openInDefaultBrowser(currentArticle.link);
  }
};


// Settings Modal Navigation
const settingsModal = document.getElementById('settings-modal');
const settingsBtn = document.getElementById('settings-btn');
const closeSettingsBtn = document.getElementById('close-settings-btn');

function openSettings() { settingsModal.classList.remove('hidden'); }
function closeSettings() { settingsModal.classList.add('hidden'); }

if (settingsBtn) settingsBtn.onclick = openSettings;
if (closeSettingsBtn) closeSettingsBtn.onclick = closeSettings;

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === ',') {
    e.preventDefault();
    openSettings();
  }
});

document.querySelectorAll('.settings-tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const pane = document.getElementById(`pane-${tab.dataset.tab}`);
    if (pane) pane.classList.add('active');
  };
});

// Copy Tokens & Commands
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

// Filter Navigation Clicks
document.querySelectorAll('.filter-item').forEach(item => {
  item.onclick = () => {
    document.querySelectorAll('.nav-item, .node-row').forEach(el => el.classList.remove('active', 'selected'));
    item.classList.add('active');
    selectedNodeId = null;
    fetchAndDisplayArticles(item.dataset.filter);
  };
});

// Search Bar Input Filtering
document.getElementById('search-input').oninput = (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = loadedArticles.filter(a =>
    a.title.toLowerCase().includes(query) || (a.summary && a.summary.toLowerCase().includes(query))
  );
  renderArticleList(filtered);
};

// Add Folder Toolbar Button
document.getElementById('add-folder-btn').onclick = () => {
  const name = prompt('New folder name:', 'New Folder');
  if (name) {
    treeData.unshift({ id: `f-${Date.now()}`, type: 'folder', name, expanded: false, children: [] });
    renderTree();
  }
};

// Context Menu Setup
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
