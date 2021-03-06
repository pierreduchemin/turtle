import { URL } from 'url';

import request from 'request-promise';

import config from 'turtle/config';

async function setSupportedSdkVersions(platform: string, sdkVersions: string[]) {
  const { href } = new URL('/--/api/v2/standalone-build/setSupportedSDKVersions', resolveWWWEndpoint());
  await request({
    method: 'POST',
    uri: href,
    headers: {
      'secret-token': config.www.secretToken,
    },
    body: {
      platform,
      sdkVersions,
    },
    json: true,
  });
}

async function setTurtleVersion(version: string) {
  const { href } = new URL('/--/api/v2/standalone-build/setTurtleVersion', resolveWWWEndpoint());
  await request({
    method: 'POST',
    uri: href,
    headers: {
      'secret-token': config.www.secretToken,
    },
    body: {
      version,
    },
    json: true,
  });
}

function resolveWWWEndpoint() {
  const currentEnv = config.deploymentEnv;
  if (currentEnv === 'production') {
    return 'https://exp.host';
  } else if (currentEnv === 'staging') {
    return 'https://staging.exp.host';
  } else {
    return 'http://127.0.0.1:3000';
  }
}

export { setSupportedSdkVersions, setTurtleVersion };
