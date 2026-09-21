# Deploys the live chat bubble to awmedia.marketing (one file: src/app/layout.tsx).
$ErrorActionPreference = 'Stop'
Set-Location "C:\Users\mraiw\Desktop\awmedia-site"
git push origin main
& "C:\Program Files\PuTTY\pscp.exe" -i C:\Users\mraiw\Desktop\claude-test-key.ppk -P 39390 -hostkey SHA256:gAQSqv38sfY94bxJdeHxqJiI78SoR+NmKV5IaCkELbU -hostkey SHA256:6lAwjqZyhED0HRCxGUjkfyKm201TwD17JgguERAftNY -batch "src\app\layout.tsx" "awmedia.marketing@ssh.lhr.stackcp.com:public_html/awmedia-node/src/app/layout.tsx"
& "C:\Users\mraiw\.ssh\awssh.ps1" "cd ~/public_html/awmedia-node && NODE_OPTIONS=--max-old-space-size=3072 npm run build 2>&1 | tail -3 && ~/node_modules/.bin/pm2 restart awmedia-marketing --update-env 2>&1 | tail -2"
Write-Host "Done. Open https://awmedia.marketing/?chat=test" -ForegroundColor Green