import React, {FunctionComponent, useContext } from 'react';
import clsx from 'clsx';
// material
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
// custom
import { HeaderDispatchContext } from './../../header/context/HeaderContext';
import { DASHBOARD_ROUTES, DashboardRouterDispatchContext } from './../../../layouts/dashboard/context/DashboardRouterContext';
import { NAMED_ROUTES } from './../../../router/context/RouterContext';

export interface IMainMenuProps {
    classes: any;
};

export const MainMenuItem : FunctionComponent <IMainMenuProps> = (props) : JSX.Element => {
    const {classes} = props;
    const headerDispatch: any = useContext(HeaderDispatchContext);
    const dashboardRouteDispatch: any = useContext(DashboardRouterDispatchContext);

    const handleAbout = () => {
        headerDispatch ({
            type: NAMED_ROUTES.ABOUT
        });
        // TODO - Check if route is same, then DONT dispatch
        dashboardRouteDispatch({
            type: DASHBOARD_ROUTES.ABOUT
        });
    };

    return (
        <React.Fragment>
            <ListItem
                className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                Time-Travel
            </ListItem>
            <ListItem onClick={handleAbout} className={clsx(classes.item, classes.itemCategory)}>
                <ListItemIcon className={classes.itemIcon}>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText
                    classes={{
                    primary: classes.itemPrimary
                }}>About</ListItemText>
            </ListItem>
        </React.Fragment>
    );
};