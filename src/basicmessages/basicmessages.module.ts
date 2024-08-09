import { Module } from '@nestjs/common';
import { BasicMessagesController } from './basicmessages.controller';
import { BasicMessagesService } from './basicmessages.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SisService } from 'src/sis/sis.service';
import { AcaPyService } from '../services/acapy.service';

@Module({
  imports: [ ConfigModule, HttpModule],
  controllers: [BasicMessagesController],
  providers: [
    BasicMessagesService,
    SisService,
    AcaPyService
  ],
})
export class BasicMessagesModule {}
