import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiPipe } from 'nestjs-joi';
import { AppService } from './app.service';
import { CreateTinyURLDto as CreateShortURLDto } from './dto/create-tiny-url.dto';
import { ResponseTinyURLDto } from './dto/response-tiny-url.dto';

@Controller()
@ApiTags(AppController.name)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/redirect/:shortUID')
  @ApiOperation({
    summary: 'Redirect to long URL',
    description:
      'This endpoint redirects to the long URL for a given short UID.',
  })
  @Redirect('', HttpStatus.MOVED_PERMANENTLY)
  async redirectToLongURL(
    @Param('shortUID', new JoiPipe(Joi.string().min(1).required()))
    shortUID: string,
  ) {
    const longURL = await this.appService.getLongURLByShortUID(shortUID);
    return { url: longURL.long_url };
  }

  @Get('get/:shortUID')
  @ApiOperation({
    summary: 'Get long URL from short UID',
    description: 'This endpoint returns the long URL for a given short UID.',
  })
  async getLongURLfromShortUID(
    @Param('shortUID', new JoiPipe(Joi.string().min(1).required()))
    shortUID: string,
  ) {
    return new ResponseTinyURLDto(
      await this.appService.getLongURLByShortUID(shortUID),
    );
  }

  @Post('create-short-url')
  @ApiOperation({
    summary: 'Create a short URL',
    description: 'This endpoint creates a short URL for a given long URL.',
  })
  @ApiResponse({
    status: 201,
    description: 'The short URL has been successfully created.',
    type: ResponseTinyURLDto,
  })
  async createTinyURL(@Body() createShortURLDto: CreateShortURLDto) {
    return new ResponseTinyURLDto(
      await this.appService.createShortURL(createShortURLDto),
    );
  }
}
