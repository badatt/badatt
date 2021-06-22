import { BaseNestedStack, WebApp } from '@badatt/infra-lib/build/dist';
import { IHostedZone } from '@aws-cdk/aws-route53';
import { Certificate } from '@aws-cdk/aws-certificatemanager';
import { Construct, NestedStackProps } from '@aws-cdk/core';

export interface MeWebStackProps extends NestedStackProps {
  readonly hostedZone: IHostedZone;
  readonly certificate: Certificate;
  readonly siteUrl: string;
}

export class MeWebStack extends BaseNestedStack {
  constructor(scope: Construct, id: string, props: MeWebStackProps) {
    super(scope, id, props);

    const webApp = new WebApp(this, 'WebApp', {
      certificate: props.certificate,
      hostedZone: props.hostedZone,
      siteUrl: props.siteUrl,
      routes: ['/youtube-clone']
    });
  }
}
