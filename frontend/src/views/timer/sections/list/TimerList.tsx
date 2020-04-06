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
    timeDate: string;
    type: string;
    status: string;
    link: string;
};

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
                    console.log('Date is: ', new Date(parseInt(item.timeDate)));
                    return (
                        <div key={index} className={classes.listAnimation}>
                            <TimerCard 
                                id={item.id}
                                date={new Date(parseInt(item.timeDate))}
                                title={item.title}
                                description={item.description}
                                link={item.link}
                                onDelete={()=>console.log('onDelete called!')}
                                onEdit={()=>console.log('OnEdit called')}
                                onMoveToTop={()=>console.log('onMoveTop called')}
                                selected={item.selected}
                                status={item.status ? true: false}
                                type={item.type ? true: false}
                                key={index}
                            />                                
                        </div>
                    );
                })}
        </React.Fragment>
    );
};