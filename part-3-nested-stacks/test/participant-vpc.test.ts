import '@aws-cdk/assert/jest';

import { ParticipantVpc } from '../lib/participants/participant-vpc';

import { expect, countResources, haveResourceLike } from '@aws-cdk/assert';

import * as TestUtils from './utils/test-utils';

test('VPC should have a given number of subnets', () => {
  const stack = TestUtils.getTestStack();

  new ParticipantVpc(stack, 'ParticipantVPC', {
    numberOfAZs: 1
  });

  expect(stack).to(countResources('AWS::EC2::Subnet', 2));
});

test('VPC should have a given CIDR for IPv4', () => {
  const testCidr: string = "10.120.1.0/20";

  const stack = TestUtils.getTestStack();

  new ParticipantVpc(stack, 'ParticipantVPC', {
    cidrIPv4: testCidr
  });

  expect(stack).to(haveResourceLike('AWS::EC2::VPC', { CidrBlock: testCidr }));
});

// FIXME: Sigh, not implemented yet. :(
// https://github.com/aws/aws-cdk/issues/5927

// test('VPC should have an assigned CIDR for IPv6', () => {
//   const stack = TestUtils.getTestStack();

//   new ParticipantVpc(stack, 'ParticipantVPC');

//   expect(stack).to(haveResourceLike('AWS::EC2::VPCCidrBlock', { AmazonProvidedIpv6CidrBlock: true }));
// });

test('VPC should have a dedicated VPC endpoint for S3', () => {
  const stack = TestUtils.getTestStack();

  new ParticipantVpc(stack, 'ParticipantVPC');

  expect(stack).to(haveResourceLike('AWS::EC2::VPCEndpoint', {
    VpcEndpointType: "Gateway",
    ServiceName: { "Fn::Join": [ "", [ "com.amazonaws.", { "Ref": "AWS::Region" }, ".s3" ] ] }
  }));
});
