import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// custom
import DashboardLayout from './../layouts/dashboard/DashboardLayout';
import LoginView from './../views/login/Login.view';


const RouterApp: FunctionComponent<any> = (props) => {
    return (
        <Router>
                <Switch>                    
                    <Route path="/app" render={(props: any) => <DashboardLayout {...props} />} />
                    <Route path="/login" component={LoginView} /> 
                    <Redirect from="/" to="/app" />
                </Switch>
        </Router>
    );
};

export default RouterApp;