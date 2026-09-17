// Search Engine & Fuzzy Matching Module

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

        const terms = query.split(/\s+/).filter(Boolean);

        const filtered = uniquePool.filter(art => {
          const titleStr = art.title || '';
          const summaryStr = art.summary || '';
          const contentStr = (art.content || art.htmlContent || '').slice(0, 1000);
          const authorStr = art.author || '';
          const feedStr = art.feedTitle || '';

          const combinedText = `${titleStr} ${summaryStr} ${authorStr} ${feedStr} ${contentStr}`;

          return terms.every(term => fuzzyMatchTerm(term, combinedText));
        });

        filtered.sort((a, b) => getArticleTimestamp(b) - getArticleTimestamp(a));

        if (searchMatchBadge) {
          searchMatchBadge.textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'}`;
          searchMatchBadge.classList.remove('hidden');
        }

        renderArticleList(filtered, `No articles found matching "${rawQuery}"`);
      }, 150);
    };
  }
}
