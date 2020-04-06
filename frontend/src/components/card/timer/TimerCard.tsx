import React, { FunctionComponent } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// custom
import DetailExpansionPanel from '../../panels/expansion/DetailExpansionPanel';
import TimerOptions from './../../options/timer/TimerOptions';
import CountdownSVG from './countdown/CountdownSVG';
import { useStyles } from './timer-card.styles';
import { formatDate } from './../../../common/helper/DateHelper';

export interface ITimerCardData {
    id: string;
    title: string;
    selected: boolean;
    description: string;
    date: Date;
    type: boolean;
    status: boolean;
    link: string;
};

interface ITimerCardProps extends ITimerCardData {
    onMoveToTop: (data: {id: string; selected: boolean}) => void;
    onEdit: (data: ITimerCardData) => void;
    onDelete: (data: {id: string}) => void;
}


const TimerCard: FunctionComponent<ITimerCardProps> = (props) => {
    const classes = useStyles();
    const { id, title, description, date, selected, type, status, link } = props;
    return (
        <React.Fragment>
          <Paper className={classes.paper}>
            <div className={classes.contentWrapper}>
                <div className={classes.titleSection}>
                    <Typography color="textPrimary" variant="h6" >
                        {title}
                    </Typography>
                    <TimerOptions 
                        id={props.id} 
                        onEdit={(id: string)=>console.log(`Edit called on Timer: ${id}`)} 
                        onDelete={(id: string)=>console.log(`Delete called on Timer: ${id}`)} 
                        onMoveToTop={(id: string)=>console.log(`On Move Top called: ${id}`)} />
                </div>
                <CountdownSVG until={date}/>
                <Typography color="secondary" align="center">
                    {type ? 'until': 'since'}, {formatDate(date)}
                </Typography>
                <DetailExpansionPanel description={description} link={link}/>
            </div>
          </Paper>
        </React.Fragment>
    );
};

export default TimerCard;