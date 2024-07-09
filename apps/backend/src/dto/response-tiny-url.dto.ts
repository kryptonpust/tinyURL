import { ApiProperty } from '@nestjs/swagger';

export class ResponseTinyURLDto {
  @ApiProperty({ description: 'Short UID' })
  short_url: string;
  @ApiProperty({ description: 'Long URL' })
  long_url: string;

  constructor(data: { short_url: string; long_url: string }) {
    this.short_url = data.short_url;
    this.long_url = data.long_url;
  }
}
