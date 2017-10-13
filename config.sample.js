const config = {
  url: '', // https://gitlab.xfive.co/api/v4/ https://gitlab.com/api/v4/
  privateToken: '', // GitLab: Profile -> Access Tokens or Profile -> Account -> Private Tokens
  baseName: '', // GitLab: user/repo
  pantheonGit: '',
  pantheonSiteName: '', // Part of site URL on Pantheon: http(s)://dev-{SITE_NAME}.pantheonsite.io/
  pantheonTerminusToken: '', // https://pantheon.io/docs/machine-tokens/
  pantheonKey: `

`.trim(),
  baseKey: `

`.trim(),
};

module.exports = config;
