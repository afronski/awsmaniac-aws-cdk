import * as cdk from '@aws-cdk/core';

import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';

export class CommonResourcesStack extends cdk.Stack {
  public readonly commonGroup: iam.Group;
  public readonly commonBucket: s3.Bucket;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.commonBucket = new s3.Bucket(this, 'CommonBucket', {
      bucketName: 'shared-bucket-for-all'
    });

    this.commonGroup = new iam.Group(this, 'WorkshopParticipants');

    const groupPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess');
    this.commonGroup.addManagedPolicy(groupPolicy);
  }

}
