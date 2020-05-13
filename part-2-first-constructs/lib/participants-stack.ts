import * as cdk from '@aws-cdk/core';
import { ParticipantVpc } from './participants/participant-vpc';

const DEFAULT_NUMBER_OF_PARTICIPANTS: number = 1;

export class ParticipantsStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const numberOfParticipants = this.node.tryGetContext('numberOfParticipants') || DEFAULT_NUMBER_OF_PARTICIPANTS;
    const prefixSize = numberOfParticipants.toString().length;

    for(let i = 1; i < numberOfParticipants + 1; ++i) {
      const zeroPadded = i.toString().padStart(prefixSize, '0');
      new ParticipantVpc(this, `ParticipantVpcForUser${zeroPadded}`);
    }

    // TODO: Adding IAM user to the IAM group defined in the other stack.
  }

}
