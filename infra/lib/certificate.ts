import { BaseNestedStack } from '@badatt/infra-lib/build/dist';
import { IHostedZone } from '@aws-cdk/aws-route53';
import { Certificate, CertificateValidation } from '@aws-cdk/aws-certificatemanager';
import { Construct, NestedStackProps } from '@aws-cdk/core';

export interface CertificateProps extends NestedStackProps {
  readonly rootDomain: string;
  readonly hostedZone: IHostedZone;
}

export class CertificateStack extends BaseNestedStack {
  public certificate: Certificate;
  constructor(scope: Construct, id: string, props: CertificateProps) {
    super(scope, id, props);
    this.certificate = new Certificate(this, 'Certificate', {
      domainName: props.rootDomain,
      validation: CertificateValidation.fromDns(props.hostedZone),
    });
  }
}
