// Match Trustpilot reviews to portfolio projects by keyword.
// Reads scripts/_trustpilot-reviews.json, outputs scripts/_matched-testimonials.json
// Each project gets the best (longest 5-star matching) review.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const reviews = JSON.parse(await fs.readFile(path.join(__dirname, '_trustpilot-reviews.json'), 'utf8'));

// slug -> keywords (case-insensitive, regex word-boundary match)
const KEYWORD_MAP = {
  'team-procoach': ['team procoach', 'procoach'],
  'thecoachconsultant': ['coach consultant', 'thecoachconsultant'],
  'hotchen-construction': ['hotchen'],
  'nick-firth-tiles': ['nick firth', 'firth tiles', 'nick firth tiles'],
  'crown-labels': ['crown labels'],
  'body-lab': ['body lab', 'bodylab'],
  'quickfit-ev': ['quickfit', 'quick fit ev'],
  'drug-free-bodybuilding': ['drug free bodybuilding', 'dfb'],
  'complete-dentist-academy': ['complete dentist academy', 'dentist academy'],
  'br-accountancy': ['br accountancy', 'b.r. accountancy'],
  'strength-in-us': ['strength in us', 'strengthinus', 'join strength'],
  'newgen-coaching': ['newgen', 'new gen coaching'],
  'jic': ['jic refractory', 'jicrpl', 'jic '],
  'steel-city-car-keys': ['steel city', 'car keys'],
  'warrior-movement': ['warrior movement'],
  'dan-reeve': ['dan reeve', 'reeve conditioning'],
  'redefining-shakti': ['redefining shakti', 'shakti'],
  'kensington-scott': ['kensington scott', 'kensington'],
  'altitude': ['altitude project', 'altitude-project', 'altitude '],
  'dr-rio': ['dr rio', 'dr. rio', 'drrio'],
  'weather-fix': ['weather fix', 'weatherfix'],
  'fortis': ['fortis transformations', 'fortis'],
  'noura': ['noura'],
  'vanguard-brand': ['vanguard'],
  'primecore-brand': ['primecore', 'prime core'],
  'hvme-brand': ['hvme'],
  'wright-coaching-brand': ['wright coaching'],
  'ac-visuals-logo': ['ac visuals'],
  'her-era-brand': ['her era'],
  'fox-socials': ['trained by fox', 'michael fox'],
  'icm-socials': ['icm education'],
  'square-one-socials': ['square one'],
  'myles-socials': ['mind architect', 'myles'],
  'prepdad-socials': ['prep dad', 'theprepdad'],
  'mrf-socials': ['marsha rose', 'marsharose'],
};

// Clean a name like "SCOTTApr 9, 2026" -> "Scott"
function cleanName(raw) {
  if (!raw) return null;
  // Strip dates: any "MonthName D, YYYY" pattern
  let cleaned = raw.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*\d{1,2},?\s*\d{4}.*$/i, '').trim();
  // Title case if all caps
  if (cleaned === cleaned.toUpperCase() && cleaned.length > 2) {
    cleaned = cleaned.split(/\s+/).map(w => w[0] + w.slice(1).toLowerCase()).join(' ');
  }
  return cleaned || null;
}

// Strip "See more" trailing markers from body
function cleanBody(raw) {
  if (!raw) return null;
  return raw.replace(/\s*See more\s*$/i, '').trim();
}

// Score a review for matching: prefer 5-star, longer, no "See more" truncation
function scoreReview(r) {
  const lenScore = Math.min((r.body || '').length, 400);
  const starScore = (r.rating || 0) * 20;
  const truncatedPenalty = (r.body || '').endsWith('...') ? -30 : 0;
  return lenScore + starScore + truncatedPenalty;
}

const matches = {};
for (const [slug, keywords] of Object.entries(KEYWORD_MAP)) {
  const candidates = reviews.filter((r) => {
    const text = `${r.title || ''} ${r.body || ''}`.toLowerCase();
    return keywords.some((kw) => text.includes(kw.toLowerCase()));
  });

  if (candidates.length === 0) {
    matches[slug] = null;
    continue;
  }

  // Pick the best-scoring
  candidates.sort((a, b) => scoreReview(b) - scoreReview(a));
  const best = candidates[0];

  matches[slug] = {
    name: cleanName(best.name),
    rating: best.rating,
    title: best.title,
    body: cleanBody(best.body),
    date: best.date,
    candidatesCount: candidates.length,
  };
}

// Report
console.log('Matches:');
for (const [slug, m] of Object.entries(matches)) {
  if (m) {
    console.log(`  ${slug}: ${m.name} (${m.candidatesCount} candidates)`);
  } else {
    console.log(`  ${slug}: no match`);
  }
}

await fs.writeFile(path.join(__dirname, '_matched-testimonials.json'), JSON.stringify(matches, null, 2));
console.log(`\nWrote -> scripts/_matched-testimonials.json`);
