import * as cdk from '@aws-cdk/core';

import { NestedStack } from '@aws-cdk/aws-cloudformation';

import { ParticipantVpc } from './participants/participant-vpc';
import { Participant, ParticipantProps } from './participants/participant';

export class ParticipantStack extends NestedStack {

  constructor(scope: cdk.Construct, id: string, props: ParticipantProps) {
    super(scope, id);

    new ParticipantVpc(this, `ParticipantVpcForUser${props.zeroPadded}`);
    new Participant(this, `ParticipantUser${props.zeroPadded}`, props);
  }

}
