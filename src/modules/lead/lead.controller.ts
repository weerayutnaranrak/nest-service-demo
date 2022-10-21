import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExampleGuard } from 'src/guards/example.guard';
import { LeadService } from './lead.service';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  @UseGuards(AuthGuard('bearer'), ExampleGuard)
  findAll(@Request() req) {
    console.log(req.user);
    return 'test';
    // return this.leadService.findAll();
  }
}
