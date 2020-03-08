import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ArtistDetailsDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    name: string;
    
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    url: string;

    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    year: string;
};


export class GetArtistByIdDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    id: string;
}