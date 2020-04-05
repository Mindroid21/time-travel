import React, { FunctionComponent } from 'react';
// custom
import { useStyles } from './timer.list.styles';
import { IUserDetails } from './../../../../components/header/Header';
import TimerCard from '../../../../components/card/timer/TimerCard';

export interface ITimerInputListData {
    id: string;
    createdBy: IUserDetails;
    title: string;
    selected: boolean;
    description: string;
    timerDate: string;
    type: string;
    status: string;
    link: string;
}

interface ITimerListProps {
    data: ITimerInputListData[];
}

export const TimerList: FunctionComponent<ITimerListProps> = (props) => {
    const { data } = props;
    // styles
    const classes = useStyles();
    return (
        <React.Fragment>
                {data && data.map((item: ITimerInputListData, index: number) => {
                    return (
                        <div key={index} className={classes.listAnimation}>
                            <TimerCard>                                
                            </TimerCard>
                        </div>
                    );
                })}
        </React.Fragment>
    );
};