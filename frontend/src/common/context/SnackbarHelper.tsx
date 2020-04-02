/**
 * PAJ - Creating a Global Shared State using Context API
 * state defined in this AppProvider will be used throughout the context of our application
 */
import React, { FunctionComponent, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// material
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

interface ISnackbarHelperProps {
    type: NOTIFICATION_TYPE;
    message: string;
};

export enum NOTIFICATION_TYPE {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
};

const useStyles = makeStyles(theme => ({    
    card: {
      minWidth: 150,
      padding: 10
    },
    cardText: {
      color: theme.palette.primary.main,
      fontSize: 14
    },
    notificationButton: {
      color: 'white'
    }
}));

// notificationBox action - OK
const CloseActionButton: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const { keyObj } = props;
    const { closeSnackbar }  = useSnackbar();
    return (
        <React.Fragment>        
            <Button className={classes.notificationButton} onClick={() => { closeSnackbar(keyObj) }}>
                OK
            </Button>
        </React.Fragment>
    );
};

//lifecycle methods
    // notificationBox action - OK
const actionButton = (key: any) => (
    <CloseActionButton keyObj={key} />
);


/**
 * PAJ - There is already a SnackbarProvider 
 * so renaming the component to  - NotificationContextProvider
 */
export const SnackbarHelper: FunctionComponent<ISnackbarHelperProps> = (props) => {
    const { message, type } = props;
    const { enqueueSnackbar } = useSnackbar();
    // side-effects
    useEffect(()=>{
        if (message !== '') {
            enqueueSnackbar (message, {variant: type, action: actionButton });
        }
    },[message, type, enqueueSnackbar]);

    return (
        <React.Fragment></React.Fragment>
    );
};

