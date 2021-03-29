import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { RealestateService } from './realestate.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private realestateService: RealestateService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/getproperties')
  @Get()
  public async getProperties(): Promise<any[]> {
     return await this.realestateService.doSeach(10);
  }

  @Get('/searchProperty/:streetNumber/:streetName/:streetSuffix/:suburb/:state')
  public async searchProperty(@Param('streetNumber') streetNumber: string,
                              @Param('streetName') streetName: string,
                              @Param('streetSuffix') streetSuffix: string,
                              @Param('suburb') suburb: string,
                              @Param('state') state: string)
                              : Promise<void> {
       this.realestateService.searchProperty(streetNumber, streetName , streetSuffix, suburb, state);
  }

}
