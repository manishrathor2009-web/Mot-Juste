MOT JUSTE — offline app
=======================

This folder is the whole app. It runs in any modern browser, installs to the
home screen on iPad and Android, and works without internet once installed.
Your progress is saved on the device.

PUT IT ONLINE (about 5 minutes, free, once)
-------------------------------------------
A home-screen app has to be opened once from a web address. GitHub Pages is
free and needs only a GitHub account.

1. Sign in at github.com and create a new repository, e.g. "mot-juste".
   Make it Public (Pages on a free account needs a public repository).
2. On the repository page choose "Add file" > "Upload files". Drag in
   everything inside this folder (index.html, manifest.webmanifest, sw.js
   and the icons folder), then "Commit changes".
3. Go to Settings > Pages. Under "Build and deployment", set Source to
   "Deploy from a branch", Branch to "main" and folder to "/ (root)". Save.
4. After a minute or two the address appears at the top of that page:
   https://YOUR-USERNAME.github.io/mot-juste/

Any other static host (Netlify, Cloudflare Pages, your own server) works the
same way: upload the folder as it is.

INSTALL
-------
iPad / iPhone: open the address in Safari, tap Share, then "Add to Home Screen".
Android: open the address in Chrome, open the menu, then "Install app".
Open it once while online so the fonts are saved; after that it works offline.

Use the installed icon rather than a browser tab. On iPad, a home-screen app
keeps its own storage, separate from Safari, and Safari may clear data for
sites you have not visited in a while.

MOVING PROGRESS
---------------
Settings > Backup > Export saves a small file with everything: your review
schedule, streak, XP and notebook. Import it on another device (or in the
claude.ai version) and the two are merged, keeping the newer record for each
word, so nothing is lost if you import in either direction.

UPDATING
--------
If a new version of the files is uploaded, the app picks it up on the next
launch while online. Your progress is not touched.
