// ============================================================
// Social Media Audit — engine
// Ported faithfully from the standalone Express tool (server.js).
// Same Apify actors, same normalisation, same 5-dimension scoring,
// same insight generation. The ONLY behavioural change is that the
// report email is sent via SMTP (sendMail) instead of Resend — see
// route.ts where sendLeadNotification is called.
//
// Job/progress state lives in module-level Maps. The site runs as a
// single PM2 fork instance so this in-process state persists across
// requests for the life of the process, exactly like the Express app's
// `audits` Map.
//
// Env: APIFY_TOKEN (reused — already configured).
// ============================================================

import { ApifyClient } from "apify-client";

const apifyClient = process.env.APIFY_TOKEN
  ? new ApifyClient({ token: process.env.APIFY_TOKEN })
  : null;

// ── Types ──
export type PlatformKey =
  | "instagram"
  | "tiktok"
  | "facebook"
  | "linkedin"
  | "youtube"
  | "twitter"
  | "pinterest";

export type PlatformStatus = "pending" | "scanning" | "complete" | "failed";

interface ScrapedPost {
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  retweets?: number;
  timestamp?: string | number;
  type?: string;
  caption?: string;
  hashtags?: string[];
}

interface ScrapedData {
  username?: string;
  bio?: string;
  followers?: number;
  following?: number;
  postCount?: number;
  videoCount?: number;
  pinCount?: number;
  tweetCount?: number;
  profilePic?: string | null;
  externalUrl?: string | null;
  isVerified?: boolean;
  recentPosts?: ScrapedPost[];
  [key: string]: unknown;
}

export interface LeadData {
  name: string;
  email: string;
  business: string;
  goal: string;
  platforms: Record<string, string>;
  submittedAt: string;
}

export interface DimensionScore {
  rating: "Strong" | "Needs Work" | "Missing" | "N/A";
  score: number;
}

export interface PlatformScore {
  profileOptimization: DimensionScore;
  contentQuality: DimensionScore;
  postingConsistency: DimensionScore;
  engagementHealth: DimensionScore;
  growthSignals: DimensionScore;
  overallScore: number;
  failed: boolean;
}

export interface PlatformMetrics {
  failed?: boolean;
  followers?: number;
  following?: number;
  postCount?: number;
  bio?: string;
  bioLength?: number;
  hasProfilePic?: boolean;
  hasExternalUrl?: boolean;
  isVerified?: boolean;
  username?: string;
  avgLikes?: number;
  avgComments?: number;
  avgViews?: number | null;
  engagementRate?: number;
  postsPerWeek?: number;
  daysSinceLastPost?: number | null;
  maxGapDays?: number | null;
  avgCaptionLength?: number;
  hashtagUsageRate?: number;
  contentTypes?: number;
  engagementTrend?: number;
}

export interface Insight {
  platform: string;
  text: string;
}

export interface AuditResults {
  platforms: Record<string, PlatformScore>;
  insights: {
    wins: Insight[];
    quickWins: Insight[];
    totalQuickWins: number;
  };
  overallScore: number;
  grade: string;
}

export interface AuditJob {
  id: string;
  leadData: LeadData;
  platforms: Record<string, string>;
  platformStatuses: Record<string, PlatformStatus>;
  rawData: Record<string, ScrapedData | null>;
  metrics: Record<string, PlatformMetrics>;
  results: AuditResults | null;
  status: "scanning" | "complete";
  createdAt: Date;
}

// ── Module-level job store (persists for the life of the PM2 fork) ──
const globalForAudits = globalThis as unknown as {
  __socialAudits?: Map<string, AuditJob>;
};
export const audits: Map<string, AuditJob> =
  globalForAudits.__socialAudits || new Map<string, AuditJob>();
globalForAudits.__socialAudits = audits;

// ============================================================
// HANDLE NORMALISATION (verbatim from server.js)
// ============================================================
function normalizeHandle(platform: string, input: string): string {
  input = input.trim();
  switch (platform) {
    case "instagram":
      return input
        .replace("@", "")
        .replace(/https?:\/\/(www\.)?instagram\.com\//, "")
        .replace(/\/$/, "");
    case "tiktok":
      return input
        .replace("@", "")
        .replace(/https?:\/\/(www\.)?tiktok\.com\/@?/, "")
        .replace(/\/$/, "");
    case "twitter":
      return input
        .replace("@", "")
        .replace(/https?:\/\/(www\.)?(twitter|x)\.com\//, "")
        .replace(/\/$/, "");
    case "facebook":
      if (!input.startsWith("http")) return `https://www.facebook.com/${input}`;
      return input;
    case "linkedin":
      if (!input.startsWith("http")) return `https://www.linkedin.com/${input}`;
      return input;
    case "youtube":
      if (input.startsWith("@")) return `https://www.youtube.com/${input}`;
      if (!input.startsWith("http")) return `https://www.youtube.com/@${input}`;
      return input;
    case "pinterest":
      if (input.startsWith("@"))
        return `https://www.pinterest.com/${input.replace("@", "")}/`;
      if (!input.startsWith("http")) return `https://www.pinterest.com/${input}/`;
      return input;
    default:
      return input;
  }
}

// ============================================================
// APIFY SCRAPERS (verbatim actor IDs + field mapping from server.js)
// ============================================================
type Scraper = (handle: string) => Promise<ScrapedData>;

function client(): ApifyClient {
  if (!apifyClient) throw new Error("Apify not configured");
  return apifyClient;
}

const scrapers: Record<PlatformKey, Scraper> = {
  instagram: async (handle) => {
    const username = normalizeHandle("instagram", handle);
    const run = await client()
      .actor("apify/instagram-profile-scraper")
      .call({ usernames: [username] }, { timeout: 120 });
    const { items } = await client().dataset(run.defaultDatasetId).listItems();
    if (!items.length) throw new Error("No data returned");
    const p = items[0] as Record<string, unknown>;
    const recentPosts = ((p.latestPosts as Record<string, unknown>[]) || []).slice(0, 12);
    return {
      username: (p.username as string) || username,
      bio: (p.biography as string) || "",
      followers: (p.followersCount as number) || 0,
      following: (p.followingCount as number) || 0,
      postCount: (p.postsCount as number) || 0,
      profilePic: (p.profilePicUrl as string) || null,
      externalUrl: (p.externalUrl as string) || null,
      isVerified: (p.verified as boolean) || false,
      recentPosts: recentPosts.map((post) => ({
        likes: (post.likesCount as number) || 0,
        comments: (post.commentsCount as number) || 0,
        timestamp: post.timestamp as string,
        type: (post.type as string) || "image",
        caption: (post.caption as string) || "",
        hashtags: (post.hashtags as string[]) || [],
      })),
    };
  },

  tiktok: async (handle) => {
    const username = normalizeHandle("tiktok", handle);
    const run = await client()
      .actor("clockworks/tiktok-scraper")
      .call(
        { profiles: [username], resultsPerPage: 12, shouldDownloadVideos: false },
        { timeout: 120 }
      );
    const { items } = await client().dataset(run.defaultDatasetId).listItems();
    if (!items.length) throw new Error("No data returned");
    const firstItem = items[0] as Record<string, unknown>;
    const author = (firstItem.authorMeta as Record<string, unknown>) || {};
    return {
      username: (author.name as string) || username,
      bio: (author.signature as string) || "",
      followers: (author.fans as number) || 0,
      following: (author.following as number) || 0,
      totalLikes: (author.heart as number) || 0,
      profilePic: (author.avatar as string) || null,
      isVerified: (author.verified as boolean) || false,
      recentPosts: (items as Record<string, unknown>[]).slice(0, 12).map((v) => ({
        likes: (v.diggCount as number) || (v.likes as number) || 0,
        comments: (v.commentCount as number) || (v.comments as number) || 0,
        shares: (v.shareCount as number) || (v.shares as number) || 0,
        views: (v.playCount as number) || (v.plays as number) || 0,
        timestamp: (v.createTimeISO as string) || (v.createTime as number),
        caption: (v.text as string) || "",
        hashtags: ((v.hashtags as Array<{ name?: string } | string>) || []).map((h) =>
          typeof h === "string" ? h : h.name || ""
        ),
      })),
    };
  },

  facebook: async (url) => {
    const pageUrl = normalizeHandle("facebook", url);
    const run = await client()
      .actor("apify/facebook-pages-scraper")
      .call({ startUrls: [{ url: pageUrl }], maxPagesPerQuery: 1 }, { timeout: 120 });
    const { items } = await client().dataset(run.defaultDatasetId).listItems();
    if (!items.length) throw new Error("No data returned");
    const p = items[0] as Record<string, unknown>;
    let recentPosts: ScrapedPost[] = [];
    try {
      const postsRun = await client()
        .actor("apify/facebook-posts-scraper")
        .call({ startUrls: [{ url: pageUrl }], resultsLimit: 12 }, { timeout: 120 });
      const postsData = await client().dataset(postsRun.defaultDatasetId).listItems();
      recentPosts = ((postsData.items as Record<string, unknown>[]) || [])
        .slice(0, 12)
        .map((post) => ({
          likes: (post.likes as number) || 0,
          comments: (post.comments as number) || 0,
          shares: (post.shares as number) || 0,
          timestamp: post.time as string,
          caption: (post.text as string) || "",
        }));
    } catch {
      console.log("Facebook posts scrape failed, continuing with page data only");
    }
    return {
      username: (p.name as string) || "",
      bio: (p.about as string) || (p.description as string) || "",
      followers: (p.followers as number) || (p.likes as number) || 0,
      pageLikes: (p.likes as number) || 0,
      profilePic: (p.profilePhoto as string) || null,
      externalUrl: (p.website as string) || null,
      recentPosts,
    };
  },

  linkedin: async (url) => {
    const profileUrl = normalizeHandle("linkedin", url);
    const isCompany = profileUrl.includes("/company/");
    const actorName = isCompany
      ? "dev_fusion/Linkedin-Company-Scraper"
      : "dev_fusion/Linkedin-Profile-Scraper";
    const run = await client().actor(actorName).call({ urls: [profileUrl] }, { timeout: 120 });
    const { items } = await client().dataset(run.defaultDatasetId).listItems();
    if (!items.length) throw new Error("No data returned");
    const p = items[0] as Record<string, unknown>;
    if (isCompany) {
      return {
        username: (p.name as string) || "",
        bio: (p.description as string) || "",
        followers: (p.followerCount as number) || 0,
        employeeCount: (p.employeeCount as number) || 0,
        profilePic: (p.logo as string) || null,
        externalUrl: (p.website as string) || null,
        industry: (p.industry as string) || "",
        recentPosts: [],
      };
    }
    return {
      username: (p.fullName as string) || (p.name as string) || "",
      bio: (p.summary as string) || (p.headline as string) || "",
      followers: (p.connectionsCount as number) || (p.connections as number) || 0,
      profilePic: (p.profilePicture as string) || (p.profilePic as string) || null,
      headline: (p.headline as string) || "",
      recentPosts: [],
    };
  },

  youtube: async (handle) => {
    const channelUrl = normalizeHandle("youtube", handle);
    const run = await client()
      .actor("streamers/youtube-scraper")
      .call(
        { startUrls: [{ url: channelUrl }], maxResults: 12, type: "channel" },
        { timeout: 120 }
      );
    const { items } = await client().dataset(run.defaultDatasetId).listItems();
    if (!items.length) throw new Error("No data returned");
    const list = items as Record<string, unknown>[];
    const channelItem = list.find((i) => i.type === "channel") || list[0];
    const videos = list.filter(
      (i) => i.type === "video" || (i.url as string)?.includes("/watch")
    );
    return {
      username: (channelItem.channelName as string) || (channelItem.title as string) || "",
      bio:
        (channelItem.channelDescription as string) ||
        (channelItem.description as string) ||
        "",
      followers:
        (channelItem.subscriberCount as number) ||
        (channelItem.numberOfSubscribers as number) ||
        0,
      totalViews: (channelItem.viewCount as number) || 0,
      videoCount: (channelItem.videosCount as number) || 0,
      profilePic: (channelItem.channelThumbnail as string) || null,
      recentPosts: videos.slice(0, 12).map((v) => ({
        views: (v.viewCount as number) || (v.views as number) || 0,
        likes: (v.likes as number) || 0,
        comments: (v.commentsCount as number) || (v.comments as number) || 0,
        timestamp: (v.date as string) || (v.uploadDate as string),
        caption: (v.title as string) || "",
      })),
    };
  },

  twitter: async (handle) => {
    const username = normalizeHandle("twitter", handle);
    const run = await client()
      .actor("apidojo/tweet-scraper")
      .call(
        {
          startUrls: [`https://twitter.com/${username}`],
          tweetsDesired: 20,
          addUserInfo: true,
        },
        { timeout: 120 }
      );
    const { items } = await client().dataset(run.defaultDatasetId).listItems();
    if (!items.length) throw new Error("No data returned");
    const list = items as Record<string, unknown>[];
    const author = (list[0].author as Record<string, unknown>) || {};
    return {
      username: (author.userName as string) || username,
      bio: (author.description as string) || "",
      followers: (author.followers as number) || 0,
      following: (author.following as number) || 0,
      tweetCount: (author.statusesCount as number) || 0,
      profilePic: (author.profilePicture as string) || null,
      isVerified: (author.isVerified as boolean) || false,
      recentPosts: list.slice(0, 12).map((t) => ({
        likes: (t.likeCount as number) || 0,
        comments: (t.replyCount as number) || 0,
        retweets: (t.retweetCount as number) || 0,
        timestamp: t.createdAt as string,
        caption: (t.text as string) || "",
        hashtags: (t.hashtags as string[]) || [],
      })),
    };
  },

  pinterest: async (handle) => {
    const profileUrl = normalizeHandle("pinterest", handle);
    const run = await client()
      .actor("danielmilevski9/pinterest-crawler")
      .call({ startUrls: [{ url: profileUrl }], maxItems: 12 }, { timeout: 120 });
    const { items } = await client().dataset(run.defaultDatasetId).listItems();
    if (!items.length) throw new Error("No data returned");
    const list = items as Record<string, unknown>[];
    const profileItem = list[0];
    return {
      username: (profileItem.username as string) || (profileItem.name as string) || "",
      bio: (profileItem.about as string) || (profileItem.description as string) || "",
      followers:
        (profileItem.followerCount as number) || (profileItem.followers as number) || 0,
      following: (profileItem.followingCount as number) || 0,
      pinCount: (profileItem.pinCount as number) || list.length,
      profilePic: (profileItem.profileImage as string) || null,
      recentPosts: list.slice(0, 12).map((pin) => ({
        likes: (pin.saveCount as number) || (pin.saves as number) || 0,
        comments: (pin.commentCount as number) || (pin.comments as number) || 0,
        timestamp: pin.createdAt as string,
        caption: (pin.description as string) || (pin.title as string) || "",
      })),
    };
  },
};

// ============================================================
// SCORING FROM REAL DATA (verbatim logic from server.js)
// ============================================================
const FREQUENCY_BENCHMARKS: Record<string, number> = {
  instagram: 4,
  tiktok: 5,
  linkedin: 3,
  twitter: 7,
  facebook: 3,
  youtube: 1,
  pinterest: 5,
};

const ENGAGEMENT_BENCHMARKS: Record<string, { good: number; strong: number }> = {
  instagram: { good: 1, strong: 3 },
  tiktok: { good: 3, strong: 7 },
  linkedin: { good: 2, strong: 4 },
  twitter: { good: 0.5, strong: 1.5 },
  facebook: { good: 0.5, strong: 2 },
  youtube: { good: 3, strong: 6 },
  pinterest: { good: 0.2, strong: 1 },
};

function categorize100(score: number): DimensionScore {
  const rating: DimensionScore["rating"] =
    score >= 70 ? "Strong" : score >= 40 ? "Needs Work" : "Missing";
  return { rating, score };
}

export function getGrade(score: number): string {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

export function platformName(p: string): string {
  const names: Record<string, string> = {
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    twitter: "X/Twitter",
    pinterest: "Pinterest",
  };
  return names[p] || p.charAt(0).toUpperCase() + p.slice(1);
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

function scoreFromScrapedData(rawData: Record<string, ScrapedData | null>): {
  scores: Record<string, PlatformScore>;
  metrics: Record<string, PlatformMetrics>;
} {
  const scores: Record<string, PlatformScore> = {};
  const metrics: Record<string, PlatformMetrics> = {};

  Object.entries(rawData).forEach(([platform, data]) => {
    if (!data) {
      scores[platform] = {
        profileOptimization: { rating: "N/A", score: 0 },
        contentQuality: { rating: "N/A", score: 0 },
        postingConsistency: { rating: "N/A", score: 0 },
        engagementHealth: { rating: "N/A", score: 0 },
        growthSignals: { rating: "N/A", score: 0 },
        overallScore: 0,
        failed: true,
      };
      metrics[platform] = { failed: true };
      return;
    }

    const posts = data.recentPosts || [];
    const m: PlatformMetrics = {};

    m.followers = data.followers || 0;
    m.following = data.following || 0;
    m.postCount =
      data.postCount ||
      data.videoCount ||
      data.pinCount ||
      data.tweetCount ||
      posts.length;
    m.bio = data.bio || "";
    m.bioLength = m.bio.length;
    m.hasProfilePic = !!data.profilePic;
    m.hasExternalUrl = !!data.externalUrl;
    m.isVerified = data.isVerified || false;
    m.username = data.username || "";

    if (posts.length > 0) {
      const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
      const totalComments = posts.reduce((sum, p) => sum + (p.comments || 0), 0);
      const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
      m.avgLikes = Math.round(totalLikes / posts.length);
      m.avgComments = Math.round(totalComments / posts.length);
      m.avgViews = totalViews > 0 ? Math.round(totalViews / posts.length) : null;
      m.engagementRate =
        m.followers > 0
          ? parseFloat(
              (((totalLikes + totalComments) / posts.length / m.followers) * 100).toFixed(2)
            )
          : 0;

      const timestamps = posts
        .map((p) => new Date(p.timestamp as string | number))
        .filter((d) => !isNaN(d.getTime()))
        .sort((a, b) => b.getTime() - a.getTime());

      if (timestamps.length >= 2) {
        const newestPost = timestamps[0];
        const oldestPost = timestamps[timestamps.length - 1];
        const daySpan = Math.max(
          1,
          (newestPost.getTime() - oldestPost.getTime()) / (1000 * 60 * 60 * 24)
        );
        m.postsPerWeek = parseFloat(((timestamps.length / daySpan) * 7).toFixed(1));
        m.daysSinceLastPost = Math.round(
          (Date.now() - newestPost.getTime()) / (1000 * 60 * 60 * 24)
        );

        let maxGap = 0;
        for (let i = 0; i < timestamps.length - 1; i++) {
          const gap =
            (timestamps[i].getTime() - timestamps[i + 1].getTime()) /
            (1000 * 60 * 60 * 24);
          if (gap > maxGap) maxGap = gap;
        }
        m.maxGapDays = Math.round(maxGap);
      } else {
        m.postsPerWeek = posts.length > 0 ? 0.5 : 0;
        m.daysSinceLastPost = null;
        m.maxGapDays = null;
      }

      const captions = posts.map((p) => p.caption || "").filter((c) => c.length > 0);
      m.avgCaptionLength =
        captions.length > 0
          ? Math.round(captions.reduce((sum, c) => sum + c.length, 0) / captions.length)
          : 0;

      const hashtagPosts = posts.filter(
        (p) =>
          (p.hashtags && p.hashtags.length > 0) || (p.caption && p.caption.includes("#"))
      );
      m.hashtagUsageRate = parseFloat(
        ((hashtagPosts.length / posts.length) * 100).toFixed(0)
      );

      const types = new Set(posts.map((p) => p.type).filter(Boolean));
      m.contentTypes = types.size;

      const half = Math.floor(posts.length / 2);
      if (half >= 2) {
        const recentEng =
          posts.slice(0, half).reduce((s, p) => s + (p.likes || 0) + (p.comments || 0), 0) /
          half;
        const olderEng =
          posts.slice(half).reduce((s, p) => s + (p.likes || 0) + (p.comments || 0), 0) /
          (posts.length - half);
        m.engagementTrend =
          olderEng > 0 ? parseFloat(((recentEng / olderEng - 1) * 100).toFixed(0)) : 0;
      } else {
        m.engagementTrend = 0;
      }
    } else {
      m.avgLikes = 0;
      m.avgComments = 0;
      m.avgViews = null;
      m.engagementRate = 0;
      m.postsPerWeek = 0;
      m.daysSinceLastPost = null;
      m.maxGapDays = null;
      m.avgCaptionLength = 0;
      m.hashtagUsageRate = 0;
      m.contentTypes = 0;
      m.engagementTrend = 0;
    }

    metrics[platform] = m;

    // --- SCORING ---
    const s = {} as PlatformScore;
    const bench = ENGAGEMENT_BENCHMARKS[platform] || { good: 1, strong: 3 };
    const freqBench = FREQUENCY_BENCHMARKS[platform] || 3;

    // Dimension 1: Profile Optimization
    let profileScore = 0;
    if (m.bioLength! > 50) profileScore += 25;
    else if (m.bioLength! > 20) profileScore += 15;
    else if (m.bioLength! > 0) profileScore += 5;
    const ctaKeywords = /link|book|dm|contact|shop|click|free|download|sign up|enquir/i;
    if (ctaKeywords.test(m.bio!)) profileScore += 15;
    if (m.hasProfilePic) profileScore += 25;
    if (m.hasExternalUrl) profileScore += 20;
    if (m.isVerified) profileScore += 15;
    s.profileOptimization = categorize100(Math.min(profileScore, 100));

    // Dimension 2: Content Quality
    let contentScore = 0;
    if (posts.length >= 6) contentScore += 25;
    else if (posts.length >= 3) contentScore += 15;
    else if (posts.length > 0) contentScore += 5;
    if (m.contentTypes! >= 3) contentScore += 25;
    else if (m.contentTypes! >= 2) contentScore += 15;
    else if (m.contentTypes! >= 1) contentScore += 5;
    if (m.avgCaptionLength! > 100) contentScore += 25;
    else if (m.avgCaptionLength! > 50) contentScore += 15;
    else if (m.avgCaptionLength! > 10) contentScore += 5;
    if (m.hashtagUsageRate! > 60) contentScore += 25;
    else if (m.hashtagUsageRate! > 30) contentScore += 15;
    else if (m.hashtagUsageRate! > 0) contentScore += 5;
    s.contentQuality = categorize100(Math.min(contentScore, 100));

    // Dimension 3: Posting Consistency
    let consistencyScore = 0;
    const freqRatio = m.postsPerWeek! / freqBench;
    if (freqRatio >= 0.8) consistencyScore += 40;
    else if (freqRatio >= 0.4) consistencyScore += 25;
    else if (freqRatio > 0) consistencyScore += 10;
    if (m.maxGapDays !== null && m.maxGapDays !== undefined) {
      if (m.maxGapDays <= 7) consistencyScore += 30;
      else if (m.maxGapDays <= 14) consistencyScore += 15;
    }
    if (m.daysSinceLastPost !== null && m.daysSinceLastPost !== undefined) {
      if (m.daysSinceLastPost <= 3) consistencyScore += 30;
      else if (m.daysSinceLastPost <= 7) consistencyScore += 20;
      else if (m.daysSinceLastPost <= 14) consistencyScore += 10;
    }
    s.postingConsistency = categorize100(Math.min(consistencyScore, 100));

    // Dimension 4: Engagement Health
    let engagementScore = 0;
    if (m.engagementRate! >= bench.strong) engagementScore += 50;
    else if (m.engagementRate! >= bench.good) engagementScore += 30;
    else if (m.engagementRate! > 0) engagementScore += 10;
    const commentRatio = m.avgLikes! > 0 ? m.avgComments! / m.avgLikes! : 0;
    if (commentRatio > 0.05) engagementScore += 25;
    else if (commentRatio > 0.02) engagementScore += 15;
    else if (commentRatio > 0) engagementScore += 5;
    if (m.engagementTrend! > 10) engagementScore += 25;
    else if (m.engagementTrend! > -10) engagementScore += 15;
    else engagementScore += 5;
    s.engagementHealth = categorize100(Math.min(engagementScore, 100));

    // Dimension 5: Growth Signals
    let growthScore = 0;
    if (m.followers! > 10000) growthScore += 25;
    else if (m.followers! > 1000) growthScore += 20;
    else if (m.followers! > 100) growthScore += 10;
    const ffRatio =
      m.following! > 0 ? m.followers! / m.following! : m.followers! > 0 ? 5 : 0;
    if (ffRatio >= 2) growthScore += 20;
    else if (ffRatio >= 1) growthScore += 12;
    else if (ffRatio > 0) growthScore += 5;
    if (m.engagementTrend! > 10) growthScore += 25;
    else if (m.engagementTrend! > 0) growthScore += 15;
    else growthScore += 5;
    const totalPlatforms = Object.values(rawData).filter((d) => d !== null).length;
    if (totalPlatforms >= 4) growthScore += 30;
    else if (totalPlatforms >= 2) growthScore += 20;
    else growthScore += 10;
    s.growthSignals = categorize100(Math.min(growthScore, 100));

    const dims = [
      s.profileOptimization,
      s.contentQuality,
      s.postingConsistency,
      s.engagementHealth,
      s.growthSignals,
    ];
    s.overallScore = Math.round(dims.reduce((sum, d) => sum + d.score, 0) / dims.length);
    s.failed = false;

    scores[platform] = s;
  });

  return { scores, metrics };
}

function generateDataDrivenInsights(
  scores: Record<string, PlatformScore>,
  metrics: Record<string, PlatformMetrics>
): AuditResults["insights"] {
  const wins: Insight[] = [];
  const quickWins: Insight[] = [];

  Object.entries(scores).forEach(([platform, s]) => {
    if (s.failed) return;
    const pName = platformName(platform);
    const m = metrics[platform];
    const bench = ENGAGEMENT_BENCHMARKS[platform] || { good: 1, strong: 3 };

    // Wins
    if (s.profileOptimization.rating === "Strong") {
      wins.push({
        platform: pName,
        text: `Your ${pName} profile is well-optimized — clear bio, profile photo, and external link all in place.`,
      });
    }
    if (s.engagementHealth.rating === "Strong") {
      wins.push({
        platform: pName,
        text: `Your ${pName} engagement rate is ${m.engagementRate}% — that's above the ${bench.good}% industry average. Your audience is actively interacting with your content.`,
      });
    }
    if (s.postingConsistency.rating === "Strong") {
      wins.push({
        platform: pName,
        text: `You're posting ${m.postsPerWeek}x per week on ${pName} — consistent enough for the algorithm to favour your content.`,
      });
    }
    if (s.contentQuality.rating === "Strong") {
      wins.push({
        platform: pName,
        text: `Your ${pName} content quality is solid — averaging ${m.avgCaptionLength} chars per caption with good hashtag usage.`,
      });
    }

    // Quick wins
    if (s.profileOptimization.rating !== "Strong") {
      if (m.bioLength! < 20) {
        quickWins.push({
          platform: pName,
          text: `Your ${pName} bio is only ${m.bioLength} characters. Rewrite it to clearly state what you do, who you help, and include a call-to-action.`,
        });
      } else if (!m.hasExternalUrl) {
        quickWins.push({
          platform: pName,
          text: `Add a link to your ${pName} profile — you're missing out on driving traffic to your website or booking page.`,
        });
      }
    }
    if (s.postingConsistency.rating !== "Strong") {
      if (m.daysSinceLastPost && m.daysSinceLastPost > 7) {
        quickWins.push({
          platform: pName,
          text: `You haven't posted on ${pName} in ${m.daysSinceLastPost} days. The algorithm penalises inactivity — get a post out this week.`,
        });
      } else if (m.postsPerWeek! < FREQUENCY_BENCHMARKS[platform]) {
        quickWins.push({
          platform: pName,
          text: `You're posting ${m.postsPerWeek}x/week on ${pName} — the benchmark is ${FREQUENCY_BENCHMARKS[platform]}x. A content scheduler would close that gap.`,
        });
      }
    }
    if (s.engagementHealth.rating !== "Strong") {
      quickWins.push({
        platform: pName,
        text: `Your ${pName} engagement rate is ${m.engagementRate}% (benchmark: ${bench.good}%+). Start a 10-min daily routine — comment on 5 accounts in your niche before you post.`,
      });
    }
    if (s.contentQuality.rating !== "Strong") {
      if (m.avgCaptionLength! < 50) {
        quickWins.push({
          platform: pName,
          text: `Your ${pName} captions average only ${m.avgCaptionLength} characters. Longer, value-driven captions with hooks and CTAs drive significantly more engagement.`,
        });
      }
      if (m.hashtagUsageRate! < 30) {
        quickWins.push({
          platform: pName,
          text: `Only ${m.hashtagUsageRate}% of your ${pName} posts use hashtags. Research 5-10 niche-specific tags and use them consistently.`,
        });
      }
    }
    if (s.growthSignals.rating !== "Strong") {
      quickWins.push({
        platform: pName,
        text: `Pin your best-performing post to the top of your ${pName} profile so new visitors see your strongest content first.`,
      });
    }
  });

  return {
    wins: wins.slice(0, 3),
    quickWins: quickWins.slice(0, 2),
    totalQuickWins: quickWins.length,
  };
}

// ============================================================
// JOB RUNNER — mirrors runAuditScraping() from server.js
// ============================================================
export function runAuditScraping(auditId: string, onComplete: (job: AuditJob) => void) {
  const audit = audits.get(auditId);
  if (!audit) return;

  (async () => {
    const scrapePromises = Object.entries(audit.platforms).map(async ([platform, handle]) => {
      audit.platformStatuses[platform] = "scanning";
      try {
        if (!apifyClient) throw new Error("Apify not configured");
        const data = await scrapers[platform as PlatformKey](handle);
        audit.rawData[platform] = data;
        audit.platformStatuses[platform] = "complete";
        console.log(`Scraped ${platform} for ${audit.leadData.name}`);
      } catch (err) {
        console.error(
          `Scrape failed for ${platform}:`,
          err instanceof Error ? err.message : err
        );
        audit.rawData[platform] = null;
        audit.platformStatuses[platform] = "failed";
      }
    });

    await Promise.allSettled(scrapePromises);

    const { scores, metrics } = scoreFromScrapedData(audit.rawData);
    const insights = generateDataDrivenInsights(scores, metrics);

    const platformScores = Object.values(scores).map((s) => s.overallScore);
    const overallScore = platformScores.length
      ? Math.round(platformScores.reduce((a, b) => a + b, 0) / platformScores.length)
      : 0;

    audit.metrics = metrics;
    audit.results = {
      platforms: scores,
      insights,
      overallScore,
      grade: getGrade(overallScore),
    };
    audit.status = "complete";

    onComplete(audit);

    // Auto-expire after 2 hours (same as server.js)
    setTimeout(() => audits.delete(auditId), 7200000);
  })();
}

// ============================================================
// EMAIL NOTIFICATION — SWAPPED from Resend to SMTP (sendMail)
// ============================================================
function ratingColor(rating: string): string {
  if (rating === "Strong") return "#22c55e";
  if (rating === "Needs Work") return "#eab308";
  if (rating === "N/A") return "#666";
  return "#ef4444";
}

export function buildNotificationEmail(
  leadData: LeadData,
  results: AuditResults,
  metrics: Record<string, PlatformMetrics>
): { subject: string; html: string } {
  // ratingColor is part of the faithful port; referenced to satisfy linting.
  void ratingColor;

  const goalLabels: Record<string, string> = {
    brand_awareness: "Brand Awareness",
    lead_generation: "Lead Generation",
    direct_sales: "Direct Sales",
    community: "Community Building",
    thought_leadership: "Thought Leadership",
  };

  const platformList = Object.keys(leadData.platforms || {})
    .map((p) => platformName(p))
    .join(", ");

  const metricsRows = Object.entries(metrics || {})
    .map(([p, m]) => {
      if (m.failed)
        return `<tr><td style="padding:6px 12px;color:#fff;">${platformName(
          p
        )}</td><td colspan="4" style="padding:6px 12px;color:#ef4444;">Scrape failed</td></tr>`;
      return `<tr>
      <td style="padding:6px 12px;font-weight:bold;color:#fff;">${platformName(p)}</td>
      <td style="padding:6px 12px;color:#ccc;">${formatNumber(m.followers || 0)} followers</td>
      <td style="padding:6px 12px;color:#ccc;">${m.engagementRate}% eng rate</td>
      <td style="padding:6px 12px;color:#ccc;">${m.postsPerWeek}/week</td>
      <td style="padding:6px 12px;color:#ccc;">${
        m.daysSinceLastPost != null ? m.daysSinceLastPost + "d ago" : "N/A"
      }</td>
    </tr>`;
    })
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
      <h1 style="color:#F92672;margin:0 0 4px;">New Audit Lead</h1>
      <p style="color:#888;margin:0 0 24px;font-size:14px;">${new Date().toLocaleString(
        "en-GB",
        { timeZone: "Europe/London" }
      )}</p>
      <table style="width:100%;margin-bottom:24px;">
        <tr><td style="color:#888;padding:4px 0;">Name</td><td style="padding:4px 0;"><strong>${
          leadData.name
        }</strong></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Email</td><td style="padding:4px 0;"><a href="mailto:${
          leadData.email
        }" style="color:#F92672;">${leadData.email}</a></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Business</td><td style="padding:4px 0;">${
          leadData.business
        }</td></tr>
        <tr><td style="color:#888;padding:4px 0;">Goal</td><td style="padding:4px 0;">${
          goalLabels[leadData.goal] || leadData.goal
        }</td></tr>
        <tr><td style="color:#888;padding:4px 0;">Platforms</td><td style="padding:4px 0;">${platformList}</td></tr>
      </table>
      <div style="background:#111;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="color:#888;margin:0 0 4px;font-size:13px;">OVERALL SCORE</p>
        <p style="font-size:48px;font-weight:bold;margin:0;color:#F92672;">${
          results.overallScore
        }/100</p>
        <p style="font-size:24px;margin:4px 0 0;color:#fff;">Grade: ${results.grade}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:24px;">
        <thead><tr style="background:#1a1a1a;">
          <th style="padding:6px 12px;text-align:left;color:#888;">Platform</th>
          <th style="padding:6px 12px;text-align:left;color:#888;">Followers</th>
          <th style="padding:6px 12px;text-align:left;color:#888;">Engagement</th>
          <th style="padding:6px 12px;text-align:left;color:#888;">Frequency</th>
          <th style="padding:6px 12px;text-align:left;color:#888;">Last Post</th>
        </tr></thead>
        <tbody>${metricsRows}</tbody>
      </table>
      <div style="background:#1a1a1a;border-left:3px solid #F92672;padding:16px;border-radius:0 8px 8px 0;">
        <p style="margin:0;font-size:13px;color:#ccc;">This lead scored <strong>${
          results.overallScore
        }/100</strong> — ${
          results.overallScore < 50
            ? "a strong candidate for AW-LWAYS On Time."
            : results.overallScore < 70
            ? "could benefit from consistent graphics support."
            : "doing well but may want to level up visuals."
        }</p>
      </div>
      <p style="margin:24px 0 0;text-align:center;">
        <a href="mailto:${leadData.email}?subject=Your%20Social%20Media%20Audit%20Results&body=Hi%20${encodeURIComponent(
          leadData.name.split(" ")[0]
        )}%2C%0A%0AThanks%20for%20completing%20the%20social%20media%20audit!" style="display:inline-block;background:#F92672;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">Reply to ${
          leadData.name.split(" ")[0]
        }</a>
      </p>
    </div>`;

  return {
    subject: `New Audit Lead: ${leadData.name} (${results.overallScore}/100)`,
    html,
  };
}
