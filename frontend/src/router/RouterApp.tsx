import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// custom
import DashboardLayout from './../layouts/dashboard/DashboardLayout';
import LoginView from './../views/login/Login.view';
import RegisterView from './../views/register/Register.view';
import { RouterContextProvider } from './context/RouterContext';

const RouterApp: FunctionComponent = () => {
    return (
        <Router>
                <Switch>                    
                    <RouterContextProvider>
                        <Route path="/app" render={(props: any) => <DashboardLayout {...props} />} />
                        <Route path="/login" component={LoginView} /> 
                        <Route path="/register" component={RegisterView} /> 
                        <Redirect from="/" to="/login" />
                    </RouterContextProvider>
                </Switch>
            </Router>
    );
};

export default RouterApp;