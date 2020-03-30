import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// custom
import DashboardLayout from './../layouts/dashboard/DashboardLayout';
import LoginView from './../views/login/Login.view';
import RegisterView from './../views/register/Register.view';
import { RouterContextProvider } from './context/RouterContext';
import { NotificationContextProvider } from './../common/context/SnackbarContext';

const RouterApp: FunctionComponent = () => {
    return (
        <Router>
                <Switch>
                    <NotificationContextProvider>
                        <RouterContextProvider>
                            <Route path="/app" component={DashboardLayout} />
                            <Route path="/login" component={LoginView} /> 
                            <Route path="/register" component={RegisterView} /> 
                            <Redirect from="/" to="/login" />
                        </RouterContextProvider>
                    </NotificationContextProvider>
                </Switch>
            </Router>
    );
};

export default RouterApp;