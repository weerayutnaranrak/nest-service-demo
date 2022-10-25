import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ExampleGuard } from 'src/guards/example.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LeadService } from './lead.service';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  @ApiBearerAuth('okta')
  @UseGuards(AuthGuard('bearer'))
  // @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    console.log(req.user);
    return 'test';
    return this.leadService.findAll();
  }
}
