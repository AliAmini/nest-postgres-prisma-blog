import { Process, Processor } from '@nestjs/bull';
import {Job} from "bull";
import { EMAIL } from '../enum/email.enum';

@Processor(EMAIL)
export class EmailProcessor {

  @Process(EMAIL)
  handleEmail(job: Job) {
    const emailData = job.data;

    console.log({emailData});

    // TODO: Implement sending real mail to user
  }
}