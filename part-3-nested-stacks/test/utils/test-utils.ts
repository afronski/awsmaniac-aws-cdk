import { Stack } from '@aws-cdk/core';

export const DEFAULT_AWS_ACCOUNT_ID: string = '123456789012';
export const DEFAULT_AWS_REGION: string = 'us-east-1';

export function getTestStack(): Stack {
  return new Stack(undefined, 'TestStack', {
    env: {
      account: DEFAULT_AWS_ACCOUNT_ID,
      region: DEFAULT_AWS_REGION
    }
  });
}
