import React, { FunctionComponent } from 'react';
// material
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Omit } from '@material-ui/types';
// custom
import { MainMenuItem } from './main/MainMenuItem';
import { styles } from './sidebar.styles';
import { AppsMenuItem } from './apps/AppsMenuItem';
import { SettingsMenuItem } from './settings/SettingsMenuItem';

export interface ISidebarProps extends Omit<DrawerProps, 'classes'>, WithStyles<typeof styles> {}

const Sidebar: FunctionComponent<ISidebarProps> = (props):JSX.Element => {
  
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <MainMenuItem classes={classes} />
        <AppsMenuItem classes={classes} />
        <SettingsMenuItem classes={classes} />
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Sidebar);
