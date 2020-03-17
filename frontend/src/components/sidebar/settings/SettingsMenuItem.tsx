import React, { FunctionComponent, useContext } from 'react';
import clsx from 'clsx';
// material
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitIcon from '@material-ui/icons/ExitToApp';
// custom
import { NAMED_ROUTES, RouterDispatchContext } from './../../../router/context/RouterContext';
import { removeLocalStorageItem } from './../../../common/helper/LocalStorageProvider';


export interface ISettingsMenuItem {
    classes: any;
};

export const SettingsMenuItem : FunctionComponent <ISettingsMenuItem> = (props) : JSX.Element => {
    const { classes } = props;
    const dispatch: any = useContext(RouterDispatchContext);
    const handleLogout = () => {
      console.log('Calling Logout!');
      removeLocalStorageItem('token');
      dispatch({
        type: NAMED_ROUTES.LOGIN
      })
    };

    const categories = [
      {
        id: 'Preferences',
        children: [
          { 
            id: 'Settings', 
            icon: <SettingsIcon />,
            active: false,
            action: ()=>{}
          },
          { 
            id: 'Logout', 
            icon: <ExitIcon />,
            active: false,
            action: handleLogout
          },
        ],
      },
    ];
    return (
        <React.Fragment>
            {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, action }: any) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
                onClick={action}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
        </React.Fragment>
    );
};