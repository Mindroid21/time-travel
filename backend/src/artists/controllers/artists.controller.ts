import { Controller, Get, Post, ValidationPipe, Body, UseGuards, Query, Logger, Put, Delete, Param, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
// Custom
import { ArtistsService } from '../services/artists.service';
import { ArtistDetailsDto, GetArtistByIdDto } from '../dto/artists.dto';

@Controller('artist')
export class ArtistController {
    private logger: Logger;

    constructor(private artistService: ArtistsService) {
        this.logger = new Logger('ArtistController');
    }

    @Get()
    @ApiOperation({ title: 'Get all Artists.' })
    getAllArtists(): Promise<any> {
        return this.artistService.getAllArtists();
    }

    @Get('/details/:id')
    @ApiOperation({ title: 'Get specific Artist details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())    
    getArtistById (@Param(ValidationPipe) param: GetArtistByIdDto): Promise<any> {
        const { id } = param;
        this.logger.verbose(`Query param is: ${id}`);
        return this.artistService.getArtistById(id);
    }

    @Post('/add')
    @ApiOperation({ title: 'Add New Artist. *Requires Session Token' })    
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    addNewArtist(@Body() artistDetailsDto: ArtistDetailsDto): Promise<string> {
        return this.artistService.addArtist(artistDetailsDto);
    }

    @Put('/update/:id')
    @ApiOperation({ title: 'Update Existing Artist details by its id. *Requires Session Token' })
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    updateArtistById (
        @Param('id') id: string, 
        @Body() artistDetailsDto: ArtistDetailsDto): Promise<string> {
            return this.artistService.updateArtistById(id, artistDetailsDto);
    }

    @Delete('/delete/:id')
    @ApiOperation({ title: 'Delete Existing Artist details by its id. *Requires Session Token' })
    async deleteArtistById (@Param(ValidationPipe) param: GetArtistByIdDto): Promise <string> {
        const { id } = param;
        this.logger.verbose(`DELETE - Param ID is: ${id}`);
        return this.artistService.deleteArtistById(id);
    }

}
