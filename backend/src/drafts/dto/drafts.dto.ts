import { IsNotEmpty, IsOptional, IsArray, IsNumber, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { DRAFT_STATUS } from '../models/drafts.model';

export class DraftDetailsDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    title: string;
    
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    createdBy: string;

    @ApiModelProperty()
    @IsOptional()
    updatedBy: string;

    @ApiModelProperty()
    @IsOptional()
    description: string;

    @ApiModelProperty()
    @IsArray()
    links: string [];

    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    content: string;

    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    date: number;

    @ApiModelProperty()
    @IsArray()
    tags: string[];

    @ApiModelProperty()
    @IsOptional()
    artist: string;

    @ApiModelProperty()
    @IsArray()
    groups: string[];

    @ApiModelProperty()
    @IsNotEmpty()
    @IsIn([ DRAFT_STATUS.IN_PROGRESS, DRAFT_STATUS.NEW, DRAFT_STATUS.SUBMITTED ])
    status: DRAFT_STATUS;
}

export class DraftParamIdDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    id: string;
}

export class MarkdownContentDto {
    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    content: string;
}