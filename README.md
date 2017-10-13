You can use this script to set environment variables to deploy Chisel projects to Pantheon using Gitlab CI. When creating multiple projects you have to change only `baseName`, `pantheonGit` and `pantheonSiteName`.

Node 8+ is required.

1. Clone/download
2. Copy `config.sample.js` to `config.js`.
3. Fill config.
4. Run `node setVariables.js`.
