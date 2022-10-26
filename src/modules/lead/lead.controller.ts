import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ExampleGuard } from 'src/guards/example.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LeadService } from './lead.service';
import { OktaAuthGuard } from 'src/auth/okta-auth.guard';
import { JwtOktaAuthGuard } from 'src/auth/jwt-okta-auth.guard';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  // @ApiBearerAuth('okta')
  // @UseGuards(AuthGuard('bearer'))
  // @UseGuards(JwtOktaAuthGuard)
  findAll(@Request() req) {
    console.log(req.user);
    // return 'test';
    return this.leadService.findAll();
  }
}
