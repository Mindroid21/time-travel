import React, { FunctionComponent } from 'react';
import { FaHeart } from 'react-icons/fa';
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
import { useStyles } from './about.styles';

const AboutView: FunctionComponent = () => {
    const classes = useStyles();
    
    return (
      <React.Fragment>
        <div className={classes.contentWrapper}>
          <Typography variant="h5" align="center" paragraph>
            Time Travel v1.0.0
          </Typography>
          <Typography color="textSecondary" align="center">
            Time-Travel is a Porgressive Web Application (PWA) which comes handy for any developer in their daily productivity. 
            Version 1.0.0 comes with <strong>Countdown Timer, Quotations, Preview Screen</strong>.
            Inspired by applications like Moment, WorldTimeBuddy...etc.,<br/><br/>
            <span className={classes.highlightText}>Made with <FaHeart/> from Copenhagen, Denmark, 2020</span><br/>
            Time Travel © Template courtesy &nbsp;
            <a 
              href="https://material-ui.com/store/items/paperbase/" 
              className={classes.activeLink}>
                Material-UI Paperbase 2020.
            </a>
          </Typography>
        </div>
      </React.Fragment>
    );
};

export default AboutView;