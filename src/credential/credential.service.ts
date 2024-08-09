import { Injectable, Logger } from '@nestjs/common';
import { MetadataService } from '../metadata/metadata.service';
import { AcaPyService } from '../services/acapy.service';


interface CredentialData {
  credential_exchange_id: string;
  connection_id: string;
  state: string;
  credential_definition_id: string;
  thread_id?: string;
  [key: string]: any;
}

@Injectable()
export class CredentialService {
  private readonly logger = new Logger(CredentialService.name);

  constructor(
    private readonly metadataService: MetadataService,
    private readonly acapyService: AcaPyService,
  ) { }

  async handleCredential(credentialData: CredentialData): Promise<void> {
    const { credential_exchange_id, connection_id, state } = credentialData;

    if (state === 'offer_sent') {
      this.logger.log('Credential Offer sent...');
    }

    if (state === 'credential_acked') {
      this.logger.log('Credential Accepted ...');
    }
  }
}

