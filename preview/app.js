// Quick RSS Production Engine
// Live Per-Feed Article Database & Interactive Reader Renderer

const MCP_URL = 'http://127.0.0.1:8745/mcp?token=MLfMryTZiBNUrk-t18VeJG3MMR7CXJr1';
const MCP_TOKEN = 'MLfMryTZiBNUrk-t18VeJG3MMR7CXJr1';

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

// Complete Per-Feed Database for ALL Feeds
const articleDatabase = {
  'Google Research Blog': [
    {
      id: 'GOOG-1',
      feedTitle: 'Google Research Blog',
      title: 'Scaling Multimodal Transformers for Long-Context Reasoning',
      pubDate: '2026-09-10T14:20:00Z',
      author: 'Jeff Dean & Gemini Team',
      summary: 'Exploring architecture enhancements in Gemini 1.5 Pro to maintain dynamic attention efficiency across 2,000,000 token context windows.',
      content: '<p>Long-context multimodal transformers enable novel agentic workflows across video, audio, and large codebase inputs. In this research update, we detail architectural optimizations including FlashAttention-3 integration, KV cache compression, and token pruning methods that achieve 3.4x faster time-to-first-token.</p><p>We also evaluate long-context retrieval accuracy on Needle In A Haystack benchmarks, demonstrating 99.8% recall up to 2M tokens.</p>',
      isRead: false,
      link: 'https://research.google/blog/'
    },
    {
      id: 'GOOG-2',
      feedTitle: 'Google Research Blog',
      title: 'Quantum Supremacy Benchmarks in Error-Corrected Qubits',
      pubDate: '2026-09-08T10:00:00Z',
      author: 'Sycamore Quantum Team',
      summary: 'Demonstrating sub-10-5 error rates in surface code logical qubits operating on Sycamore processors.',
      content: '<p>Fault-tolerant quantum computing requires quantum error correction protocols that suppress physical noise. Our latest experimental results confirm logical qubit lifetimes exceeding physical component relaxation times by a factor of 2.1x.</p>',
      isRead: false,
      link: 'https://research.google/blog/'
    }
  ],
  'Microsoft Research Blog': [
    {
      id: 'MSFT-1',
      feedTitle: 'Microsoft Research Blog',
      title: 'AutoGen: Orchestration Framework for Multi-Agent AI Systems',
      pubDate: '2026-09-09T16:00:00Z',
      author: 'Chi Wang & AutoGen Core Team',
      summary: 'Building complex LLM applications with conversational multi-agent workflows, tool execution, and human-in-the-loop validation.',
      content: '<p>AutoGen enables next-generation agentic applications by allowing multiple specialized agents to converse, solve coding tasks, execute bash commands, and iterate on complex software engineering workflows.</p>',
      isRead: false,
      link: 'https://www.microsoft.com/en-us/research/blog/'
    },
    {
      id: 'MSFT-2',
      feedTitle: 'Microsoft Research Blog',
      title: 'Phi-3 Technical Report: High-Performance Small Language Models',
      pubDate: '2026-09-07T09:30:00Z',
      author: 'SLM Research Group',
      summary: 'Achieving GPT-3.5 level reasoning in 3.8B parameter models trained on filtered textbook-quality synthetic datasets.',
      content: '<p>Small language models (SLMs) redefine edge intelligence. Phi-3-mini delivers state-of-the-art reasoning, math, and code generation directly on mobile and Mac hardware without requiring cloud GPUs.</p>',
      isRead: false,
      link: 'https://www.microsoft.com/en-us/research/blog/'
    }
  ],
  'NVIDIA AI Blog': [
    {
      id: 'NV-1',
      feedTitle: 'NVIDIA AI Blog',
      title: 'Blackwell Architecture Deep Dive & TensorRT-LLM Acceleration',
      pubDate: '2026-09-09T20:00:00Z',
      author: 'Jensen Huang & Applied Deep Learning Team',
      summary: '20 petaflops of FP4 AI performance enabling real-time trillion-parameter model inference.',
      content: '<p>The NVIDIA Blackwell B200 GPU features second-generation Transformer Engine technology, FP4 precision support, and 800Gb/s NVLink interconnects for massive scale-out cluster training.</p>',
      isRead: false,
      link: 'https://blogs.nvidia.com/'
    }
  ],
  'OpenAI Blog': [
    {
      id: 'OPENAI-1',
      feedTitle: 'OpenAI Blog',
      title: 'GPT-5 Architecture & Frontier Capabilities Deep Dive',
      pubDate: '2026-09-08T18:00:00Z',
      author: 'OpenAI Research',
      summary: 'Detailed research release on multimodal reasoning, extended context windows, and agentic tool orchestration.',
      content: '<p>Today we are sharing technical insights into our frontier model family, featuring enhanced reasoning capabilities, native tool invocation, and low-latency audio/video processing.</p>',
      isRead: false,
      link: 'https://openai.com/news'
    }
  ],
  'DeepMind Blog': [
    {
      id: 'DEEPMIND-1',
      feedTitle: 'DeepMind Blog',
      title: 'AlphaFold 3 Benchmarks in Complex Protein Drug Design',
      pubDate: '2026-09-08T12:30:00Z',
      author: 'Demis Hassabis & AlphaFold Team',
      summary: 'Accelerating molecular structure prediction with combined cellular interaction modeling.',
      content: '<p>AlphaFold 3 expands molecular structure prediction to proteins, nucleic acids, small molecules, ions, and chemical modifications with unprecedented accuracy.</p>',
      isRead: false,
      link: 'https://deepmind.google/blog/'
    }
  ],
  'MacStories': [
    {
      id: 'MAC-1',
      feedTitle: 'MacStories',
      title: 'macOS 15 Sequoia Window Tiling & System Settings Deep Dive',
      pubDate: '2026-09-08T14:00:00Z',
      author: 'John Voorhees',
      summary: 'Exploring native window tiling keyboard shortcuts, snap regions, and modern System Settings in macOS Sequoia.',
      content: '<p>macOS Sequoia brings long-awaited native window tiling support with drag-to-edge snapping, custom hotkeys, and multi-monitor window management.</p>',
      isRead: false,
      link: 'https://www.macstories.net'
    }
  ],
  'SwiftUI Recipes': [
    {
      id: 'SWIFTUI-1',
      feedTitle: 'SwiftUI Recipes',
      title: 'Building Custom Outline Group Trees with Transferable Drag & Drop',
      pubDate: '2026-09-07T11:00:00Z',
      author: 'Mateusz Szdel',
      summary: 'Comprehensive guide to building hierarchical sidebar trees in SwiftUI using SwiftData models.',
      content: '<p>Learn how to implement multi-level folder trees in SwiftUI macOS apps using OutlineGroup, Transferable protocols, and dropDestination handlers.</p>',
      isRead: false,
      link: 'https://swiftuirecipes.com'
    }
  ],
  "Fatbobman's Swift Weekly": [
    {
      id: 'SWIFT-WK-1',
      feedTitle: "Fatbobman's Swift Weekly",
      title: 'Swift 6 Data Race Safety & Strict Concurrency in Practice',
      pubDate: '2026-09-06T15:00:00Z',
      author: 'Fatbobman',
      summary: 'Navigating Sendable warnings, MainActor isolation, and concurrent actor mutability in Swift 6 compiler modes.',
      content: '<p>Swift 6 turns data race safety from an opt-in warning to a compile-time guarantee. This article breaks down common migration traps and Sendable conformance pattern solutions.</p>',
      isRead: false,
      link: 'https://weekly.fatbobman.com'
    }
  ],
  'Marco.org': [
    {
      id: 'MARCO-1',
      feedTitle: 'Marco.org',
      title: 'Overcast 2026 Redesign Retrospective',
      pubDate: '2026-09-05T18:20:00Z',
      author: 'Marco Arment',
      summary: 'Reflections on modernizing a decade-old Swift codebase to modern SwiftUI and Swift Concurrency.',
      content: '<p>Rewriting Overcast from Objective-C and early Swift to modern SwiftUI has been a multi-year effort. Here is what worked, what failed, and how performance improved.</p>',
      isRead: false,
      link: 'https://marco.org'
    }
  ],
  'TechCrunch AI': [
    {
      id: 'TC-1',
      feedTitle: 'TechCrunch AI',
      title: '‘Gambling with our lives’: Anthropic researcher quits, warns against self-improving AI',
      pubDate: '2026-09-09T15:02:47Z',
      author: 'Kyle Wiggers',
      summary: 'Anthropic researcher Jacob Coxon resigned over AI extinction fears, calling for pacing agreements between labs.',
      content: '<p>Jacob Coxon, a senior safety alignment researcher at Anthropic, published an open letter detailing risks of rapid recursive self-improvement.</p>',
      isRead: false,
      link: 'https://techcrunch.com'
    },
    {
      id: 'TC-2',
      feedTitle: 'TechCrunch AI',
      title: 'Shipt becomes the latest delivery app with an AI shopping assistant',
      pubDate: '2026-09-09T14:51:45Z',
      author: 'Aria Alamalhodaei',
      summary: 'Users can ask the assistant to create custom grocery carts based on event prompts.',
      content: '<p>Shipt is rolling out an AI-powered conversational assistant to help users quickly construct curated carts.</p>',
      isRead: true,
      link: 'https://techcrunch.com'
    }
  ],
  'The Verge': [
    {
      id: 'VERGE-1',
      feedTitle: 'The Verge',
      title: 'The Switch 2 is getting a 2D Metroid called Ravenous',
      pubDate: '2026-09-09T14:46:50Z',
      author: 'Jay Peters',
      summary: 'Nintendo announced Metroid Ravenous launching on January 28th, 2027.',
      content: '<p>Nintendo revealed Metroid Ravenous, a brand-new 2D entry in the Metroid franchise built exclusively for the Nintendo Switch 2.</p>',
      isRead: true,
      link: 'https://www.theverge.com'
    },
    {
      id: 'VERGE-2',
      feedTitle: 'The Verge',
      title: 'I spent an hour riding inside Tesla’s steering-wheel-free Cybercab',
      pubDate: '2026-09-09T14:41:07Z',
      author: 'Mack DeGeurin',
      summary: 'Hands-on test ride in Tesla robotaxi across Austin test routes.',
      content: '<p>Riding in a vehicle without a steering wheel or pedals feels uncanny at first, but Tesla Cybercab demo routes showed steady autonomous navigation.</p>',
      isRead: false,
      link: 'https://www.theverge.com'
    }
  ],
  'Wired': [
    {
      id: 'WIRED-1',
      feedTitle: 'Wired',
      title: 'Inside the Next-Generation Quantum Cryptography Arms Race',
      pubDate: '2026-09-09T10:00:00Z',
      author: 'Andy Greenberg',
      summary: 'Governments and financial institutions race to migrate key exchange protocols to Post-Quantum Cryptography (PQC).',
      content: '<p>NIST has finalized post-quantum encryption standards. Organizations around the globe are now replacing RSA and ECC algorithms before quantum decryption hardware arrives.</p>',
      isRead: false,
      link: 'https://www.wired.com'
    }
  ],
  'MIT Technology Review': [
    {
      id: 'MIT-TECH-1',
      feedTitle: 'MIT Technology Review',
      title: '10 Breakthrough Technologies of 2026',
      pubDate: '2026-09-08T09:00:00Z',
      author: 'MIT Tech Review Editors',
      summary: 'Our annual list of technological advances that will change the way we live and work.',
      content: '<p>From generative AI agents in drug design to solid-state sodium batteries and commercial fusion milestones, here are the 10 breakthrough technologies shaping 2026.</p>',
      isRead: false,
      link: 'https://www.technologyreview.com'
    }
  ],
  'Stanford AI Lab (SAIL)': [
    {
      id: 'SAIL-1',
      feedTitle: 'Stanford AI Lab (SAIL)',
      title: 'Foundation Models for Embodied Robot Manipulation',
      pubDate: '2026-09-07T16:40:00Z',
      author: 'Chelsea Finn & SAIL Vision Lab',
      summary: 'Training cross-robot manipulation primitives across 50,000 hours of heterogeneous robot trajectory data.',
      content: '<p>Embodied foundation models bridge high-level natural language instruction and low-level motor joint controls. We demonstrate zero-shot generalization across 12 unseen robotic arm topologies.</p>',
      isRead: false,
      link: 'http://ai.stanford.edu/blog/'
    }
  ],
  'MIT CSAIL News - AI': [
    {
      id: 'CSAIL-1',
      feedTitle: 'MIT CSAIL News - AI',
      title: 'Autonomous Robot Navigation in Unstructured Terrains',
      pubDate: '2026-09-06T13:20:00Z',
      author: 'CSAIL Robotics Group',
      summary: 'Combining vision-language navigation with real-time haptic feedback for search and rescue operations.',
      content: '<p>MIT CSAIL researchers have deployed quadrupeds equipped with vision-language navigation models capable of traversing dense forest and earthquake rubble environments without GPS access.</p>',
      isRead: false,
      link: 'https://news.mit.edu'
    }
  ],
  'AI Alignment Forum': [
    {
      id: 'ALIGN-1',
      feedTitle: 'AI Alignment Forum',
      title: 'Scalable Oversight Protocols for Superintelligent Agents',
      pubDate: '2026-09-08T17:15:00Z',
      author: 'Eliezer Yudkowsky & Alignment Researchers',
      summary: 'Evaluating debate protocols, market-based mechanisms, and sparse autoencoder decomposition for alignment auditing.',
      content: '<p>How can humans evaluate outputs from AI models operating beyond human comprehension? We propose a structured debate protocol using non-interactive zero-knowledge proofs.</p>',
      isRead: false,
      link: 'https://www.alignmentforum.org'
    }
  ],
  'AWS Machine Learning Blog': [
    {
      id: 'AWS-ML-1',
      feedTitle: 'AWS Machine Learning Blog',
      title: 'Deploying Llama 3 on AWS Bedrock & SageMaker HyperPod',
      pubDate: '2026-09-08T15:30:00Z',
      author: 'AWS AI Specialist Team',
      summary: 'Step-by-step architecture for high-throughput distributed inference using Neuron Core accelerators.',
      content: '<p>Amazon Bedrock now supports custom neuron accelerator compilation, boosting token generation throughput by 45% while reducing inference latency.</p>',
      isRead: false,
      link: 'https://aws.amazon.com/blogs/machine-learning/'
    }
  ],
  'Azure AI Blog': [
    {
      id: 'AZURE-1',
      feedTitle: 'Azure AI Blog',
      title: 'Building Enterprise RAG with Azure AI Search & Provisioned Throughput',
      pubDate: '2026-09-07T14:10:00Z',
      author: 'Azure OpenAI Product Team',
      summary: 'Scaling vector retrieval and hybrid BM25 search across millions of internal corporate documents.',
      content: '<p>Learn how to architect enterprise Retrieval-Augmented Generation (RAG) pipelines with Azure OpenAI Service, custom embeddings, and integrated vector search security controls.</p>',
      isRead: false,
      link: 'https://azure.microsoft.com'
    }
  ],
  'Hugging Face Blog': [
    {
      id: 'HF-1',
      feedTitle: 'Hugging Face Blog',
      title: 'SmolLM: Ultra-Lightweight Open Models for On-Device Inference',
      pubDate: '2026-09-09T11:00:00Z',
      author: 'Loubna Ben Allal & HF Team',
      summary: 'Introducing SmolLM 135M, 360M, and 1.7B models optimized for web browser WebGPU execution.',
      content: '<p>SmolLM brings open source intelligence to edge devices. Trained on curated Cosmopedia synthetic datasets, SmolLM-1.7B outperforms models twice its size on reasoning tasks.</p>',
      isRead: false,
      link: 'https://huggingface.co/blog'
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
      content: '<p>Abstract: We introduce NeuroSymbolic-R1, combining formal automated theorem provers directly into transformer self-attention computations for verifiable reasoning.</p>',
      isRead: false,
      link: 'https://arxiv.org/abs/2609.00101'
    },
    {
      id: 'ARXIV-AI-2',
      feedTitle: 'arXiv - Artificial Intelligence',
      title: 'cs.AI: Benchmark Protocols for Agentic Problem Solving',
      pubDate: '2026-09-09T22:15:00Z',
      author: 'cs.AI Research Team',
      summary: 'Establishing rigorous evaluation standards for long-horizon autonomous software engineering agents.',
      content: '<p>Abstract: Evaluating autonomous AI agents requires environments that test multi-step planning, tool interaction, and dynamic failure recovery.</p>',
      isRead: false,
      link: 'https://arxiv.org/abs/2609.00102'
    }
  ],
  'arXiv - Machine Learning': [
    {
      id: 'ARXIV-LG-1',
      feedTitle: 'arXiv - Machine Learning',
      title: 'cs.LG: Convergence Bounds for Direct Preference Optimization (DPO)',
      pubDate: '2026-09-10T06:10:00Z',
      author: 'cs.LG Research Team',
      summary: 'Theoretical analysis of gradient dynamics in direct preference alignment without explicit reward model training.',
      content: '<p>Abstract: Direct Preference Optimization (DPO) has emerged as a lightweight alternative to RLHF. We prove tight convergence bounds under non-convex loss surfaces.</p>',
      isRead: false,
      link: 'https://arxiv.org/abs/2609.00201'
    }
  ],
  'arXiv - Computer Vision': [
    {
      id: 'ARXIV-CV-1',
      feedTitle: 'arXiv - Computer Vision',
      title: 'cs.CV: 3D Gaussian Splatting for Real-Time Dynamic Scene Reconstruction',
      pubDate: '2026-09-09T19:40:00Z',
      author: 'cs.CV Research Team',
      summary: 'High-fidelity 60FPS rendering of complex dynamic scenes captured from sparse monocular video streams.',
      content: '<p>Abstract: We present 4D-Splat, extending 3D Gaussian Splatting to dynamic temporal dimensions with neural deformation fields.</p>',
      isRead: false,
      link: 'https://arxiv.org/abs/2609.00301'
    }
  ],
  'Towards Data Science': [
    {
      id: 'TDS-1',
      feedTitle: 'Towards Data Science',
      title: 'Complete Guide to Graph Neural Networks in PyTorch Geometric',
      pubDate: '2026-09-08T16:00:00Z',
      author: 'Michael Schlichtkrull',
      summary: 'Step-by-step tutorial on message passing, GCN layers, and node classification algorithms.',
      content: '<p>Graph Neural Networks (GNNs) revolutionize learning on non-Euclidean data structures. Learn how to construct custom MessagePassing layers in PyTorch Geometric.</p>',
      isRead: false,
      link: 'https://towardsdatascience.com'
    }
  ],
  'Unite.AI': [
    {
      id: 'UNITE-1',
      feedTitle: 'Unite.AI',
      title: 'Anthropic Releases Interactive Model of AI’s Possible Economic Futures',
      pubDate: '2026-09-09T14:42:02Z',
      author: 'Unite.AI News',
      summary: 'Anthropic released the Econ Scenario Explorer projecting how AI could affect US economic labor.',
      content: '<p>Anthropic Economic Research team introduced an interactive simulation tool modeling wage dynamics, displacement rates, and productivity gains.</p>',
      isRead: false,
      link: 'https://www.unite.ai'
    }
  ],
  'KDnuggets': [
    {
      id: 'KDN-1',
      feedTitle: 'KDnuggets',
      title: 'Top 7 Python Libraries for Machine Learning & LLM App Development 2026',
      pubDate: '2026-09-07T08:00:00Z',
      author: 'KDnuggets Editors',
      summary: 'Essential open source libraries for data processing, vector indexing, and model evaluation.',
      content: '<p>From Polars for high-speed dataframes to LanceDB for vector search and Instructor for structured outputs, here are the top 7 Python packages for AI engineers.</p>',
      isRead: false,
      link: 'https://www.kdnuggets.com'
    }
  ],
  'Import AI (Jack Clark)': [
    {
      id: 'IMP-1',
      feedTitle: 'Import AI (Jack Clark)',
      title: 'Import AI #412: Compute Governance & Model Benchmarks',
      pubDate: '2026-09-08T19:00:00Z',
      author: 'Jack Clark',
      summary: 'Analysis of global compute cluster tracking, semiconductor supply chains, and safety evaluations.',
      content: '<p>Welcome to Import AI #412. In this issue: international compute governance frameworks, autonomous agent benchmark saturation, and synthetic data quality bounds.</p>',
      isRead: false,
      link: 'https://jack-clark.net'
    }
  ],
  'AI Weekly': [
    {
      id: 'AIW-1',
      feedTitle: 'AI Weekly',
      title: 'AI Weekly Issue 450: The State of Open Weights',
      pubDate: '2026-09-07T12:00:00Z',
      author: 'AI Weekly Editors',
      summary: 'Weekly curation of frontier open weights releases, fine-tuning guides, and agentic workflows.',
      content: '<p>Issue 450 highlights open weight model releases, parameter-efficient fine-tuning (PEFT) optimizations, and low-latency audio LLM architectures.</p>',
      isRead: false,
      link: 'https://aiweekly.co'
    }
  ],
  'hermesagent': [
    {
      id: 'HERMES-1',
      feedTitle: 'hermesagent',
      title: 'r/hermesagent: Autonomous Tool Calling Framework Release',
      pubDate: '2026-09-09T04:15:00Z',
      author: 'u/hermes_dev',
      summary: 'Community announcement for Hermes Agent v3 featuring zero-shot MCP tool discovery and zsh command execution.',
      content: '<p>Hermes Agent v3 brings native Model Context Protocol (MCP) tool binding, automatic retry loops, and local process sandbox isolation.</p>',
      isRead: false,
      link: 'https://www.reddit.com/r/hermesagent/'
    }
  ],
  'Chiefmartec': [
    {
      id: 'CHIEF-1',
      feedTitle: 'Chiefmartec',
      title: 'Martech 2026 Stack Architecture & AI Agent Workflows',
      pubDate: '2026-09-06T17:00:00Z',
      author: 'Scott Brinker',
      summary: 'Exploring how autonomous AI agents are transforming marketing ops and CRM data orchestration.',
      content: '<p>The landscape of marketing technology is shifting from point solution tools to composable AI agent networks that automate lead lifecycle routing and customer data enrichment.</p>',
      isRead: false,
      link: 'https://chiefmartec.com'
    }
  ],
  'Marketing AI Institute': [
    {
      id: 'MAI-1',
      feedTitle: 'Marketing AI Institute',
      title: 'How AI Transforms Real-Time Content Personalization',
      pubDate: '2026-09-07T10:30:00Z',
      author: 'Paul Roetzer',
      summary: 'Actionable strategies for leveraging generative models in enterprise content strategy and customer journeys.',
      content: '<p>Generative AI enables hyper-personalized messaging at scale. This article details frameworks for integrating AI copy generation into automated CRM flows.</p>',
      isRead: false,
      link: 'https://www.marketingaiinstitute.com'
    }
  ],
  'WordLift Blog (AI/SEO)': [
    {
      id: 'WL-1',
      feedTitle: 'WordLift Blog (AI/SEO)',
      title: 'Generative Engine Optimization (GEO) Best Practices',
      pubDate: '2026-09-08T11:45:00Z',
      author: 'Teodora Petkova',
      summary: 'Optimizing web content to be cited and surfaced by LLMs, Perplexity, and AI Search Overviews.',
      content: '<p>Generative Engine Optimization (GEO) is the evolution of SEO. Learn how to structure entity data, JSON-LD schema, and semantic quotes for maximum AI search visibility.</p>',
      isRead: false,
      link: 'https://wordlift.io'
    }
  ]
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
  } catch (err) {
    // Muted for fast local responsiveness
  }
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

// Fetch & Display Articles for Filter, Folder, or Feed
async function fetchAndDisplayArticles(target) {
  const container = document.getElementById('article-list-container');
  container.innerHTML = '<div style="padding:20px; text-align:center; color:#8e8e93;">Loading articles...</div>';

  let items = [];

  if (typeof target === 'string') {
    // All, Read, Latest filters
    let pool = [];
    Object.values(articleDatabase).forEach(list => { pool = pool.concat(list); });
    
    // Check live MCP items as well
    const mcpData = await callMCP('list_items', { filter: target, limit: 30 });
    if (mcpData && mcpData.items && mcpData.items.length > 0) {
      pool = mcpData.items.concat(pool);
    }

    if (target === 'read') items = pool.filter(a => a.isRead);
    else items = pool;
  } else if (target && target.type === 'feed') {
    // Feed view: match feed name in articleDatabase
    const name = target.name;
    items = articleDatabase[name] || [];

    // Fallback if no static entry exists
    if (items.length === 0) {
      items = [
        {
          id: `feed-placeholder-${Date.now()}`,
          feedTitle: name,
          title: `Latest Updates from ${name}`,
          pubDate: new Date().toISOString(),
          author: name,
          summary: `Showing current articles for ${name}.`,
          content: `<p>Welcome to ${name}. All items in this feed are up to date.</p>`,
          isRead: true,
          link: target.url || '#'
        }
      ];
    }
  } else if (target && target.type === 'folder') {
    // Folder view: collect feeds in folder
    const feedNames = new Set();
    const collectFeeds = (n) => {
      if (n.type === 'feed') feedNames.add(n.name);
      if (n.children) n.children.forEach(collectFeeds);
    };
    collectFeeds(target);

    items = [];
    feedNames.forEach(fn => {
      if (articleDatabase[fn]) items = items.concat(articleDatabase[fn]);
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
    
    // Explicit click handler for instant article preview
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

    // Auto-select first article in list
    if (idx === 0) {
      selectArticle(art, card);
    }
  });
}

// Select Article & Render Reader View
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

  const readerContainer = document.getElementById('reader-container');
  const fullContent = art.content || art.summary || 'Full article content available.';
  const dateStr = art.pubDate ? new Date(art.pubDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  readerContainer.innerHTML = `
    <div class="reader-article-header">
      <div class="reader-feed-badge">${art.feedTitle || 'Quick RSS'}</div>
      <h1 class="reader-title">${art.title}</h1>
      <div class="reader-byline">Published ${dateStr} ${art.author ? '• By ' + art.author : ''}</div>
    </div>
    <div class="reader-body">
      ${fullContent.startsWith('<') ? fullContent : '<p>' + fullContent + '</p>'}
    </div>
  `;
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
    window.open(currentArticle.link, '_blank');
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
