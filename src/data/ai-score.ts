// The AI Opportunity Score quiz: questions, scoring and result content.
// Everything is deterministic. Each answer adds points to the overall score
// and to one or more opportunity areas; the top three areas become the
// visitor's personalised breakdown, backed up by the "insight" lines their
// own answers carry. No external APIs, results are instant.

export type AreaId = "support" | "leads" | "content" | "admin" | "visibility";

export interface QuizOption {
  label: string;
  // 0-10 contribution to the overall opportunity score
  points: number;
  // weight toward each opportunity area
  areas?: Partial<Record<AreaId, number>>;
  // a "you told us" line surfaced in the matching area's result card
  insight?: string;
  // estimated weekly hours of automatable work this answer represents,
  // summed into the "hours back per week" headline stat
  hoursSaved?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  help?: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "business",
    question: "What best describes your business?",
    options: [
      { label: "Local service business", points: 0 },
      { label: "Coach or consultant", points: 0 },
      { label: "Online store", points: 0 },
      { label: "Trades or construction", points: 0 },
      { label: "Something else", points: 0 },
    ],
  },
  {
    id: "team",
    question: "How many people work in the business?",
    options: [
      { label: "Just me", points: 0 },
      { label: "2 to 5", points: 0 },
      { label: "6 to 15", points: 0 },
      { label: "16 or more", points: 0 },
    ],
  },
  {
    id: "out-of-hours",
    question: "An enquiry lands at 9pm. What happens to it?",
    options: [
      {
        label: "It waits until someone's next at a desk",
        points: 10,
        hoursSaved: 2,
        areas: { support: 10 },
        insight:
          "Enquiries that land out of hours currently wait for a human, and buyers rarely wait with them.",
      },
      {
        label: "An auto-reply goes out, then they wait",
        points: 6,
        hoursSaved: 1,
        areas: { support: 6 },
        insight:
          "Your auto-reply buys a little patience, but nobody's questions actually get answered until morning.",
      },
      {
        label: "A basic chatbot tries its best",
        points: 4,
        hoursSaved: 1,
        areas: { support: 4 },
        insight:
          "You've got a chatbot in place, but basic bots frustrate more buyers than they convert.",
      },
      { label: "Someone replies properly, whatever the hour", points: 0 },
    ],
  },
  {
    id: "reply-speed",
    question: "How fast does a typical enquiry get a personal reply?",
    options: [
      { label: "Within minutes", points: 0 },
      {
        label: "Same day, usually",
        points: 4,
        areas: { leads: 4 },
      },
      {
        label: "A day or two",
        points: 8,
        hoursSaved: 2,
        areas: { leads: 8 },
        insight:
          "Leads wait a day or two for a reply. Most buyers have contacted three competitors by then.",
      },
      {
        label: "Honestly, it depends how busy we are",
        points: 9,
        hoursSaved: 2,
        areas: { leads: 9 },
        insight:
          "Reply speed depends on how busy you are, which means your busiest weeks are when you lose the most leads.",
      },
    ],
  },
  {
    id: "time-sink",
    question: "Where do customer conversations eat the most time?",
    options: [
      {
        label: "Answering the same questions over and over",
        points: 8,
        hoursSaved: 3,
        areas: { support: 8 },
        insight:
          "The same questions get answered by a human, over and over. That's exactly the work AI does best.",
      },
      {
        label: "Quotes and pricing conversations",
        points: 8,
        hoursSaved: 2,
        areas: { admin: 8 },
        insight:
          "Quoting eats real hours. Most of a quote is the same every time, only the details change.",
      },
      {
        label: "Booking and scheduling back-and-forth",
        points: 8,
        hoursSaved: 2,
        areas: { admin: 8 },
        insight:
          "Booking back-and-forth is pure admin. It can run itself while you do the actual work.",
      },
      {
        label: "Chasing and following people up",
        points: 8,
        hoursSaved: 2,
        areas: { leads: 8 },
        insight:
          "Chasing and follow-up eats your time. It's also the first thing that slips when you're busy.",
      },
    ],
  },
  {
    id: "quotes",
    question: "How do quotes or proposals get done?",
    options: [
      {
        label: "Written from scratch every time",
        points: 10,
        hoursSaved: 3,
        areas: { admin: 10 },
        insight:
          "Every quote starts from a blank page. That's hours a week on work that's 80% the same each time.",
      },
      {
        label: "Templates we tweak each time",
        points: 5,
        hoursSaved: 1,
        areas: { admin: 5 },
      },
      { label: "Pricing's on the website, they see it up front", points: 0 },
      { label: "We don't really do quotes", points: 0 },
    ],
  },
  {
    id: "content-who",
    question: "Who does the marketing content?",
    options: [
      {
        label: "Me, usually in the evenings",
        points: 10,
        hoursSaved: 4,
        areas: { content: 10 },
        insight:
          "Marketing happens in your evenings. That's the first thing to stop when you're stretched, and the last thing your growth can afford to lose.",
      },
      {
        label: "Someone in the team squeezes it in",
        points: 6,
        hoursSaved: 2,
        areas: { content: 6 },
        insight:
          "Content gets squeezed in around someone's real job, so it goes out when there's time, not when it works.",
      },
      {
        label: "We pay someone outside to do it",
        points: 3,
        areas: { content: 3 },
      },
      { label: "A proper system runs it every week", points: 0 },
    ],
  },
  {
    id: "content-freq",
    question: "How often does marketing actually go out?",
    options: [
      {
        label: "Rarely, if we're honest",
        points: 8,
        areas: { content: 6, visibility: 2 },
        insight:
          "Marketing rarely goes out, so the businesses posting weekly are the ones your buyers see.",
      },
      {
        label: "Bursts of activity, then silence",
        points: 7,
        areas: { content: 7 },
        insight:
          "You market in bursts. Consistency beats intensity every time an algorithm's involved.",
      },
      { label: "Most weeks, roughly", points: 4, areas: { content: 4 } },
      { label: "Like clockwork", points: 0 },
    ],
  },
  {
    id: "ai-visibility",
    question:
      "If someone asks ChatGPT or Google for the best at what you do near them, do you show up?",
    options: [
      {
        label: "No idea, never checked",
        points: 8,
        areas: { visibility: 8 },
        insight:
          "You've never checked how you show up in AI answers. Your next customer is already asking ChatGPT.",
      },
      {
        label: "Probably not",
        points: 7,
        areas: { visibility: 7 },
        insight:
          "You suspect you're invisible in AI answers. The businesses that fix this early take the enquiries.",
      },
      { label: "Sometimes, for some searches", points: 3, areas: { visibility: 3 } },
      { label: "Yes, we've checked and we're there", points: 0 },
    ],
  },
  {
    id: "admin-hours",
    question: "How much of a typical week goes on repetitive admin?",
    help: "Emails, invoicing, chasing, copying things between systems.",
    options: [
      {
        label: "10+ hours, easily",
        points: 10,
        hoursSaved: 10,
        areas: { admin: 6, support: 2, leads: 2 },
        insight:
          "10+ hours a week goes on repetitive admin. That's a full working day AI could hand back to you.",
      },
      {
        label: "5 to 10 hours",
        points: 7,
        hoursSaved: 7,
        areas: { admin: 5, support: 1, leads: 1 },
        insight:
          "5 to 10 hours a week on repetitive admin is a serious chunk of your working life on autopilot-able work.",
      },
      { label: "A couple of hours", points: 4, hoursSaved: 2, areas: { admin: 4 } },
      { label: "Barely any", points: 0 },
    ],
  },
  {
    id: "ai-usage",
    question: "How much AI is in the business today?",
    options: [
      {
        label: "None yet",
        points: 6,
        areas: { support: 2, admin: 2, content: 2 },
      },
      {
        label: "We dabble with ChatGPT now and then",
        points: 4,
        areas: { support: 1, admin: 2, content: 1 },
      },
      { label: "A few tools, not joined up", points: 2, areas: { admin: 2 } },
      { label: "It's built into how we work", points: 0 },
    ],
  },
];

// Max possible score, used to normalise to 0-100.
export const MAX_POINTS = QUIZ_QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
  0
);

export interface AreaContent {
  id: AreaId;
  title: string;
  outcome: string;
  body: string;
}

export const AREA_CONTENT: Record<AreaId, AreaContent> = {
  support: {
    id: "support",
    title: "Always-on AI support",
    outcome: "Enquiries answered at 2am instead of lost by 9am.",
    body: "An AI assistant trained on your business sits on your website and answers questions properly, qualifies the enquiry and books the next step, every hour of every day. Your team only picks up conversations that actually need a human.",
  },
  leads: {
    id: "leads",
    title: "Instant lead follow-up",
    outcome: "Every lead gets a fast, personal reply, even in your busiest week.",
    body: "The moment an enquiry lands, it gets a proper response, the details are captured, and the follow-up chase runs automatically until they book or say no. Nothing sits in an inbox going cold because you were on a job.",
  },
  content: {
    id: "content",
    title: "A marketing engine that runs itself",
    outcome: "Consistent, on-brand content out every week without giving up your evenings.",
    body: "AI drafts it in your voice, a system schedules it, and your marketing goes out like clockwork whether you're busy or not. You review and approve instead of starting from a blank page at 9pm.",
  },
  admin: {
    id: "admin",
    title: "Repetitive work, automated",
    outcome: "Quotes, bookings and paperwork done in minutes, not evenings.",
    body: "The work that's 80% the same every time, quotes, scheduling, invoicing, chasing paperwork, gets done by AI with you checking the last 20%. Hours come back into your week immediately.",
  },
  visibility: {
    id: "visibility",
    title: "Found on Google and in AI answers",
    outcome: "When someone asks Google or ChatGPT for what you do, you're the answer.",
    body: "Buyers increasingly ask AI instead of scrolling search results. Structuring your website and content so both Google and AI assistants recommend you is the cheapest new-enquiry channel most businesses haven't touched.",
  },
};

export interface ScoreBand {
  min: number;
  label: string;
  headline: string;
  summary: string;
}

export const SCORE_BANDS: ScoreBand[] = [
  {
    min: 65,
    label: "Prime candidate",
    headline: "AI could take serious weight off this business.",
    summary:
      "Based on your answers, a meaningful chunk of your week is going on work AI handles brilliantly, and leads are slipping through gaps it would close. The three areas below are where the fastest wins are hiding.",
  },
  {
    min: 35,
    label: "Big opportunity",
    headline: "You're running well, but you're leaving hours on the table.",
    summary:
      "The basics are working, and that's exactly when AI pays off fastest, because it multiplies a business that already functions. These three areas are where it would move the needle first.",
  },
  {
    min: 0,
    label: "Ahead of the pack",
    headline: "You're sharper than most. Now it's about the edges.",
    summary:
      "Most businesses score far higher, which means far more waste. For you it's targeted gains: the three areas below are where a focused improvement would still pay for itself quickly.",
  },
];

export function bandForScore(score: number): ScoreBand {
  return SCORE_BANDS.find((b) => score >= b.min) ?? SCORE_BANDS[SCORE_BANDS.length - 1];
}

/* ── Scoring ─────────────────────────────────────────────────────────── */

export const AREA_LABELS: Record<AreaId, string> = {
  support: "AI Support",
  leads: "Lead Follow-up",
  content: "Marketing",
  admin: "Admin & Quotes",
  visibility: "AI Visibility",
};

export const AREA_ORDER: AreaId[] = [
  "support",
  "leads",
  "content",
  "admin",
  "visibility",
];

// The outer orbit of the brain map: concrete things AI can run in a business,
// hanging off the area they belong to. Pure display copy, not scored.
export const AREA_SATELLITES: Record<AreaId, string[]> = {
  support: ["24/7 Chat", "WhatsApp Replies", "FAQ Answers"],
  leads: ["CRM", "Instant Follow-Up", "Reminders"],
  content: ["Social Posts", "Email Campaigns", "Blog Content"],
  admin: ["Bookings", "Quotes", "Invoicing"],
  visibility: ["Google Rankings", "AI Answers", "Reviews"],
};


export interface AreaResult {
  id: AreaId;
  title: string;
  outcome: string;
  body: string;
  insights: string[];
  // weekly hours of automatable work the answers attributed to this area
  hoursPerWeek: number;
}

export interface AreaStat {
  id: AreaId;
  label: string;
  // 0-100, how strongly the answers point at this area
  pct: number;
  // whether this area made the visitor's top three
  hot: boolean;
}

export interface ScoreResult {
  score: number;
  band: ScoreBand;
  topAreas: AreaResult[];
  areaStats: AreaStat[];
  hoursPerWeek: number;
  daysPerYear: number;
  answers: { question: string; answer: string }[];
}

export function computeResult(picked: number[]): ScoreResult {
  let total = 0;
  let hours = 0;
  const areaPoints: Record<AreaId, number> = {
    support: 0,
    leads: 0,
    content: 0,
    admin: 0,
    visibility: 0,
  };
  const areaInsights: Record<AreaId, string[]> = {
    support: [],
    leads: [],
    content: [],
    admin: [],
    visibility: [],
  };
  const areaHours: Record<AreaId, number> = {
    support: 0,
    leads: 0,
    content: 0,
    admin: 0,
    visibility: 0,
  };
  const answers: { question: string; answer: string }[] = [];

  QUIZ_QUESTIONS.forEach((q, i) => {
    const opt = q.options[picked[i]];
    if (!opt) return;
    total += opt.points;
    hours += opt.hoursSaved ?? 0;
    answers.push({ question: q.question, answer: opt.label });
    if (opt.areas) {
      const entries = Object.entries(opt.areas) as [AreaId, number][];
      entries.forEach(([area, w]) => {
        areaPoints[area] += w;
      });
      // Insights and hours belong on the area this answer weights most heavily.
      if (entries.length) {
        const [bestArea] = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
        if (opt.insight) areaInsights[bestArea].push(opt.insight);
        areaHours[bestArea] += opt.hoursSaved ?? 0;
      }
    }
  });

  const score = Math.min(100, Math.round((total / MAX_POINTS) * 100));
  const ranked = [...AREA_ORDER].sort((a, b) => areaPoints[b] - areaPoints[a]);
  const top3 = new Set(ranked.slice(0, 3));

  const topAreas = ranked.slice(0, 3).map((id) => ({
    ...AREA_CONTENT[id],
    insights: areaInsights[id],
    hoursPerWeek: areaHours[id],
  }));

  // Percentages are share-of-signal relative to the strongest area, so the
  // biggest bar is always 100% and the pink top-three always carry the
  // highest numbers. Keeps the chart and the ranking telling one story.
  const topPoints = Math.max(1, ...ranked.map((id) => areaPoints[id]));
  const areaStats: AreaStat[] = AREA_ORDER.map((id) => ({
    id,
    label: AREA_LABELS[id],
    pct: Math.round((areaPoints[id] / topPoints) * 100),
    hot: top3.has(id),
  }));

  return {
    score,
    band: bandForScore(score),
    topAreas,
    areaStats,
    hoursPerWeek: hours,
    // 46 working weeks a year, 8-hour days
    daysPerYear: Math.round((hours * 46) / 8),
    answers,
  };
}
