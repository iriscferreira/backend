import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from "express";

@Controller('transactions')
export class TransactionsController {

    constructor(
        private transactionsService: TransactionsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<Transaction[]> {
        return await this.transactionsService.getAll().catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        })
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/cashback')
    async getCashback(@Req() req: Request): Promise<any[]> {
        const { cpf } = req.query;
        return await this.transactionsService.getCashback(cpf.toString()).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Transaction> {
        return await this.transactionsService.getById(id).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        })
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() transaction: Transaction): Promise<Transaction> {
        return await this.transactionsService.create(transaction).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        })
        
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() transaction: Transaction): Promise<Transaction> {
        return await this.transactionsService.update(id, transaction).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.transactionsService.delete(id).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        })
    }
}
