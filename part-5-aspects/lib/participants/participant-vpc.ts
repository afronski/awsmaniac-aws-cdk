import console = require('console');

import * as cdk from '@aws-cdk/core';

import * as ec2 from '@aws-cdk/aws-ec2';

const DEFAULT_CIDR_IPV4: string = "10.0.0.0/16";
const DEFAULT_NUMBER_OF_AZS: number = 3;

export interface ParticipantVpcProps {
  cidrIPv4?: string
  numberOfAZs?: number
}

export class ParticipantVpc extends ec2.Vpc {

  constructor(scope: cdk.Construct, id: string, props?: ParticipantVpcProps) {
    super(scope, id, {
      cidr: props?.cidrIPv4 || DEFAULT_CIDR_IPV4,

      enableDnsHostnames: true,
      enableDnsSupport: true,

      maxAzs: props?.numberOfAZs || DEFAULT_NUMBER_OF_AZS,
      natGateways: props?.numberOfAZs || DEFAULT_NUMBER_OF_AZS
    });

    console.info(`Applying explicit dependencies...`);

    // NAT Gateways must wait for IGW.

    const igw = this.node.findChild('IGW');

    for (let i = 1; i < this.availabilityZones.length + 1; ++i) {
      const nat = this.node.findChild(`PublicSubnet${i}`).node.findChild('NATGateway');
      nat.node.addDependency(igw);
    }

    // We need a security group that allows for SSH to this VPC.

    const ssh = new ec2.SecurityGroup(this, 'SG-SSH', {
      securityGroupName: 'ssh-opened',
      vpc: this,
      allowAllOutbound: true
    });

    ssh.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));
    ssh.addIngressRule(ec2.Peer.anyIpv6(), ec2.Port.tcp(22));

    // We need an S3 VPC gateway endpoint for the private subnets in this VPC.

    const selection = [ { subnetType: ec2.SubnetType.PRIVATE } ];
    this.addS3Endpoint('S3-VPCE', selection);
  }

}
