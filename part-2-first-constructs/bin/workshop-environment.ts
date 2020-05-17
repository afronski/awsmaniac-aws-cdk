#!/usr/bin/env node

import 'source-map-support/register';

import * as cdk from '@aws-cdk/core';

import { CommonResourcesStack } from '../lib/common-resources-stack';
import { ParticipantsStack } from '../lib/participants-stack';

const app = new cdk.App();

const commons = new CommonResourcesStack(app, 'CommonWorkshopResources');

new ParticipantsStack(app, 'ParticipantResources', {
  commonGroup: commons.commonGroup,
  commonBucket: commons.commonBucket
});
