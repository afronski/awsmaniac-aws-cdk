import * as cdk from '@aws-cdk/core';

export class CommonResourcesStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // TODO: Adding common S3 bucket.
    // TODO: Adding IAM Group with limited IAM permissions to S3 bucket and full for EC2.
  }

}
