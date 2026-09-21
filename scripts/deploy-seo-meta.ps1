# Deploys the 21 Sep 2026 SEO title/meta-description fixes to awmedia.marketing.
# 11 source files, then a CLEAN server build (old .next moved aside, never built
# over -- see the 20 Sep 502s), then pm2 restarted twice, then the live tags read
# back off the served HTML.
$ErrorActionPreference = 'Stop'
Set-Location "C:\Users\mraiw\Desktop\awmedia-site"

$KEY  = "C:\Users\mraiw\Desktop\claude-test-key.ppk"
$HK1  = "SHA256:gAQSqv38sfY94bxJdeHxqJiI78SoR+NmKV5IaCkELbU"
$HK2  = "SHA256:6lAwjqZyhED0HRCxGUjkfyKm201TwD17JgguERAftNY"
$DEST = "awmedia.marketing@ssh.lhr.stackcp.com"
$ROOT = "public_html/awmedia-node"
$SSH  = "C:\Users\mraiw\.ssh\awssh.ps1"

function Push-One($local, $remote) {
  Write-Host "  -> $remote"
  & "C:\Program Files\PuTTY\pscp.exe" -i $KEY -P 39390 -hostkey $HK1 -hostkey $HK2 -batch `
    $local "${DEST}:$ROOT/$remote"
  if ($LASTEXITCODE -ne 0) { throw "pscp failed on $remote" }
}

Write-Host "Uploading 11 changed files..." -ForegroundColor Cyan
Push-One "src\app\free-resources\page.tsx"   "src/app/free-resources/page.tsx"
Push-One "src\app\newsletter\page.tsx"       "src/app/newsletter/page.tsx"
Push-One "src\app\website-concept\page.tsx"  "src/app/website-concept/page.tsx"
Push-One "src\app\geo-audit\page.tsx"        "src/app/geo-audit/page.tsx"
Push-One "src\app\ai-score\page.tsx"         "src/app/ai-score/page.tsx"
Push-One "src\app\ai-label-check\page.tsx"   "src/app/ai-label-check/page.tsx"
Push-One "src\data\services.ts"              "src/data/services.ts"
Push-One "src\data\landing-pages.ts"         "src/data/landing-pages.ts"
Push-One "src\data\comparisons.ts"           "src/data/comparisons.ts"
Push-One "src\data\resources.ts"             "src/data/resources.ts"

# The [slug] folder: brackets are a wildcard to PowerShell and to pscp's own
# local expansion, so stage the file under a plain name first.
$stage = Join-Path $env:TEMP "fr-slug-page.tsx"
Copy-Item -LiteralPath "src\app\free-resources\[slug]\page.tsx" -Destination $stage -Force
$slugRemote = "src/app/free-resources/" + [char]91 + "slug" + [char]93 + "/page.tsx"
Push-One $stage $slugRemote

Write-Host "`nClean build on the server (site will be rough for 2-3 min)..." -ForegroundColor Cyan
$stamp = Get-Date -Format "yyyyMMdd-HHmm"
# The build writes to a log and its own exit code is re-raised at the end: piping
# straight into `tail` would swallow a failure and report success on a dead build.
$build = 'cd ~/' + $ROOT + ' && mv .next .next-old-' + $stamp +
         ' && { NODE_OPTIONS=--max-old-space-size=3072 npm run build > /tmp/awbuild.log 2>&1; ec=$?;' +
         ' tail -6 /tmp/awbuild.log; exit $ec; }'
& $SSH $build
if ($LASTEXITCODE -ne 0) {
  throw "server build FAILED. Site is down until you roll back: mv .next-old-$stamp .next, then restart pm2 twice."
}

Write-Host "`nRestarting pm2 (twice, it routinely misses the first)..." -ForegroundColor Cyan
& $SSH "~/node_modules/.bin/pm2 restart awmedia-marketing --update-env 2>&1 | tail -2"
& $SSH "~/node_modules/.bin/pm2 restart awmedia-marketing --update-env 2>&1 | tail -2; ~/node_modules/.bin/pm2 pid awmedia-marketing"

Write-Host "`nReading the tags back off the live site..." -ForegroundColor Cyan
Start-Sleep -Seconds 10
$routes = @(
  "/", "/free-resources", "/newsletter", "/website-concept", "/geo-audit", "/ai-score",
  "/ai-label-check", "/services/social-media", "/wordpress-web-design-sheffield",
  "/ecommerce-web-design-sheffield", "/logo-design-sheffield", "/access-database-replacement",
  "/bespoke-crm-development-uk", "/client-portal-development", "/booking-system-development-uk",
  "/aw-media-os", "/custom-app-development-uk", "/free-resources/what-a-website-should-cost",
  "/free-resources/brand-basics", "/free-resources/local-seo-starter",
  "/free-resources/visible-to-ai", "/free-resources/get-your-week-back",
  "/aw-media-vs-typical-agency", "/website-cost-uk", "/wix-vs-professional-web-design"
)
$fails = 0
foreach ($r in $routes) {
  try {
    $res = Invoke-WebRequest -Uri "https://awmedia.marketing$r" -UseBasicParsing -TimeoutSec 30
  } catch {
    Write-Host ("{0,-44} REQUEST FAILED" -f $r) -ForegroundColor Red
    $fails++
    continue
  }
  $t = [System.Net.WebUtility]::HtmlDecode([regex]::Match($res.Content, '<title>([^<]*)</title>').Groups[1].Value)
  $d = [System.Net.WebUtility]::HtmlDecode([regex]::Match($res.Content, '<meta name="description" content="([^"]*)"').Groups[1].Value)
  $bad = @()
  if ($res.StatusCode -ne 200) { $bad += "HTTP $($res.StatusCode)" }
  if ($r -ne "/") {
    if ($t.Length -gt 60)  { $bad += "TITLE $($t.Length)" }
    if ($d.Length -gt 160) { $bad += "DESC $($d.Length)" }
    if ($t.Length -eq 0)   { $bad += "NO TITLE" }
  }
  if ($bad.Count) {
    Write-Host ("{0,-44} {1,-4}{2,-5}FAIL: {3}" -f $r, $t.Length, $d.Length, ($bad -join ", ")) -ForegroundColor Red
    $fails++
  } else {
    Write-Host ("{0,-44} {1,-4}{2,-5}ok" -f $r, $t.Length, $d.Length) -ForegroundColor Green
  }
}
if ($fails) {
  Write-Host "`n$fails route(s) failing live. Rollback: mv .next-old-$stamp .next, then restart pm2 twice." -ForegroundColor Red
  exit 1
}
Write-Host "`nAll 24 routes fixed and the homepage is up. Old build kept at .next-old-$stamp" -ForegroundColor Green
