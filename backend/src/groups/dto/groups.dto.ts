import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GroupDetailsDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    title: string;
    
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    slug: string;

    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    description: string;

    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    premium: boolean;
};

export class GroupParamIdDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    id: string;
}