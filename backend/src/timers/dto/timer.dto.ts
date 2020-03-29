import { IsNotEmpty, IsOptional, IsNumber, IsIn, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { TIMER_STATUS, TIMER_TYPE } from '../models/timer.model';

export class TimerDetailsDto {
    @ApiModelProperty ({
        required: true
    })
    @IsNotEmpty()
    createdBy: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsIn([ TIMER_STATUS.ACTIVE, TIMER_STATUS.COMPLETED ])
    status: TIMER_STATUS;

    @ApiModelProperty ({
        required: true
    })
    @IsNotEmpty()
    title: string;

    @ApiModelProperty()
    @IsOptional()
    description: string;

    @ApiModelProperty ({
        required: true
    })
    @IsNotEmpty()
    @IsIn([ TIMER_TYPE.FROM_TO, TIMER_TYPE.UNTIL, TIMER_TYPE.SINCE ])
    type: TIMER_TYPE;

    @ApiModelProperty ({
        required: true
    })
    @IsArray()
    timeDate: Date [];

    @ApiModelProperty()
    @IsOptional()
    link: string;
}

export class TimerParamIdDto {
    @ApiModelProperty ({
        required: true
    })
    @IsNotEmpty()
    id: string;
}

export class MarkdownContentDto {
    @ApiModelProperty ({
        required: true
    })
    @IsNotEmpty()
    content: string;
}