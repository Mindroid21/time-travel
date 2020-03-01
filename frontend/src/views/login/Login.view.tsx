import React, { FunctionComponent } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// custom
import { useStyles } from './login.style';

const LoginView: FunctionComponent = () => {
    const classes = useStyles();
return (
<React.Fragment>
        <Grid container spacing={1} className={classes.root} alignItems="center">
            <Paper className={classes.paper}>
                <div className={classes.contentWrapper}>
                    <Typography color="textSecondary" align="center">
                        Login Screen
                    </Typography>
                </div>        
            </Paper>
        </Grid>
</React.Fragment>
);
};

export default LoginView;