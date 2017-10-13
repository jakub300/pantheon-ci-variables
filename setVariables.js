const querystring = require('querystring');

const config = require('./config');

const baseId = encodeURIComponent(config.baseName);

const axios = require('axios').create({
  baseURL: `${config.url}projects/${baseId}`,
  headers: {
    'PRIVATE-TOKEN': config.privateToken,
  },
  transformRequest(data) {
    return querystring.stringify(data);
  },
});

async function setVariable(key, value) {
  return axios.post('/variables', {
    key,
    value,
  });
}

async function main() {
  const project = (await axios.get('/')).data;
  const { id } = project;
  const baseGit = project.ssh_url_to_repo;
  const triggerUrl = `${config.url}projects/${id}/trigger/pipeline`;

  const trigger = (await axios.post('/triggers', {
    description: 'Pushback',
  })).data;
  const triggerToken = trigger.token;

  await setVariable('BASE_GIT_URL', baseGit);
  await setVariable('CHISEL_BASE_KEY_PRIVATE', config.baseKey);
  await setVariable(
    'CHISEL_PUSHBACK_CONFIG',
    JSON.stringify(
      {
        url: triggerUrl,
        method: 'POST',
        postData: {
          ref: '{GIT.branch}',
          token: triggerToken,
        },
      },
      null,
      2,
    ),
  );

  await setVariable('CHISEL_PANTHEON_SITE_NAME', config.pantheonSiteName);
  await setVariable('PANTHEON_GIT_URL', config.pantheonGit);
  await setVariable('CHISEL_PANTHEON_KEY_PRIVATE', config.pantheonKey);

  await setVariable('TERMINUS_TOKEN', config.pantheonTerminusToken);

  console.log('DONE');
}

main();
