import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CredentialService } from './credential.service';
import { ConfigService } from '@nestjs/config';
import { MetadataService } from '../metadata/metadata.service';
import { ConnectionService } from '../connection/connection.service';

@Controller()
export class CredentialController {
  constructor(
    private readonly credentialService: CredentialService,
    private readonly configService: ConfigService,
    private readonly metadataService: MetadataService,
    private readonly connectionService: ConnectionService,
  ) {}

  @Post('/')
  async handleCredential(@Body() credentialData: any, @Res() response: Response): Promise<Response> {

    console.log('************* Credential controller ***************');
    console.log(credentialData);

    try {
      await this.credentialService.handleCredential(credentialData);
      return response
        .status(HttpStatus.OK)
        .send('Connection request handled successfully');
    } catch (error) {
      console.error('Error handling connection request:', error);
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Failed to handle connection request');
    }
  }
}