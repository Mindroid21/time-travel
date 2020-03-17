import React, { FunctionComponent, useContext } from 'react';
import clsx from 'clsx';
// material
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import TimerIcon from '@material-ui/icons/Timer';
// custom
import { HeaderDispatchContext } from './../../header/context/HeaderContext';
import { NAMED_ROUTES } from './../../../router/context/RouterContext';


export interface IAppsMenuItem {
    classes: any;
};

export const AppsMenuItem : FunctionComponent <IAppsMenuItem> = (props) : JSX.Element => {

    const handleTimer = () => {
      dispatch ({
        type: NAMED_ROUTES.TIMER
      });
    };

    const handleQuotes = () => {
      dispatch ({
        type: NAMED_ROUTES.QUOTES
      });
    };

    const handleTodo = () => {
      dispatch ({
        type: NAMED_ROUTES.TODO
      });
    };

    const categories = [
        {
          id: 'My Apps',
          children: [
            { 
              id: 'Timer', 
              icon: <TimerIcon />, 
              active: false,
              action: handleTimer
            },
            { 
              id: 'Quotes', 
              icon: <SettingsEthernetIcon />,
              active: false,
              action: handleQuotes
            },
            { 
              id: 'Todo', 
              icon: <DnsRoundedIcon />,
              active: false,
              action: handleTodo
            }
          ],
        },
    ];
    const {classes } = props;
    const dispatch: any = useContext(HeaderDispatchContext);

    

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