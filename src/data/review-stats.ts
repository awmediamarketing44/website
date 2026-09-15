// Real, publicly verifiable review counts — the single source of truth for any
// review number shown on the site or sent to Google. Nothing else should
// hardcode one.
//
// Trustpilot checked 7 Sep 2026: 5.0 from 311 reviews
// (uk.trustpilot.com/review/awmedia.marketing).
// Google count comes from the Business Profile.
export const REVIEW_STATS = {
  trustpilot: { count: 311, rating: "5" },
  google: { count: 176 },
};

export const TOTAL_REVIEWS = REVIEW_STATS.trustpilot.count + REVIEW_STATS.google.count;
