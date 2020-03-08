import React, {FunctionComponent} from 'react';
import clsx from 'clsx';
// material
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import TimerIcon from '@material-ui/icons/Timer';


export interface IAppsMenuItem {
    classes: any;
};

const categories = [
    {
      id: 'My Apps',
      children: [
        { 
          id: 'Timer', 
          icon: <TimerIcon />, 
          active: true
        },
        { 
          id: 'Quotes', 
          icon: <SettingsEthernetIcon />,
          active: false
        },
        { 
          id: 'Todo', 
          icon: <DnsRoundedIcon />,
          active: false
        }
      ],
    },
];

export const AppsMenuItem : FunctionComponent <IAppsMenuItem> = (props) : JSX.Element => {
    const {classes } = props;
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