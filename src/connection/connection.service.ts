import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SisService } from '../sis/sis.service';
import { AcaPyService } from '../services/acapy.service';
import { parse, getWorkflowInstance, updateWorkflowInstanceByID, getWorkflowInstanceByConnectionID } from '@nas-veridid/workflow-parser';

@Injectable()
export class ConnectionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly sisService: SisService,
    private readonly acapyService: AcaPyService,
  ) {}

  async handleConnection(connectionData: any): Promise<void> {
    if (connectionData.state === 'request') {
      console.log('Current status is request.');
    } else if (connectionData.state === 'active') {
      console.log('Connection is active.');
      await this.handleActiveState(connectionData);
    }
  }

  private async handleActiveState(connectionData: any) {
    const connectionId = connectionData.connection_id;
    const existAnyInstances = await getWorkflowInstanceByConnectionID(connectionId);
    if (existAnyInstances.length === 0) {
      const action = { workflowID: 'root-menu', actionID: '', data: {} };
      let response: any;
    
      try {
        response = await parse(connectionId, action);
      } catch (error) {
        console.error('Error parsing workflow:', error.message);
        return;
      }
    
      if (response.displayData) {
        await this.acapyService.sendMessage(connectionId, JSON.stringify(response));
      } else {
        await this.acapyService.sendMessage(connectionId, "Action Menu Feature Not Available For this Connection!");
      }
    }
  }




 

  
}
