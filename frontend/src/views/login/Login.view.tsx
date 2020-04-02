import React, { FunctionComponent, useContext, useState, useEffect, useCallback } from 'react';
// material
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// custom
import {useStyles} from './login.style';
import RegisterButton from '../../components/buttons/register-button/RegisterButton';
import logo from './../../assets/logo.png';
import { authenticateUser } from './../../common/async/AsyncCalls';
import { addLocalStorageItem } from './../../common/helper/LocalStorageProvider';
import { LinearLoader } from './../../components/loaders/linear-loader/LinearLoader';
// context
import { RouterDispatchContext, NAMED_ROUTES } from './../../router/context/RouterContext';
import {AppStateContext} from './../../common/context/AppContext';
import { getUserDetails } from './../../common/async/AsyncCalls';
import { getLocalStorageItem } from './../../common/helper/LocalStorageProvider';
// notification
import { SnackbarHelper, NOTIFICATION_TYPE } from '../../common/context/SnackbarHelper';


const LoginView : FunctionComponent = () => {
    const classes = useStyles();
    const appContext = useContext(AppStateContext);
    const dispatch: any = useContext (RouterDispatchContext);
    //states
    const [username,setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [noteMsg, setNoteMsg] = useState('');
    const [isLoading, setLoading] = useState(true);

    // life-cycle
    const fetchLoggedInUserDetails = useCallback(() => {
        const token: string = getLocalStorageItem('token');
        // console.log('Token is: ', token);
        getUserDetails(token)
        .then((res: any) => {
            setLoading(false);
            console.log('User details are: ', res.data);
            dispatch ({
                type: NAMED_ROUTES.APP
            });
        }, err => {
            setLoading(false);
            console.log('Error fetching user details: ', err);
        });
    },[dispatch]);

    // event handlers
    const handleChange = (event: any) => {
        if (event.target.value !== '') {
            setNoteMsg('');
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
            dispatch ({
                type: NAMED_ROUTES.APP
            });

        })
        .catch(err => {
          setLoading(false);
          setNoteMsg(`INVALID USERNAME / PASSWORD`);
        });
    };

    // componentDidMount
    useEffect(()=>{
        // step 1 - check if session ID is valid
        setTimeout(()=>{
            fetchLoggedInUserDetails();
        },1000);
    },[fetchLoggedInUserDetails]);

    return (
        <React.Fragment>
            <Grid container spacing={1} className={classes.root} alignItems="center">
                <SnackbarHelper type={NOTIFICATION_TYPE.ERROR} message={noteMsg} />
                <Paper className={classes.paper}>
                    <div className={classes.contentWrapper}>
                        <img src={logo} className={classes.imageIcon} alt="logo"/>
                        <Typography color="textSecondary" align="center" className={classes.title}>
                            {`Time Travel v${appContext.version}`}
                        </Typography>
                        <LinearLoader display={isLoading}/>
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
                            onClick={authenticate}
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