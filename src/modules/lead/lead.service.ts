import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LeadService {
  constructor(private readonly dbservice: DatabaseService) {}

  async findAll() {
    const lead = await this.dbservice.executeQuery(
      'SELECT * FROM leads LIMIT 10',
    );
    return lead;
  }
}
