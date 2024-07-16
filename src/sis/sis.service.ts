import {Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SisService {

    filePath = path.join(process.cwd(), './src/sis/dummy-transcript.json');
    dummy = fs.readFileSync(this.filePath, 'utf-8').toString();

    async getStudentTranscript(studentNumber: string) {
        return this.dummy;
    }

    async getStudentName(studentNumber: string) {
        return {
            "studentIdCred": {
              "fullName": "Sanford Braun Koufax",
              "firstName": "Sanford",
              "middleName": "Braun",
              "lastName": "Koufax",
              "schoolPrimaryEmail": "s.koufax@gmail.com",
              "personalEmail": "s.koufax@gmail.com",
              "studentsId": studentNumber,
              "studentGUID": "72ddf7f2-9be0-4c9b-bd22-d3ff56be3297"
            }
          };
    }
}
