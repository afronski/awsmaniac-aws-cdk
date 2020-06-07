import * as cdk from '@aws-cdk/core';

import * as s3 from '@aws-cdk/aws-s3';

export class BucketEncryptionChecker implements cdk.IAspect {
  public visit(node: cdk.IConstruct): void {
    if (node instanceof s3.CfnBucket) {
      if (!node.bucketEncryption) {
        node.node.addError('Bucket encryption is not enabled');
      }
    }
  }
}
