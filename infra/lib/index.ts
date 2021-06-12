import { BaseStack } from '@badatt/infra-lib';
import { Construct, StackProps } from '@aws-cdk/core';
import { HostedZone } from '@aws-cdk/aws-route53';
import { CertificateStack } from './certificate';
import { MeWebStack } from './web';

export class MeAppStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const rootDomain = scope.node.tryGetContext('domain');

    const hostedZone = HostedZone.fromLookup(this, 'HostedZoneLookup', {
      domainName: rootDomain,
    });

    const certificateStack = new CertificateStack(this, 'CertificateStack', {
      rootDomain: rootDomain,
      hostedZone: hostedZone,
    });

    const webStack = new MeWebStack(this, 'MeWebStack', {
      certificate: certificateStack.certificate,
      hostedZone: hostedZone,
      siteUrl: rootDomain,
    });
  }
}
