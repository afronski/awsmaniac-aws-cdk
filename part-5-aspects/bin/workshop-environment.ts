#!/usr/bin/env node

import 'source-map-support/register';

import * as cdk from '@aws-cdk/core';

import { CommonResourcesStack } from '../lib/common-resources-stack';
import { ParticipantsStack } from '../lib/participants-stack';
import { BucketEncryptionChecker } from '../lib/aspects/bucket-encryption-checker';

const app = new cdk.App();

app.node.applyAspect(new BucketEncryptionChecker());
cdk.Tag.add(app, 'workshop-name', 'TrainingInJune2020');

const commons = new CommonResourcesStack(app, 'CommonWorkshopResources');

new ParticipantsStack(app, 'ParticipantResources', {
  commonGroup: commons.commonGroup,
  commonBucket: commons.commonBucket
});
