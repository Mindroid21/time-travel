import React, { FunctionComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// material
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './dashboard-router.styles';
// custom
import TimerView from '../../../views/timer/Timer.view';
import AboutView from '../../../views/about/About.view';
import QuotesView from '../../../views/quotes/Quotes.view';
import TodoView from '../../../views/todo/Todo.view';
import SettingsView from '../../../views/settings/Settings.view';

export interface DashboardRouterProps extends WithStyles<typeof styles> { }

const DashboardRouter: FunctionComponent<DashboardRouterProps> = (props) => {
  return (
        <Switch>                    
          <Route path="/app/about" component={AboutView} />
          <Route path="/app/timer" component={TimerView} />
          <Route path="/app/quotes" component={QuotesView} />
          <Route path="/app/todo" component={TodoView} />
          <Route path="/app/settings" component={SettingsView} />
          <Redirect from="/" to="/app/timer" />
        </Switch>
  );
};

export default withStyles(styles)(DashboardRouter);
