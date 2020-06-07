import * as cdk from '@aws-cdk/core';

import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';

export interface ParticipantProps {
  zeroPadded?: string;

  commonGroup: iam.Group;
  commonBucket: s3.Bucket;
}

export class Participant extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props: ParticipantProps) {
    super(scope, id);

    const participant = new iam.User(this, `WorkshopUser${props.zeroPadded}`, {
        userName: `user${props.zeroPadded}`,
        password: cdk.SecretValue.plainText(this.node.tryGetContext('initialPassword')),
        passwordResetRequired: true,
        groups: [
          props.commonGroup
        ]
    });

    let userBucket = new s3.Bucket(this, `ParticipantBucket${props?.zeroPadded}`, {
      bucketName: `bucket-for-user-${props?.zeroPadded}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      encryption: s3.BucketEncryption.S3_MANAGED
    });

    userBucket.grantReadWrite(participant);
    props?.commonBucket.grantRead(participant);
  }

}
