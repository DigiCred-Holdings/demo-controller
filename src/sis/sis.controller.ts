import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SisService } from './sis.service';

@Controller('')
export class SisController {
    constructor(
        private readonly sisService: SisService,
    ) {}    

    @Get('student-transcript')
    @ApiOperation({ summary: 'Retrieve student transcript by student number' })
    @ApiQuery({ name: 'studentNumber', required: true, type: String, description: 'The student number' })
    @ApiResponse({ status: 200, description: 'The student transcript' })
    @ApiResponse({ status: 404, description: 'Student not found' })
    async getStudentTranscript(@Query('studentNumber') studentNumber: string) {
        let transcript={}
        try {
            transcript=this.sisService.getStudentTranscript(studentNumber);
        } catch (error) {
            throw new HttpException('Failed to retrieve student information', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return transcript;
    }

    @Get('student-id')
    @ApiOperation({ summary: 'Retrieve student name by student number' })
    @ApiQuery({ name: 'studentNumber', required: true, type: String, description: 'The student number' })
    @ApiResponse({ status: 200, description: 'The student name' })
    @ApiResponse({ status: 404, description: 'Student not found' })
    async getStudentName(@Query('studentNumber') studentNumber: string) {
        let studentIdCred={}
        try {
            studentIdCred=this.sisService.getStudentName(studentNumber);
        } catch (error) {
            throw new HttpException('Failed to retrieve student information', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return studentIdCred;
    }

}
