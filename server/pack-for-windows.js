const { exec } = require('pkg')

exec(['src/app.js', '--target', 'latest-win-x64', '--output', 'cfp-helper-win.exe'])
