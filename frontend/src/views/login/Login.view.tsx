import React, { FunctionComponent, useContext } from 'react';
import { IoLogoGoogle, IoLogoFacebook, IoLogoGithub } from 'react-icons/io/index'
// material
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// custom
import { useStyles } from './login.style';
import Copyright from '../../components/copy/CopyRight';
import logo from './../../assets/logo.png';
import { AppStateContext } from './../../common/context/AppContext';

const LoginView: FunctionComponent = () => {
    const classes = useStyles();
    const appContext = useContext(AppStateContext);

return (
<React.Fragment>
        <Grid container spacing={1} className={classes.root} alignItems="center">
            <Paper className={classes.paper}>
                <div className={classes.contentWrapper}>
                    <img src={logo} className={classes.imageIcon} alt="logo"/>
                    <Typography color="textSecondary" align="center" className={classes.title}>
                        {`Time Travel v${appContext.version}`}
                    </Typography>
                    <Button variant="contained" color="secondary" className={classes.socialBtn}>
                        Continue with &nbsp;&nbsp;<IoLogoGoogle className={classes.fontIcon}/>
                    </Button>
                    <Button variant="contained" color="primary" className={classes.socialBtn}>
                        Continue with &nbsp;&nbsp;<IoLogoFacebook className={classes.fontIcon}/>
                    </Button>
                    <Button variant="contained" className={classes.socialBtn}>
                        Continue with &nbsp;&nbsp;<IoLogoGithub className={classes.fontIcon}/>
                    </Button>
                </div>
                <footer className={classes.footer}>
                    <Copyright />
                </footer>
            </Paper>
        </Grid>
</React.Fragment>
);
};

export default LoginView;