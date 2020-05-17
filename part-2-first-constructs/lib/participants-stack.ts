import * as cdk from '@aws-cdk/core';

import { ParticipantVpc } from './participants/participant-vpc';
import { Participant, ParticipantProps } from './participants/participant';

const DEFAULT_NUMBER_OF_PARTICIPANTS: number = 1;

export class ParticipantsStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props: ParticipantProps) {
    super(scope, id);

    const numberOfParticipants = this.node.tryGetContext('numberOfParticipants') || DEFAULT_NUMBER_OF_PARTICIPANTS;
    const prefixSize = numberOfParticipants.toString().length;

    for(let i = 1; i < numberOfParticipants + 1; ++i) {
      const zeroPadded = i.toString().padStart(prefixSize, '0');

      new ParticipantVpc(this, `ParticipantVpcForUser${zeroPadded}`);

      new Participant(this, `ParticipantUser${zeroPadded}`, {
        zeroPadded,
        ...props
      });
    }
  }

}
