import { Controller, Logger, Get, UseGuards, Query, ValidationPipe, Post, Body, Put, Param, Delete, UsePipes } from '@nestjs/common';
import { QuoteService } from '../services/quotes.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QuoteDetailsDto, QuoteParamIdDto } from '../dto/quotes.dto';

@Controller('quotes')
export class QuoteController {
    private logger: Logger;

    constructor (private quoteService: QuoteService) {
        this.logger = new Logger('QuoteController');
    }

    @Get()
    @ApiOperation({ title: 'Get all Quotes.' })
    async getAllQuotes (): Promise<any> {
        return this.quoteService.getAllQuotes();
    }

    @Get('/details/:id')
    @ApiOperation({ title: 'Get specific Quote details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async getQuoteById (@Param(ValidationPipe) param: QuoteParamIdDto): Promise<any> {
        const { id } = param;
        return this.quoteService.getQuoteById(id);
    }

    @Post('/add')
    @ApiOperation({ title: 'Create New Quote. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async addNewQuote (@Body() quoteDetailsDto: QuoteDetailsDto): Promise<string> {
        return this.quoteService.addQuote(quoteDetailsDto);
    }

    @Put('/update/:id')
    @ApiOperation({ title: 'Update Existing Quote details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async updateQuoteById (
        @Param(ValidationPipe) param: QuoteParamIdDto, 
        @Body() quoteDetailsDto: QuoteDetailsDto): Promise<string> {
            const { id } = param;
            return this.quoteService.updateQuoteById(id, quoteDetailsDto);
    }

    @Delete('/delete/:id')
    @ApiOperation({ title: 'Delete Existing Quote details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    async deleteQuoteById (@Param(ValidationPipe) param: QuoteParamIdDto): Promise <string> {
        const { id } = param;
        return this.quoteService.deleteQuoteById(id);
    }
}
