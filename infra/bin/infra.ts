#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { MeAppStack } from '../lib';

const app = new App();

const env = {
  account: app.node.tryGetContext('account'),
  region: app.node.tryGetContext('region'),
};

const targetEnv = app.node.tryGetContext('targetEnv');

new MeAppStack(app, `${targetEnv}-me`, {
  description: 'Me app',
  stackName: `${targetEnv}-me`,
  env: env,
});

app.synth();
