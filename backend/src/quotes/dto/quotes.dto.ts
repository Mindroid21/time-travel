import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class QuoteDetailsDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    title: string;

    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    description: string;
    
};

export class QuoteParamIdDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    id: string;
}