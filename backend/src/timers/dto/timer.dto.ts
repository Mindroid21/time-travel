import { IsNotEmpty, IsOptional, IsNumber, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { TIMER_STATUS } from '../models/timer.model';

export class TimerDetailsDto {
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
    description: string;

    @ApiModelProperty({
        required: true
    })
    isTask: boolean;

    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    sDate: number;

    @ApiModelProperty({
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    eDate: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsIn([ TIMER_STATUS.ACTIVE, TIMER_STATUS.COMPLETED ])
    status: TIMER_STATUS;
}

export class TimerParamIdDto {
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