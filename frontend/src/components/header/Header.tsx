import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
// material
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
// icons
import TimerIcon from '@material-ui/icons/Timer';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import HomeIcon from '@material-ui/icons/Home';
// custom
import { HeaderStateContext } from './context/HeaderContext';
import { NAMED_ROUTES } from './../../router/context/RouterContext';
import { getCamelCase } from './../../common/helper/LocalStorageProvider';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme: Theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 0,
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
    link: {
      textDecoration: 'none',
      color: lightColor,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
  });

interface IHeaderProps extends WithStyles<typeof styles> {
  onDrawerToggle: () => void;
}

const Header: FunctionComponent<IHeaderProps> = (props)=>{
  const { classes, onDrawerToggle } = props;
  const [headerValue, setHeaderValue] = useState({name:'About', icon: <TimerIcon/>});
  const headerContext = useContext(HeaderStateContext);

  useEffect(()=>{
    switch (headerContext.name) {
      case NAMED_ROUTES.TIMER:
        setHeaderValue({name: getCamelCase(headerContext.name), icon: <TimerIcon/>});
        break;
      case NAMED_ROUTES.QUOTES:
        setHeaderValue({name: getCamelCase(headerContext.name), icon: <SettingsEthernetIcon/>});
        break;
      case NAMED_ROUTES.TODO:
        setHeaderValue({name: getCamelCase(headerContext.name), icon: <DnsRoundedIcon/>});
        break;
      default:
        setHeaderValue({name: getCamelCase('App'), icon: <HomeIcon/>});
    }
  },[headerContext]);

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />     
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>  
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {headerValue.icon} {headerValue.name}
              </Typography>
            </Grid>            
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="All" />
          <Tab textColor="inherit" label="Add New +" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);