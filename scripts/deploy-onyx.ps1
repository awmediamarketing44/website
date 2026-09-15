# One-shot deploy of the Onyx Lagree case study to awmedia.marketing.
# Needs the 20i IP lock cleared first (see feedback_awmedia_ssh_home_ip).
# Run from the repo root:  powershell -File scripts\deploy-onyx.ps1

$ErrorActionPreference = 'Stop'
$key   = 'C:\Users\mraiw\Desktop\claude-test-key.ppk'
$hk1   = 'SHA256:gAQSqv38sfY94bxJdeHxqJiI78SoR+NmKV5IaCkELbU'
$hk2   = 'SHA256:6lAwjqZyhED0HRCxGUjkfyKm201TwD17JgguERAftNY'
$host_ = 'awmedia.marketing@ssh.lhr.stackcp.com'
$pscp  = 'C:\Program Files\PuTTY\pscp.exe'
$app   = 'public_html/awmedia-node'

function Remote($cmd) { & 'C:\Users\mraiw\.ssh\awssh.ps1' $cmd }
function Push($local, $remote) {
  & $pscp -i $key -P 39390 -hostkey $hk1 -hostkey $hk2 -batch $local "${host_}:$remote"
  if ($LASTEXITCODE -ne 0) { throw "pscp failed: $local" }
}

Write-Host '1/6 building locally'
npm run build
if ($LASTEXITCODE -ne 0) { throw 'local build failed' }

Write-Host '2/6 tarring the images'
$tar = "$env:TEMP\onyx-images.tgz"
tar -czf $tar -C public/images/projects onyx-lagree
if (-not (Test-Path $tar)) { throw 'tar failed' }

Write-Host '3/6 uploading'
Push 'src\data\projects.ts' "$app/src/data/projects.ts"
Push $tar "$app/onyx-images.tgz"

Write-Host '4/6 unpacking on the server'
Remote "cd ~/$app && tar -xzf onyx-images.tgz -C public/images/projects && rm onyx-images.tgz && ls public/images/projects/onyx-lagree | wc -l"

Write-Host '5/6 build + restart'
Remote "cd ~/$app && NODE_OPTIONS=--max-old-space-size=3072 npm run build && ~/node_modules/.bin/pm2 restart awmedia-marketing --update-env"

Write-Host '6/6 verifying live'
foreach ($u in 'https://awmedia.marketing/work/onyx-lagree','https://awmedia.marketing/work') {
  $code = (Invoke-WebRequest -Uri $u -UseBasicParsing -MaximumRedirection 0 -SkipHttpErrorCheck).StatusCode
  Write-Host "  $u => $code"
  if ($code -ne 200) { throw "VERIFY FAILED on $u" }
}
Write-Host 'Onyx case study live.'
