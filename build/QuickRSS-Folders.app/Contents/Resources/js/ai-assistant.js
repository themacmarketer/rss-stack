// AI Assistant & RAG Engine Module

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
  const panel = document.getElementById('ai-chatbot-panel');
  const triggerBtn = document.getElementById('ai-assistant-toggle-btn');
  const closeBtn = document.getElementById('ai-close-btn');
  const pinBtn = document.getElementById('ai-pin-btn');
  const settingsBtn = document.getElementById('ai-settings-btn');
  const sendBtn = document.getElementById('ai-chat-send-btn');
  const clearBtn = document.getElementById('ai-chat-clear-btn');
  const chatInput = document.getElementById('ai-chat-input');
  const chatThread = document.getElementById('ai-chat-thread');
  const resizer = document.getElementById('ai-popover-resizer');

  if (!panel) return;

  let isAIPinned = safeGetStorage('quickrss_ai_pinned', 'true') === 'true';

  function applyPinState() {
    if (isAIPinned) {
      panel.style.top = '';
      panel.style.left = '';
      panel.style.right = '';
      panel.style.width = '';
      panel.style.position = '';
      panel.style.transform = '';
      panel.classList.add('pinned');
      if (pinBtn) {
        pinBtn.classList.add('active');
        pinBtn.title = "Unpin / Unlock AI Assistant Window";
      }
    } else {
      panel.style.height = '';
      panel.style.width = '';
      panel.style.top = '';
      panel.style.left = '';
      panel.style.right = '';
      panel.style.position = '';
      panel.style.transform = '';
      panel.classList.remove('pinned');
      if (pinBtn) {
        pinBtn.classList.remove('active');
        pinBtn.title = "Pin / Lock AI Assistant Window in place";
      }
    }
  }

  applyPinState();

  if (triggerBtn) {
    triggerBtn.onclick = (e) => {
      e.stopPropagation();
      const isOpening = panel.classList.contains('hidden');
      panel.classList.toggle('hidden');
      if (isOpening) {
        applyPinState();
      }
    };
  }

  if (pinBtn) {
    pinBtn.onclick = (e) => {
      e.stopPropagation();
      isAIPinned = !isAIPinned;
      safeSetStorage('quickrss_ai_pinned', isAIPinned ? 'true' : 'false');
      applyPinState();
      if (isAIPinned) {
        showToast('📌 AI Assistant pinned inside column below search bar', 'success');
      } else {
        showToast('Unpinned AI Assistant window', 'info');
      }
    };
  }

  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      panel.classList.add('hidden');
    };
  }

  document.addEventListener('click', (e) => {
    if (!isAIPinned && !panel.classList.contains('hidden') && !panel.contains(e.target) && triggerBtn && !triggerBtn.contains(e.target)) {
      panel.classList.add('hidden');
    }
  });

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

  let contextSnippet = 'Here are the relevant RSS news articles currently available in Quick RSS:\n';
  finalArticles.forEach((art, idx) => {
    contextSnippet += `\n[Article ${idx + 1}] Title: "${art.title}" | Feed: ${art.feedTitle} | Date: ${art.pubDate}\nSummary: ${art.summary || 'N/A'}\nURL: ${art.link || ''}\n`;
  });

  const systemPrompt = `You are the AI News Assistant built into Quick RSS. Answer the user's question accurately using the live news context provided below. Be concise and informative.

CITATION & TOPIC AGGREGATION RULES:
1. When answering queries about trending topics, news overviews, or specific subject searches: ALWAYS group and aggregate related articles under overarching topic headings or clear bullet points.
2. For each topic/point, cite ALL relevant supporting articles from the provided context (e.g., [Article 1: Title](URL), [Article 3: Title](URL)). Do NOT restrict a topic to only a single citation if multiple articles discuss or relate to that topic.
3. Use markdown links for citations in the format [Article N: Title](URL) or [Article N](URL).

${contextSnippet}`;

  try {
    if (provider === 'openai') {
      const token = getOpenAIOAuthToken();
      if (!token) {
        return "⚠️ OpenAI OAuth login required. Please click the ⚙️ icon or open Preferences > AI Assistant and click 'Login with OpenAI (OAuth)' to authenticate.";
      }
      return await queryOpenAI(systemPrompt, userQuery, modelName, token);
    } else if (provider === 'claude') {
      const token = getClaudeOAuthToken();
      if (!token) {
        return "⚠️ Claude OAuth login required. Please click the ⚙️ icon or open Preferences > AI Assistant and click 'Login with Claude (OAuth)' to authenticate.";
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
    return `❌ AI API Error: ${err.message || err.toString()}`;
  }

  return "⚠️ Unknown LLM Provider selected.";
}

async function queryOpenAI(systemPrompt, userQuery, model, apiKey) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
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
  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error?.message || `HTTP ${res.status}`);
  }
  const json = await res.json();
  return json.choices?.[0]?.message?.content || 'No output generated from OpenAI.';
}

async function queryClaude(systemPrompt, userQuery, model, apiKey) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
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
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
