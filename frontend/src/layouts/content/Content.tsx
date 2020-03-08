import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './content-layout.styles';
import Paper from '@material-ui/core/Paper';
import TimerView from './../../views/timer/Timer.view';

export interface ContentProps extends WithStyles<typeof styles> { }

function Content(props: ContentProps) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <TimerView />
    </Paper>
  );
}

export default withStyles(styles)(Content);
