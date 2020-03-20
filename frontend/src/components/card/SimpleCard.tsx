import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
      contentWrapper: {
        margin: '40px 16px',
      }, 
}));

const SimpleCard: FunctionComponent = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>    
          <div className={classes.contentWrapper}>
            {props.children}
          </div>
        </React.Fragment>
    );
};

export default SimpleCard;