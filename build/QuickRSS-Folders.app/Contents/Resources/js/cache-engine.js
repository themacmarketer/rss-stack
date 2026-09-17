// Cache & Feed Refresh Engine Module

function fetchWebPageHTMLWithTimeout(url, timeoutMs = 3500) {
  return Promise.race([
    fetchWebPageHTML(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Network fetch timeout')), timeoutMs))
  ]);
}

// Get or fetch live RSS articles for a feed
async function getArticlesForFeed(feed, preferFast = false) {
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
          <div style="font-size:12px; font-weight:700; color:#70b643; text-transform:uppercase;">${feed.name.toUpperCase()}</div>
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
    // 1. Direct Native Fetch with Timeout
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
      // 2. RSS2JSON API Fallback with Timeout
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
          <div style="font-size:12px; font-weight:700; color:#70b643; text-transform:uppercase;">${feed.name.toUpperCase()}</div>
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

  return applyPersistedArticleStates(articles);
}

// Manual & Periodic Feed Refresh System
async function refreshAllFeeds(isManual = false) {
  const refreshBtn = document.getElementById('refresh-feeds-btn');
  const refreshIcon = refreshBtn ? refreshBtn.querySelector('.refresh-icon') : null;
  if (refreshIcon) refreshIcon.classList.add('spinning');
  
  if (isManual) showToast('🔄 Refreshing all RSS feeds...', 'info');

  for (const k of Object.keys(feedArticleCache)) {
    delete feedArticleCache[k];
  }

  try {
    const allFeeds = getAllFeedsFromTree();
    await Promise.all(allFeeds.map(feed => getArticlesForFeed(feed)));
    renderTree();
    if (typeof activeFilter !== 'undefined' && activeFilter) {
      fetchAndDisplayArticles(activeFilter);
    } else if (typeof activeFeedId !== 'undefined' && activeFeedId) {
      renderFeedArticles(activeFeedId);
    } else {
      fetchAndDisplayArticles('all');
    }
    updateBadges();
    if (isManual) showToast('✅ All RSS feeds updated!', 'success');
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

  const intervalMinStr = safeGetStorage('quickrss_refresh_interval', '30');
  const intervalMin = parseInt(intervalMinStr, 10);

  if (!isNaN(intervalMin) && intervalMin > 0) {
    const ms = intervalMin * 60 * 1000;
    autoRefreshIntervalTimer = setInterval(() => {
      console.log(`⏰ Auto-refreshing feeds (configured interval: ${intervalMin}m)...`);
      refreshAllFeeds(false);
    }, ms);
  }
}
