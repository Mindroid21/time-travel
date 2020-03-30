import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
// material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const PanelFour: FunctionComponent = (props): JSX.Element => {
    const history = useHistory();
    // event handlers
    // TODO - PAJ - Change to routeDispatch
    const navTimerView = () => {
        history.push ({
            pathname: '/login'
        });
    };

    return (
        <React.Fragment>
          <Grid item xs={12} md={12}>
            <Typography color="textSecondary" align="center" paragraph>
                Congratulations! your are all set, <br/>
            </Typography>
            <Grid item xs={12} md={12}>
              <Button
                onClick={navTimerView}
                fullWidth
                variant="contained"
                color="secondary">
                 View Timer
              </Button>
          </Grid>
          </Grid>          
        </React.Fragment>
    );
};