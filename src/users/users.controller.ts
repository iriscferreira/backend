import { User } from './user';
import { UsersService } from './users.service';
import { Controller, Get, Param, Body, Post, Put, UseGuards, Delete, UseFilters, HttpException, HttpStatus} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

import {
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Listagem de todos os colaboradores.' })
  @ApiUnauthorizedResponse()
  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll().catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })     
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getById(id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })  
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return await this.usersService.update(id, user).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Body() user: User) {
     return await this.usersService.delete(id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })     
  }
}
