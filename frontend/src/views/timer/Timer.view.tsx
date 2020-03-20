import React, { FunctionComponent } from 'react';
// material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
// custom
import EmptyTimer from './sections/empty/EmptyTimer';
import { useStyles } from './timer.styles';

const TimerView: FunctionComponent = () => {
    const classes = useStyles();
    
    return (
        <EmptyTimer/>
    );
};

export default TimerView;