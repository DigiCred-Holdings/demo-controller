import { Module } from '@nestjs/common';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';
import { HttpModule } from '@nestjs/axios';
import { SisService } from 'src/sis/sis.service';
import { MetadataService } from 'src/metadata/metadata.service';
import { ConfigModule } from '@nestjs/config';
import { AcaPyService } from '../services/acapy.service';


@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ConnectionController],
  providers: [
    ConnectionService,
    SisService,
    MetadataService,
    AcaPyService
  ],
})
export class ConnectionModule {}
