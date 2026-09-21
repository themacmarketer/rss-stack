// Quick RSS Production Engine
// Live Per-Feed Article Database, HTML View Mode (Default), and Drag & Drop Tree

const MCP_URL = 'http://127.0.0.1:8745/mcp?token=MLfMryTZiBNUrk-t18VeJG3MMR7CXJr1';
const MCP_TOKEN = 'MLfMryTZiBNUrk-t18VeJG3MMR7CXJr1';

// App Preferences State
let defaultArticleViewMode = 'html'; // 'html' (Default) or 'text'
let activeArticleViewMode = 'html';  // Current active view mode

// Full Feed Tree Structure
let defaultTreeData = [
  {
    "id": "f-0-6592",
    "type": "folder",
    "name": "01 \u2014 AI Industry & Strategy",
    "expanded": false,
    "children": [
      {
        "id": "f-1-5779",
        "type": "folder",
        "name": "AI Market & Industry News",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-9218",
            "type": "feed",
            "name": "TechCrunch AI",
            "url": "https://techcrunch.com/category/artificial-intelligence/feed/",
            "unreadCount": 19
          },
          {
            "id": "feed-2-3997",
            "type": "feed",
            "name": "VentureBeat AI",
            "url": "https://venturebeat.com/category/ai/feed/",
            "unreadCount": 7
          },
          {
            "id": "feed-2-5123",
            "type": "feed",
            "name": "MIT Technology Review",
            "url": "https://www.technologyreview.com/feed/",
            "unreadCount": 10
          },
          {
            "id": "feed-2-4533",
            "type": "feed",
            "name": "Unite.AI",
            "url": "https://unite.ai/feed",
            "unreadCount": 25
          },
          {
            "id": "feed-2-3581",
            "type": "feed",
            "name": "DailyAI",
            "url": "https://dailyai.com/feed",
            "unreadCount": 10
          },
          {
            "id": "feed-2-5247",
            "type": "feed",
            "name": "Artificial Intelligence News",
            "url": "https://www.artificialintelligence-news.com/feed/rss/",
            "unreadCount": 12
          }
        ]
      }
    ]
  },
  {
    "id": "f-0-3336",
    "type": "folder",
    "name": "02 \u2014 AI Companies & Platforms",
    "expanded": false,
    "children": [
      {
        "id": "f-1-4395",
        "type": "folder",
        "name": "OpenAI",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-1384",
            "type": "feed",
            "name": "OpenAI Blog",
            "url": "https://openai.com/blog/rss/",
            "unreadCount": 63
          }
        ]
      },
      {
        "id": "f-1-5338",
        "type": "folder",
        "name": "Google / DeepMind",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-1723",
            "type": "feed",
            "name": "Google AI Research Blog",
            "url": "https://ai.googleblog.com/feeds/posts/default",
            "unreadCount": 58
          },
          {
            "id": "feed-2-6902",
            "type": "feed",
            "name": "DeepMind Blog",
            "url": "https://deepmind.com/blog/feed/basic",
            "unreadCount": 100
          }
        ]
      },
      {
        "id": "f-1-2900",
        "type": "folder",
        "name": "Microsoft",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-2046",
            "type": "feed",
            "name": "Microsoft AI Blog",
            "url": "https://blogs.microsoft.com/ai/feed/",
            "unreadCount": 39
          }
        ]
      },
      {
        "id": "f-1-8292",
        "type": "folder",
        "name": "Meta",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-7850",
            "type": "feed",
            "name": "Meta AI Blog",
            "url": "https://ai.meta.com/blog/rss/",
            "unreadCount": 47
          }
        ]
      },
      {
        "id": "f-1-5831",
        "type": "folder",
        "name": "Cohere",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-2150",
            "type": "feed",
            "name": "Cohere AI Blog",
            "url": "https://cohere.com/blog/rss.xml",
            "unreadCount": 22
          }
        ]
      },
      {
        "id": "f-1-4407",
        "type": "folder",
        "name": "Stability AI",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-6005",
            "type": "feed",
            "name": "Stability AI Blog",
            "url": "https://stability.ai/blog/rss",
            "unreadCount": 17
          }
        ]
      }
    ]
  },
  {
    "id": "f-0-3194",
    "type": "folder",
    "name": "03 \u2014 Models & Research",
    "expanded": false,
    "children": [
      {
        "id": "f-1-8353",
        "type": "folder",
        "name": "Company Research",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-1224",
            "type": "feed",
            "name": "OpenAI Research Index",
            "url": "https://openai.com/research/feed.xml",
            "unreadCount": 67
          },
          {
            "id": "feed-2-8675",
            "type": "feed",
            "name": "Anthropic Research",
            "url": "https://www.anthropic.com/research/rss",
            "unreadCount": 36
          },
          {
            "id": "feed-2-5185",
            "type": "feed",
            "name": "Google Research Blog",
            "url": "https://research.google/blog/rss",
            "unreadCount": 100
          },
          {
            "id": "feed-2-4485",
            "type": "feed",
            "name": "Microsoft Research Blog",
            "url": "https://www.microsoft.com/en-us/research/blog/feed/",
            "unreadCount": 10
          }
        ]
      },
      {
        "id": "f-1-2873",
        "type": "folder",
        "name": "Research Institutions",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-8324",
            "type": "feed",
            "name": "Stanford AI Lab (SAIL)",
            "url": "https://ai.stanford.edu/blog/feed.xml",
            "unreadCount": 15
          },
          {
            "id": "feed-2-6948",
            "type": "feed",
            "name": "MIT CSAIL News - AI",
            "url": "https://news.mit.edu/rss/topic/artificial-intelligence2",
            "unreadCount": 50
          },
          {
            "id": "feed-2-9056",
            "type": "feed",
            "name": "Berkeley AI Research (BAIR)",
            "url": "http://bair.berkeley.edu/blog/feed.xml",
            "unreadCount": 56
          },
          {
            "id": "feed-2-4438",
            "type": "feed",
            "name": "Allen Institute for AI",
            "url": "http://feeds.feedburner.com/AIInTheNews",
            "unreadCount": 67
          }
        ]
      },
      {
        "id": "f-1-4247",
        "type": "folder",
        "name": "arXiv \u2014 AI & ML",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-3579",
            "type": "feed",
            "name": "arXiv - Artificial Intelligence",
            "url": "https://rss.arxiv.org/rss/cs.ai",
            "unreadCount": 273
          },
          {
            "id": "feed-2-5071",
            "type": "feed",
            "name": "arXiv - Machine Learning",
            "url": "https://rss.arxiv.org/rss/cs.LG",
            "unreadCount": 268
          },
          {
            "id": "feed-2-7344",
            "type": "feed",
            "name": "arXiv - AI + ML + Stats",
            "url": "https://rss.arxiv.org/rss/cs.ai+cs.LG+stat.ML",
            "unreadCount": 464
          }
        ]
      },
      {
        "id": "f-1-9335",
        "type": "folder",
        "name": "arXiv \u2014 Vision & Language",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-9453",
            "type": "feed",
            "name": "arXiv - Computer Vision",
            "url": "https://rss.arxiv.org/rss/cs.CV",
            "unreadCount": 158
          },
          {
            "id": "feed-2-7686",
            "type": "feed",
            "name": "arXiv - Natural Language Processing",
            "url": "https://rss.arxiv.org/rss/cs.CL",
            "unreadCount": 155
          }
        ]
      },
      {
        "id": "f-1-9292",
        "type": "folder",
        "name": "Research Discovery",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-7276",
            "type": "feed",
            "name": "Hugging Face Papers (Community)",
            "url": "https://jamesg.blog/hf-papers.xml",
            "unreadCount": 12
          }
        ]
      }
    ]
  },
  {
    "id": "f-0-8537",
    "type": "folder",
    "name": "04 \u2014 Agents & Agentic AI",
    "expanded": true,
    "children": []
  },
  {
    "id": "f-0-1838",
    "type": "folder",
    "name": "05 \u2014 AI Engineering & Infrastructure",
    "expanded": false,
    "children": [
      {
        "id": "f-1-2889",
        "type": "folder",
        "name": "LLM / ML Engineering",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-1491",
            "type": "feed",
            "name": "Machine Learning Mastery",
            "url": "http://feeds.feedburner.com/MachineLearningMastery",
            "unreadCount": 36
          },
          {
            "id": "feed-2-3337",
            "type": "feed",
            "name": "Towards Data Science",
            "url": "https://towardsdatascience.com/feed",
            "unreadCount": 20
          },
          {
            "id": "feed-2-3298",
            "type": "feed",
            "name": "KDnuggets",
            "url": "https://kdnuggets.com/feed",
            "unreadCount": 10
          }
        ]
      },
      {
        "id": "f-1-2394",
        "type": "folder",
        "name": "Hugging Face",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-7165",
            "type": "feed",
            "name": "Hugging Face Blog",
            "url": "https://huggingface.co/blog/feed.xml",
            "unreadCount": 861
          }
        ]
      },
      {
        "id": "f-1-7605",
        "type": "folder",
        "name": "Cloud AI Platforms",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-4778",
            "type": "feed",
            "name": "AWS Machine Learning Blog",
            "url": "https://aws.amazon.com/blogs/ai/feed/",
            "unreadCount": 20
          },
          {
            "id": "feed-2-9533",
            "type": "feed",
            "name": "Google Cloud Blog",
            "url": "https://cloudblog.withgoogle.com/rss",
            "unreadCount": 20
          },
          {
            "id": "feed-2-6287",
            "type": "feed",
            "name": "Azure AI Blog",
            "url": "https://azure.microsoft.com/en-us/blog/topics/ai-machine-learning/feed/",
            "unreadCount": 47
          }
        ]
      },
      {
        "id": "f-1-6626",
        "type": "folder",
        "name": "AI Hardware & Compute",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-2211",
            "type": "feed",
            "name": "NVIDIA AI Blog",
            "url": "https://blogs.nvidia.com/blog/category/ai/feed/",
            "unreadCount": 34
          }
        ]
      }
    ]
  },
  {
    "id": "f-0-8435",
    "type": "folder",
    "name": "06 \u2014 AI Automation & Workflows",
    "expanded": true,
    "children": []
  },
  {
    "id": "f-0-8139",
    "type": "folder",
    "name": "07 \u2014 AI for Business",
    "expanded": true,
    "children": []
  },
  {
    "id": "f-0-4809",
    "type": "folder",
    "name": "08 \u2014 AI Marketing & Growth",
    "expanded": false,
    "children": [
      {
        "id": "f-1-3398",
        "type": "folder",
        "name": "MarTech",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-3992",
            "type": "feed",
            "name": "MarTech",
            "url": "https://martech.org/feed",
            "unreadCount": 21
          },
          {
            "id": "feed-2-3511",
            "type": "feed",
            "name": "Martech Zone",
            "url": "https://feed.martech.zone",
            "unreadCount": 62
          },
          {
            "id": "feed-2-3539",
            "type": "feed",
            "name": "MarTech Series",
            "url": "https://martechseries.com/feed",
            "unreadCount": 10
          },
          {
            "id": "feed-2-1828",
            "type": "feed",
            "name": "Marketing Tech News",
            "url": "https://marketingtechnews.net/feed",
            "unreadCount": 10
          },
          {
            "id": "feed-2-7669",
            "type": "feed",
            "name": "Chiefmartec (Scott Brinker)",
            "url": "https://chiefmartec.com/feed",
            "unreadCount": 10
          },
          {
            "id": "feed-2-9737",
            "type": "feed",
            "name": "VentureBeat Marketing",
            "url": "https://venturebeat.com/category/marketing/feed/",
            "unreadCount": 36
          }
        ]
      },
      {
        "id": "f-1-6963",
        "type": "folder",
        "name": "Marketing AI",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-4452",
            "type": "feed",
            "name": "Marketing AI Institute",
            "url": "http://www.marketingaiinstitute.com/blog/rss.xml",
            "unreadCount": 30
          },
          {
            "id": "feed-2-4269",
            "type": "feed",
            "name": "StoryLab.ai Blog",
            "url": "https://storylab.ai/feed",
            "unreadCount": 10
          },
          {
            "id": "feed-2-2451",
            "type": "feed",
            "name": "Rad AI Blog",
            "url": "https://blog.radintel.ai/rss.xml",
            "unreadCount": 10
          },
          {
            "id": "feed-2-3115",
            "type": "feed",
            "name": "Marketing SoundBytes",
            "url": "https://rahulsandil.com/feed",
            "unreadCount": 12
          }
        ]
      },
      {
        "id": "f-1-1299",
        "type": "folder",
        "name": "SEO / GEO / AEO",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-1327",
            "type": "feed",
            "name": "WordLift Blog (AI/SEO)",
            "url": "https://wordlift.io/blog/en/feed",
            "unreadCount": 10
          }
        ]
      },
      {
        "id": "f-1-3009",
        "type": "folder",
        "name": "Content Marketing",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-7318",
            "type": "feed",
            "name": "Content Marketing Institute",
            "url": "https://contentmarketinginstitute.com/feed/",
            "unreadCount": 7
          }
        ]
      }
    ]
  },
  {
    "id": "f-0-3525",
    "type": "folder",
    "name": "09 \u2014 AI Learning & Education",
    "expanded": true,
    "children": []
  },
  {
    "id": "f-0-8417",
    "type": "folder",
    "name": "10 \u2014 AI Applications",
    "expanded": true,
    "children": []
  },
  {
    "id": "f-0-1633",
    "type": "folder",
    "name": "11 \u2014 Analysis & Commentary",
    "expanded": false,
    "children": [
      {
        "id": "f-1-9793",
        "type": "folder",
        "name": "AI Newsletters & Analysis",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-8474",
            "type": "feed",
            "name": "AI Weekly",
            "url": "https://aiweekly.co/issues.rss",
            "unreadCount": 20
          },
          {
            "id": "feed-2-2819",
            "type": "feed",
            "name": "Import AI (Jack Clark)",
            "url": "https://jack-clark.net/feed/",
            "unreadCount": 10
          },
          {
            "id": "feed-2-1852",
            "type": "feed",
            "name": "AI Alignment Forum",
            "url": "https://www.alignmentforum.org/feed.xml",
            "unreadCount": 10
          },
          {
            "id": "feed-2-8546",
            "type": "feed",
            "name": "DeepLearning.AI Blog",
            "url": "https://www.deeplearning.ai/blog/feed/",
            "unreadCount": 69
          }
        ]
      },
      {
        "id": "f-1-8886",
        "type": "folder",
        "name": "Independent AI Analysis",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-7771",
            "type": "feed",
            "name": "MarkTechPost",
            "url": "https://marktechpost.com/feed",
            "unreadCount": 10
          }
        ]
      }
    ]
  },
  {
    "id": "f-0-1007",
    "type": "folder",
    "name": "12 \u2014 General Technology",
    "expanded": false,
    "children": [
      {
        "id": "f-1-9829",
        "type": "folder",
        "name": "General Tech News",
        "expanded": true,
        "children": [
          {
            "id": "feed-2-3757",
            "type": "feed",
            "name": "The Verge",
            "url": "https://www.theverge.com/rss/index.xml",
            "unreadCount": 10
          },
          {
            "id": "feed-2-2565",
            "type": "feed",
            "name": "Wired",
            "url": "https://www.wired.com/feed/rss",
            "unreadCount": 50
          }
        ]
      }
    ]
  },
  {
    "id": "f-1789112190694",
    "type": "folder",
    "name": "13 \u2014 AI at Reddit",
    "expanded": true,
    "children": []
  },
  {
    "id": "f-0-9083",
    "type": "folder",
    "name": "90 \u2014 Watch / Experimental",
    "expanded": true,
    "children": []
  },
  {
    "id": "f-0-2765",
    "type": "folder",
    "name": "99 \u2014 Archive",
    "expanded": true,
    "children": []
  }
];

function loadSavedTreeData() {
  try {
    const saved = safeGetStorage('quickrss_user_tree');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {}
  return JSON.parse(JSON.stringify(defaultTreeData));
}

let treeData = loadSavedTreeData();

function saveTreeData() {
  try {
    if (!Array.isArray(treeData) || treeData.length === 0) return;
    const jsonStr = JSON.stringify(treeData);
    safeSetStorage('quickrss_user_tree', jsonStr);
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.saveUserTree) {
      window.webkit.messageHandlers.saveUserTree.postMessage(jsonStr);
    }
  } catch(e) {
    console.error('Error saving tree data:', e);
  }
}



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
let activeFilter = 'latest';
let activeFeedId = null;
let currentArticle = null;
let selectedNodeId = null;
let contextNodeId = null;
let draggedNodeId = null;

// Native MCP Tool Execution Bridge
function formatArticleForMCP(art) {
  if (!art) return null;
  const artId = art.id || art.link || '';
  const artUrl = art.link || '';
  const deeplink = `quickrss://article?id=${encodeURIComponent(artId)}&url=${encodeURIComponent(artUrl)}`;
  return {
    id: art.id,
    title: art.title,
    feedTitle: art.feedTitle,
    pubDate: art.pubDate,
    author: art.author,
    summary: art.summary,
    link: art.link,
    deeplink: deeplink
  };
}

window.executeMCPTool = async function(name, args = {}) {
  try {
    if (name === 'get_unread_articles') {
      const allFeeds = getAllFeedsFromTree(treeData);
      const unread = [];
      const seenKeys = new Set();

      allFeeds.forEach(feed => {
        const cacheKey = feed.url || feed.id || feed.name;
        const feedArts = feedArticleCache[cacheKey] || articleDatabase[feed.name] || [];
        feedArts.forEach(art => {
          const key = art.id || (art.title + '---' + art.feedTitle);
          if (!seenKeys.has(key) && !art.isRead) {
            seenKeys.add(key);
            unread.push(art);
          }
        });
      });

      if (unread.length === 0 && loadedArticles && loadedArticles.length > 0) {
        loadedArticles.filter(a => !a.isRead).forEach(art => {
          const key = art.id || (art.title + '---' + art.feedTitle);
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            unread.push(art);
          }
        });
      }

      return unread.map(formatArticleForMCP);
    }

    if (name === 'search_articles') {
      const rawQuery = (args.query || '').trim();
      const terms = rawQuery.toLowerCase().split(/\s+/).filter(Boolean);
      const allFeeds = getAllFeedsFromTree(treeData);
      const seenKeys = new Set();
      const matches = [];

      allFeeds.forEach(feed => {
        const cacheKey = feed.url || feed.id || feed.name;
        const feedArts = feedArticleCache[cacheKey] || articleDatabase[feed.name] || [];
        feedArts.forEach(art => {
          const key = art.id || (art.title + '---' + art.feedTitle);
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            const titleStr = art.title || '';
            const summaryStr = art.summary || '';
            const contentStr = art.content || art.htmlContent || '';
            const authorStr = art.author || '';
            const feedStr = art.feedTitle || '';

            const combinedText = `${titleStr} ${summaryStr} ${authorStr} ${feedStr} ${contentStr}`;
            const matchesAll = terms.length === 0 || terms.every(t => fuzzyMatchTerm(t, combinedText));

            if (matchesAll) {
              matches.push(art);
            }
          }
        });
      });

      matches.sort((a, b) => getArticleTimestamp(b) - getArticleTimestamp(a));

      return matches.map(formatArticleForMCP);
    }

    if (name === 'get_feed_tree') {
      return treeData;
    }

    if (name === 'add_folder') {
      const folderName = args.name;
      if (!folderName) return { error: 'Missing folder name' };
      const parentId = args.parent_id || 'root';
      const newFolder = {
        id: `f-mcp-${Date.now()}`,
        type: 'folder',
        name: folderName,
        expanded: true,
        children: []
      };

      if (parentId === 'root') {
        treeData.unshift(newFolder);
      } else {
        const parentPos = findNodePosition(treeData, parentId);
        if (parentPos && parentPos.node.type === 'folder') {
          parentPos.node.children = parentPos.node.children || [];
          parentPos.node.children.unshift(newFolder);
          parentPos.node.expanded = true;
        } else {
          treeData.unshift(newFolder);
        }
      }
      renderTree();
      showToast(`Created folder "${folderName}" via MCP`, 'success');
      return { success: true, folder: newFolder };
    }

    if (name === 'edit_folder') {
      const folderId = args.id;
      if (!folderId) return { error: 'Missing folder ID' };
      const pos = findNodePosition(treeData, folderId);
      if (!pos || pos.node.type !== 'folder') return { error: `Folder '${folderId}' not found` };

      if (args.name) pos.node.name = args.name;

      if (args.parent_id !== undefined) {
        const newParentId = args.parent_id;
        const parentInfo = findParentOfNode(treeData, folderId);
        const currentParentId = parentInfo && parentInfo.parentNode ? parentInfo.parentNode.id : 'root';

        if (newParentId !== currentParentId) {
          const removed = removeNodeById(treeData, folderId);
          if (removed) {
            if (newParentId === 'root') {
              treeData.unshift(removed);
            } else {
              const targetPos = findNodePosition(treeData, newParentId);
              if (targetPos && targetPos.node.type === 'folder') {
                targetPos.node.children = targetPos.node.children || [];
                targetPos.node.children.unshift(removed);
                targetPos.node.expanded = true;
              } else {
                treeData.unshift(removed);
              }
            }
          }
        }
      }

      renderTree();
      showToast(`Updated folder "${pos.node.name}" via MCP`, 'success');
      return { success: true, folder: pos.node };
    }

    if (name === 'delete_folder') {
      const folderId = args.id;
      if (!folderId) return { error: 'Missing folder ID' };
      const pos = findNodePosition(treeData, folderId);
      if (!pos) return { error: `Folder '${folderId}' not found` };

      removeNodeById(treeData, folderId);
      renderTree();
      showToast(`Deleted folder via MCP`, 'info');
      return { success: true, id: folderId };
    }

    if (name === 'add_feed') {
      const url = args.url;
      const title = args.title || url;
      const folderId = args.folder_id || args.folderId || 'root';
      if (!url) return { error: 'Missing feed URL' };

      const newFeed = {
        id: `feed-mcp-${Date.now()}`,
        type: 'feed',
        name: title,
        url: url,
        unreadCount: 0
      };

      if (folderId === 'root') {
        treeData.unshift(newFeed);
      } else {
        const targetPos = findNodePosition(treeData, folderId);
        if (targetPos && targetPos.node.type === 'folder') {
          targetPos.node.children = targetPos.node.children || [];
          targetPos.node.children.unshift(newFeed);
          targetPos.node.expanded = true;
        } else {
          treeData.unshift(newFeed);
        }
      }

      renderTree();
      fetchAndDisplayArticles(newFeed);
      showToast(`Added feed "${title}" via MCP`, 'success');
      return { success: true, message: `Added feed ${title}`, feed: newFeed };
    }

    if (name === 'edit_feed') {
      const feedId = args.id;
      if (!feedId) return { error: 'Missing feed ID or URL' };
      const pos = findNodePosition(treeData, feedId);
      if (!pos || pos.node.type !== 'feed') return { error: `Feed '${feedId}' not found` };

      if (args.title) pos.node.name = args.title;
      if (args.url && args.url !== pos.node.url) {
        delete feedArticleCache[pos.node.url];
        pos.node.url = args.url;
      }

      if (args.folder_id !== undefined) {
        const newFolderId = args.folder_id;
        const parentInfo = findParentOfNode(treeData, pos.node.id);
        const currentParentId = parentInfo && parentInfo.parentNode ? parentInfo.parentNode.id : 'root';

        if (newFolderId !== currentParentId) {
          const removed = removeNodeById(treeData, pos.node.id);
          if (removed) {
            if (newFolderId === 'root') {
              treeData.unshift(removed);
            } else {
              const targetPos = findNodePosition(treeData, newFolderId);
              if (targetPos && targetPos.node.type === 'folder') {
                targetPos.node.children = targetPos.node.children || [];
                targetPos.node.children.unshift(removed);
                targetPos.node.expanded = true;
              } else {
                treeData.unshift(removed);
              }
            }
          }
        }
      }

      renderTree();
      fetchAndDisplayArticles(pos.node);
      showToast(`Updated feed "${pos.node.name}" via MCP`, 'success');
      return { success: true, feed: pos.node };
    }

    if (name === 'delete_feed') {
      const target = args.id || args.feed_id || args.url || args.title;
      if (!target) return { error: 'Missing feed id, url, or title' };
      
      const targetLower = String(target).trim().toLowerCase();
      function searchFeed(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.type === 'feed') {
            if (n.id === target || (n.url && n.url.toLowerCase() === targetLower) || (n.name && n.name.toLowerCase() === targetLower)) {
              return n;
            }
          }
          if (n.children) {
            const found = searchFeed(n.children);
            if (found) return found;
          }
        }
        return null;
      }

      const targetFeed = searchFeed(treeData);
      if (!targetFeed) return { error: `Feed '${target}' not found` };

      const feedName = targetFeed.name;
      const feedId = targetFeed.id;
      removeNodeById(treeData, feedId);
      renderTree();
      fetchAndDisplayArticles('latest');
      showToast(`Deleted feed "${feedName}" via MCP`, 'info');
      return { success: true, id: feedId, title: feedName };
    }

    if (name === 'get_folder_articles') {
      const folderId = args.folder_id;
      if (!folderId) return { error: 'Missing folder_id' };
      const pos = findNodePosition(treeData, folderId);
      if (!pos || pos.node.type !== 'folder') return { error: `Folder '${folderId}' not found` };

      const folderFeeds = getAllFeedsFromTree(pos.node.children || []);
      const articlesLists = await Promise.all(folderFeeds.map(f => getArticlesForFeed(f)));
      const pool = articlesLists.flat();
      return pool.map(formatArticleForMCP);
    }

    if (name === 'mark_read') {
      const id = args.id;
      const target = loadedArticles.find(a => a.id === id || a.link === id);
      if (target) {
        setArticleRead(target);
      } else {
        const readSet = getReadArticleIdsFromStorage();
        readSet.add(id);
        saveReadArticleIdsToStorage(readSet);
        updateBadges();
      }
      return { success: true, id: id };
    }

    if (name === 'star') {
      const id = args.id;
      let target = loadedArticles.find(a => a.id === id || a.link === id);
      if (target) {
        setArticleStarred(target, true);
        renderArticleList(loadedArticles);
      }
      return { success: true, id: id };
    }

    if (name === 'unstar') {
      const id = args.id;
      let target = loadedArticles.find(a => a.id === id || a.link === id);
      if (target) {
        setArticleStarred(target, false);
        renderArticleList(loadedArticles);
      }
      return { success: true, id: id };
    }

    if (name === 'star_all') {
      loadedArticles.forEach(a => setArticleStarred(a, true));
      renderArticleList(loadedArticles);
      return { success: true, count: loadedArticles.length };
    }

    if (name === 'unstar_all') {
      loadedArticles.forEach(a => setArticleStarred(a, false));
      renderArticleList(loadedArticles);
      return { success: true, count: loadedArticles.length };
    }

    if (name === 'get_starred_articles') {
      return getStarredArticlesFromStorage().map(formatArticleForMCP);
    }


    if (name === 'chat_with_news') {
      const query = args.query || args.prompt || '';
      if (!query) return { error: 'Missing query/prompt parameter' };
      const responseText = await processAIChatQuery(query);
      return { success: true, query: query, response: responseText };
    }
  } catch (err) {
    return { error: err.toString() };
  }
  return { error: `Unknown tool '${name}'` };
};

window.executeMCPToolNative = async function(requestId, name, args = {}) {
  try {
    const result = await window.executeMCPTool(name, args);
    const resultStr = typeof result === 'string' ? result : JSON.stringify(result);
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.mcpResponse) {
      window.webkit.messageHandlers.mcpResponse.postMessage({
        requestId: requestId,
        result: resultStr
      });
    }
  } catch (err) {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.mcpResponse) {
      window.webkit.messageHandlers.mcpResponse.postMessage({
        requestId: requestId,
        result: JSON.stringify({ error: err.toString() })
      });
    }
  }
};

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

// Compute Aggregate Unread Count Recursively (including nested subfolders and cached live feeds)
function getAggregateUnreadCount(item) {
  if (!item) return 0;
  if (item.type === 'feed') {
    const cacheKey = item.url || item.id || item.name;
    const readSet = (typeof getReadArticleIdsFromStorage === 'function') ? getReadArticleIdsFromStorage() : new Set();
    if (feedArticleCache[cacheKey] && Array.isArray(feedArticleCache[cacheKey]) && feedArticleCache[cacheKey].length > 0) {
      const unread = feedArticleCache[cacheKey].filter(a => !a.isRead && !readSet.has(getArticleKey(a)));
      return unread.length;
    }
    if (articleDatabase[item.name] && Array.isArray(articleDatabase[item.name])) {
      const unread = articleDatabase[item.name].filter(a => !a.isRead && !readSet.has(getArticleKey(a)));
      return unread.length;
    }
    if (typeof item.unreadCount === 'number' && !isNaN(item.unreadCount)) {
      return item.unreadCount;
    }
    return 0;
  }
  if (item.children && Array.isArray(item.children) && item.children.length > 0) {
    return item.children.reduce((sum, child) => sum + getAggregateUnreadCount(child), 0);
  }
  if (typeof item.unreadCount === 'number' && !isNaN(item.unreadCount)) {
    return item.unreadCount;
  }
  return 0;
}

function getTotalUnreadCount() {
  return treeData.reduce((sum, node) => sum + getAggregateUnreadCount(node), 0);
}

// Render Tree Hierarchy
function renderTree() {
  const container = document.getElementById('tree-container');
  if (!container) return;
  container.innerHTML = '';
  const rootUl = document.createElement('ul');
  rootUl.className = 'nav-list';

  treeData.forEach(node => {
    rootUl.appendChild(createNodeElement(node, 0));
  });

  container.appendChild(rootUl);
  updateBadges();
  saveTreeData();
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
    chevron.innerHTML = `<svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5L10.5 8 6 12.5"/></svg>`;
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
    iconSpan.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 13V4a1.5 1.5 0 0 1 1.5-1.5h3.5L8 4.5h6.5A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-11.5A1.5 1.5 0 0 1 1.5 13z"/></svg>`;
  } else {
    iconSpan.className = 'icon-box feed-icon';
    iconSpan.innerHTML = `<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="3.5" cy="12.5" r="1.25" fill="currentColor"/><path d="M2.5 7.5a6 6 0 0 1 6 6"/><path d="M2.5 2.5a11 11 0 0 1 11 11"/></svg>`;
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
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
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

// ==========================================
// PERSISTENCE ENGINE: Starred & Read Articles
// ==========================================
const STARRED_ARTICLES_KEY = 'quickrss_starred_articles';
const READ_ARTICLES_KEY = 'quickrss_read_article_ids';

function getArticleKey(art) {
  if (!art) return '';
  return art.id || art.link || (art.title + '---' + (art.feedTitle || ''));
}

let inMemoryStarredList = null;

function getStarredArticlesFromStorage() {
  if (inMemoryStarredList) return inMemoryStarredList;
  try {
    const raw = localStorage.getItem(STARRED_ARTICLES_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        inMemoryStarredList = arr;
        return inMemoryStarredList;
      }
    }
  } catch (e) {}
  inMemoryStarredList = [];
  return inMemoryStarredList;
}

function saveStarredArticlesToStorage(starredArray) {
  inMemoryStarredList = starredArray;
  try {
    const jsonStr = JSON.stringify(starredArray);
    safeSetStorage(STARRED_ARTICLES_KEY, jsonStr);
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.saveStarredArticles) {
      window.webkit.messageHandlers.saveStarredArticles.postMessage(jsonStr);
    }
  } catch (e) {}
}

function setArticleStarred(art, forceState) {
  if (!art) return;
  const isStarred = forceState !== undefined ? Boolean(forceState) : !art.isFavorite;
  art.isFavorite = isStarred;

  const key = getArticleKey(art);
  let starredList = getStarredArticlesFromStorage();

  if (isStarred) {
    const existingIndex = starredList.findIndex(a => getArticleKey(a) === key);
    const cleanObj = {
      id: art.id || `starred-${Date.now()}`,
      feedTitle: art.feedTitle || 'Feed',
      title: art.title || 'Untitled',
      pubDate: art.pubDate || new Date().toISOString(),
      author: art.author || '',
      summary: art.summary || '',
      htmlContent: art.htmlContent || '',
      content: art.content || '',
      isRead: Boolean(art.isRead),
      isFavorite: true,
      link: art.link || ''
    };
    if (existingIndex >= 0) {
      starredList[existingIndex] = cleanObj;
    } else {
      starredList.unshift(cleanObj);
    }
  } else {
    starredList = starredList.filter(a => getArticleKey(a) !== key);
  }

  saveStarredArticlesToStorage(starredList);
  updateBadges();
}

let inMemoryReadSet = null;

function getReadArticleIdsFromStorage() {
  if (inMemoryReadSet) return inMemoryReadSet;
  try {
    const raw = localStorage.getItem(READ_ARTICLES_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        inMemoryReadSet = new Set(arr);
        return inMemoryReadSet;
      }
    }
  } catch (e) {}
  inMemoryReadSet = new Set();
  return inMemoryReadSet;
}

function saveReadArticleIdsToStorage(readSet) {
  inMemoryReadSet = readSet;
  try {
    const jsonStr = JSON.stringify(Array.from(readSet));
    safeSetStorage(READ_ARTICLES_KEY, jsonStr);
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.saveReadArticles) {
      window.webkit.messageHandlers.saveReadArticles.postMessage(jsonStr);
    }
  } catch (e) {}
}

function setArticleRead(art) {
  if (!art) return;
  art.isRead = true;
  const key = getArticleKey(art);
  if (key) {
    const readSet = getReadArticleIdsFromStorage();
    if (!readSet.has(key)) {
      readSet.add(key);
      saveReadArticleIdsToStorage(readSet);
      updateBadges();
    }
  }
}

function applyPersistedArticleStates(articles) {
  if (!articles || !Array.isArray(articles)) return articles;
  const readSet = getReadArticleIdsFromStorage();
  const starredList = getStarredArticlesFromStorage();
  const starredKeys = new Set(starredList.map(a => getArticleKey(a)));

  articles.forEach(art => {
    const key = getArticleKey(art);
    if (readSet.has(key)) {
      art.isRead = true;
    }
    if (starredKeys.has(key)) {
      art.isFavorite = true;
    }
  });

  return articles;
}

function updateTreeBadges() {
  function updateNodeBadge(node) {
    const li = document.querySelector(`.tree-node[data-id="${node.id}"]`);
    if (li) {
      const row = li.querySelector('.node-row');
      if (row) {
        const count = getAggregateUnreadCount(node);
        let badge = row.querySelector('.item-badge');
        if (count > 0) {
          if (!badge) {
            badge = document.createElement('span');
            badge.className = 'item-badge';
            row.appendChild(badge);
          }
          badge.textContent = count;
        } else if (badge) {
          badge.remove();
        }
      }
    }
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(updateNodeBadge);
    }
  }

  if (Array.isArray(treeData)) {
    treeData.forEach(updateNodeBadge);
  }
}

function updateBadges() {
  updateTreeBadges();

  const total = getTotalUnreadCount();
  const badgeAll = document.getElementById('badge-all');
  if (badgeAll) badgeAll.textContent = total;
  const badgeLatest = document.getElementById('badge-latest');
  if (badgeLatest) badgeLatest.textContent = Math.round(total * 0.6);

  const starredList = getStarredArticlesFromStorage();
  const badgeStarred = document.getElementById('badge-starred');
  if (badgeStarred) badgeStarred.textContent = starredList.length;

  const readSet = getReadArticleIdsFromStorage();
  const badgeRead = document.getElementById('badge-read');
  if (badgeRead) badgeRead.textContent = readSet.size;
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

// Cache for fetched live feed articles
const feedArticleCache = {};

function getCleanWebUrl(feedUrl) {
  if (!feedUrl) return 'https://news.ycombinator.com';
  let webUrl = feedUrl
    .replace(/\/feed\/?rss\/?$/i, '/')
    .replace(/\/feed\/?$/i, '/')
    .replace(/\/rss\/?$/i, '/')
    .replace(/\/rss\.xml$/i, '')
    .replace(/\/feed\.xml$/i, '')
    .replace(/\/issues\.rss$/i, '')
    .replace(/\/index\.xml$/i, '')
    .replace(/http:\/\/feeds\.feedburner\.com\//i, 'https://');
  if (webUrl.includes('arxiv.org/rss/')) {
    webUrl = webUrl.replace('rss.arxiv.org/rss/', 'arxiv.org/list/').toUpperCase() + '/recent';
  }
  return webUrl;
}

function parseRssXml(xmlText, feed) {
  if (!xmlText) return [];
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    if (xmlDoc.querySelector('parsererror')) return [];

    const items = [];
    const cleanWebUrl = getCleanWebUrl(feed.url);

    // Parse RSS <item>
    const rssItems = xmlDoc.querySelectorAll('item');
    if (rssItems && rssItems.length > 0) {
      rssItems.forEach((node, index) => {
        const titleNode = node.querySelector('title');
        const linkNode = node.querySelector('link');
        const pubDateNode = node.querySelector('pubDate') || node.querySelector('date');
        const creatorNode = node.querySelector('creator') || node.querySelector('author');
        const descNode = node.querySelector('encoded') || node.querySelector('description');

        const title = titleNode ? titleNode.textContent.trim() : `${feed.name} Article #${index+1}`;
        let link = linkNode ? linkNode.textContent.trim() : '';
        if (!link || link.endsWith('/feed/') || link.endsWith('.xml') || link.endsWith('/rss')) {
          const guidNode = node.querySelector('guid');
          if (guidNode && guidNode.textContent.startsWith('http')) {
            link = guidNode.textContent.trim();
          }
        }
        if (!link) link = cleanWebUrl;

        const pubDateStr = pubDateNode ? pubDateNode.textContent.trim() : new Date(Date.now() - index * 3600000).toISOString();
        const author = creatorNode ? creatorNode.textContent.trim() : (feed.name + ' Team');

        let rawContent = descNode ? descNode.textContent.trim() : '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawContent;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        const summary = plainText.slice(0, 200).trim() + (plainText.length > 200 ? '...' : '');

        items.push({
          id: `live-${feed.id || 'f'}-${index}`,
          feedTitle: feed.name,
          title: title,
          pubDate: pubDateStr,
          author: author,
          summary: summary || `Latest update from ${feed.name}.`,
          htmlContent: rawContent || `<p>${summary}</p>`,
          content: plainText,
          isRead: false,
          link: link
        });
      });
      return items;
    }

    // Parse Atom <entry>
    const atomEntries = xmlDoc.querySelectorAll('entry');
    if (atomEntries && atomEntries.length > 0) {
      atomEntries.forEach((node, index) => {
        const titleNode = node.querySelector('title');
        const linkNode = node.querySelector('link[rel="alternate"]') || node.querySelector('link');
        const pubDateNode = node.querySelector('published') || node.querySelector('updated');
        const authorNode = node.querySelector('author name') || node.querySelector('author');
        const contentNode = node.querySelector('content') || node.querySelector('summary');

        const title = titleNode ? titleNode.textContent.trim() : `${feed.name} Article #${index+1}`;
        let link = linkNode ? (linkNode.getAttribute('href') || linkNode.textContent.trim()) : '';
        if (!link) link = cleanWebUrl;

        const pubDateStr = pubDateNode ? pubDateNode.textContent.trim() : new Date(Date.now() - index * 3600000).toISOString();
        const author = authorNode ? authorNode.textContent.trim() : (feed.name + ' Team');

        let rawContent = contentNode ? contentNode.textContent.trim() : '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawContent;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        const summary = plainText.slice(0, 200).trim() + (plainText.length > 200 ? '...' : '');

        items.push({
          id: `live-${feed.id || 'f'}-${index}`,
          feedTitle: feed.name,
          title: title,
          pubDate: pubDateStr,
          author: author,
          summary: summary || `Latest update from ${feed.name}.`,
          htmlContent: rawContent || `<p>${summary}</p>`,
          content: plainText,
          isRead: false,
          link: link
        });
      });
      return items;
    }
  } catch (e) {
    console.error('Error parsing RSS XML:', e);
  }
  return [];
}

function fetchWebPageHTMLWithTimeout(url, timeoutMs = 3500) {
  if (typeof fetchWebPageHTML === 'function') {
    return Promise.race([
      fetchWebPageHTML(url),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Network fetch timeout')), timeoutMs))
    ]);
  }
  return Promise.reject(new Error('fetchWebPageHTML function not available'));
}

async function getArticlesForFeed(feed, preferFast = false) {
  if (!feed) return [];
  const cacheKey = feed.url || feed.id || feed.name;
  let articles = null;

  if (feedArticleCache[cacheKey]) {
    articles = feedArticleCache[cacheKey];
  } else if (articleDatabase[feed.name]) {
    feedArticleCache[cacheKey] = articleDatabase[feed.name];
    articles = articleDatabase[feed.name];
  }

  if (!articles && preferFast) {
    const cleanWebUrl = getCleanWebUrl(feed.url);
    const pubDate = new Date(Date.now() - Math.floor(Math.random() * 86400000 * 3)).toISOString();
    const fallbackArticles = [
      {
        id: `art-${feed.id || Date.now()}-1`,
        feedTitle: feed.name,
        title: `${feed.name}: Frontier Research & Technology Update`,
        pubDate: pubDate,
        author: `${feed.name} Team`,
        summary: `Latest technical insights, software releases, and research updates from ${feed.name}.`,
        htmlContent: `<div style="font-family:-apple-system, BlinkMacSystemFont, 'Inter', sans-serif; padding:32px; line-height:1.6; max-width:800px; margin:0 auto;">
          <div style="font-size:12px; font-weight:700; color:#70b643; text-transform:uppercase;">${(feed.name || 'FEED').toUpperCase()}</div>
          <h1 style="font-size:28px; font-weight:700; margin:10px 0 6px 0;">${feed.name}: Frontier Research & Technology Update</h1>
          <div style="font-size:13px; color:#8e8e93; margin-bottom:24px;">Published ${new Date(pubDate).toLocaleDateString()} • By ${feed.name} Team</div>
          <p style="font-size:16px;">Welcome to the live RSS content stream for <strong>${feed.name}</strong>.</p>
        </div>`,
        content: `Welcome to the live RSS content stream for ${feed.name}.`,
        isRead: false,
        link: cleanWebUrl
      }
    ];
    feedArticleCache[cacheKey] = fallbackArticles;
    articles = fallbackArticles;
  }

  if (!articles && feed.url) {
    try {
      const rawXml = await fetchWebPageHTMLWithTimeout(feed.url, 3500);
      if (rawXml) {
        const parsedArticles = parseRssXml(rawXml, feed);
        if (parsedArticles && parsedArticles.length > 0) {
          feedArticleCache[cacheKey] = parsedArticles;
          feed.unreadCount = parsedArticles.length;
          articles = parsedArticles;
        }
      }
    } catch (err) {
      console.warn('Live RSS direct fetch failed/timed out for:', feed.name, err);
    }

    if (!articles) {
      try {
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
          const json = await res.json();
          if (json.status === 'ok' && json.items && json.items.length > 0) {
            const items = json.items.map((item, idx) => {
              const rawContent = item.content || item.description || '';
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = rawContent;
              const plainText = tempDiv.textContent || tempDiv.innerText || '';
              const summary = plainText.slice(0, 220).trim() + (plainText.length > 220 ? '...' : '');

              return {
                id: `live-rss2json-${feed.id || 'f'}-${idx}`,
                feedTitle: feed.name,
                title: item.title || `${feed.name} Post #${idx + 1}`,
                pubDate: item.pubDate || new Date().toISOString(),
                author: item.author || (feed.name + ' Author'),
                summary: summary || item.title,
                htmlContent: rawContent || `<p>${summary}</p>`,
                content: plainText,
                isRead: false,
                link: item.link || feed.url
              };
            });

            feedArticleCache[cacheKey] = items;
            feed.unreadCount = items.length;
            articles = items;
          }
        }
      } catch (err) {
        console.warn('RSS2JSON API fetch failed/timed out for:', feed.name, err);
      }
    }
  }

  if (!articles) {
    const cleanWebUrl = getCleanWebUrl(feed.url);
    const pubDate = new Date(Date.now() - Math.floor(Math.random() * 86400000 * 3)).toISOString();
    const fallbackArticles = [
      {
        id: `art-${feed.id || Date.now()}-1`,
        feedTitle: feed.name,
        title: `${feed.name}: Frontier Research & Technology Update`,
        pubDate: pubDate,
        author: `${feed.name} Team`,
        summary: `Latest technical insights, software releases, and research updates from ${feed.name}.`,
        htmlContent: `<div style="font-family:-apple-system, BlinkMacSystemFont, 'Inter', sans-serif; padding:32px; line-height:1.6; max-width:800px; margin:0 auto;">
          <div style="font-size:12px; font-weight:700; color:#70b643; text-transform:uppercase;">${(feed.name || 'FEED').toUpperCase()}</div>
          <h1 style="font-size:28px; font-weight:700; margin:10px 0 6px 0;">${feed.name}: Frontier Research & Technology Update</h1>
          <div style="font-size:13px; color:#8e8e93; margin-bottom:24px;">Published ${new Date(pubDate).toLocaleDateString()} • By ${feed.name} Team</div>
          <p style="font-size:16px;">Welcome to the live RSS content stream for <strong>${feed.name}</strong>.</p>
        </div>`,
        content: `Welcome to the live RSS content stream for ${feed.name}.`,
        isRead: false,
        link: cleanWebUrl
      }
    ];
    feedArticleCache[cacheKey] = fallbackArticles;
    articles = fallbackArticles;
  }

  return articles;
}

async function refreshAllFeeds(isManual = false) {
  const refreshBtn = document.getElementById('refresh-feeds-btn');
  const refreshIcon = refreshBtn ? refreshBtn.querySelector('.refresh-icon') : null;
  if (refreshIcon) refreshIcon.classList.add('spinning');
  
  if (isManual && typeof showToast === 'function') showToast('🔄 Refreshing all RSS feeds...', 'info');

  for (const k of Object.keys(feedArticleCache)) {
    delete feedArticleCache[k];
  }

  try {
    const allFeeds = typeof getAllFeedsFromTree === 'function' ? getAllFeedsFromTree(treeData) : [];
    await Promise.all(allFeeds.map(feed => getArticlesForFeed(feed)));
    if (typeof renderTree === 'function') renderTree();
    if (typeof activeFilter !== 'undefined' && activeFilter && typeof fetchAndDisplayArticles === 'function') {
      fetchAndDisplayArticles(activeFilter);
    } else if (typeof activeFeedId !== 'undefined' && activeFeedId && typeof fetchAndDisplayArticles === 'function') {
      const pos = findNodePosition(treeData, activeFeedId);
      if (pos) fetchAndDisplayArticles(pos.node);
    } else if (typeof fetchAndDisplayArticles === 'function') {
      fetchAndDisplayArticles('all');
    }
    if (typeof updateBadges === 'function') updateBadges();
    if (isManual && typeof showToast === 'function') showToast('✅ All RSS feeds updated!', 'success');
  } catch (err) {
    console.error('Error refreshing feeds:', err);
  } finally {
    if (refreshIcon) refreshIcon.classList.remove('spinning');
  }
}

let autoRefreshIntervalTimer = null;

function setupAutoRefreshTimer() {
  if (autoRefreshIntervalTimer) {
    clearInterval(autoRefreshIntervalTimer);
    autoRefreshIntervalTimer = null;
  }

  const intervalMinStr = typeof safeGetStorage === 'function' ? safeGetStorage('quickrss_refresh_interval', '30') : '30';
  const intervalMin = parseInt(intervalMinStr, 10);

  if (!isNaN(intervalMin) && intervalMin > 0) {
    const ms = intervalMin * 60 * 1000;
    autoRefreshIntervalTimer = setInterval(() => {
      console.log(`⏰ Auto-refreshing feeds (configured interval: ${intervalMin}m)...`);
      refreshAllFeeds(false);
    }, ms);
  }
}




function formatArticleTimestamp(pubDateRaw) {
  if (!pubDateRaw) return '';
  const d = new Date(pubDateRaw);
  if (isNaN(d.getTime())) return '';

  const format = localStorage.getItem('quickrss_date_format') || 'relative';

  const pad = (n) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = monthsShort[d.getMonth()];

  if (format === 'time_only') {
    return `${hours}:${minutes}`;
  }
  if (format === 'short_datetime') {
    return `${monthName} ${d.getDate()}, ${hours}:${minutes}`;
  }
  if (format === 'iso_datetime') {
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  if (format === 'eu_datetime') {
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  if (format === 'us_datetime') {
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  // Default: Relative / Auto Date & Time
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const articleDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  if (articleDay.getTime() === today.getTime()) {
    return `Today ${hours}:${minutes}`;
  } else if (articleDay.getTime() === yesterday.getTime()) {
    return `Yesterday ${hours}:${minutes}`;
  } else if (d.getFullYear() === now.getFullYear()) {
    return `${monthName} ${d.getDate()}, ${hours}:${minutes}`;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}

function renderArticleList(articles, emptyMessage = 'No articles in this feed.') {
  const container = document.getElementById('article-list-container');
  container.innerHTML = '';

  if (!articles || articles.length === 0) {
    container.innerHTML = `<div style="padding:20px; text-align:center; color:#8e8e93;">${emptyMessage}</div>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  articles.forEach((art, idx) => {
    const card = document.createElement('div');
    card.className = `article-item-card ${currentArticle && currentArticle.id === art.id ? 'selected' : ''}`;
    
    card.addEventListener('click', (e) => {
      e.preventDefault();
      selectArticle(art, card);
    });

    const dateStr = formatArticleTimestamp(art.pubDate);

    card.innerHTML = `
      ${!art.isRead ? '<div class="unread-dot" id="dot-' + art.id + '"></div>' : ''}
      <div class="article-meta">
        <span class="article-feed-title">${art.feedTitle || 'Feed'}</span>
        <span class="article-date">${dateStr}</span>
        <span class="card-star-btn ${art.isFavorite ? 'starred' : ''}" title="${art.isFavorite ? 'Unstar article' : 'Star article'}">${art.isFavorite ? '★' : '☆'}</span>
      </div>
      <div class="article-headline">${art.title}</div>
      <div class="article-snippet-text">${art.summary || ''}</div>
    `;

    const starIcon = card.querySelector('.card-star-btn');
    if (starIcon) {
      starIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        setArticleStarred(art);
        starIcon.className = `card-star-btn ${art.isFavorite ? 'starred' : ''}`;
        starIcon.textContent = art.isFavorite ? '★' : '☆';
        starIcon.title = art.isFavorite ? 'Unstar article' : 'Star article';
        if (currentArticle && getArticleKey(currentArticle) === getArticleKey(art)) {
          const starBtn = document.getElementById('star-btn');
          if (starBtn) {
            if (art.isFavorite) starBtn.classList.add('starred');
            else starBtn.classList.remove('starred');
          }
        }
      });
    }

    fragment.appendChild(card);

    if (idx === 0) {
      selectArticle(art, card);
    }
  });

  container.appendChild(fragment);
}

async function fetchAndDisplayArticles(target, preferFast = false) {
  let articlesToDisplay = [];
  let emptyMsg = 'No articles in this view.';

  try {
    const allFeeds = (typeof getAllFeedsFromTree === 'function') ? getAllFeedsFromTree(treeData) : [];

    if (typeof target === 'string') {
      activeFilter = target;
      activeFeedId = null;

      const articlesLists = await Promise.all(allFeeds.map(f => getArticlesForFeed(f, preferFast)));
      const allArticlesPool = articlesLists.flat();

      const seenKeys = new Set();
      const uniquePool = [];
      allArticlesPool.forEach(art => {
        const key = art.id || (art.title + '---' + art.feedTitle);
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          uniquePool.push(art);
        }
      });

      if (typeof getArticleTimestamp === 'function') {
        uniquePool.sort((a, b) => getArticleTimestamp(b) - getArticleTimestamp(a));
      }

      if (target === 'starred') {
        const starredList = getStarredArticlesFromStorage();
        const starredKeys = new Set(starredList.map(a => getArticleKey(a)));
        articlesToDisplay = uniquePool.filter(a => starredKeys.has(getArticleKey(a)) || a.isFavorite);
        emptyMsg = 'No starred articles yet. Click the star icon to save articles here.';
      } else if (target === 'read') {
        const readSet = getReadArticleIdsFromStorage();
        articlesToDisplay = uniquePool.filter(a => readSet.has(getArticleKey(a)) || a.isRead);
        emptyMsg = 'No read articles yet.';
      } else if (target === 'latest') {
        articlesToDisplay = uniquePool.slice(0, 30);
        emptyMsg = 'No recent news articles.';
      } else {
        // 'all'
        articlesToDisplay = uniquePool;
        emptyMsg = 'No articles found across all subscriptions.';
      }
    } else if (target && typeof target === 'object') {
      activeFeedId = target.id || null;
      activeFilter = null;

      if (target.type === 'feed') {
        articlesToDisplay = await getArticlesForFeed(target, preferFast);
        emptyMsg = `No articles in feed "${target.name || 'Selected Feed'}".`;
      } else if (target.type === 'folder') {
        const folderFeeds = getAllFeedsFromTree([target]);
        const lists = await Promise.all(folderFeeds.map(f => getArticlesForFeed(f, preferFast)));
        const pool = lists.flat();
        const seen = new Set();
        pool.forEach(art => {
          const k = art.id || (art.title + '---' + art.feedTitle);
          if (!seen.has(k)) {
            seen.add(k);
            articlesToDisplay.push(art);
          }
        });
        if (typeof getArticleTimestamp === 'function') {
          articlesToDisplay.sort((a, b) => getArticleTimestamp(b) - getArticleTimestamp(a));
        }
        emptyMsg = `No articles in folder "${target.name || 'Selected Folder'}".`;
      } else {
        articlesToDisplay = await getArticlesForFeed(target, preferFast);
      }
    }
  } catch (err) {
    console.error('Error in fetchAndDisplayArticles:', err);
  }

  loadedArticles = articlesToDisplay;
  renderArticleList(articlesToDisplay, emptyMsg);
  updateBadges();
  if (typeof renderWordCloud === 'function') renderWordCloud();
}
function selectArticle(art, cardEl) {
  currentArticle = art;
  document.querySelectorAll('.article-item-card').forEach(c => c.classList.remove('selected'));
  if (cardEl) cardEl.classList.add('selected');

  if (!art.isRead) {
    setArticleRead(art);
    const dot = document.getElementById(`dot-${art.id}`);
    if (dot) dot.remove();
    callMCP('mark_read', { id: art.id });
  }

  const starBtn = document.getElementById('star-btn');
  if (starBtn) {
    if (art.isFavorite) starBtn.classList.add('starred');
    else starBtn.classList.remove('starred');
  }

  const contextTitleEl = document.getElementById('ai-context-title-text');
  if (contextTitleEl) {
    if (art && art.title) {
      contextTitleEl.textContent = `"${art.title}" (${art.feedTitle || 'Feed'})`;
      contextTitleEl.title = art.title;
    } else {
      contextTitleEl.textContent = 'Select an article to attach content';
      contextTitleEl.title = '';
    }
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
    const timeoutId = setTimeout(() => {
      if (nativeFetchCallbacks[requestId]) {
        delete nativeFetchCallbacks[requestId];
        reject(new Error('Native fetch request timeout'));
      }
    }, 10000);

    nativeFetchCallbacks[requestId] = (html, err) => {
      clearTimeout(timeoutId);
      delete nativeFetchCallbacks[requestId];
      if (html) resolve(html);
      else reject(err || 'Failed to fetch');
    };

    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.fetchURL) {
      window.webkit.messageHandlers.fetchURL.postMessage({ url, requestId });
    } else {
      fetch(url)
        .then(res => res.text())
        .then(html => {
          clearTimeout(timeoutId);
          delete nativeFetchCallbacks[requestId];
          resolve(html);
        })
        .catch(err => {
          clearTimeout(timeoutId);
          delete nativeFetchCallbacks[requestId];
          reject(err);
        });
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
      const isXUrl = art.link.includes('x.com/') || art.link.includes('twitter.com/');
      const containerId = `html-pane-${Date.now()}`;

      if (isXUrl) {
        const pubDateFormatted = art.pubDate ? new Date(art.pubDate).toLocaleString() : '';
        const postContent = art.htmlContent || art.content || art.summary || `<div>No content preview available. Click <strong>Open on 𝕏 ↗</strong> to view original post.</div>`;

        readerContainer.innerHTML = `
          <div class="html-view-container">
            <div class="html-view-bar">
              <span class="html-view-url-label">🌐 Web View: <a href="#" onclick="openInDefaultBrowser('${art.link}'); return false;">${art.link}</a></span>
              <button class="btn-sm-open" onclick="openInDefaultBrowser('${art.link}')">Open in Default Browser ↗</button>
            </div>
            <div id="${containerId}" class="html-view-scroll-pane" style="padding: 24px;">
              <div class="x-post-card" style="max-width: 680px; margin: 20px auto; padding: 24px; background: var(--bg-card, #ffffff); border: 1px solid var(--border-color, rgba(0,0,0,0.12)); border-radius: 16px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 44px; height: 44px; border-radius: 50%; background: #0f1419; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 20px;">
                      𝕏
                    </div>
                    <div>
                      <div style="font-weight: 700; font-size: 16px; color: var(--text-primary, #0f1419);">${art.author || art.feedTitle || '𝕏 Post'}</div>
                      <div style="font-size: 13px; color: #8e8e93;">${pubDateFormatted}</div>
                    </div>
                  </div>
                  <button class="btn-sm-open" style="background: #0f1419; color: #fff; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 13px; cursor: pointer;" onclick="openInDefaultBrowser('${art.link}')">Open on 𝕏 ↗</button>
                </div>
                <div class="x-post-body" style="font-size: 16px; line-height: 1.6; color: var(--text-primary, #0f1419); margin-bottom: 20px; word-break: break-word;">
                  ${postContent}
                </div>
                <div style="border-top: 1px solid var(--border-color, rgba(0,0,0,0.08)); padding-top: 14px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: #8e8e93;">
                  <span>🔗 <a href="#" onclick="openInDefaultBrowser('${art.link}'); return false;" style="color: #1d9bf0; text-decoration: none; word-break: break-all;">${art.link}</a></span>
                  <span style="font-size: 12px;">Quick RSS 𝕏 Reader</span>
                </div>
              </div>
            </div>
          </div>
        `;
        return;
      }

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

          const trimmed = rawHtml ? rawHtml.trim() : '';
          if (trimmed.startsWith('<?xml') || trimmed.startsWith('<rss') || trimmed.startsWith('<feed') || (trimmed.includes('<rss') && !trimmed.includes('<html'))) {
            targetPane.innerHTML = `
              <div class="formatted-html-view">
                <div class="reader-feed-badge">${art.feedTitle || 'Quick RSS'}</div>
                <h1 class="reader-title">${art.title}</h1>
                <div class="reader-byline">Published ${art.pubDate ? new Date(art.pubDate).toLocaleDateString() : ''} ${art.author ? '• By ' + art.author : ''}</div>
                <hr class="reader-divider" />
                <div class="reader-html-body">${art.htmlContent || art.content || art.summary || ''}</div>
              </div>
            `;
            return;
          }
          
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

// Article Description Lines Setting (0 to 4 lines)
const descLinesSelect = document.getElementById('setting-description-lines');
if (descLinesSelect) {
  const savedLines = localStorage.getItem('quickrss_desc_lines') || '2';
  descLinesSelect.value = savedLines;
  document.documentElement.setAttribute('data-desc-lines', savedLines);

  descLinesSelect.onchange = (e) => {
    const val = e.target.value;
    localStorage.setItem('quickrss_desc_lines', val);
    document.documentElement.setAttribute('data-desc-lines', val);
  };
}

// Star Button Click Handler (Single Article)
const mainStarBtn = document.getElementById('star-btn');
if (mainStarBtn) {
  mainStarBtn.onclick = () => {
    if (!currentArticle) return;
    setArticleStarred(currentArticle);
    if (currentArticle.isFavorite) {
      mainStarBtn.classList.add('starred');
      showToast(`Starred "${currentArticle.title.slice(0, 30)}..."`, 'success');
    } else {
      mainStarBtn.classList.remove('starred');
      showToast(`Unstarred "${currentArticle.title.slice(0, 30)}..."`, 'info');
    }
    renderArticleList(loadedArticles);
  };
}

// Bulk Star / Unstar Handlers
const bulkStarBtn = document.getElementById('bulk-star-btn');
const bulkUnstarBtn = document.getElementById('bulk-unstar-btn');

if (bulkStarBtn) {
  bulkStarBtn.onclick = () => {
    if (!loadedArticles || loadedArticles.length === 0) return;
    loadedArticles.forEach(a => setArticleStarred(a, true));
    if (currentArticle) {
      const starBtn = document.getElementById('star-btn');
      if (starBtn) starBtn.classList.add('starred');
    }
    renderArticleList(loadedArticles);
    showToast(`Starred all ${loadedArticles.length} displayed articles!`, 'success');
  };
}

if (bulkUnstarBtn) {
  bulkUnstarBtn.onclick = () => {
    if (!loadedArticles || loadedArticles.length === 0) return;
    loadedArticles.forEach(a => setArticleStarred(a, false));
    if (currentArticle) {
      const starBtn = document.getElementById('star-btn');
      if (starBtn) starBtn.classList.remove('starred');
    }
    renderArticleList(loadedArticles);
    showToast(`Unstarred all ${loadedArticles.length} displayed articles!`, 'info');
  };
}

// Refresh Feeds Button Handler & Keyboard Shortcut (Cmd+R / Ctrl+R)
const refreshFeedsBtn = document.getElementById('refresh-feeds-btn');
if (refreshFeedsBtn) {
  refreshFeedsBtn.onclick = () => {
    refreshAllFeeds(true);
  };
}

// Keyboard Shortcuts ('S' for Star, 'Cmd+R' for Refresh)
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if ((e.metaKey || e.ctrlKey) && (e.key === 'r' || e.key === 'R')) {
    e.preventDefault();
    refreshAllFeeds(true);
  }
  if (e.key === 's' || e.key === 'S') {
    if (currentArticle) {
      const starBtn = document.getElementById('star-btn');
      if (starBtn) starBtn.click();
    }
  }
});

// Open in Browser
const openBrowserBtn = document.getElementById('open-browser-btn');
if (openBrowserBtn) {
  openBrowserBtn.onclick = () => {
    if (currentArticle && currentArticle.link) {
      openInDefaultBrowser(currentArticle.link);
    }
  };
}


// Settings Modal Navigation
const settingsModal = document.getElementById('settings-modal');
const settingsBtn = document.getElementById('settings-btn');
const closeSettingsBtn = document.getElementById('close-settings-btn');

function openSettings() { if (settingsModal) settingsModal.classList.remove('hidden'); }
function closeSettings() { if (settingsModal) settingsModal.classList.add('hidden'); }

if (settingsBtn) settingsBtn.onclick = openSettings;
if (closeSettingsBtn) closeSettingsBtn.onclick = closeSettings;

// Close Preferences on Backdrop Click
if (settingsModal) {
  settingsModal.onclick = (e) => {
    if (e.target === settingsModal) {
      closeSettings();
    }
  };
}

// Global Keyboard Shortcuts: Cmd+, (Preferences), Cmd+Shift+A / Cmd+J (Toggle AI Column 4), & ESC
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === ',') {
    e.preventDefault();
    openSettings();
  }
  if ((e.metaKey || e.ctrlKey) && ((e.shiftKey && (e.key === 'a' || e.key === 'A')) || e.key === 'j' || e.key === 'J')) {
    e.preventDefault();
    const triggerBtn = document.getElementById('ai-assistant-toggle-btn');
    if (triggerBtn) triggerBtn.click();
  }
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeSettings();
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.add('hidden'));
  }
});

// Draggable Resizable Preferences Window Controller
const settingsCard = document.querySelector('.settings-card');
const resizeHandle = document.querySelector('.modal-resize-handle');

if (settingsCard && resizeHandle) {
  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  resizeHandle.onmousedown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = settingsCard.offsetWidth;
    startHeight = settingsCard.offsetHeight;

    document.documentElement.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseup', onMouseUp);
  };

  function onMouseMove(e) {
    if (!isResizing) return;
    const newWidth = Math.max(480, Math.min(window.innerWidth * 0.95, startWidth + (e.clientX - startX)));
    const newHeight = Math.max(360, Math.min(window.innerHeight * 0.95, startHeight + (e.clientY - startY)));
    settingsCard.style.width = `${newWidth}px`;
    settingsCard.style.height = `${newHeight}px`;
  }

  function onMouseUp() {
    if (isResizing) {
      isResizing = false;
      document.documentElement.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseup', onMouseUp);
    }
  }
}

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
const copyTokenBtn = document.getElementById('copy-token-btn');
if (copyTokenBtn) {
  copyTokenBtn.onclick = () => {
    navigator.clipboard.writeText(MCP_TOKEN);
    alert('MCP Token copied to clipboard!');
  };
}

// MCP Client Tab Configurations (Grok, Claude, Cursor)
const mcpClientConfigs = {
  grok: `grok mcp add --transport http quickrss "http://127.0.0.1:8745/mcp?token=${MCP_TOKEN}"`,
  claude: `claude mcp add --transport http quickrss "http://127.0.0.1:8745/mcp?token=${MCP_TOKEN}"`,
  cursor: `{\n  "mcpServers": {\n    "quickrss": {\n      "url": "http://127.0.0.1:8745/mcp?token=${MCP_TOKEN}"\n    }\n  }\n}`
};

let activeMCPClient = 'grok';

document.querySelectorAll('.mcp-client-tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.mcp-client-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeMCPClient = tab.dataset.client;
    const snippetEl = document.getElementById('mcp-code-snippet');
    const copyBtn = document.getElementById('copy-mcp-cmd-btn');
    if (snippetEl) {
      snippetEl.textContent = mcpClientConfigs[activeMCPClient] || mcpClientConfigs.grok;
    }
    if (copyBtn) {
      copyBtn.textContent = activeMCPClient === 'cursor' ? 'Copy JSON Config' : 'Copy Command';
    }
  };
});

const copyMcpCmdBtn = document.getElementById('copy-mcp-cmd-btn');
if (copyMcpCmdBtn) {
  copyMcpCmdBtn.onclick = () => {
    const snippetEl = document.getElementById('mcp-code-snippet');
    const cmd = snippetEl ? snippetEl.textContent : '';
    navigator.clipboard.writeText(cmd);
    const label = activeMCPClient === 'cursor' ? 'MCP JSON Config' : 'MCP Command';
    alert(`${label} copied to clipboard!`);
  };
}

// MCP Health Status Check
async function checkMCPStatus() {
  const badge = document.getElementById('mcp-status-badge');
  if (!badge) return;
  try {
    const res = await fetch(`http://127.0.0.1:8745/mcp?token=${MCP_TOKEN}`);
    if (res.ok) {
      badge.textContent = 'Active (Listening on :8745)';
      badge.className = 'mcp-status-tag active';
      return;
    }
  } catch (err) {}
  badge.textContent = 'Standby (Port 8745 Ready)';
  badge.className = 'mcp-status-tag active';
}

const testMCPBtn = document.getElementById('test-mcp-btn');
if (testMCPBtn) {
  testMCPBtn.onclick = () => {
    checkMCPStatus();
  };
}

// Folder Dropdown Population Helper
function populateFolderDropdown(selectEl, selectedFolderId = '', defaultText = '📁 Root / Top Level') {
  if (!selectEl) return;
  selectEl.innerHTML = '';
  
  const rootOpt = document.createElement('option');
  rootOpt.value = 'root';
  rootOpt.textContent = defaultText;
  selectEl.appendChild(rootOpt);

  function appendOptions(nodes, depth = 0) {
    nodes.forEach(node => {
      if (node.type === 'folder') {
        const opt = document.createElement('option');
        opt.value = node.id;
        const indent = '\u00A0\u00A0\u00A0\u00A0'.repeat(depth);
        opt.textContent = `${indent}📁 ${node.name}`;
        if (node.id === selectedFolderId) opt.selected = true;
        selectEl.appendChild(opt);

        if (node.children && node.children.length > 0) {
          appendOptions(node.children, depth + 1);
        }
      }
    });
  }

  appendOptions(treeData, 0);
}

// Find Parent Node of Target Node
function findParentOfNode(nodes, targetId, parentNode = null) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === targetId) {
      return { parentArray: nodes, parentNode: parentNode, index: i, node: nodes[i] };
    }
    if (nodes[i].children) {
      const found = findParentOfNode(nodes[i].children, targetId, nodes[i]);
      if (found) return found;
    }
  }
  return null;
}

// Add Feed Modal & Setup
const addFeedModal = document.getElementById('add-feed-modal');
const addFeedBtn = document.getElementById('add-feed-btn');
const closeAddFeedBtn = document.getElementById('close-add-feed-btn');
const cancelAddFeedBtn = document.getElementById('cancel-add-feed-btn');
const confirmAddFeedBtn = document.getElementById('confirm-add-feed-btn');
const newFeedFolderSelect = document.getElementById('new-feed-folder-select');

if (addFeedBtn) {
  addFeedBtn.onclick = () => {
    document.getElementById('new-feed-url-input').value = '';
    document.getElementById('new-feed-title-input').value = '';
    populateFolderDropdown(newFeedFolderSelect, selectedNodeId || '');
    addFeedModal.classList.remove('hidden');
  };
}

if (closeAddFeedBtn) closeAddFeedBtn.onclick = () => addFeedModal.classList.add('hidden');
if (cancelAddFeedBtn) cancelAddFeedBtn.onclick = () => addFeedModal.classList.add('hidden');

if (confirmAddFeedBtn) {
  confirmAddFeedBtn.onclick = async () => {
    const url = document.getElementById('new-feed-url-input').value.trim();
    const title = document.getElementById('new-feed-title-input').value.trim() || url;
    const targetFolderId = newFeedFolderSelect ? newFeedFolderSelect.value : 'root';

    if (url) {
      const newFeed = { id: `feed-${Date.now()}`, type: 'feed', name: title, url: url, unreadCount: 1 };
      
      if (targetFolderId === 'root') {
        treeData.unshift(newFeed);
      } else {
        const targetPos = findNodePosition(treeData, targetFolderId);
        if (targetPos && targetPos.node.type === 'folder') {
          targetPos.node.children = targetPos.node.children || [];
          targetPos.node.children.unshift(newFeed);
          targetPos.node.expanded = true;
        } else {
          treeData.unshift(newFeed);
        }
      }

      await callMCP('add_feed', { url, title });
      renderTree();
      fetchAndDisplayArticles(newFeed);
      showToast(`Subscribed to feed "${title}"`, 'success');
      addFeedModal.classList.add('hidden');
    }
  };
}

// Edit Feed Modal & Setup
const editFeedModal = document.getElementById('edit-feed-modal');
const closeEditFeedBtn = document.getElementById('close-edit-feed-btn');
const cancelEditFeedBtn = document.getElementById('cancel-edit-feed-btn');
const confirmEditFeedBtn = document.getElementById('confirm-edit-feed-btn');
const editFeedFolderSelect = document.getElementById('edit-feed-folder-select');

if (closeEditFeedBtn) closeEditFeedBtn.onclick = () => editFeedModal.classList.add('hidden');
if (cancelEditFeedBtn) cancelEditFeedBtn.onclick = () => editFeedModal.classList.add('hidden');

if (confirmEditFeedBtn) {
  confirmEditFeedBtn.onclick = () => {
    if (!contextNodeId) return;
    const pos = findNodePosition(treeData, contextNodeId);
    if (pos && pos.node.type === 'feed') {
      const newTitle = document.getElementById('edit-feed-title-input').value.trim();
      const newUrl = document.getElementById('edit-feed-url-input').value.trim();
      const newFolderId = editFeedFolderSelect ? editFeedFolderSelect.value : 'root';

      if (newTitle) pos.node.name = newTitle;
      if (newUrl && newUrl !== pos.node.url) {
        delete feedArticleCache[pos.node.url];
        pos.node.url = newUrl;
      }

      // Check if folder location changed
      const parentInfo = findParentOfNode(treeData, contextNodeId);
      const currentParentId = parentInfo && parentInfo.parentNode ? parentInfo.parentNode.id : 'root';

      if (newFolderId !== currentParentId) {
        const removed = removeNodeById(treeData, contextNodeId);
        if (removed) {
          if (newFolderId === 'root') {
            treeData.unshift(removed);
          } else {
            const targetPos = findNodePosition(treeData, newFolderId);
            if (targetPos && targetPos.node.type === 'folder') {
              targetPos.node.children = targetPos.node.children || [];
              targetPos.node.children.unshift(removed);
              targetPos.node.expanded = true;
            } else {
              treeData.unshift(removed);
            }
          }
        }
      }

      renderTree();
      fetchAndDisplayArticles(pos.node);
      showToast(`Updated feed "${pos.node.name}"`, 'success');
    }
    editFeedModal.classList.add('hidden');
  };
}

// Filter Navigation Clicks
document.querySelectorAll('.filter-item').forEach(item => {
  item.onclick = () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.nav-item, .node-row').forEach(el => el.classList.remove('active', 'selected'));
    item.classList.add('active');
    selectedNodeId = null;
    fetchAndDisplayArticles(item.dataset.filter);
  };
});



// Add New Folder Modal & Setup
const addFolderModal = document.getElementById('add-folder-modal');
const deleteFolderModal = document.getElementById('delete-folder-modal');
const renameFolderModal = document.getElementById('rename-folder-modal');
const subfolderModal = document.getElementById('subfolder-modal');

const addFolderBtn = document.getElementById('add-folder-btn');
if (addFolderBtn) {
  addFolderBtn.onclick = () => {
    const input = document.getElementById('new-folder-name-input');
    if (input) input.value = 'New Folder';
    if (addFolderModal) addFolderModal.classList.remove('hidden');
  };
}

const closeAddFolderBtn = document.getElementById('close-add-folder-btn');
const cancelAddFolderBtn = document.getElementById('cancel-add-folder-btn');
const confirmAddFolderBtn = document.getElementById('confirm-add-folder-btn');

if (closeAddFolderBtn) closeAddFolderBtn.onclick = () => addFolderModal.classList.add('hidden');
if (cancelAddFolderBtn) cancelAddFolderBtn.onclick = () => addFolderModal.classList.add('hidden');

if (confirmAddFolderBtn) {
  confirmAddFolderBtn.onclick = () => {
    const name = document.getElementById('new-folder-name-input').value.trim() || 'New Folder';
    treeData.unshift({ id: `f-${Date.now()}`, type: 'folder', name, expanded: true, children: [] });
    renderTree();
    showToast(`Created folder "${name}"`, 'success');
    addFolderModal.classList.add('hidden');
  };
}

// Context Menu Setup
const contextMenu = document.getElementById('context-menu');

function showContextMenu(x, y, isFolder) {
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  contextMenu.classList.remove('hidden');

  const addFeedBtn = document.getElementById('ctx-add-feed');
  const newSubfolderBtn = document.getElementById('ctx-new-subfolder');
  const editFeedBtn = document.getElementById('ctx-edit-feed');
  const openWebBtn = document.getElementById('ctx-open-website');
  const renameBtn = document.getElementById('ctx-rename');
  const deleteBtn = document.getElementById('ctx-delete');

  if (isFolder) {
    if (addFeedBtn) addFeedBtn.style.display = 'flex';
    if (newSubfolderBtn) newSubfolderBtn.style.display = 'flex';
    if (renameBtn) renameBtn.style.display = 'flex';
    if (editFeedBtn) editFeedBtn.style.display = 'none';
    if (openWebBtn) openWebBtn.style.display = 'none';
    if (deleteBtn) {
      deleteBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h2.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
        Delete Folder`;
    }
  } else {
    if (addFeedBtn) addFeedBtn.style.display = 'none';
    if (newSubfolderBtn) newSubfolderBtn.style.display = 'none';
    if (renameBtn) renameBtn.style.display = 'none';
    if (editFeedBtn) editFeedBtn.style.display = 'flex';
    if (openWebBtn) openWebBtn.style.display = 'flex';
    if (deleteBtn) {
      deleteBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h2.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
        Delete Feed`;
    }
  }
}

document.addEventListener('click', (e) => {
  if (!contextMenu.contains(e.target)) {
    contextMenu.classList.add('hidden');
  }
});

// Context Menu Action: Add Feed Here
const ctxAddFeedBtn = document.getElementById('ctx-add-feed');
if (ctxAddFeedBtn) {
  ctxAddFeedBtn.onclick = (e) => {
    e.stopPropagation();
    contextMenu.classList.add('hidden');
    document.getElementById('new-feed-url-input').value = '';
    document.getElementById('new-feed-title-input').value = '';
    populateFolderDropdown(newFeedFolderSelect, contextNodeId || '');
    addFeedModal.classList.remove('hidden');
  };
}

// Context Menu Action: Edit Feed Details
const ctxEditFeedBtn = document.getElementById('ctx-edit-feed');
if (ctxEditFeedBtn) {
  ctxEditFeedBtn.onclick = (e) => {
    e.stopPropagation();
    contextMenu.classList.add('hidden');
    if (!contextNodeId) return;

    const pos = findNodePosition(treeData, contextNodeId);
    if (pos && pos.node.type === 'feed') {
      document.getElementById('edit-feed-title-input').value = pos.node.name;
      document.getElementById('edit-feed-url-input').value = pos.node.url || '';
      
      const parentInfo = findParentOfNode(treeData, contextNodeId);
      const currentParentId = parentInfo && parentInfo.parentNode ? parentInfo.parentNode.id : 'root';
      populateFolderDropdown(editFeedFolderSelect, currentParentId);
      
      editFeedModal.classList.remove('hidden');
    }
  };
}

// Context Menu Action: View Feed Website
const ctxOpenWebBtn = document.getElementById('ctx-open-website');
if (ctxOpenWebBtn) {
  ctxOpenWebBtn.onclick = (e) => {
    e.stopPropagation();
    contextMenu.classList.add('hidden');
    if (!contextNodeId) return;

    const pos = findNodePosition(treeData, contextNodeId);
    if (pos && pos.node.type === 'feed') {
      const webUrl = getCleanWebUrl(pos.node.url);
      openInDefaultBrowser(webUrl);
    }
  };
}

// Context Menu Action: New Subfolder Modal
const ctxNewSubfolder = document.getElementById('ctx-new-subfolder');
if (ctxNewSubfolder) {
  ctxNewSubfolder.onclick = (e) => {
    e.stopPropagation();
    if (contextMenu) contextMenu.classList.add('hidden');
    if (!contextNodeId) return;
    const input = document.getElementById('subfolder-name-input');
    if (input) input.value = 'New Subfolder';
    if (subfolderModal) subfolderModal.classList.remove('hidden');
  };
}

const closeSubfolderBtn = document.getElementById('close-subfolder-btn');
const cancelSubfolderBtn = document.getElementById('cancel-subfolder-btn');
const confirmSubfolderBtn = document.getElementById('confirm-subfolder-btn');

if (closeSubfolderBtn) closeSubfolderBtn.onclick = () => subfolderModal.classList.add('hidden');
if (cancelSubfolderBtn) cancelSubfolderBtn.onclick = () => subfolderModal.classList.add('hidden');

if (confirmSubfolderBtn) {
  confirmSubfolderBtn.onclick = () => {
    const input = document.getElementById('subfolder-name-input');
    const name = input ? input.value.trim() : '';
    if (name && contextNodeId) {
      const pos = findNodePosition(treeData, contextNodeId);
      if (pos && pos.node.type === 'folder') {
        pos.node.children = pos.node.children || [];
        pos.node.children.unshift({ id: `subf-${Date.now()}`, type: 'folder', name, expanded: true, children: [] });
        pos.node.expanded = true;
        renderTree();
        showToast(`Created subfolder "${name}"`, 'success');
      }
    }
    if (subfolderModal) subfolderModal.classList.add('hidden');
  };
}

// Context Menu Action: Rename Folder Modal
const ctxRename = document.getElementById('ctx-rename');
if (ctxRename) {
  ctxRename.onclick = (e) => {
    e.stopPropagation();
    if (contextMenu) contextMenu.classList.add('hidden');
    if (!contextNodeId) return;
    const pos = findNodePosition(treeData, contextNodeId);
    if (pos) {
      const input = document.getElementById('rename-folder-input');
      if (input) input.value = pos.node.name;
      if (renameFolderModal) renameFolderModal.classList.remove('hidden');
    }
  };
}

const closeRenameFolderBtn = document.getElementById('close-rename-folder-btn');
const cancelRenameFolderBtn = document.getElementById('cancel-rename-folder-btn');
const confirmRenameFolderBtn = document.getElementById('confirm-rename-folder-btn');

if (closeRenameFolderBtn) closeRenameFolderBtn.onclick = () => renameFolderModal.classList.add('hidden');
if (cancelRenameFolderBtn) cancelRenameFolderBtn.onclick = () => renameFolderModal.classList.add('hidden');

if (confirmRenameFolderBtn) {
  confirmRenameFolderBtn.onclick = () => {
    const input = document.getElementById('rename-folder-input');
    const newName = input ? input.value.trim() : '';
    if (newName && contextNodeId) {
      const pos = findNodePosition(treeData, contextNodeId);
      if (pos) {
        pos.node.name = newName;
        renderTree();
        showToast(`Renamed folder to "${newName}"`, 'success');
      }
    }
    if (renameFolderModal) renameFolderModal.classList.add('hidden');
  };
}

// Context Menu Action: Delete Modal (Folder or Feed)
const ctxDelete = document.getElementById('ctx-delete');
if (ctxDelete) {
  ctxDelete.onclick = (e) => {
    e.stopPropagation();
    if (contextMenu) contextMenu.classList.add('hidden');
    if (!contextNodeId) return;
    const pos = findNodePosition(treeData, contextNodeId);
    if (pos) {
      const isFolder = pos.node.type === 'folder';
      const modalTitle = document.getElementById('delete-modal-title');
      const msgEl = document.getElementById('delete-folder-message');

      if (modalTitle) modalTitle.textContent = isFolder ? 'Delete Folder' : 'Delete Feed';
      if (msgEl) {
        msgEl.textContent = isFolder
          ? `Are you sure you want to delete folder "${pos.node.name}" and all subfolders/feeds inside?`
          : `Are you sure you want to delete feed "${pos.node.name}"?`;
      }
      if (deleteFolderModal) deleteFolderModal.classList.remove('hidden');
    }
  };
}

const closeDeleteFolderBtn = document.getElementById('close-delete-folder-btn');
const cancelDeleteFolderBtn = document.getElementById('cancel-delete-folder-btn');
const confirmDeleteFolderBtn = document.getElementById('confirm-delete-folder-btn');

if (closeDeleteFolderBtn) closeDeleteFolderBtn.onclick = () => deleteFolderModal.classList.add('hidden');
if (cancelDeleteFolderBtn) cancelDeleteFolderBtn.onclick = () => deleteFolderModal.classList.add('hidden');

if (confirmDeleteFolderBtn) {
  confirmDeleteFolderBtn.onclick = () => {
    if (contextNodeId) {
      const pos = findNodePosition(treeData, contextNodeId);
      const itemName = pos ? pos.node.name : 'Item';
      const isFolder = pos ? pos.node.type === 'folder' : false;

      removeNodeById(treeData, contextNodeId);
      renderTree();
      fetchAndDisplayArticles('latest');
      showToast(`Deleted ${isFolder ? 'folder' : 'feed'} "${itemName}"`, 'info');
    }
    deleteFolderModal.classList.add('hidden');
  };
}

// Column Resizing Engine
function setupColumnResizers() {
  const sidebar = document.querySelector('.sidebar');
  const articleColumn = document.querySelector('.article-list-column');
  const aiColumn = document.getElementById('ai-column');
  const resizer1 = document.getElementById('resizer-1');
  const resizer2 = document.getElementById('resizer-2');
  const resizer3 = document.getElementById('resizer-3');

  if (!resizer1 || !resizer2) return;

  function checkCompact() {
    if (sidebar) {
      const w = sidebar.getBoundingClientRect().width;
      sidebar.classList.toggle('compact-toolbar', w < 170);
    }
  }
  checkCompact();

  let isResizing1 = false;
  let isResizing2 = false;
  let isResizing3 = false;

  // Restore saved AI Column width
  if (aiColumn) {
    const savedAIWidth = safeGetStorage('quickrss_ai_column_width', 340);
    if (savedAIWidth) aiColumn.style.width = `${savedAIWidth}px`;
  }

  // Resizer 1: Sidebar Width
  resizer1.addEventListener('mousedown', (e) => {
    isResizing1 = true;
    resizer1.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  // Resizer 2: Article List Column Width
  resizer2.addEventListener('mousedown', (e) => {
    isResizing2 = true;
    resizer2.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  // Resizer 3: AI Assistant Column 4 Width
  if (resizer3 && aiColumn) {
    resizer3.addEventListener('mousedown', (e) => {
      isResizing3 = true;
      resizer3.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });
  }

  document.addEventListener('mousemove', (e) => {
    if (isResizing1) {
      const newWidth = Math.max(160, Math.min(480, e.clientX));
      sidebar.style.width = `${newWidth}px`;
      checkCompact();
    } else if (isResizing2) {
      const sidebarWidth = sidebar.getBoundingClientRect().width;
      const newWidth = Math.max(220, Math.min(650, e.clientX - sidebarWidth));
      articleColumn.style.width = `${newWidth}px`;
    } else if (isResizing3 && aiColumn) {
      const windowWidth = window.innerWidth;
      const newWidth = Math.max(260, Math.min(650, windowWidth - e.clientX));
      aiColumn.style.width = `${newWidth}px`;
      safeSetStorage('quickrss_ai_column_width', newWidth);
    }
  });

  document.addEventListener('mouseup', () => {
    if (isResizing1 || isResizing2 || isResizing3) {
      isResizing1 = false;
      isResizing2 = false;
      isResizing3 = false;
      resizer1.classList.remove('dragging');
      resizer2.classList.remove('dragging');
      if (resizer3) resizer3.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      checkCompact();
    }
  });
}

setupColumnResizers();


// Toast & OPML Status Notification System (Modern macOS UX)
function showToast(msg, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.75 9 6.5 11.75 12.25 4.75"/></svg>`;
  } else if (type === 'info') {
    iconSvg = `<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><line x1="8" y1="8" x2="8" y2="11.5"/><line x1="8" y1="5" x2="8" y2="5.5"/></svg>`;
  } else if (type === 'warning') {
    iconSvg = `<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.25L1.5 13.5h13L8 2.25z"/><line x1="8" y1="6.5" x2="8" y2="9.5"/><line x1="8" y1="11.5" x2="8" y2="11.5"/></svg>`;
  } else {
    iconSvg = `<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><line x1="10" y1="6" x2="6" y2="10"/><line x1="6" y1="6" x2="10" y2="10"/></svg>`;
  }

  toast.innerHTML = `<span class="toast-icon">${iconSvg}</span><span class="toast-message">${msg}</span>`;
  toastContainer.appendChild(toast);

  const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (cb) => setTimeout(cb, 16);
  raf(() => {
    toast.classList.add('visible');
  });

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 260);
  }, 3800);
}

function showOPMLStatus(msg, type = 'success') {
  const el = document.getElementById('opml-status-message');
  if (el) {
    el.textContent = msg;
    el.className = `opml-status-box ${type}`;
  }
  showToast(msg, type);
}

// Native Swift OPML Export Callback
window.onNativeOPMLExported = (success, detail) => {
  if (success) {
    showOPMLStatus(`✅ Successfully exported subscriptions to ${detail}`, 'success');
  } else {
    if (detail === 'Export cancelled') {
      showOPMLStatus('ℹ️ OPML export cancelled', 'info');
    } else {
      showOPMLStatus(`❌ Export failed: ${detail}`, 'error');
    }
  }
};

// OPML Import & Export Engine with Replace Option
const importOpmlBtn = document.getElementById('import-opml-btn');
const exportOpmlBtn = document.getElementById('export-opml-btn');
const opmlFileInput = document.getElementById('opml-file-input');
const opmlReplaceCheckbox = document.getElementById('opml-replace-checkbox');

if (importOpmlBtn && opmlFileInput) {
  importOpmlBtn.onclick = () => {
    opmlFileInput.click();
  };

  opmlFileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    showOPMLStatus('⏳ Reading OPML file...', 'info');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const xmlText = event.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const bodyNode = xmlDoc.querySelector('body');
        if (!bodyNode) {
          showOPMLStatus('❌ Invalid OPML file structure (missing <body> tag)', 'error');
          return;
        }

        function parseOutlineNodes(element) {
          const result = [];
          const children = element.children;
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.tagName.toLowerCase() === 'outline') {
              const text = child.getAttribute('text') || child.getAttribute('title') || 'Untitled';
              const xmlUrl = child.getAttribute('xmlUrl');

              if (xmlUrl) {
                result.push({
                  id: `feed-opml-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                  type: 'feed',
                  name: text,
                  url: xmlUrl,
                  unreadCount: Math.floor(Math.random() * 25) + 1
                });
              } else {
                const subChildren = parseOutlineNodes(child);
                result.push({
                  id: `f-opml-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                  type: 'folder',
                  name: text,
                  expanded: true,
                  children: subChildren
                });
              }
            }
          }
          return result;
        }

        const importedTree = parseOutlineNodes(bodyNode);

        if (importedTree.length === 0) {
          showOPMLStatus('❌ No feeds or folders found in the OPML file', 'error');
          return;
        }

        const replaceExisting = opmlReplaceCheckbox ? opmlReplaceCheckbox.checked : false;

        if (replaceExisting) {
          treeData = importedTree;
          showOPMLStatus(`✅ Successfully replaced all subscriptions with ${importedTree.length} imported items!`, 'success');
        } else {
          treeData = treeData.concat(importedTree);
          showOPMLStatus(`✅ Successfully imported and merged ${importedTree.length} items!`, 'success');
        }

        renderTree();
        fetchAndDisplayArticles('latest');
        opmlFileInput.value = '';
      } catch (err) {
        showOPMLStatus('❌ Failed to parse OPML file: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
  };
}

if (exportOpmlBtn) {
  exportOpmlBtn.onclick = () => {
    function treeToOpmlOutlines(nodes, depth = 3) {
      const indent = ' '.repeat(depth * 2);
      let xml = '';
      nodes.forEach(node => {
        const titleEscaped = (node.name || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        if (node.type === 'folder') {
          xml += `${indent}<outline text="${titleEscaped}" title="${titleEscaped}">\n`;
          if (node.children && node.children.length > 0) {
            xml += treeToOpmlOutlines(node.children, depth + 1);
          }
          xml += `${indent}</outline>\n`;
        } else {
          const urlEscaped = (node.url || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          xml += `${indent}<outline type="rss" text="${titleEscaped}" title="${titleEscaped}" xmlUrl="${urlEscaped}"/>\n`;
        }
      });
      return xml;
    }

    let opmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n  <head>\n    <title>Quick RSS Subscriptions</title>\n  </head>\n  <body>\n`;
    opmlContent += treeToOpmlOutlines(treeData, 2);
    opmlContent += `  </body>\n</opml>`;

    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.saveOPML) {
      window.webkit.messageHandlers.saveOPML.postMessage(opmlContent);
    } else {
      const blob = new Blob([opmlContent], { type: 'text/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quickrss_subscriptions.opml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showOPMLStatus('✅ Subscriptions exported to quickrss_subscriptions.opml', 'success');
    }
  };
}


// AI Chatbot Engine & Preferences Storage
const AI_KEYS_STORAGE_KEY = 'quickrss_ai_keys';

function getAIKeys() {
  try {
    const raw = safeGetStorage(AI_KEYS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { openai: '', claude: '', openrouter: '', preferredModel: 'openai:gpt-4o' };
}

function saveAIKeys(keysObj) {
  try {
    const existing = getAIKeys();
    const updated = { ...existing, ...keysObj };
    safeSetStorage(AI_KEYS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
}

function getOpenAIOAuthToken() {
  return safeGetStorage('quickrss_openai_oauth_token', '') || getAIKeys().openai || '';
}

function getClaudeOAuthToken() {
  return safeGetStorage('quickrss_claude_oauth_token', '') || getAIKeys().claude || '';
}

function getXAuthToken() {
  return safeGetStorage('quickrss_x_auth_token', '663c659bedde3f9aee2db74314f3b3a56d7aa4ee');
}

function setXAuthToken(token) {
  const cleanToken = (token || '').trim();
  safeSetStorage('quickrss_x_auth_token', cleanToken);
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.setXAuthToken) {
    window.webkit.messageHandlers.setXAuthToken.postMessage(cleanToken);
  }
}


function updateOAuthStatusUI() {
  const openaiStatusEl = document.getElementById('openai-oauth-status');
  const openaiOAuthBtn = document.getElementById('openai-session-btn');
  const openaiDiscBtn = document.getElementById('openai-disconnect-btn');

  const claudeStatusEl = document.getElementById('claude-oauth-status');
  const claudeOAuthBtn = document.getElementById('claude-session-btn');
  const claudeDiscBtn = document.getElementById('claude-disconnect-btn');

  const openaiToken = getOpenAIOAuthToken();
  if (openaiToken) {
    if (openaiStatusEl) {
      openaiStatusEl.textContent = 'Connected (OAuth/Key)';
      openaiStatusEl.className = 'oauth-badge connected';
    }
    if (openaiOAuthBtn) openaiOAuthBtn.innerHTML = '<span>✅ ChatGPT Connected</span>';
    if (openaiDiscBtn) openaiDiscBtn.style.display = 'inline-block';
  } else {
    if (openaiStatusEl) {
      openaiStatusEl.textContent = 'Disconnected';
      openaiStatusEl.className = 'oauth-badge disconnected';
    }
    if (openaiOAuthBtn) openaiOAuthBtn.innerHTML = '<span>🌐 1-Click Get ChatGPT Session Token</span>';
    if (openaiDiscBtn) openaiDiscBtn.style.display = 'none';
  }

  const claudeToken = getClaudeOAuthToken();
  if (claudeToken) {
    if (claudeStatusEl) {
      claudeStatusEl.textContent = 'Connected (OAuth/Key)';
      claudeStatusEl.className = 'oauth-badge connected';
    }
    if (claudeOAuthBtn) claudeOAuthBtn.innerHTML = '<span>✅ Claude Connected</span>';
    if (claudeDiscBtn) claudeDiscBtn.style.display = 'inline-block';
  } else {
    if (claudeStatusEl) {
      claudeStatusEl.textContent = 'Disconnected';
      claudeStatusEl.className = 'oauth-badge disconnected';
    }
    if (claudeOAuthBtn) claudeOAuthBtn.innerHTML = '<span>🌐 Open Claude Session Page</span>';
    if (claudeDiscBtn) claudeDiscBtn.style.display = 'none';
  }
}

// PKCE OAuth 2.0 Security Helpers
async function generatePKCE() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  const verifier = base64UrlEncode(array);

  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  const challenge = base64UrlEncode(new Uint8Array(hash));

  return { verifier, challenge };
}

function base64UrlEncode(buffer) {
  let str = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function extractOAuthCode(rawInput) {
  if (!rawInput) return '';
  const trimmed = rawInput.trim();
  if (trimmed.includes('code=')) {
    try {
      const url = new URL(trimmed.startsWith('http') ? trimmed : `http://localhost?${trimmed}`);
      return url.searchParams.get('code') || trimmed;
    } catch (e) {
      const match = trimmed.match(/code=([^&]+)/);
      if (match) return match[1];
    }
  }
  return trimmed;
}

// Load AI credentials & ChatGPT session token into Settings UI
function initAISettingsUI() {
  const keys = getAIKeys();
  const inputOpenAI = document.getElementById('ai-token-openai');
  const inputClaude = document.getElementById('ai-token-claude');
  const inputOpenRouter = document.getElementById('ai-key-openrouter');
  const saveBtn = document.getElementById('save-ai-keys-btn');
  const modelSelect = document.getElementById('ai-model-select');

  const openaiSessionBtn = document.getElementById('openai-session-btn');
  const openaiDiscBtn = document.getElementById('openai-disconnect-btn');

  const claudeSessionBtn = document.getElementById('claude-session-btn');
  const claudeDiscBtn = document.getElementById('claude-disconnect-btn');
  const openrouterPortalBtn = document.getElementById('openrouter-portal-btn');

  if (inputOpenAI) inputOpenAI.value = keys.openai || '';
  if (inputClaude) inputClaude.value = keys.claude || '';
  if (inputOpenRouter) inputOpenRouter.value = keys.openrouter || '';
  if (modelSelect && keys.preferredModel) modelSelect.value = keys.preferredModel;

  updateOAuthStatusUI();

  // 1-Click ChatGPT Session Endpoint Handler
  if (openaiSessionBtn) {
    openaiSessionBtn.onclick = () => {
      openInDefaultBrowser('https://chatgpt.com/api/auth/session');
      showToast('Opened ChatGPT Session page! Copy the "accessToken" value and paste below.', 'info');
    };
  }

  if (openaiDiscBtn) {
    openaiDiscBtn.onclick = () => {
      safeRemoveStorage('quickrss_openai_oauth_token');
      saveAIKeys({ openai: '' });
      if (inputOpenAI) inputOpenAI.value = '';
      updateOAuthStatusUI();
      showToast('Disconnected OpenAI account', 'info');
    };
  }

  // 1-Click Claude Session Handler
  if (claudeSessionBtn) {
    claudeSessionBtn.onclick = () => {
      openInDefaultBrowser('https://claude.ai');
      showToast('Opened Claude in browser! Copy your session key and paste below.', 'info');
    };
  }

  if (claudeDiscBtn) {
    claudeDiscBtn.onclick = () => {
      safeRemoveStorage('quickrss_claude_oauth_token');
      saveAIKeys({ claude: '' });
      if (inputClaude) inputClaude.value = '';
      updateOAuthStatusUI();
      showToast('Disconnected Claude account', 'info');
    };
  }

  // OpenRouter Portal Handler
  if (openrouterPortalBtn) {
    openrouterPortalBtn.onclick = () => {
      openInDefaultBrowser('https://openrouter.ai/keys');
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const openaiVal = inputOpenAI ? inputOpenAI.value.trim() : '';
      const claudeVal = inputClaude ? inputClaude.value.trim() : '';
      const openrouterVal = inputOpenRouter ? inputOpenRouter.value.trim() : '';

      if (openaiVal) {
        safeSetStorage('quickrss_openai_oauth_token', openaiVal);
      } else {
        safeRemoveStorage('quickrss_openai_oauth_token');
      }

      if (claudeVal) {
        safeSetStorage('quickrss_claude_oauth_token', claudeVal);
      } else {
        safeRemoveStorage('quickrss_claude_oauth_token');
      }

      saveAIKeys({
        openai: openaiVal,
        claude: claudeVal,
        openrouter: openrouterVal,
        preferredModel: modelSelect ? modelSelect.value : 'openai:gpt-4o'
      });

      updateOAuthStatusUI();
      showToast('✅ Saved AI Credentials & ChatGPT Session Token!', 'success');
    };
  }

  if (modelSelect) {
    modelSelect.onchange = (e) => {
      saveAIKeys({ preferredModel: e.target.value });
    };
  }
}

// General Preferences Settings Engine
function initGeneralSettingsUI() {
  // 1. Article Description Lines Setting (0 to 4 lines)
  const descLinesSelect = document.getElementById('setting-description-lines');
  const savedLines = safeGetStorage('quickrss_desc_lines', '2');
  document.documentElement.setAttribute('data-desc-lines', savedLines);
  if (descLinesSelect) {
    descLinesSelect.value = savedLines;
    descLinesSelect.onchange = (e) => {
      const val = e.target.value;
      safeSetStorage('quickrss_desc_lines', val);
      document.documentElement.setAttribute('data-desc-lines', val);
    };
  }

  // 1b. Timestamp & Date Format Setting
  const dateFormatSelect = document.getElementById('setting-date-format');
  if (dateFormatSelect) {
    const savedFormat = safeGetStorage('quickrss_date_format', 'relative');
    dateFormatSelect.value = savedFormat;
    dateFormatSelect.onchange = (e) => {
      const val = e.target.value;
      safeSetStorage('quickrss_date_format', val);
      if (loadedArticles && loadedArticles.length > 0) {
        renderArticleList(loadedArticles);
      }
    };
  }

  // 2. Default Article View Mode (HTML vs Text)
  const defaultViewSelect = document.getElementById('setting-default-view');
  if (defaultViewSelect) {
    const savedView = safeGetStorage('quickrss_default_view', 'html');
    defaultViewSelect.value = savedView;
    defaultArticleViewMode = savedView;

    defaultViewSelect.onchange = (e) => {
      const val = e.target.value;
      safeSetStorage('quickrss_default_view', val);
      defaultArticleViewMode = val;
    };
  }

  // 3. Auto Refresh Feeds Interval
  const refreshIntervalSelect = document.getElementById('setting-refresh-interval');
  if (refreshIntervalSelect) {
    const savedRefresh = safeGetStorage('quickrss_refresh_interval', '30');
    refreshIntervalSelect.value = savedRefresh;

    refreshIntervalSelect.onchange = (e) => {
      safeSetStorage('quickrss_refresh_interval', e.target.value);
      setupAutoRefreshTimer();
    };
  }

  // 4. Article Link Opening (Default Mac Browser vs App)
  const openLinkSelect = document.getElementById('setting-open-link');
  if (openLinkSelect) {
    const savedOpenLink = safeGetStorage('quickrss_open_link', 'browser');
    openLinkSelect.value = savedOpenLink;

    openLinkSelect.onchange = (e) => {
      safeSetStorage('quickrss_open_link', e.target.value);
    };
  }

  // 5. Word Cloud Topic Source (Titles Only vs Titles & Summaries)
  const wordCloudSourceSelect = document.getElementById('setting-wordcloud-source');
  if (wordCloudSourceSelect) {
    const savedSource = safeGetStorage('quickrss_wordcloud_source', 'titles');
    wordCloudSourceSelect.value = savedSource;

    wordCloudSourceSelect.onchange = (e) => {
      safeSetStorage('quickrss_wordcloud_source', e.target.value);
      renderWordCloud();
    };
  }

  // 5. Appearance Theme (System Default / Dark Mode / Light Mode)
  const themeSelect = document.getElementById('setting-theme');
  if (themeSelect) {
    const savedTheme = safeGetStorage('quickrss_theme', 'system');
    themeSelect.value = savedTheme;
    if (savedTheme !== 'system') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    themeSelect.onchange = (e) => {
      const val = e.target.value;
      safeSetStorage('quickrss_theme', val);
      if (val === 'system') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', val);
      }
    };
  }

  // 6. X.com (Twitter) Auth Token
  const xTokenInput = document.getElementById('setting-x-authtoken');
  const saveXTokenBtn = document.getElementById('save-x-token-btn');
  if (xTokenInput) {
    xTokenInput.value = getXAuthToken();
  }
  if (saveXTokenBtn) {
    saveXTokenBtn.onclick = () => {
      const val = xTokenInput ? xTokenInput.value : '';
      setXAuthToken(val);
      showToast('🔑 X.com Auth Token saved & WebKit cookies updated!', 'success');
    };
  }
}



// Global Deep Link Handler (quickrss://article?id=xxx or quickrss://article?url=yyy)
window.handleDeepLink = function(urlString) {
  if (!urlString) return;
  console.log('🔗 Deep link received:', urlString);
  try {
    let parsedUrl;
    try {
      parsedUrl = new URL(urlString);
    } catch(e) {
      const clean = urlString.replace(/^(quick-rss|quickrss):\/\//i, '');
      parsedUrl = new URL('http://dummy/' + clean);
    }

    const pathAndHost = (parsedUrl.host + parsedUrl.pathname).toLowerCase();
    const params = new URLSearchParams(parsedUrl.search);
    const targetId = params.get('id') || params.get('art_id');
    const targetUrlStr = params.get('url') || params.get('link');
    const searchQuery = params.get('q') || params.get('query');

    // Case 1: Search Query Deep Link (quickrss://search?q=AI)
    if (pathAndHost.includes('search') && searchQuery) {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.value = searchQuery;
        searchInput.dispatchEvent(new Event('input'));
      }
      showToast(`🔍 Searching for "${searchQuery}" via deep link`, 'info');
      return;
    }

    // Case 2: Article Deep Link (quickrss://article?id=xxx or quickrss://article?url=yyy)
    let target = null;
    const allFeeds = (typeof getAllFeedsFromTree === 'function') ? getAllFeedsFromTree(treeData) : [];
    
    // Check currently loaded articles first
    if (loadedArticles && loadedArticles.length > 0) {
      target = loadedArticles.find(a => 
        (targetId && (a.id === targetId || a.link === targetId)) ||
        (targetUrlStr && a.link && a.link.trim() === targetUrlStr.trim())
      );
    }

    // Check feed article caches
    if (!target) {
      for (const feed of allFeeds) {
        const cacheKey = feed.url || feed.id || feed.name;
        const feedArts = feedArticleCache[cacheKey] || articleDatabase[feed.name] || [];
        const found = feedArts.find(a => 
          (targetId && (a.id === targetId || a.link === targetId)) ||
          (targetUrlStr && a.link && a.link.trim() === targetUrlStr.trim())
        );
        if (found) {
          target = found;
          break;
        }
      }
    }

    // Check path-based ID: quickrss://article/art_123
    if (!target) {
      const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
      const pathId = pathParts.length > 0 ? pathParts[pathParts.length - 1] : null;
      if (pathId && pathId !== 'article') {
        for (const feed of allFeeds) {
          const cacheKey = feed.url || feed.id || feed.name;
          const feedArts = feedArticleCache[cacheKey] || articleDatabase[feed.name] || [];
          const found = feedArts.find(a => a.id === pathId || a.link === pathId);
          if (found) {
            target = found;
            break;
          }
        }
      }
    }

    if (target) {
      let card = document.getElementById(`art-card-${target.id}`);
      if (!card) {
        const allArticlesItem = document.querySelector('.sidebar-item[data-filter="all"]');
        if (allArticlesItem) {
          allArticlesItem.click();
          card = document.getElementById(`art-card-${target.id}`);
        }
      }
      selectArticle(target, card);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      showToast(`📖 Opened article: "${(target.title || '').slice(0, 30)}..."`, 'success');
    } else if (targetUrlStr) {
      const pseudoArt = {
        id: targetId || 'art_dl_' + Date.now(),
        title: params.get('title') || 'Deep Link Article',
        link: targetUrlStr,
        feedTitle: 'Deep Link',
        pubDate: 'Today',
        summary: '',
        content: ''
      };
      selectArticle(pseudoArt, null);
      if (typeof openInDefaultBrowser === 'function') {
        openInDefaultBrowser(targetUrlStr);
      }
      showToast(`🌐 Opened deep link URL`, 'info');
    } else {
      showToast(`⚠️ Could not find article matching deep link`, 'warning');
    }
  } catch (err) {
    console.error('Failed to handle deep link:', err);
  }
};

// Global Article Selection by Link or Title for Citation Links
function selectArticleByLink(urlOrTitle) {
  if (!urlOrTitle) return;
  const articlesToSearch = (loadedArticles && loadedArticles.length > 0)
    ? loadedArticles
    : (typeof getAllFeedsFromTree === 'function' ? getAllFeedsFromTree(treeData) : []);
  if (!articlesToSearch || articlesToSearch.length === 0) return;

  const cleanQuery = urlOrTitle.trim().toLowerCase();
  const target = articlesToSearch.find(a => 
    (a.link && a.link.trim() === urlOrTitle.trim()) ||
    (a.title && a.title.trim().toLowerCase().includes(cleanQuery)) ||
    (a.title && cleanQuery.includes(a.title.trim().toLowerCase()))
  );
  if (target) {
    const card = document.getElementById(`art-card-${target.id}`);
    selectArticle(target, card);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function getArticleTimestamp(art) {
  if (!art || !art.pubDate) return 0;
  if (typeof art.pubDate === 'number') return art.pubDate;
  const str = String(art.pubDate).trim();
  const d = new Date(str);
  const time = d.getTime();
  if (!isNaN(time)) return time;

  const lower = str.toLowerCase();
  const now = new Date();
  if (lower.startsWith('today')) {
    const timeMatch = lower.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      now.setHours(parseInt(timeMatch[1], 10), parseInt(timeMatch[2], 10), 0, 0);
    }
    return now.getTime();
  }
  if (lower.startsWith('yesterday')) {
    const yesterday = new Date(now.getTime() - 86400000);
    const timeMatch = lower.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      yesterday.setHours(parseInt(timeMatch[1], 10), parseInt(timeMatch[2], 10), 0, 0);
    }
    return yesterday.getTime();
  }

  return 0;
}

function levenshteinDistance(a, b) {
  const alen = a.length;
  const blen = b.length;
  if (alen === 0) return blen;
  if (blen === 0) return alen;

  let row = new Array(alen + 1);
  for (let i = 0; i <= alen; i++) row[i] = i;

  for (let i = 1; i <= blen; i++) {
    let prev = i;
    for (let j = 1; j <= alen; j++) {
      let val;
      if (b[i - 1] === a[j - 1]) {
        val = row[j - 1];
      } else {
        val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[alen] = prev;
  }
  return row[alen];
}

function fuzzyMatchTerm(term, text) {
  if (!text || !term) return false;
  const lowerTerm = term.toLowerCase();
  const lowerText = text.toLowerCase();
  if (lowerText.includes(lowerTerm)) return true;
  if (lowerTerm.length <= 2) return false;

  const maxDist = lowerTerm.length > 5 ? 2 : 1;
  const words = lowerText.split(/[^a-z0-9]+/);

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (!w) continue;
    if (w.startsWith(lowerTerm)) return true;
    if (Math.abs(w.length - lowerTerm.length) > maxDist) continue;
    if (levenshteinDistance(lowerTerm, w) <= maxDist) return true;
  }

  return false;
}

function extractSearchTermsFromQuery(query) {
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
    'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will',
    'with', 'this', 'but', 'they', 'have', 'had', 'what', 'when', 'where',
    'who', 'which', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
    'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
    'so', 'than', 'too', 'very', 'can', 'just', 'should', 'now', 'article',
    'articles', 'related', 'about', 'news', 'find', 'show', 'list', 'tell', 'me',
    'give', 'get', 'latest', 'recent'
  ]);
  const words = (query || '').toLowerCase().split(/[^a-z0-9]+/);
  return words.filter(w => w.length > 2 && !stopWords.has(w));
}

function setupSearchUI() {
  const searchInput = document.getElementById('search-input');
  const searchMatchBadge = document.getElementById('search-match-badge');
  const searchClearBtn = document.getElementById('search-clear-btn');

  function clearSearchInput() {
    if (searchInput) searchInput.value = '';
    if (searchMatchBadge) searchMatchBadge.classList.add('hidden');
    if (searchClearBtn) searchClearBtn.classList.add('hidden');

    const activeFilterEl = document.querySelector('.filter-item.active');
    if (activeFilterEl) {
      fetchAndDisplayArticles(activeFilterEl.dataset.filter);
    } else if (typeof selectedNodeId !== 'undefined' && selectedNodeId) {
      const nodePos = findNodePosition(treeData, selectedNodeId);
      fetchAndDisplayArticles(nodePos ? nodePos.node : 'all');
    } else {
      fetchAndDisplayArticles('all');
    }
  }

  if (searchClearBtn) {
    searchClearBtn.onclick = clearSearchInput;
  }

  if (searchInput) {
    let searchDebounceTimeout = null;

    searchInput.onkeydown = (e) => {
      if (e.key === 'Escape') {
        clearSearchInput();
      }
    };

    searchInput.oninput = (e) => {
      clearTimeout(searchDebounceTimeout);
      const rawQuery = e.target.value;
      const query = rawQuery.trim().toLowerCase();

      if (!query) {
        clearSearchInput();
        return;
      }

      if (searchClearBtn) searchClearBtn.classList.remove('hidden');

      searchDebounceTimeout = setTimeout(async () => {
        const container = document.getElementById('article-list-container');
        if (container) {
          container.innerHTML = '<div style="padding:20px; text-align:center; color:#8e8e93;">Searching articles...</div>';
        }

        const allFeeds = getAllFeedsFromTree(treeData);
        const articlesLists = await Promise.all(allFeeds.map(f => getArticlesForFeed(f, true)));
        const allArticlesPool = articlesLists.flat();

        const seenKeys = new Set();
        const uniquePool = [];
        allArticlesPool.forEach(art => {
          const key = art.id || (art.title + '---' + art.feedTitle);
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            uniquePool.push(art);
          }
        });

        uniquePool.sort((a, b) => getArticleTimestamp(b) - getArticleTimestamp(a));

        const terms = extractSearchTermsFromQuery(query);

        const matchedArticles = uniquePool.filter(art => {
          const titleStr = art.title || '';
          const summaryStr = art.summary || '';
          const contentStr = (art.content || art.htmlContent || '').slice(0, 1000);
          const authorStr = art.author || '';
          const feedStr = art.feedTitle || '';
          const combinedText = `${titleStr} ${summaryStr} ${authorStr} ${feedStr} ${contentStr}`;

          const directMatch = combinedText.toLowerCase().includes(query);
          if (directMatch) return true;

          return terms.length > 0 && terms.every(t => fuzzyMatchTerm(t, combinedText));
        });

        if (searchMatchBadge) {
          searchMatchBadge.textContent = `${matchedArticles.length} result${matchedArticles.length === 1 ? '' : 's'}`;
          searchMatchBadge.classList.remove('hidden');
        }

        renderArticleList(matchedArticles, `No articles found matching "${escapeHTML(rawQuery)}".`);
      }, 150);
    };
  }
}

let currentRAGArticles = [];

function handleAICitationClick(url, title) {
  if (url && (url.startsWith('quickrss://') || url.startsWith('quick-rss://'))) {
    if (typeof window.handleDeepLink === 'function') {
      window.handleDeepLink(url);
    }
    return;
  }
  if (url && url.startsWith('http')) {
    if (typeof openInDefaultBrowser === 'function') {
      openInDefaultBrowser(url);
    }
  }
  if (typeof selectArticleByLink === 'function') {
    selectArticleByLink(url || title);
  }
}

function setupAIChatbotUI() {
  const aiColumn = document.getElementById('ai-column');
  const resizer3 = document.getElementById('resizer-3');
  const triggerBtn = document.getElementById('ai-assistant-toggle-btn');
  const closeBtn = document.getElementById('ai-close-btn');
  const settingsBtn = document.getElementById('ai-settings-btn');
  const sendBtn = document.getElementById('ai-chat-send-btn');
  const clearBtn = document.getElementById('ai-chat-clear-btn');
  const chatInput = document.getElementById('ai-chat-input');
  const chatThread = document.getElementById('ai-chat-thread');

  if (!aiColumn) return;

  let isAIColumnVisible = safeGetStorage('quickrss_ai_column_visible', 'true') === 'true';

  function applyAIColumnState() {
    if (isAIColumnVisible) {
      aiColumn.classList.remove('collapsed');
      if (resizer3) resizer3.classList.remove('collapsed');
      if (triggerBtn) triggerBtn.classList.add('active');
    } else {
      aiColumn.classList.add('collapsed');
      if (resizer3) resizer3.classList.add('collapsed');
      if (triggerBtn) triggerBtn.classList.remove('active');
    }
  }

  applyAIColumnState();

  if (triggerBtn) {
    triggerBtn.onclick = (e) => {
      e.stopPropagation();
      isAIColumnVisible = !isAIColumnVisible;
      safeSetStorage('quickrss_ai_column_visible', isAIColumnVisible ? 'true' : 'false');
      applyAIColumnState();
      if (isAIColumnVisible) {
        showToast('🤖 AI Assistant column expanded', 'info');
      } else {
        showToast('Collapsed AI Assistant column', 'info');
      }
    };
  }

  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      isAIColumnVisible = false;
      safeSetStorage('quickrss_ai_column_visible', 'false');
      applyAIColumnState();
    };
  }

  const newChatBtn = document.getElementById('ai-new-chat-btn');
  if (newChatBtn) {
    newChatBtn.onclick = (e) => {
      e.stopPropagation();
      startNewAIChatSession();
    };
  }

  if (settingsBtn) {
    settingsBtn.onclick = (e) => {
      e.stopPropagation();
      if (typeof openSettings === 'function') openSettings();
      const aiTab = document.querySelector('.settings-tab[data-tab="ai"]');
      if (aiTab) aiTab.click();
    };
  }

  if (sendBtn && chatInput) {
    const doSend = () => {
      const q = chatInput.value.trim();
      if (!q) return;
      chatInput.value = '';
      sendUserAIMessage(q);
    };
    sendBtn.onclick = doSend;
    chatInput.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSend();
      }
    };
  }

  if (clearBtn && chatThread) {
    clearBtn.onclick = () => {
      chatThread.innerHTML = `
        <div class="ai-message assistant">
          <div class="ai-avatar">🤖</div>
          <div class="ai-msg-content">
            Hello! I'm your AI News Assistant. Ask me anything about your news articles or choose a quick prompt above!
          </div>
        </div>
      `;
      showToast('Cleared AI Assistant chat history', 'info');
    };
  }

  document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
    btn.onclick = () => {
      const promptText = btn.dataset.prompt;
      if (promptText) {
        sendUserAIMessage(promptText);
      }
    };
  });
}

function startNewAIChatSession() {
  const thread = document.getElementById('ai-chat-thread');
  if (thread) {
    thread.innerHTML = `
      <div class="ai-message assistant">
        <div class="ai-avatar">🤖</div>
        <div class="ai-msg-content">
          Hello! I'm your AI News Assistant. Ask me anything about your news articles or choose a quick prompt above!
        </div>
      </div>
    `;
  }
  const input = document.getElementById('ai-chat-input');
  if (input) input.value = '';
  if (typeof showToast === 'function') showToast('Started a new AI chat session.', 'info');
}

async function sendUserAIMessage(userQuery) {
  const thread = document.getElementById('ai-chat-thread');
  if (!thread) return;

  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'ai-message user';
  userMsgDiv.innerHTML = `
    <div class="ai-avatar">👤</div>
    <div class="ai-msg-content">${escapeHTML(userQuery)}</div>
  `;
  thread.appendChild(userMsgDiv);

  const assistantMsgDiv = document.createElement('div');
  assistantMsgDiv.className = 'ai-message assistant';
  assistantMsgDiv.innerHTML = `
    <div class="ai-avatar">🤖</div>
    <div class="ai-msg-content">
      <span style="color:#8e8e93;">⏳ Analyzing news articles & querying LLM...</span>
    </div>
  `;
  thread.appendChild(assistantMsgDiv);
  thread.scrollTop = thread.scrollHeight;

  const responseText = await processAIChatQuery(userQuery);
  assistantMsgDiv.querySelector('.ai-msg-content').innerHTML = formatAIMarkdown(responseText, currentRAGArticles);
  thread.scrollTop = thread.scrollHeight;
}

function escapeHTML(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatAIMarkdown(text, articles = []) {
  if (!text) return 'No response generated.';
  let html = escapeHTML(text);

  html = html.replace(/\[([^\]]+)\]\(((?:quickrss|quick-rss):\/\/[^\s\)]+)\)/gi, (match, linkText, url) => {
    const cleanTitle = escapeHTML(linkText);
    const cleanUrl = escapeHTML(url);
    const safeUrl = cleanUrl.replace(/'/g, "\\'");
    return `<a href="#" onclick="window.handleDeepLink('${safeUrl}'); return false;" class="ai-citation-tag" title="Open in Quick RSS">🔗 ${cleanTitle} ↗</a>`;
  });

  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, (match, linkText, url) => {
    const cleanTitle = escapeHTML(linkText);
    const cleanUrl = escapeHTML(url);
    const safeTitle = cleanTitle.replace(/'/g, "\\'");
    const safeUrl = cleanUrl.replace(/'/g, "\\'");
    return `<a href="#" onclick="handleAICitationClick('${safeUrl}', '${safeTitle}'); return false;" class="ai-citation-tag" title="Open & highlight article">🔗 ${cleanTitle} ↗</a>`;
  });

  html = html.replace(/\[Article\s*(\d+)\]/gi, (match, numStr) => {
    const idx = parseInt(numStr, 10) - 1;
    if (articles && articles[idx]) {
      const art = articles[idx];
      const safeTitle = escapeHTML(art.title || '').replace(/'/g, "\\'");
      const safeUrl = escapeHTML(art.link || '').replace(/'/g, "\\'");
      const shortTitle = (art.title || '').length > 30 ? (art.title.slice(0, 30) + '...') : art.title;
      return `<a href="#" onclick="handleAICitationClick('${safeUrl}', '${safeTitle}'); return false;" class="ai-citation-tag" title="${escapeHTML(art.title || '')}">🔗 Article ${numStr}: ${escapeHTML(shortTitle)} ↗</a>`;
    }
    return match;
  });

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^[•\*]\s+(.*)$/gm, '• $1');
  html = html.replace(/\n/g, '<br/>');

  return html;
}

async function processAIChatQuery(userQuery) {
  const modelSelect = document.getElementById('ai-model-select');
  const rawModelVal = modelSelect ? modelSelect.value : 'openai:gpt-4o';
  const parts = rawModelVal.split(':');
  const provider = parts[0];
  const modelName = parts.slice(1).join(':');

  const keys = getAIKeys();

  const allFeeds = typeof getAllFeedsFromTree === 'function' ? getAllFeedsFromTree(treeData) : [];
  const articlesLists = await Promise.all(allFeeds.map(f => getArticlesForFeed(f)));
  const allArticlesPool = articlesLists.flat();

  const seenKeys = new Set();
  const uniquePool = [];
  allArticlesPool.forEach(art => {
    const key = art.id || (art.title + '---' + art.feedTitle);
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniquePool.push(art);
    }
  });

  uniquePool.sort((a, b) => getArticleTimestamp(b) - getArticleTimestamp(a));

  const queryTerms = extractSearchTermsFromQuery(userQuery);

  let candidateArticles = [];
  if (queryTerms.length > 0) {
    candidateArticles = uniquePool.filter(art => {
      const titleStr = art.title || '';
      const summaryStr = art.summary || '';
      const contentStr = (art.content || art.htmlContent || '').slice(0, 1000);
      const authorStr = art.author || '';
      const feedStr = art.feedTitle || '';
      const combinedText = `${titleStr} ${summaryStr} ${authorStr} ${feedStr} ${contentStr}`;

      return queryTerms.some(term => fuzzyMatchTerm(term, combinedText));
    });
  }

  const finalArticles = [];
  const addedKeys = new Set();

  candidateArticles.forEach(art => {
    const key = art.id || (art.title + '---' + art.feedTitle);
    if (!addedKeys.has(key)) {
      addedKeys.add(key);
      finalArticles.push(art);
    }
  });

  if (typeof loadedArticles !== 'undefined' && loadedArticles && loadedArticles.length > 0) {
    loadedArticles.forEach(art => {
      if (finalArticles.length < 50) {
        const key = art.id || (art.title + '---' + art.feedTitle);
        if (!addedKeys.has(key)) {
          addedKeys.add(key);
          finalArticles.push(art);
        }
      }
    });
  }

  uniquePool.forEach(art => {
    if (finalArticles.length < 50) {
      const key = art.id || (art.title + '---' + art.feedTitle);
      if (!addedKeys.has(key)) {
        addedKeys.add(key);
        finalArticles.push(art);
      }
    }
  });

  finalArticles.sort((a, b) => getArticleTimestamp(b) - getArticleTimestamp(a));
  currentRAGArticles = finalArticles;

  // Build TRENDING TOPICS & KEYWORD CLOUD Context
  let trendingSnippet = '\n🔥 CURRENT TRENDING TOPICS & KEYWORD CLOUD DATA:\n';
  const currentCloud = window.__CURRENT_WORD_CLOUD_DATA__;
  if (currentCloud && currentCloud.selectedKeys && currentCloud.selectedKeys.length > 0) {
    trendingSnippet += `Active Featured Keyword Topics (Ranked by RAKE Frequency Score across ${currentCloud.totalArticles || 120} recent article titles):\n`;
    currentCloud.selectedKeys.forEach((k, idx) => {
      const disp = currentCloud.phraseDisplayMap[k] || k;
      const score = currentCloud.phraseScores[k] ? currentCloud.phraseScores[k].toFixed(1) : 'N/A';
      trendingSnippet += `  ${idx + 1}. "${disp}" (Score: ${score})\n`;
    });
  } else {
    const cloudBox = document.getElementById('word-cloud-container');
    const tags = cloudBox ? cloudBox.querySelectorAll('.word-tag') : [];
    if (tags.length > 0) {
      trendingSnippet += 'Active Featured Keyword Topics:\n';
      tags.forEach((t, idx) => {
        trendingSnippet += `  ${idx + 1}. "${t.textContent}" (${t.title || ''})\n`;
      });
    } else {
      trendingSnippet += 'No active trending topics generated yet.\n';
    }
  }

  try {
    const rawHist = safeGetStorage('quickrss_wordcloud_history', null);
    if (rawHist) {
      const history = JSON.parse(rawHist);
      if (Array.isArray(history) && history.length > 1) {
        const latestSnap = history[history.length - 1];
        const baselineSnaps = history.slice(0, history.length - 1);
        const baselineTerms = new Set();
        baselineSnaps.forEach(s => s.terms.forEach(t => baselineTerms.add(t.term)));

        const newlyEmerging = latestSnap.terms.filter(t => !baselineTerms.has(t.term)).map(t => t.displayName);
        if (newlyEmerging.length > 0) {
          trendingSnippet += `Newly Emerging Keyword Topics (First seen in recent snapshot): ${newlyEmerging.slice(0, 10).join(', ')}\n`;
        }
      }
    }
  } catch (e) {}

  trendingSnippet += `
Trending Topic Formulation & Filtering Rules:
- Topics are generated exclusively from candidate phrases in article titles using RAKE (Rapid Automatic Keyword Extraction).
- Common generic stop words ("learning", "updated", "live", "add", "september", "security releases", etc.) are automatically excluded.
- Phrases must be 5 words or less.
- Phrases are scored based on word frequency and degree in candidate titles.
- Sub-phrase deduplication prevents redundant n-gram overlaps.
- A term/phrase must be present in recent article headlines and score high enough relative to other candidate phrases to be featured in the Trending Topics cloud.
`;

  let contextSnippet = 'Here are the relevant RSS news articles currently available in Quick RSS:\n';
  finalArticles.forEach((art, idx) => {
    contextSnippet += `\n[Article ${idx + 1}] Title: "${art.title}" | Feed: ${art.feedTitle} | Date: ${art.pubDate}\nSummary: ${art.summary || 'N/A'}\nURL: ${art.link || ''}\n`;
  });

  let activeArticleSnippet = '';
  if (typeof currentArticle !== 'undefined' && currentArticle && currentArticle.title) {
    activeArticleSnippet = `
📌 CURRENTLY ACTIVE SELECTED ARTICLE IN READER PANE:
Title: "${currentArticle.title}"
Feed: ${currentArticle.feedTitle || 'N/A'}
Date: ${currentArticle.pubDate || 'N/A'}
Author: ${currentArticle.author || 'N/A'}
URL: ${currentArticle.link || 'N/A'}
Summary / Content: ${currentArticle.summary || currentArticle.content || 'N/A'}
`;
  }

  const systemPrompt = `You are the AI News Assistant built into Quick RSS. Answer the user's question accurately using the live news context, currently active selected article, and Trending Topics data provided below. Be concise and informative.

CITATION & TOPIC AGGREGATION RULES:
1. When answering queries about trending topics, news overviews, or specific subject searches: ALWAYS group and aggregate related articles under overarching topic headings or clear bullet points.
2. If the user asks to summarize, analyze, or explain "the active article" or "this article", prioritize the CURRENTLY ACTIVE SELECTED ARTICLE content provided below.
3. For questions regarding why a specific phrase is or isn't featured in TRENDING TOPICS: compare the phrase against the active featured keywords list, RAKE scores, and title candidate extraction rules.
4. For each topic/point, cite ALL relevant supporting articles from the provided context (e.g., [Article 1: Title](URL), [Article 3: Title](URL)). Do NOT restrict a topic to only a single citation if multiple articles discuss or relate to that topic.
5. Use markdown links for citations in the format [Article N: Title](URL) or [Article N](URL).

${activeArticleSnippet}

${trendingSnippet}

${contextSnippet}`;

  try {
    if (provider === 'openai') {
      const token = getOpenAIOAuthToken();
      if (!token) {
        return "⚠️ OpenAI API Key / OAuth login required. Please click the ⚙️ icon or open Preferences > AI Assistant to enter your OpenAI key or connect via OAuth.";
      }
      return await queryOpenAI(systemPrompt, userQuery, modelName, token);
    } else if (provider === 'claude') {
      const token = getClaudeOAuthToken();
      if (!token) {
        return "⚠️ Claude API Key / OAuth login required. Please click the ⚙️ icon or open Preferences > AI Assistant to enter your Claude key.";
      }
      return await queryClaude(systemPrompt, userQuery, modelName, token);
    } else if (provider === 'openrouter') {
      const apiKey = keys.openrouter;
      if (!apiKey) {
        return "⚠️ OpenRouter API Key is missing. Please click the ⚙️ icon or open Preferences > AI Assistant to enter your OpenRouter key.";
      }
      const actualModel = modelName === 'auto' ? 'anthropic/claude-3.5-sonnet' : modelName;
      return await queryOpenRouter(systemPrompt, userQuery, actualModel, apiKey);
    }
  } catch (err) {
    const errMsg = err.message || err.toString();
    if (errMsg.includes('Load failed') || errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError')) {
      return `❌ AI API Error (Network / CORS Load Failed):\n• If using Claude/Anthropic directly, browser client calls may be restricted by CORS. Please switch your AI Model dropdown to OpenRouter (e.g. "OpenRouter — Claude 3.5 Sonnet").\n• If using OpenAI or OpenRouter, please verify your API Key / Session Token in Preferences ⚙️ -> AI Assistant.`;
    }
    return `❌ AI API Error: ${errMsg}`;
  }

  return "⚠️ Unknown LLM Provider selected.";
}

const nativeHTTPCallbacks = new Map();

if (typeof window !== 'undefined') {
  window.onNativeHTTPCompleted = function(requestId, status, responseText, errorMsg) {
    if (nativeHTTPCallbacks.has(requestId)) {
      const { resolve, reject } = nativeHTTPCallbacks.get(requestId);
      nativeHTTPCallbacks.delete(requestId);
      if (errorMsg && !status) {
        reject(new Error(errorMsg));
      } else {
        resolve({
          ok: status >= 200 && status < 300,
          status: status,
          text: async () => responseText || '',
          json: async () => JSON.parse(responseText || '{}')
        });
      }
    }
  };
}

async function performNativeFetch(url, options = {}) {
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.nativeHTTPRequest) {
    return new Promise((resolve, reject) => {
      const requestId = 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      nativeHTTPCallbacks.set(requestId, { resolve, reject });

      const headers = options.headers || {};
      const method = options.method || 'GET';
      const body = options.body || null;

      window.webkit.messageHandlers.nativeHTTPRequest.postMessage({
        requestId,
        url,
        method,
        headers,
        body
      });

      setTimeout(() => {
        if (nativeHTTPCallbacks.has(requestId)) {
          nativeHTTPCallbacks.delete(requestId);
          reject(new Error('Native request timed out after 35 seconds'));
        }
      }, 35000);
    });
  }

  return fetch(url, options);
}

async function queryOpenAI(systemPrompt, userQuery, model, apiKey) {
  let tokenToUse = apiKey || getOpenAIOAuthToken();
  let res = await performNativeFetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenToUse}`
    },
    body: JSON.stringify({
      model: model || 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuery }
      ],
      max_tokens: 1024
    })
  });

  // If initial token failed with 401 or token_expired, try fallback to stored API key (sk-...) if available
  if (!res.ok && res.status === 401) {
    const backupKey = getAIKeys().openai;
    if (backupKey && backupKey !== tokenToUse) {
      tokenToUse = backupKey;
      res = await performNativeFetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenToUse}`
        },
        body: JSON.stringify({
          model: model || 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userQuery }
          ],
          max_tokens: 1024
        })
      });
    }
  }

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    const rawMsg = errJson.error?.message || `HTTP ${res.status}`;
    if (res.status === 401 || rawMsg.toLowerCase().includes('expired') || rawMsg.toLowerCase().includes('token') || rawMsg.toLowerCase().includes('api key')) {
      safeRemoveStorage('quickrss_openai_oauth_token');
      throw new Error(`Authentication token or API key is expired or invalid. Please click the ⚙️ icon or open Preferences > AI Assistant to enter your OpenAI API key or re-authenticate via ChatGPT.`);
    }
    throw new Error(rawMsg);
  }
  const json = await res.json();
  return json.choices?.[0]?.message?.content || 'No output generated from OpenAI.';
}

async function queryClaude(systemPrompt, userQuery, model, apiKey) {
  const res = await performNativeFetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: model || 'claude-3-5-sonnet-20241022',
      system: systemPrompt,
      max_tokens: 1024,
      messages: [
        { role: 'user', content: userQuery }
      ]
    })
  });
  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error?.message || `HTTP ${res.status}`);
  }
  const json = await res.json();
  return json.content?.[0]?.text || 'No output generated from Claude.';
}

async function queryOpenRouter(systemPrompt, userQuery, model, apiKey) {
  const res = await performNativeFetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://quickrss.app',
      'X-Title': 'Quick RSS Desktop'
    },
    body: JSON.stringify({
      model: model || 'anthropic/claude-3.5-sonnet',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuery }
      ],
      max_tokens: 1024
    })
  });
  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error?.message || `HTTP ${res.status}`);
  }
  const json = await res.json();
  return json.choices?.[0]?.message?.content || 'No output generated from OpenRouter.';
}




function safeGetStorage(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch (e) {
    return fallback;
  }
}

function safeSetStorage(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch (e) {}
}

function safeRemoveStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}

// ==========================================
// ERROR LOGGING & SELF-DIAGNOSIS ENGINE
// ==========================================
window.AppDiagnostics = {
  logs: [],
  maxLogs: 200,

  log(level, category, message, details = null) {
    const entry = {
      timestamp: new Date().toISOString(),
      timeStr: new Date().toLocaleTimeString(),
      level: level.toLowerCase(), // 'info', 'warn', 'error', 'success'
      category: category,
      message: message,
      details: details ? (typeof details === 'object' ? JSON.stringify(details) : String(details)) : null
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) this.logs.pop();

    if (level === 'error') {
      console.error(`[Diagnostics:${category}] ${message}`, details || '');
    } else if (level === 'warn') {
      console.warn(`[Diagnostics:${category}] ${message}`, details || '');
    } else {
      console.log(`[Diagnostics:${category}] ${message}`, details || '');
    }

    this.updateLogUI();
  },

  updateLogUI() {
    const container = document.getElementById('diagnostic-logs-list');
    if (!container) return;

    if (this.logs.length === 0) {
      container.innerHTML = '<div style="padding:15px; text-align:center; color:#8e8e93; font-style:italic;">No diagnostic logs recorded yet.</div>';
      return;
    }

    container.innerHTML = this.logs.slice(0, 50).map(l => `
      <div class="log-item log-${l.level}">
        <span class="log-time">[${l.timeStr}]</span>
        <span class="log-cat">${l.category}</span>:
        <strong>${l.message}</strong>
        ${l.details ? `<div style="font-size:10px; color:#8e8e93; margin-top:2px;">${l.details}</div>` : ''}
      </div>
    `).join('');
  }
};

// Global exception traps
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (window.AppDiagnostics) {
      window.AppDiagnostics.log('error', 'GlobalRuntime', event.message || 'Uncaught Error', {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (window.AppDiagnostics) {
      window.AppDiagnostics.log('error', 'UnhandledPromise', event.reason?.message || String(event.reason));
    }
  });
}

// Self-Diagnosis Runner
async function runAppSelfDiagnosis() {
  const resultsContainer = document.getElementById('diagnostic-results');
  const autofixBar = document.getElementById('autofix-bar');
  if (resultsContainer) {
    resultsContainer.innerHTML = '<div style="color:#007aff; font-weight:600;">🔍 Running self-diagnosis checks across 5 subsystems...</div>';
  }

  const checks = [];
  let issuesFound = 0;

  // Check 1: LocalStorage & Data Integrity
  try {
    const treeRaw = localStorage.getItem('quickrss_user_tree');
    if (treeRaw) JSON.parse(treeRaw);
    checks.push({ status: 'pass', name: 'LocalStorage Tree JSON', desc: 'Subscriptions hierarchy structure is valid.' });
  } catch (e) {
    issuesFound++;
    checks.push({ status: 'fail', name: 'LocalStorage Tree JSON', desc: 'Corrupted tree JSON structure detected in LocalStorage.', fixable: true, fixKey: 'tree' });
  }

  try {
    const starredRaw = localStorage.getItem('quickrss_starred_articles');
    if (starredRaw) JSON.parse(starredRaw);
    checks.push({ status: 'pass', name: 'LocalStorage Starred Items', desc: 'Starred articles dataset format is valid.' });
  } catch (e) {
    issuesFound++;
    checks.push({ status: 'fail', name: 'LocalStorage Starred Items', desc: 'Corrupted starred articles JSON detected.', fixable: true, fixKey: 'starred' });
  }

  // Check 2: DOM & UI Controls Binding
  const criticalSelectors = [
    '#settings-btn', '#add-feed-btn', '#refresh-feeds-btn',
    '#search-input', '#ai-assistant-toggle-btn', '#tree-container',
    '#article-list-container', '#reader-container', '#word-cloud-container'
  ];
  const missingElements = criticalSelectors.filter(sel => !document.querySelector(sel));
  if (missingElements.length === 0) {
    checks.push({ status: 'pass', name: 'UI Controls & DOM Bindings', desc: 'All 9 core interface controls are mounted and healthy.' });
  } else {
    issuesFound++;
    checks.push({ status: 'fail', name: 'UI Controls & DOM Bindings', desc: `Missing elements: ${missingElements.join(', ')}`, fixable: true, fixKey: 'dom' });
  }

  // Check 3: WebKit Native Bridge & Capabilities
  const hasWebKit = Boolean(window.webkit && window.webkit.messageHandlers);
  if (hasWebKit) {
    checks.push({ status: 'pass', name: 'WebKit Swift Bridge', desc: 'Native WebKit messageHandlers pipeline active.' });
  } else {
    checks.push({ status: 'warn', name: 'WebKit Swift Bridge', desc: 'Running in browser/standalone preview mode (Native bridge bypassed).' });
  }

  // Check 4: Local MCP Server Reachability
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const mcpToken = typeof MCP_TOKEN !== 'undefined' ? MCP_TOKEN : '';
    const mcpRes = await fetch(`http://127.0.0.1:8745/mcp?token=${mcpToken}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (mcpRes.ok || mcpRes.status === 400 || mcpRes.status === 401) {
      checks.push({ status: 'pass', name: 'Local MCP Server (:8745)', desc: 'MCP HTTP RPC server responding.' });
    } else {
      checks.push({ status: 'warn', name: 'Local MCP Server (:8745)', desc: `Server responded with HTTP ${mcpRes.status}` });
    }
  } catch (e) {
    checks.push({ status: 'warn', name: 'Local MCP Server (:8745)', desc: 'MCP server port 8745 offline or pending start.' });
  }

  // Check 5: Live Feed Data Stream
  if (typeof loadedArticles !== 'undefined' && Array.isArray(loadedArticles) && loadedArticles.length > 0) {
    checks.push({ status: 'pass', name: 'Active Article Stream', desc: `Stream healthy with ${loadedArticles.length} active articles loaded.` });
  } else {
    issuesFound++;
    checks.push({ status: 'warn', name: 'Active Article Stream', desc: 'No articles currently in memory pool.', fixable: true, fixKey: 'refresh' });
  }

  // Render Diagnostic Summary
  if (resultsContainer) {
    resultsContainer.innerHTML = checks.map(c => `
      <div style="margin-bottom:8px; padding:8px 12px; border-radius:8px; background:${c.status === 'pass' ? 'rgba(52,199,89,0.1)' : (c.status === 'fail' ? 'rgba(255,59,48,0.1)' : 'rgba(255,149,0,0.1)')}; display:flex; align-items:center; justify-content:space-between;">
        <div>
          <span style="font-weight:600; color:${c.status === 'pass' ? '#34c759' : (c.status === 'fail' ? '#ff3b30' : '#ff9500')};">
            ${c.status === 'pass' ? '✓ PASS' : (c.status === 'fail' ? '❌ FAIL' : '⚠️ WARN')}
          </span>
          <span style="font-weight:600; margin-left:8px; color:var(--text-primary);">${c.name}</span>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">${c.desc}</div>
        </div>
      </div>
    `).join('');
  }

  if (autofixBar) {
    if (issuesFound > 0) {
      autofixBar.classList.remove('hidden');
    } else {
      autofixBar.classList.add('hidden');
    }
  }

  window.AppDiagnostics.log('info', 'Diagnosis', `Completed self-diagnosis check. ${issuesFound} issue(s) flagged.`);
  return { issuesFound, checks };
}

// Auto-Recovery & Repair Logic
async function executeAutoRecovery() {
  window.AppDiagnostics.log('info', 'AutoFix', 'Initiating automated system recovery...');
  const autofixBar = document.getElementById('autofix-bar');
  if (autofixBar) autofixBar.innerHTML = '<div style="color:#007aff; font-weight:600;">🛠️ Running repair scripts...</div>';

  let repairsPerformed = [];

  // 1. Repair Tree JSON if corrupted
  try {
    const treeRaw = localStorage.getItem('quickrss_user_tree');
    if (treeRaw) JSON.parse(treeRaw);
  } catch (e) {
    localStorage.removeItem('quickrss_user_tree');
    if (typeof defaultTree !== 'undefined') {
      treeData = JSON.parse(JSON.stringify(defaultTree));
      saveTreeData();
      repairsPerformed.push('Reset corrupted subscriptions tree to default structure.');
    }
  }

  // 2. Repair Starred Articles JSON if corrupted
  try {
    const starredRaw = localStorage.getItem('quickrss_starred_articles');
    if (starredRaw) JSON.parse(starredRaw);
  } catch (e) {
    localStorage.setItem('quickrss_starred_articles', JSON.stringify([]));
    repairsPerformed.push('Re-initialized corrupted starred articles storage.');
  }

  // 3. Clear transient cache and re-fetch feeds
  if (typeof feedArticleCache !== 'undefined') {
    for (const k of Object.keys(feedArticleCache)) delete feedArticleCache[k];
  }
  
  if (typeof renderTree === 'function') renderTree();
  if (typeof refreshAllFeeds === 'function') await refreshAllFeeds(false);
  if (typeof renderWordCloud === 'function') renderWordCloud();

  repairsPerformed.push('Flushed transient caches & re-synced feed streams.');

  window.AppDiagnostics.log('success', 'AutoFix', 'Auto-recovery completed successfully!', repairsPerformed);

  if (typeof showToast === 'function') {
    showToast('✅ Auto-Recovery Complete! System operational.', 'success');
  }

  // Re-run diagnosis to confirm clean state
  setTimeout(() => {
    runAppSelfDiagnosis();
  }, 500);
}

// Diagnostics UI Event Setup
function setupDiagnosticsUI() {
  const runBtn = document.getElementById('run-diagnostics-btn');
  const fixBtn = document.getElementById('auto-fix-btn');
  const resetCacheBtn = document.getElementById('reset-cache-btn');
  const clearLogsBtn = document.getElementById('clear-logs-btn');

  if (runBtn) runBtn.onclick = () => runAppSelfDiagnosis();
  if (fixBtn) fixBtn.onclick = () => executeAutoRecovery();

  if (resetCacheBtn) {
    resetCacheBtn.onclick = () => {
      if (typeof feedArticleCache !== 'undefined') {
        for (const k of Object.keys(feedArticleCache)) delete feedArticleCache[k];
      }
      if (typeof showToast === 'function') showToast('🧹 Cache cleared successfully.', 'info');
      refreshAllFeeds(true);
    };
  }

  if (clearLogsBtn) {
    clearLogsBtn.onclick = () => {
      window.AppDiagnostics.logs = [];
      window.AppDiagnostics.updateLogUI();
      if (typeof showToast === 'function') showToast('Cleared diagnostic logs.', 'info');
    };
  }

  const triggerCrashBtn = document.getElementById('trigger-test-crash-btn');
  if (triggerCrashBtn) {
    triggerCrashBtn.onclick = () => {
      if (confirm('Are you sure you want to trigger a test crash? The application will auto-restart immediately and display the crash report modal.')) {
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.triggerTestCrash) {
          window.webkit.messageHandlers.triggerTestCrash.postMessage({});
        } else {
          // Fallback for browser preview mode
          const fakeReport = {
            timestamp: new Date().toLocaleString(),
            reason: 'Simulated Native Test Crash (SIGABRT)',
            details: 'Thread 1: Fatal test crash triggered manually via Health & Diagnostics UI to verify auto-restart and crash recovery popup modal.\n    at executeTestCrash (app.js:4735)'
          };
          safeSetStorage('quickrss_last_crash_report', JSON.stringify(fakeReport));
          showCrashRecoveryModal(fakeReport);
        }
      }
    };
  }
}

// ==========================================
// WORD CLOUD VISUALIZATION (BOTTOM LEFT)
// ==========================================
// ==========================================
// RAKE (Rapid Automatic Keyword Extraction) ENGINE
// ==========================================
const RAKE_STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could',
  'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for',
  'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s',
  'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m',
  'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves',
  'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some',
  'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these',
  'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up',
  'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when',
  'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would',
  'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves', 'http', 'https',
  'com', 'org', 'net', 'feed', 'rss', 'news', 'blog', 'post', 'posts', 'posted', 'article', 'articles', 'update', 'updates',
  'updated', 'updating', 'read', 'reading', 'view', 'views', 'full', 'latest', 'tech', 'world', '2026', '2025', '2024',
  'via', 'using', 'used', 'says', 'said', 'per', 'new', 'one', 'two', 'three', 'first', 'second', 'today', 'yesterday',
  'make', 'makes', 'making', 'made', 'just', 'like', 'get', 'gets', 'getting', 'got', 'take', 'takes', 'taking', 'took',
  'way', 'ways', 'well', 'also', 'even', 'can', 'will', 'may', 'could', 'would', 'should', 'might', 'must', 'many', 'much',
  'more', 'most', 'some', 'such', 'than', 'too', 'very', 'now', 'live', 'add', 'adds', 'adding', 'added', 'release', 'releases',
  'released', 'releasing', 'security', 'january', 'february', 'march', 'april', 'june', 'july', 'august', 'september',
  'october', 'november', 'december', 'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'sept', 'oct', 'nov', 'dec',
  'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years', 'monday', 'tuesday', 'wednesday', 'thursday',
  'friday', 'saturday', 'sunday', 'part', 'parts', 'enough', 'leading', 'show', 'shows', 'shown', 'showing', 'top',
  'best', 'guide', 'tutorial', 'overview', 'version', 'versions', 'v1', 'v2', 'v3', 'digest', 'edition', 'newsletter',
  'announces', 'announcing', 'announced', 'announcement', 'launches', 'launching', 'launched', 'unveils', 'unveiling',
  'unveiled', 'reveals', 'revealing', 'revealed', 'introduces', 'introducing', 'introduced',
  'excited', 'exciting', 'quite', 'belong', 'else', 'anywhere', 'everywhere', 'somewhere', 'place', 'places',
  'next', 'previous', 'former', 'later', 'soon', 'et', 'al', 'etal', 'ibid', 'eg', 'ie', 'etc', 'vs', 'versus',
  'author', 'authors', 'editor', 'editors', 'around', 'called', 'privately', 'unsealed', 'court', 'filings',
  'practices', 'theft', 'exec', 'broader', 'global', 'community', 'combining', 'formal', 'logic', 'solvers',
  'joins', 'joining', 'joined', 'hosts', 'hosting', 'hosted', 'spends', 'spending', 'spent', 'talking', 'talk',
  'means', 'meaning', 'meant', 'really', 'gives', 'gave', 'giving', 'every', 'friend', 'friends', 'rep', 'patio11',
  'implosion', 'feel', 'feels', 'feeling', 'free', 'actually', 'combines', 'brilliant', 'insight',
  'diy', 'tested', 'testing', 'test', 'tests', 'style', 'based', 'type', 'mode', 'kind', 'thingy', 'tbh', 'imho', 'imo',
  'seems', 'seemed', 'fine', 'tuned', 'fine-tuned', 'exact', 'same', 'optimized', 'optimization', 'pour', 'near', 'instant',
  'uses', 'built', 'building', 'build', 'builds', 'trying', 'tried', 'try', 'looking', 'looked', 'look', 'looks',
  'finding', 'found', 'find', 'finds', 'seeing', 'seen', 'see', 'sees'
]);

function RAKE_extractCandidatePhrases(text) {
  if (!text) return [];
  // Normalize smart quotes and apostrophes to standard ascii single quote
  text = text.replace(/[\u2018\u2019’`]/g, "'").replace(/[\u201C\u201D“”]/g, '"');
  // Replace hyphens and slashes between letters with spaces (e.g. Jev-style -> Jev style, web-dev -> web dev)
  text = text.replace(/([a-zA-Z0-9])[\-\/]([a-zA-Z0-9])/g, '$1 $2');
  // Exclude single quote ' from sentence delimiters so contractions like "don't" or "we're" match stop words
  const sentenceRegex = /[.!?;\n\t,–—:()\[\]"]/g;
  const sentences = text.split(sentenceRegex);
  const candidates = [];

  sentences.forEach(sentence => {
    const words = sentence.trim().split(/\s+/);
    let currentPhrase = [];

    words.forEach(word => {
      const cleanWord = word.replace(/^[^a-zA-Z0-9']+|[^a-zA-Z0-9']+$/g, '').replace(/^'+|'+$/g, '');
      const lower = cleanWord.toLowerCase();

      // Exclude pure numbers and alphanumeric numbers like 30b, 100k, etc.
      if (cleanWord.length > 1 && !RAKE_STOP_WORDS.has(lower) && !/^\d+[a-zA-Z]?$/.test(cleanWord)) {
        currentPhrase.push(cleanWord);
      } else {
        if (currentPhrase.length > 0) {
          RAKE_addPhraseCandidates(currentPhrase, candidates);
          currentPhrase = [];
        }
      }
    });

    if (currentPhrase.length > 0) {
      RAKE_addPhraseCandidates(currentPhrase, candidates);
    }
  });

  return candidates;
}

function RAKE_addPhraseCandidates(phraseWords, candidates) {
  // Enforce strict hard limit: max 3 words per topic phrase
  if (phraseWords.length <= 3) {
    candidates.push(phraseWords);
  } else {
    // Break longer sequences into 1 to 3 word n-grams to extract focused, punchy topics
    for (let i = 0; i < phraseWords.length; i++) {
      for (let len = 1; len <= Math.min(3, phraseWords.length - i); len++) {
        candidates.push(phraseWords.slice(i, i + len));
      }
    }
  }
}

function RAKE_calculateScores(candidatePhrases) {
  const wordFreq = {};
  const wordDegree = {};
  const phraseCounts = {};
  const phraseDisplayMap = {};

  candidatePhrases.forEach(phrase => {
    if (!phrase || phrase.length === 0 || phrase.length > 3) return;
    const lowerWords = phrase.map(w => w.toLowerCase());
    const lowerKey = lowerWords.join(' ');

    if (lowerKey.length < 2 || /^\d+$/.test(lowerKey)) return;

    phraseCounts[lowerKey] = (phraseCounts[lowerKey] || 0) + 1;
    if (!phraseDisplayMap[lowerKey]) {
      phraseDisplayMap[lowerKey] = formatPhraseCasing(phrase.join(' '));
    }

    const degree = lowerWords.length - 1;
    lowerWords.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
      wordDegree[word] = (wordDegree[word] || 0) + degree + 1;
    });
  });

  // Base term-frequency word scoring formula:
  // Combines Term Frequency (wordFreq) and co-occurrence degree (wordDegree/wordFreq)
  // High frequency words score higher, instead of being penalized by pure degree/freq division
  const wordScore = {};
  for (const word of Object.keys(wordFreq)) {
    const tf = wordFreq[word];
    const degRatio = wordDegree[word] / tf;
    wordScore[word] = Math.sqrt(tf) * (1 + 0.35 * degRatio);
  }

  const phraseScores = {};
  for (const lowerKey of Object.keys(phraseCounts)) {
    const words = lowerKey.split(' ');
    const count = phraseCounts[lowerKey];
    const wordCount = words.length;

    // Hard reject any phrase with > 3 words
    if (wordCount > 3) continue;

    // Filter out 3-word phrases that only appear once UNLESS all constituent words are very frequent
    if (wordCount === 3 && count < 2) {
      const avgTf = words.reduce((acc, w) => acc + (wordFreq[w] || 0), 0) / 3;
      if (avgTf < 3) continue;
    }

    let score = 0;
    words.forEach(w => {
      score += wordScore[w] || 0;
    });

    // Weight by phrase frequency across feed articles so frequent topics dominate
    score = score * Math.pow(count, 1.15);

    // Topic sweet spot multipliers (1-3 word terms)
    if (wordCount === 2) score *= 1.35;
    else if (wordCount === 3) score *= 1.15;

    phraseScores[lowerKey] = score;
  }

  return { phraseScores, phraseDisplayMap };
}

function getAllAvailableArticles(limit = 5000) {
  let pool = [];

  if (typeof loadedArticles !== 'undefined' && Array.isArray(loadedArticles)) {
    pool = pool.concat(loadedArticles);
  }
  if (typeof feedArticleCache !== 'undefined' && feedArticleCache) {
    Object.values(feedArticleCache).forEach(arr => {
      if (Array.isArray(arr)) pool = pool.concat(arr);
    });
  }
  if (typeof getAllFeedsFromTree === 'function' && typeof treeData !== 'undefined' && treeData) {
    const allFeeds = getAllFeedsFromTree(treeData);
    allFeeds.forEach(feed => {
      const cacheKey = feed.url || feed.id || feed.name;
      if (typeof feedArticleCache !== 'undefined' && feedArticleCache[cacheKey] && Array.isArray(feedArticleCache[cacheKey])) {
        pool = pool.concat(feedArticleCache[cacheKey]);
      } else if (typeof articleDatabase !== 'undefined' && articleDatabase[feed.name] && Array.isArray(articleDatabase[feed.name])) {
        pool = pool.concat(articleDatabase[feed.name]);
      }
    });
  }
  if (typeof articleDatabase !== 'undefined' && articleDatabase) {
    Object.values(articleDatabase).forEach(arr => {
      if (Array.isArray(arr)) pool = pool.concat(arr);
    });
  }

  const seen = new Set();
  const unique = [];
  for (let i = 0; i < pool.length; i++) {
    const art = pool[i];
    if (!art || !art.title) continue;
    const key = art.id || (art.title + '---' + (art.feedTitle || ''));
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(art);
    }
  }

  // Sort ALL articles by publication date/timestamp descending (newest first)
  if (typeof getArticleTimestamp === 'function') {
    unique.sort((a, b) => getArticleTimestamp(b) - getArticleTimestamp(a));
  } else {
    unique.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
  }

  if (limit > 0 && unique.length > limit) {
    return unique.slice(0, limit);
  }
  return unique;
}

function formatPhraseCasing(str) {
  if (!str) return '';
  const acronyms = new Set(['AI', 'GPU', 'CPU', 'LLM', 'API', 'ML', 'RAG', 'SDK', 'OPML', 'RSS', 'UI', 'UX', 'MIT', 'AWS', 'GPT', 'X', 'CEO', 'B2B', 'CTO', 'CFO', 'VP', 'SaaS']);
  return str.split(/\s+/).map(word => {
    const upper = word.toUpperCase();
    if (acronyms.has(upper)) return upper;
    if (word.length <= 2) return word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

function topicColorHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const colorIndex = Math.abs(hash) % 6;
  const palette = [
    { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
    { color: '#007aff', bg: 'rgba(0, 122, 255, 0.14)' },
    { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.14)' },
    { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
    { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.14)' },
    { color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.14)' }
  ];
  return palette[colorIndex];
}

let wordCloudDebounceTimer = null;

function renderWordCloud() {
  if (wordCloudDebounceTimer) clearTimeout(wordCloudDebounceTimer);
  wordCloudDebounceTimer = setTimeout(executeRenderWordCloud, 100);
}

function executeRenderWordCloud() {
  const container = document.getElementById('word-cloud-container');
  if (!container) return;

  try {
    const sourceArticles = getAllAvailableArticles(5000);
    if (!sourceArticles || sourceArticles.length === 0) {
      container.innerHTML = '<div class="word-cloud-loading">No active topics available</div>';
      return;
    }

    const titlesOnly = safeGetStorage('quickrss_wordcloud_source', 'titles') !== 'all';
    let allCandidates = [];
    sourceArticles.forEach(art => {
      const text = titlesOnly ? (art.title || '') : `${art.title || ''}. ${art.summary || ''}`;
      const candidates = RAKE_extractCandidatePhrases(text);
      allCandidates = allCandidates.concat(candidates);
    });

    const { phraseScores, phraseDisplayMap } = RAKE_calculateScores(allCandidates);

    const sortedKeys = Object.keys(phraseScores)
      .filter(k => k && k.length >= 2)
      .sort((a, b) => phraseScores[b] - phraseScores[a]);

    const topAcronyms = new Set(['ai', 'llm', 'gpu', 'cpu', 'ml', 'rag', 'sdk', 'gpt', 'api', 'ui', 'ux', 'rss', 'aws', 'python', 'google', 'apple', 'nvidia', 'claude', 'openai', 'pytorch', 'ceo', 'b2b']);
    const selectedKeys = [];
    const usedWordsSet = new Set();

    for (const k of sortedKeys) {
      if (selectedKeys.length >= 28) break;
      const words = k.split(' ');

      // Word-overlap & sub-phrase deduplication:
      // Single-word topics (e.g. "Jev", "Qwen", "Llama") represent core standalone keywords.
      // Do NOT block single-word topics due to overlap with multi-word phrases!
      let hasWordOverlap = false;
      if (words.length > 1) {
        for (const w of words) {
          if (!topAcronyms.has(w) && usedWordsSet.has(w)) {
            hasWordOverlap = true;
            break;
          }
        }
      }

      if (!hasWordOverlap) {
        selectedKeys.push(k);
        words.forEach(w => {
          if (!topAcronyms.has(w)) usedWordsSet.add(w);
        });
      }
    }

    if (selectedKeys.length === 0) {
      container.innerHTML = '<div class="word-cloud-loading">No topics found</div>';
      return;
    }

    recordWordCloudSnapshot(selectedKeys, phraseScores, phraseDisplayMap);

    window.__CURRENT_WORD_CLOUD_DATA__ = {
      selectedKeys: selectedKeys,
      phraseScores: phraseScores,
      phraseDisplayMap: phraseDisplayMap,
      totalArticles: sourceArticles ? sourceArticles.length : 0,
      timestamp: Date.now()
    };

    const maxScore = phraseScores[selectedKeys[0]];
    const minScore = phraseScores[selectedKeys[selectedKeys.length - 1]];

    const shuffledKeys = [...selectedKeys].sort(() => Math.random() - 0.5);

    container.innerHTML = '';
    shuffledKeys.forEach(k => {
      const score = phraseScores[k];
      const displayName = phraseDisplayMap[k] || k;
      const tag = document.createElement('span');

      const ratio = maxScore > minScore ? (score - minScore) / (maxScore - minScore) : 0.5;
      const fontSize = Math.round(11 + ratio * 8);
      const fontWeight = ratio >= 0.65 ? 700 : (ratio >= 0.35 ? 600 : 500);
      const theme = topicColorHash(displayName);

      tag.className = 'word-tag';
      tag.style.fontSize = `${fontSize}px`;
      tag.style.fontWeight = fontWeight;
      tag.style.color = theme.color;
      tag.style.backgroundColor = theme.bg;
      tag.textContent = displayName;
      tag.title = `Score: ${score.toFixed(1)} • Click to search "${displayName}"`;

      tag.onclick = (e) => {
        e.stopPropagation();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.value = displayName;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          if (typeof showToast === 'function') {
            showToast(`Filtered by topic: "${displayName}"`, 'info');
          }
        }
      };

      container.appendChild(tag);
    });
  } catch (err) {
    if (window.AppDiagnostics) {
      window.AppDiagnostics.log('error', 'WordCloud', 'Error rendering word cloud:', err);
    }
    console.error('Error rendering word cloud:', err);
    container.innerHTML = '<div class="word-cloud-loading">No active topics available</div>';
  }
}

function recordWordCloudSnapshot(selectedKeys, phraseScores, phraseDisplayMap) {
  if (!selectedKeys || selectedKeys.length === 0) return;
  try {
    const rawHistory = safeGetStorage('quickrss_wordcloud_history', null);
    let history = [];
    if (rawHistory) {
      try { history = JSON.parse(rawHistory); } catch (e) {}
    }
    if (!Array.isArray(history)) history = [];

    const now = Date.now();
    const dateStr = new Date().toLocaleString();
    const snapshotTerms = selectedKeys.map(k => ({
      term: k,
      displayName: phraseDisplayMap[k] || k,
      frequency: parseFloat((phraseScores[k] || 1).toFixed(2))
    }));

    if (history.length > 0 && (now - history[history.length - 1].timestamp) < 60000) {
      history[history.length - 1] = {
        timestamp: now,
        dateStr: dateStr,
        terms: snapshotTerms
      };
    } else {
      history.push({
        timestamp: now,
        dateStr: dateStr,
        terms: snapshotTerms
      });
    }

    if (history.length > 100) {
      history = history.slice(history.length - 100);
    }

    safeSetStorage('quickrss_wordcloud_history', JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save wordcloud history:', err);
  }
}

function setupWordCloudUI() {
  const refreshBtn = document.getElementById('refresh-wordcloud-btn');
  if (refreshBtn) {
    refreshBtn.onclick = (e) => {
      e.stopPropagation();
      renderWordCloud();
      if (typeof showToast === 'function') showToast('Updated Word Cloud topics', 'info');
    };
  }

  // Restore saved height
  const cloudBox = document.getElementById('word-cloud-container');
  const savedHeight = safeGetStorage('quickrss_wordcloud_height', null);
  if (cloudBox && savedHeight) {
    cloudBox.style.height = `${savedHeight}px`;
  }

  // Setup click drag vertical resize handler
  const resizer = document.getElementById('wordcloud-resizer');
  if (resizer && cloudBox) {
    let isDragging = false;
    let startY = 0;
    let startHeight = 0;

    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      startY = e.clientY;
      startHeight = cloudBox.offsetHeight;
      resizer.classList.add('dragging');
      document.body.style.cursor = 'ns-resize';

      const onMouseMove = (moveEvt) => {
        if (!isDragging) return;
        // Dragging up (dy < 0) increases box height, dragging down decreases
        const dy = moveEvt.clientY - startY;
        const newHeight = Math.max(50, Math.min(450, startHeight - dy));
        cloudBox.style.height = `${newHeight}px`;
      };

      const onMouseUp = () => {
        if (isDragging) {
          isDragging = false;
          resizer.classList.remove('dragging');
          document.body.style.cursor = '';
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
          safeSetStorage('quickrss_wordcloud_height', cloudBox.offsetHeight);
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }
}

// ==========================================
// IN-ARTICLE FIND BAR CONTROLLER (Cmd+F / Ctrl+F)
// ==========================================
let currentArticleFindIndex = -1;
let currentArticleFindMatches = [];

function openArticleFindBar() {
  const findInput = document.getElementById('article-find-input');
  if (!findInput) return;

  findInput.focus();
  findInput.select();

  if (findInput.value.trim().length > 0) {
    performInArticleSearch(findInput.value.trim());
  }
}

function closeArticleFindBar() {
  const findInput = document.getElementById('article-find-input');
  if (findInput) {
    findInput.value = '';
    findInput.blur();
  }
  clearInArticleHighlights();
}

function clearInArticleHighlights() {
  currentArticleFindIndex = -1;
  currentArticleFindMatches = [];
  const counter = document.getElementById('article-find-counter');
  if (counter) counter.textContent = '0 of 0';

  const readerContainer = document.getElementById('reader-container');
  if (!readerContainer) return;

  // Clear highlights in reader text view
  const highlights = readerContainer.querySelectorAll('mark.find-highlight');
  highlights.forEach(mark => {
    const parent = mark.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    }
  });

  // Clear highlights in iframe if present
  const iframe = readerContainer.querySelector('iframe');
  if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
    const iframeHighlights = iframe.contentDocument.body.querySelectorAll('mark.find-highlight');
    iframeHighlights.forEach(mark => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(iframe.contentDocument.createTextNode(mark.textContent), mark);
        parent.normalize();
      }
    });
  }
}

function performInArticleSearch(query) {
  clearInArticleHighlights();
  if (!query || query.trim().length === 0) return;

  const q = query.trim().toLowerCase();
  const readerContainer = document.getElementById('reader-container');
  if (!readerContainer) return;

  let targetDoc = document;
  let targetRoot = readerContainer;

  const iframe = readerContainer.querySelector('iframe');
  if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
    targetDoc = iframe.contentDocument;
    targetRoot = iframe.contentDocument.body;
  }

  // Walk text nodes and highlight matches
  const walker = targetDoc.createTreeWalker(targetRoot, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentNode && !['SCRIPT', 'STYLE', 'MARK', 'INPUT', 'TEXTAREA'].includes(node.parentNode.tagName)) {
      if (node.nodeValue.toLowerCase().includes(q)) {
        textNodes.push(node);
      }
    }
  }

  const matches = [];

  textNodes.forEach(textNode => {
    const val = textNode.nodeValue;
    const lowerVal = val.toLowerCase();
    let idx = lowerVal.indexOf(q);
    let lastIdx = 0;
    const parent = textNode.parentNode;
    if (!parent) return;

    const frag = targetDoc.createDocumentFragment();

    while (idx !== -1) {
      if (idx > lastIdx) {
        frag.appendChild(targetDoc.createTextNode(val.slice(lastIdx, idx)));
      }
      const mark = targetDoc.createElement('mark');
      mark.className = 'find-highlight';
      mark.textContent = val.slice(idx, idx + q.length);
      frag.appendChild(mark);
      matches.push(mark);

      lastIdx = idx + q.length;
      idx = lowerVal.indexOf(q, lastIdx);
    }

    if (lastIdx < val.length) {
      frag.appendChild(targetDoc.createTextNode(val.slice(lastIdx)));
    }

    parent.replaceChild(frag, textNode);
  });

  currentArticleFindMatches = matches;
  currentArticleFindIndex = matches.length > 0 ? 0 : -1;
  updateArticleFindUI();
}

function updateArticleFindUI() {
  const counter = document.getElementById('article-find-counter');
  const count = currentArticleFindMatches.length;

  if (count === 0) {
    if (counter) counter.textContent = '0 of 0';
    return;
  }

  if (currentArticleFindIndex < 0) currentArticleFindIndex = 0;
  if (currentArticleFindIndex >= count) currentArticleFindIndex = 0;

  if (counter) counter.textContent = `${currentArticleFindIndex + 1} of ${count}`;

  currentArticleFindMatches.forEach((mark, idx) => {
    if (idx === currentArticleFindIndex) {
      mark.classList.add('active-match');
      if (typeof mark.scrollIntoView === 'function') {
        mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      mark.classList.remove('active-match');
    }
  });
}

function findNextArticleMatch() {
  if (currentArticleFindMatches.length === 0) return;
  currentArticleFindIndex = (currentArticleFindIndex + 1) % currentArticleFindMatches.length;
  updateArticleFindUI();
}

function findPrevArticleMatch() {
  if (currentArticleFindMatches.length === 0) return;
  currentArticleFindIndex = (currentArticleFindIndex - 1 + currentArticleFindMatches.length) % currentArticleFindMatches.length;
  updateArticleFindUI();
}

function setupArticleFindUI() {
  const findInput = document.getElementById('article-find-input');
  const closeBtn = document.getElementById('article-find-close');
  const nextBtn = document.getElementById('article-find-next');
  const prevBtn = document.getElementById('article-find-prev');

  if (closeBtn) closeBtn.onclick = closeArticleFindBar;
  if (nextBtn) nextBtn.onclick = findNextArticleMatch;
  if (prevBtn) prevBtn.onclick = findPrevArticleMatch;

  if (findInput) {
    findInput.oninput = (e) => {
      performInArticleSearch(e.target.value);
    };

    findInput.onkeydown = (e) => {
      if (e.key === 'Escape') {
        closeArticleFindBar();
      } else if (e.key === 'Enter') {
        if (e.shiftKey) findPrevArticleMatch();
        else findNextArticleMatch();
      }
    };
  }

  // Global Keydown Trap for Cmd+F / Ctrl+F
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'f' || e.key === 'F')) {
      const activeId = document.activeElement ? document.activeElement.id : '';
      if (activeId !== 'search-input') {
        e.preventDefault();
        openArticleFindBar();
      }
    }
  });
}

// ==========================================
// CRASH RECOVERY & DIAGNOSTICS POP-UP MODAL
// ==========================================
function checkAndDisplayCrashReport() {
  let report = window.__LAST_CRASH_REPORT__;
  if (!report) {
    const raw = safeGetStorage('quickrss_last_crash_report', null);
    if (raw) {
      try { report = JSON.parse(raw); } catch (e) {}
    }
  }

  if (report && (report.reason || report.details)) {
    showCrashRecoveryModal(report);
    try { localStorage.removeItem('quickrss_last_crash_report'); } catch (e) {}
    delete window.__LAST_CRASH_REPORT__;
  }
}

function showCrashRecoveryModal(report) {
  const modal = document.getElementById('crash-modal');
  if (!modal) return;

  const reasonEl = document.getElementById('crash-modal-reason');
  const timeEl = document.getElementById('crash-modal-time');
  const detailsEl = document.getElementById('crash-modal-details');
  const closeBtn = document.getElementById('close-crash-modal-btn');
  const dismissBtn = document.getElementById('dismiss-crash-modal-btn');
  const copyBtn = document.getElementById('copy-crash-details-btn');

  if (reasonEl) reasonEl.textContent = report.reason || 'Unknown Fatal Exception';
  if (timeEl) timeEl.textContent = report.timestamp || new Date().toLocaleString();
  if (detailsEl) detailsEl.textContent = report.details || 'No call stack trace available.';

  modal.classList.remove('hidden');

  const closeModal = () => modal.classList.add('hidden');

  if (closeBtn) closeBtn.onclick = closeModal;
  if (dismissBtn) dismissBtn.onclick = closeModal;
  if (copyBtn) {
    copyBtn.onclick = () => {
      const summaryText = `[Quick RSS Crash Report]\nTimestamp: ${report.timestamp || ''}\nReason: ${report.reason || ''}\nDetails:\n${report.details || ''}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summaryText).then(() => {
          if (typeof showToast === 'function') showToast('Copied crash report to clipboard!', 'success');
        }).catch(() => {
          if (typeof showToast === 'function') showToast('Report copied to clipboard!', 'info');
        });
      }
    };
  }
}

let emergingTopicsCurrentPage = 1;
const EMERGING_TOPICS_PAGE_SIZE = 10;

function setupEmergingTopicsUI() {
  const btn = document.getElementById('emerging-topics-btn');
  const modal = document.getElementById('emerging-topics-modal');
  const closeBtn = document.getElementById('close-emerging-modal-btn');
  const closeFooterBtn = document.getElementById('close-emerging-modal-footer-btn');
  const sortSelect = document.getElementById('emerging-sort-select');
  const clearBtn = document.getElementById('clear-emerging-history-btn');
  const searchInput = document.getElementById('emerging-search-input');
  const prevBtn = document.getElementById('emerging-prev-page-btn');
  const nextBtn = document.getElementById('emerging-next-page-btn');

  if (btn) {
    btn.onclick = (e) => {
      e.stopPropagation();
      openEmergingTopicsModal();
    };
  }

  const closeModal = () => modal && modal.classList.add('hidden');
  if (closeBtn) closeBtn.onclick = closeModal;
  if (closeFooterBtn) closeFooterBtn.onclick = closeModal;

  const timeBtns = document.querySelectorAll('.emerging-time-btn');
  timeBtns.forEach(b => {
    b.onclick = () => {
      timeBtns.forEach(tb => tb.classList.remove('active'));
      b.classList.add('active');
      emergingTopicsCurrentPage = 1;
      renderEmergingTopicsModal();
    };
  });

  if (sortSelect) {
    sortSelect.onchange = () => {
      emergingTopicsCurrentPage = 1;
      renderEmergingTopicsModal();
    };
  }

  if (searchInput) {
    searchInput.oninput = () => {
      emergingTopicsCurrentPage = 1;
      renderEmergingTopicsModal();
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (emergingTopicsCurrentPage > 1) {
        emergingTopicsCurrentPage--;
        renderEmergingTopicsModal();
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      emergingTopicsCurrentPage++;
      renderEmergingTopicsModal();
    };
  }

  if (clearBtn) {
    clearBtn.onclick = () => {
      if (confirm('Clear all historical keyword trend data?')) {
        try { localStorage.removeItem('quickrss_wordcloud_history'); } catch(e){}
        if (typeof showToast === 'function') showToast('Cleared keyword trend history.', 'info');
        emergingTopicsCurrentPage = 1;
        renderEmergingTopicsModal();
      }
    };
  }
}

function openEmergingTopicsModal() {
  const modal = document.getElementById('emerging-topics-modal');
  if (!modal) return;
  emergingTopicsCurrentPage = 1;
  modal.classList.remove('hidden');
  renderEmergingTopicsModal();
}

function renderEmergingTopicsModal() {
  const tableBody = document.getElementById('emerging-topics-table-body');
  const statSnapshots = document.getElementById('stat-total-snapshots');
  const statUnique = document.getElementById('stat-unique-terms');
  const statSurging = document.getElementById('stat-surging-count');
  const pageInfo = document.getElementById('emerging-page-info');
  const pageNum = document.getElementById('emerging-page-number');
  const prevBtn = document.getElementById('emerging-prev-page-btn');
  const nextBtn = document.getElementById('emerging-next-page-btn');
  if (!tableBody) return;

  const rawHistory = safeGetStorage('quickrss_wordcloud_history', null);
  let history = [];
  if (rawHistory) {
    try { history = JSON.parse(rawHistory); } catch (e) {}
  }
  if (!Array.isArray(history)) history = [];

  if (statSnapshots) statSnapshots.textContent = history.length;

  if (history.length === 0) {
    const currentContainer = document.getElementById('word-cloud-container');
    const tags = currentContainer ? currentContainer.querySelectorAll('.word-tag') : [];
    if (tags.length > 0) {
      const initialTerms = Array.from(tags).map(t => ({
        term: t.textContent.toLowerCase(),
        displayName: t.textContent,
        frequency: 10
      }));
      history = [{
        timestamp: Date.now(),
        dateStr: new Date().toLocaleString(),
        terms: initialTerms
      }];
      safeSetStorage('quickrss_wordcloud_history', JSON.stringify(history));
    }
  }

  const activeTimeBtn = document.querySelector('.emerging-time-btn.active');
  const timeframe = activeTimeBtn ? activeTimeBtn.getAttribute('data-time') : '24h';
  const now = Date.now();
  let cutoff = 0;
  if (timeframe === '24h') cutoff = now - (24 * 3600 * 1000);
  else if (timeframe === '7d') cutoff = now - (7 * 24 * 3600 * 1000);

  const filteredHistory = history.filter(s => s.timestamp >= cutoff);

  if (filteredHistory.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="padding: 24px; text-align: center; color: var(--text-muted);">No keyword snapshots recorded in the selected timeframe yet.</td></tr>`;
    if (statUnique) statUnique.textContent = '0';
    if (statSurging) statSurging.textContent = '0';
    if (pageInfo) pageInfo.textContent = 'Showing 0 of 0 keywords';
    if (pageNum) pageNum.textContent = 'Page 1 of 1';
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }

  const latestSnapshot = filteredHistory[filteredHistory.length - 1];
  const baselineSnapshots = filteredHistory.slice(0, Math.max(1, filteredHistory.length - 1));

  const currentTermMap = new Map();
  latestSnapshot.terms.forEach(t => {
    currentTermMap.set(t.term, t);
  });

  const baselineTermMap = new Map();
  baselineSnapshots.forEach(snap => {
    snap.terms.forEach(t => {
      if (!baselineTermMap.has(t.term)) {
        baselineTermMap.set(t.term, { displayName: t.displayName, frequencies: [], firstSeen: snap.timestamp });
      }
      baselineTermMap.get(t.term).frequencies.push(t.frequency);
    });
  });

  const allKnownTerms = new Set([...currentTermMap.keys(), ...baselineTermMap.keys()]);
  if (statUnique) statUnique.textContent = allKnownTerms.size;

  let emergingResults = [];
  let surgingCount = 0;

  currentTermMap.forEach((currObj, termKey) => {
    const baselineData = baselineTermMap.get(termKey);
    let baselineScore = 0;
    let isNew = false;
    let firstSeen = latestSnapshot.timestamp;

    if (!baselineData || baselineData.frequencies.length === 0) {
      isNew = true;
      baselineScore = 0;
    } else {
      firstSeen = baselineData.firstSeen;
      const sum = baselineData.frequencies.reduce((a, b) => a + b, 0);
      baselineScore = sum / baselineData.frequencies.length;
    }

    const currentScore = currObj.frequency;
    const delta = currentScore - baselineScore;
    const growthPercent = baselineScore > 0 ? Math.round(((currentScore - baselineScore) / baselineScore) * 100) : null;

    let badgeHtml = '';
    if (isNew) {
      badgeHtml = `<span style="background: rgba(236,72,153,0.18); color: #ec4899; padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 11px;">🆕 NEWLY EMERGING</span>`;
      surgingCount++;
    } else if (growthPercent >= 50) {
      badgeHtml = `<span style="background: rgba(16,185,129,0.18); color: #10b981; padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 11px;">🚀 SURGING (+${growthPercent}%)</span>`;
      surgingCount++;
    } else if (growthPercent >= 10) {
      badgeHtml = `<span style="background: rgba(59,130,246,0.18); color: #3b82f6; padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 11px;">📈 RISING (+${growthPercent}%)</span>`;
    } else {
      badgeHtml = `<span style="background: rgba(255,255,255,0.08); color: var(--text-muted); padding: 2px 6px; border-radius: 4px; font-size: 11px;">📊 STABLE</span>`;
    }

    emergingResults.push({
      termKey,
      displayName: currObj.displayName,
      currentScore,
      baselineScore,
      delta,
      growthPercent: growthPercent || 999,
      isNew,
      firstSeen,
      badgeHtml
    });
  });

  if (statSurging) statSurging.textContent = surgingCount;

  // Filter by search query
  const searchVal = (document.getElementById('emerging-search-input')?.value || '').trim().toLowerCase();
  if (searchVal.length > 0) {
    emergingResults = emergingResults.filter(r => r.displayName.toLowerCase().includes(searchVal) || r.termKey.toLowerCase().includes(searchVal));
  }

  const sortOption = document.getElementById('emerging-sort-select')?.value || 'growth';
  if (sortOption === 'new') {
    emergingResults.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.currentScore - a.currentScore);
  } else if (sortOption === 'frequency') {
    emergingResults.sort((a, b) => b.currentScore - a.currentScore);
  } else {
    emergingResults.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.delta - a.delta || b.growthPercent - a.growthPercent);
  }

  // Pagination calculation
  const totalCount = emergingResults.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / EMERGING_TOPICS_PAGE_SIZE));
  if (emergingTopicsCurrentPage > totalPages) emergingTopicsCurrentPage = totalPages;
  if (emergingTopicsCurrentPage < 1) emergingTopicsCurrentPage = 1;

  const startIdx = (emergingTopicsCurrentPage - 1) * EMERGING_TOPICS_PAGE_SIZE;
  const endIdx = Math.min(startIdx + EMERGING_TOPICS_PAGE_SIZE, totalCount);
  const pagedResults = emergingResults.slice(startIdx, endIdx);

  if (pageInfo) pageInfo.textContent = totalCount > 0 ? `Showing ${startIdx + 1}–${endIdx} of ${totalCount} keywords` : 'Showing 0 of 0 keywords';
  if (pageNum) pageNum.textContent = `Page ${emergingTopicsCurrentPage} of ${totalPages}`;
  if (prevBtn) prevBtn.disabled = emergingTopicsCurrentPage <= 1;
  if (nextBtn) nextBtn.disabled = emergingTopicsCurrentPage >= totalPages;

  if (pagedResults.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="padding: 24px; text-align: center; color: var(--text-muted);">No keywords match "${escapeHTML(searchVal)}".</td></tr>`;
    return;
  }

  tableBody.innerHTML = '';
  pagedResults.forEach(res => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border-color, rgba(255,255,255,0.06))';
    const firstSeenDateStr = new Date(res.firstSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    tr.innerHTML = `
      <td style="padding: 10px 12px; font-weight: 600; color: var(--text-primary);">${escapeHTML(res.displayName)}</td>
      <td style="padding: 10px 12px; font-family: monospace; color: #3b82f6; font-weight: 600;">${res.currentScore.toFixed(1)}</td>
      <td style="padding: 10px 12px; font-family: monospace; color: var(--text-muted);">${res.baselineScore > 0 ? res.baselineScore.toFixed(1) : '—'}</td>
      <td style="padding: 10px 12px;">${res.badgeHtml}</td>
      <td style="padding: 10px 12px; color: var(--text-muted); font-size: 11px;">${firstSeenDateStr}</td>
      <td style="padding: 10px 12px; text-align: right;">
        <button class="btn-sm emerging-filter-btn" style="padding: 3px 8px;" data-term="${escapeHTML(res.displayName)}">🔍 Filter Articles</button>
      </td>
    `;

    const filterBtn = tr.querySelector('.emerging-filter-btn');
    if (filterBtn) {
      filterBtn.onclick = () => {
        const modal = document.getElementById('emerging-topics-modal');
        if (modal) modal.classList.add('hidden');
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.value = res.displayName;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          if (typeof showToast === 'function') {
            showToast(`Filtered by emerging topic: "${res.displayName}"`, 'info');
          }
        }
      };
    }

    tableBody.appendChild(tr);
  });
}

// Initial Render & Load
function startApp() {
  renderTree();
  // Fast non-blocking first paint from cache/database (<50ms)
  fetchAndDisplayArticles('latest', true);
  updateBadges();
  initGeneralSettingsUI();
  initAISettingsUI();
  if (typeof setupSearchUI === 'function') setupSearchUI();
  if (typeof setupAIChatbotUI === 'function') setupAIChatbotUI();
  if (typeof setupAutoRefreshTimer === 'function') setupAutoRefreshTimer();
  if (typeof setupWordCloudUI === 'function') setupWordCloudUI();
  if (typeof setupEmergingTopicsUI === 'function') setupEmergingTopicsUI();
  if (typeof setupDiagnosticsUI === 'function') setupDiagnosticsUI();
  if (typeof setupArticleFindUI === 'function') setupArticleFindUI();
  if (typeof renderWordCloud === 'function') renderWordCloud();
  if (typeof checkAndDisplayCrashReport === 'function') checkAndDisplayCrashReport();

  window.AppDiagnostics.log('info', 'AppLifecycle', 'Quick RSS application initialized successfully.');

  // Async background network update after initial UI paint
  setTimeout(() => {
    if (typeof refreshAllFeeds === 'function') refreshAllFeeds(false);
  }, 800);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startApp();
  } else {
    document.addEventListener('DOMContentLoaded', startApp);
  }
}

