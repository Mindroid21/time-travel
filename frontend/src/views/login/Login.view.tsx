import React, { FunctionComponent, useContext, useState } from 'react';
// material
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
// custom
import {useStyles} from './login.style';
import RegisterButton from '../../components/buttons/register-button/RegisterButton';
import logo from './../../assets/logo.png';
import { authenticateUser } from './../../common/async/AsyncCalls';
import { addLocalStorageItem } from './../../common/helper/LocalStorageProvider';
// context
import { RouterDispatchContext, NAMED_ROUTES } from './../../router/context/RouterContext';
import {AppStateContext} from './../../common/context/AppContext';

const LoginView : FunctionComponent = () => {
    const classes = useStyles();
    const appContext = useContext(AppStateContext);
    const dispatch: any = useContext(RouterDispatchContext);
    //states
    const [username,setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    // event handlers
    const handleChange = (prop: any) => (event: any) => {
        if (event.target.value !== '') {
            setErrMsg('');
        }
        if (event.target.name === 'email') {
            setUserName(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    };

    const handleLogin = () => {
        dispatch ({
            type: NAMED_ROUTES.APP
        });
    }

    const authenticate = async (evt: any) => {
        setLoading(true);
        evt.preventDefault();
        authenticateUser({username, password})
        .then(res => {
          addLocalStorageItem ('token', res.data.accessToken);          
          setLoading(false);
          window.location.href = '#/app';

        })
        .catch(err => {
          setLoading(false);
          setErrMsg(`INVALID USERNAME / PASSWORD`);
        });
    };

    return (
        <React.Fragment>
            <Grid container spacing={1} className={classes.root} alignItems="center">
                <Paper className={classes.paper}>
                    <div className={classes.contentWrapper}>
                        <img src={logo} className={classes.imageIcon} alt="logo"/>
                        <Typography color="textSecondary" align="center" className={classes.title}>
                            {`Time Travel v${appContext.version}`}
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onBlur={handleChange}/>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onBlur={handleChange}/>
                        <Button
                            onClick={handleLogin}
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.socialBtn}>
                            Login
                        </Button>
                    </div>
                    <footer className={classes.footer}>
                        <RegisterButton/>
                    </footer>
                </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default LoginView;