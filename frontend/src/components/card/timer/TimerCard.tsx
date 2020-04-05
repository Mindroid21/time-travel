import React, { FunctionComponent } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// custom
import DetailExpansionPanel from '../../panels/expansion/DetailExpansionPanel';
import TimerOptions from './../../options/timer/TimerOptions';
import { useStyles } from './timer-card.styles';


const TimerCard: FunctionComponent = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
          <Paper className={classes.paper}>
            <div className={classes.contentWrapper}>
                <div className={classes.titleSection}>
                    <Typography color="textPrimary" variant="h6" >
                        Timer List
                    </Typography>
                    <TimerOptions/>
                </div>
                <Typography color="secondary" align="center">
                    until, Fri Apr 03 2020 @ 18:35
                </Typography>
                <DetailExpansionPanel description={'Simple Description'} link={'Simple Link'}/>
            </div>
          </Paper>
        </React.Fragment>
    );
};

export default TimerCard;