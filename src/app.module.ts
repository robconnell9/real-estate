import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealestateService } from './realestate.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,RealestateService],
})
export class AppModule {}
