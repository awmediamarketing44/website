// Scrape Trustpilot reviews for AW Media. Returns array of {name, rating, title, body, date}.
// Walks all pages until no Next button.
// Usage: node scripts/scrape-trustpilot.mjs
// Output: scripts/_trustpilot-reviews.json

import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const baseUrl = 'https://uk.trustpilot.com/review/awmedia.marketing';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 900 });

  const allReviews = [];
  let pageNum = 1;
  while (true) {
    const url = pageNum === 1 ? baseUrl : `${baseUrl}?page=${pageNum}`;
    console.log(`Page ${pageNum}: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1500));

    // Dismiss cookie banner if present
    await page.evaluate(() => {
      document.querySelectorAll('[id*="onetrust"], [class*="onetrust"], [id*="consent"], [class*="cookie"]').forEach(el => el.remove?.());
    });

    const reviews = await page.evaluate(() => {
      const out = [];
      // Trustpilot uses a JSON-LD structured data + JSX components. Find review articles.
      const articles = document.querySelectorAll('article[data-service-review-card-paper], section[data-service-review-card], [data-service-review-card-paper="true"]');
      for (const art of articles) {
        const nameEl = art.querySelector('[data-consumer-name-typography], [data-name-typography], a[name="consumer-profile"]');
        const ratingEl = art.querySelector('[data-service-review-rating], img[alt*="star"]');
        const titleEl = art.querySelector('[data-service-review-title-typography], h2');
        const bodyEl = art.querySelector('[data-service-review-text-typography], p');
        const dateEl = art.querySelector('time, [data-service-review-date-time-ago]');

        let rating = null;
        if (ratingEl) {
          const alt = ratingEl.getAttribute('alt') || ratingEl.dataset?.serviceReviewRating || '';
          const m = alt.match(/(\d+)\s*star/i) || alt.match(/^(\d+)$/);
          if (m) rating = parseInt(m[1], 10);
        }

        out.push({
          name: nameEl?.textContent?.trim() || null,
          rating,
          title: titleEl?.textContent?.trim() || null,
          body: bodyEl?.textContent?.trim() || null,
          date: dateEl?.getAttribute('datetime') || dateEl?.textContent?.trim() || null,
        });
      }
      return out;
    });

    if (reviews.length === 0) {
      console.log('  no reviews found — stopping');
      break;
    }
    allReviews.push(...reviews);
    console.log(`  +${reviews.length} reviews (total ${allReviews.length})`);

    // Check for next page
    const hasNext = await page.evaluate(() => {
      const next = document.querySelector('a[name="pagination-button-next"]');
      return next && !next.hasAttribute('disabled');
    });
    if (!hasNext) {
      console.log('  no next page — done');
      break;
    }
    pageNum++;
    if (pageNum > 20) break;
  }

  const outPath = path.join(__dirname, '_trustpilot-reviews.json');
  await fs.writeFile(outPath, JSON.stringify(allReviews, null, 2));
  console.log(`\nWrote ${allReviews.length} reviews -> ${outPath}`);
} finally {
  await browser.close();
}
