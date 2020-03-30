/**
 * PAJ - Creating a Global Shared State using Context API
 * state defined in this AppProvider will be used throughout the context of our application
 */
import React, { FunctionComponent } from 'react';
import { useSnackbar } from 'notistack';
// material
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

interface ISnackbarState {
    type: NOTIFICATION_TYPE;
    enqueueSnackbar: (message: string | React.ReactNode, options?: any) => string | number | null | undefined;
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
const CloseActionButton: FunctionComponent<any> = props => {
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

export const SnackbarStateContext = React.createContext<ISnackbarState>({
    type: NOTIFICATION_TYPE.INFO,
    message: '',
    enqueueSnackbar: ()=>{return ''},
}); // Separate context for storing state

export const SnackbarDispatchContext = React.createContext({}); // Separate context for updating state

 //lifecycle methods
    // notificationBox action - OK
const actionButton = (key: any) => (
    <CloseActionButton keyObj={key} />
);


const snackBarContextReducer = (state: ISnackbarState, action: {type: NOTIFICATION_TYPE, payload: ISnackbarState}): any => {
    const { enqueueSnackbar } = state;
    const { type, payload } = action;
    switch (type) {
        case NOTIFICATION_TYPE.INFO:
            return enqueueSnackbar (payload.message, {variant: NOTIFICATION_TYPE.INFO, action: actionButton });
        case NOTIFICATION_TYPE.SUCCESS:
            return enqueueSnackbar (payload.message, {variant: NOTIFICATION_TYPE.SUCCESS, action: actionButton });
        case NOTIFICATION_TYPE.WARNING:
            return enqueueSnackbar (payload.message, {variant: NOTIFICATION_TYPE.WARNING, action: actionButton });
        case NOTIFICATION_TYPE.ERROR:
            return enqueueSnackbar (payload.message, {variant: NOTIFICATION_TYPE.ERROR, action: actionButton });
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

/**
 * PAJ - There is already a SnackbarProvider 
 * so renaming the component to  - NotificationContextProvider
 */
export const NotificationContextProvider: FunctionComponent<any> = ({children}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [state, dispatch] = React.useReducer( snackBarContextReducer, {
        type: NOTIFICATION_TYPE.INFO,
        message: '',
        enqueueSnackbar: enqueueSnackbar,
    });
    return (
        <SnackbarStateContext.Provider value={state}>
            <SnackbarDispatchContext.Provider value={dispatch}>
                {children}
            </SnackbarDispatchContext.Provider>
        </SnackbarStateContext.Provider>
    )
};

