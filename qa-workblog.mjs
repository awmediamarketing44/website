const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
const BASE = "https://awmedia.marketing";

const pages = [
  "/work", "/blog",
  "/work/ac-visuals-logo","/work/altitude","/work/dan-reeve","/work/jic","/work/noura","/work/quickfit-ev","/work/thecoachconsultant","/work/vantage-brand",
  "/blog/10-essential-principles-of-modern-web-design",
  "/blog/50-other-coaches-in-your-area-are-using-the-same-wix-template-you-paid-800-for",
  "/blog/ai-built-in-30-seconds-is-a-scam",
  "/blog/case-study-how-we-built-a-premium-landing-page-for-natural-bodybuilding-coach-kosma-rduch",
  "/blog/dealing-with-my-adhd-managing-my-business",
  "/blog/how-much-does-a-website-cost-for-a-personal-trainer-in-2025",
  "/blog/the-real-cost-of-diy-graphics-why-fitness-coaches-waste-14-days-on-canva",
  "/blog/youre-charging-150-because-your-canva-logo-says-youre-worth-150",
];

async function fetchText(url) {
  const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "manual" });
  let body = ""; try { body = await r.text(); } catch {}
  return { status: r.status, body };
}
async function head(url) {
  try {
    let r = await fetch(url, { method: "HEAD", headers: { "User-Agent": UA }, redirect: "manual" });
    if (r.status === 405 || r.status === 501 || r.status === 403) r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "manual" });
    return r.status;
  } catch (e) { return "ERR"; }
}
const linkCache = new Map(), imgCache = new Map();
function abs(u){ if(!u) return null; if(u.startsWith("http")) return u; if(u.startsWith("//")) return "https:"+u; if(u.startsWith("/")) return BASE+u; return null; }
function decode(s){return s.replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&nbsp;/g," ");}

const results = [];
for (const p of pages) {
  const url = BASE + p;
  const { status, body } = await fetchText(url);
  const issues = [];
  const title = (body.match(/<title>([^<]*)<\/title>/i)||[])[1];
  if (!title || !title.trim()) issues.push("MISSING <title>");
  const md = (body.match(/<meta name="description" content="([^"]*)"/i)||[])[1];
  if (md === undefined) issues.push("MISSING meta description");
  else if (!md.trim()) issues.push("EMPTY meta description");
  const h1s = body.match(/<h1[\s>]/gi)||[];
  if (h1s.length===0) issues.push("MISSING H1");
  if (h1s.length>1) issues.push("MULTIPLE H1 ("+h1s.length+")");

  const text = body.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ");
  const visible = decode(text.replace(/<[^>]+>/g," ").replace(/\s+/g," ")).trim();

  for (const bad of ["lorem ipsum","undefined","placeholder text","tbd","todo:"]) {
    if (new RegExp("\\b"+bad.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i").test(visible)) issues.push("COPY contains '"+bad+"'");
  }
  // NaN as standalone
  if (/\bNaN\b/.test(visible)) issues.push("COPY contains 'NaN'");
  if (visible.includes("—")) {
    const idx = visible.indexOf("—");
    issues.push("EM DASH: ..."+visible.slice(Math.max(0,idx-40),idx+40)+"...");
  }
  const dm = visible.match(/\b([A-Za-z]{3,})\s+\1\b/gi);
  if (dm) {
    const filtered = dm.filter(x=>{const w=x.split(/\s+/)[0].toLowerCase(); return !["that","very","blah"].includes(w);});
    if (filtered.length) issues.push("DOUBLED WORDS: "+[...new Set(filtered.map(s=>s))].slice(0,6).join(", "));
  }

  // images (skip next optimizer)
  const imgs = new Set();
  for (const m of body.matchAll(/<img[^>]+src="([^"]+)"/gi)){ const a=abs(decode(m[1])); if(a) imgs.add(a); }
  for (const m of body.matchAll(/<meta property="og:image" content="([^"]+)"/gi)){ const a=abs(decode(m[1])); if(a) imgs.add(a); }
  const brokenImgs=[];
  for (const im of imgs){
    if (im.includes("/_next/image")) continue;
    if (!imgCache.has(im)) imgCache.set(im, await head(im));
    const st=imgCache.get(im);
    if (st!==200 && st!==304) brokenImgs.push(im.replace(BASE,"")+" ["+st+"]");
  }
  if (brokenImgs.length) issues.push("BROKEN IMAGES: "+brokenImgs.slice(0,10).join(" | "));

  // internal links
  const links=new Set();
  for (const m of body.matchAll(/<a[^>]+href="([^"]+)"/gi)){
    let h=decode(m[1]);
    if (h.startsWith("/")&&!h.startsWith("//")) links.add(h.split("#")[0].split("?")[0]);
    else if (h.startsWith(BASE)) links.add(h.replace(BASE,"").split("#")[0].split("?")[0]);
  }
  const brokenLinks=[];
  for (const l of links){
    if (!l||l==="/") continue;
    const full=BASE+l;
    if (!linkCache.has(full)) linkCache.set(full, await head(full));
    const st=linkCache.get(full);
    if (st===404||st===410||st===500||st==="ERR") brokenLinks.push(l+" ["+st+"]");
  }
  if (brokenLinks.length) issues.push("BROKEN LINKS: "+brokenLinks.slice(0,10).join(" | "));

  results.push({page:p,status,title:title?decode(title):null,h1:h1s.length,issues});
  console.log("=== "+p+" ["+status+"] h1="+h1s.length+" ===");
  if (!issues.length) console.log("  CLEAN");
  for (const i of issues) console.log("  - "+i);
}
