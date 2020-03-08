import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TagDetailsDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    name: string;

    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    description: string;
    
};

export class TagParamIdDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    id: string;
}