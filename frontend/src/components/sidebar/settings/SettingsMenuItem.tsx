import React, {FunctionComponent} from 'react';
import clsx from 'clsx';
// material
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitIcon from '@material-ui/icons/ExitToApp';


const categories = [
  {
    id: 'Preferences',
    children: [
      { 
        id: 'Settings', 
        icon: <SettingsIcon />,
        active: false
      },
      { 
        id: 'Logout', 
        icon: <ExitIcon />,
        active: false
      },
    ],
  },
];

export interface ISettingsMenuItem {
    classes: any;
};

export const SettingsMenuItem : FunctionComponent <ISettingsMenuItem> = (props) : JSX.Element => {
    const { classes } = props;
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
            {children.map(({ id: childId, icon, active }: any) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
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