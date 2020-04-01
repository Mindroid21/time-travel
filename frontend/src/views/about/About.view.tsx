import React, { FunctionComponent } from 'react';
import { FaHeart } from 'react-icons/fa';
// material
import Typography from '@material-ui/core/Typography';

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