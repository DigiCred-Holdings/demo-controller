import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parse } from '@nas-veridid/workflow-parser';
import { AcaPyService } from '../services/acapy.service';
import { SisService } from 'src/sis/sis.service';

@Injectable()
export class BasicMessagesService {

  constructor(
    private readonly configService: ConfigService,
    private readonly acapyService: AcaPyService,
    private readonly sisService: SisService
  ) { }

  // Method to validate JSON format
  async isValidJsonFormat(content: string): Promise<boolean> {
    try {
      const parsedContent = JSON.parse(content);
      return typeof parsedContent.workflowID === 'string' &&
        typeof parsedContent.actionID === 'string' &&
        typeof parsedContent.data === 'object';
    } catch (e) {
      return false;
    }
  }

  // Main method to process messages
  async processMessage(messageData: any): Promise<void> {
    const connectionId: string = messageData.connection_id;

    // Handle JSON format workflow messages
    if (await this.isValidJsonFormat(messageData.content)) {
      let response: any;
      const parsedContent = JSON.parse(messageData.content);
      const action = {
        workflowID: parsedContent.workflowID,
        actionID: parsedContent.actionID,
        data: parsedContent.data,
      };

      try {
        response = await parse(connectionId, action);
      } catch (error) {
        console.error('Error parsing workflow:', error.message);
        return;
      }

      if (response.displayData) {
        const hasAgentType = response.displayData.some((item: any) => item.type === 'agent');
        if (hasAgentType) {
          const agentItems = response.displayData.filter((item: any) => item.type === 'agent');
          for (const agentItem of agentItems) {
            if (agentItem.process === 'verification') {
              await this.acapyService.sendProofRequest(connectionId, agentItem.data);
            } else if (agentItem.process === 'issuance') {
             // to process issuance logic
            } else if (agentItem.process === 'connection') {
              // to process connections logic
            }
          }
          // Filter out the content with type 'agent'
          const filteredDisplayData = response.displayData.filter((item: any) => item.type !== 'agent');
          // Construct modified response
          const modifiedResponse = { ...response, displayData: filteredDisplayData };
          // Send workflow response message with filtered displayData
          await this.acapyService.sendMessage(connectionId, JSON.stringify(modifiedResponse));
        } else {
          // Send workflow response message as it is
          await this.acapyService.sendMessage(connectionId, JSON.stringify(response));
        }
      } else {
        // Default message if no displayData
        await this.acapyService.sendMessage(connectionId, "Action Menu Feature Not Available For this Connection!");
      }
    }

    // Handle home menu (root menu) requests
    if (messageData.content === ':menu') {
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

  private async invokeWorkflowParser(connectionId: string, action: object): Promise<void> {
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
