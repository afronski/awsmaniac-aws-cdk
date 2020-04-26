import { SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import { VpcStack } from '../lib/vpc-stack';

test('Empty Stack', () => {
    const app = new cdk.App();

    const stack = new VpcStack(app, 'MyTestStack');

    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
