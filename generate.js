const fs = require('fs')
const path = require('path')

// 1. Read all handles from handles.txt
const handles = fs
  .readFileSync('handles.txt', 'utf8')
  .split(/\r?\n/)
  .map(h => h.trim())
  .filter(Boolean)

// 2. Create HTML for each handle
const makeHtml = handle => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${handle} · Instagram Redirect</title>
  <noscript>
    <meta http-equiv="refresh" content="0; url=https://instagram.com/${handle}" />
  </noscript>
</head>
<body>
  <script>
    const username = '${handle}'
    const instaURL = \`https://instagram.com/\${username}\`
    window.location.replace(instaURL)
    document.body.innerHTML = \`
      <div style="font-family:sans-serif; margin-top:2em; text-align:center;">
        <p>JavaScript is disabled. Tap below to visit:</p>
        <a href="\${instaURL}">\${instaURL}</a>
      </div>
    \`
  </script>
</body>
</html>`

// 3. Write one folder + index.html per handle
handles.forEach(handle => {
  const dir = path.join(__dirname, handle)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  fs.writeFileSync(path.join(dir, 'index.html'), makeHtml(handle), 'utf8')
  console.log(`✅ Generated /${handle}/index.html`)
})