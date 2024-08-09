import { Module } from '@nestjs/common';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { HttpModule } from '@nestjs/axios';
import { MetadataModule } from '../metadata/metadata.module';
import { ConfigService } from '@nestjs/config';
import { ConnectionService } from '../connection/connection.service';
import { AcaPyService } from '../services/acapy.service';
import { SisService } from '../sis/sis.service';


@Module({
  imports: [HttpModule, MetadataModule],
  controllers: [CredentialController],
  providers: [
    CredentialService,
    ConfigService,
    SisService,
    ConnectionService,
    AcaPyService
  ],
})
export class CredentialModule {}
