import React, { FunctionComponent, useEffect } from 'react';
// custom
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from '../../components/nav/Navigator';
import Content from '../content/Content';
import Header from '../../components/header/Header';
import Copyright from '../../components/copy/CopyRight';
import { useStyles, drawerWidth } from './dashboard-layout.styles';
import CloseActionButton from './../../components/buttons/close-button/CloseActionButton';
import { useSnackbar } from 'notistack';

const DashboardLayout: FunctionComponent = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const classes = useStyles();

    //snackBar
  const { enqueueSnackbar} = useSnackbar();
  // notificationBox action - OK
  const actionButton = (key:any) => (
    <CloseActionButton keyObj={key} />
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(()=>{
    enqueueSnackbar(`Welcome user!`, {variant: 'info', action: actionButton });
  },[enqueueSnackbar]);

    return (
        <React.Fragment>
            <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>
            <Content />
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
        </React.Fragment>
    );

};

export default DashboardLayout;