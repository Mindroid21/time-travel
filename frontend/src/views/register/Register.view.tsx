import React, { FunctionComponent } from 'react';
// material
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// custom
import {useStyles} from './register.style';
import RegisterStepper from './stepper/RegisterStepper';
import LoginButton from '../../components/buttons/login-button/LoginButton';
import logo from './../../assets/logo.png';

const RegisterView : FunctionComponent = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={1} className={classes.root} alignItems="center">
                <Paper className={classes.paper}>
                    <div className={classes.contentWrapper}>
                        <img src={logo} className={classes.imageIcon} alt="logo"/>
                        <RegisterStepper/>
                    </div>
                    <footer className={classes.footer}>
                        <LoginButton/>
                    </footer>
                </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default RegisterView;