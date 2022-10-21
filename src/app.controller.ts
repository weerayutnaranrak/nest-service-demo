import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @UseGuards(AuthGuard('bearer'))
  getHello(@Request() req): string {
    console.log(req.user.claims);
    return this.appService.getHello();
  }
}
