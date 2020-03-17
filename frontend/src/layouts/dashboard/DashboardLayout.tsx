import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
// material
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
// custom
import Sidebar from '../../components/sidebar/Sidebar';
import Content from '../content/Content';
import Header from '../../components/header/Header';
import Copyright from '../../components/copy/CopyRight';
import { useStyles, drawerWidth } from './dashboard-layout.styles';
import CloseActionButton from './../../components/buttons/close-button/CloseActionButton';
import { getUserDetails } from './../../common/async/AsyncCalls';
import { getLocalStorageItem } from './../../common/helper/LocalStorageProvider';
import { HeaderContextProvider } from './../../components/header/context/HeaderContext';

const DashboardLayout: FunctionComponent = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const classes = useStyles();

    //snackBar
  const { enqueueSnackbar} = useSnackbar();
  // notificationBox action - OK
  const actionButton = (key:any) => (
    <CloseActionButton keyObj={key} />
  );

  // event handlers
  const fetchLoggedInUserDetails = () => {
      const token: string = getLocalStorageItem('token');
      getUserDetails(token)
      .then((res: any) => {
        setUserName(`${res.data.firstName} ${res.data.lastName}`);
      }, err => {
        setUserName(``);
        console.log('Error fetching user details: ', err);
      });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // side-effects #1
  useEffect(()=>{
    if (userName !=='') {
      enqueueSnackbar(`Welcome ${userName}`, {variant: 'info', action: actionButton });
    }
  },[enqueueSnackbar, userName]);

  useEffect(()=>{
    fetchLoggedInUserDetails();
  },[]);

    return (
    <React.Fragment>
      <HeaderContextProvider>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Sidebar PaperProps={{ style: { width: drawerWidth } }} variant="temporary" open={mobileOpen}
                onClose={handleDrawerToggle} />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Sidebar PaperProps={{ style: { width: drawerWidth } }} />
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
      </HeaderContextProvider>
    </React.Fragment>
    );

};

export default DashboardLayout;