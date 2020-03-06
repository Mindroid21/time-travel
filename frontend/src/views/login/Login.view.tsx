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
import Copyright from '../../components/copy/CopyRight';
import logo from './../../assets/logo.png';
import {AppStateContext} from './../../common/context/AppContext';
import { authenticateUser } from './../../common/async/AsyncCalls';
import { addLocalStorageItem } from './../../common/helper/LocalStorageProvider';

const LoginView : FunctionComponent = () => {
    const classes = useStyles();
    const appContext = useContext(AppStateContext);
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
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.socialBtn}>
                            Login
                        </Button>
                    </div>
                    <footer className={classes.footer}>
                        <Copyright/>
                    </footer>
                </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default LoginView;