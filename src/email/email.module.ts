import { BullModule } from '@nestjs/bull/dist/bull.module';
import { Module } from '@nestjs/common';
import { EMAIL } from './enum/email.enum';
import { EmailService } from './email.service';
import { EmailProcessor } from './queue/email.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EMAIL,
    }),
  ],
  providers: [EmailService, EmailProcessor],
  exports: [EmailService]
})
export class EmailModule {}
