import * as cdk from '@aws-cdk/core';

import { ParticipantStack } from './participant-stack';
import { ParticipantProps } from './participants/participant';

const DEFAULT_NUMBER_OF_PARTICIPANTS: number = 1;

export class ParticipantsStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props: ParticipantProps) {
    super(scope, id);

    const numberOfParticipants = parseInt(
      this.node.tryGetContext('numberOfParticipants') || DEFAULT_NUMBER_OF_PARTICIPANTS,
      10
    );

    const prefixSize = numberOfParticipants.toString().length;

    for(let i = 1; i < numberOfParticipants + 1; ++i) {
      props.zeroPadded = i.toString().padStart(prefixSize, '0');

      new ParticipantStack(this, `ParticipantStack${props.zeroPadded}`, props);
    }
  }

}
