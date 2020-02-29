import React, { FunctionComponent } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  footerText: {
    fontSize: '0.8rem'
  }
}));



const Copyright: FunctionComponent<any> = ()=>{
    const classes = useStyles();
    return (
      <Typography className={classes.footerText} variant="body2" color="textSecondary" align="center">
        {'Time-Travel © '}
        <Link color="inherit" href="https://material-ui.com/">
          Template courtesy Material-UI Paperbase
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
};

export default Copyright;