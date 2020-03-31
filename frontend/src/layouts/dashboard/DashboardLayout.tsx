import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
// material
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
// notification
import { SnackbarHelper, NOTIFICATION_TYPE } from '../../common/context/SnackbarHelper';
// custom
import Sidebar from '../../components/sidebar/Sidebar';
import DashboardRouter from './router/DashboardRouter';
import Header from '../../components/header/Header';
import Copyright from '../../components/copy/CopyRight';
import { useStyles, drawerWidth } from './dashboard-layout.styles';
import { getUserDetails } from './../../common/async/AsyncCalls';
import { getLocalStorageItem } from './../../common/helper/LocalStorageProvider';
import { HeaderContextProvider } from './../../components/header/context/HeaderContext';
import { DashboardRouterContextProvider } from './../../layouts/dashboard/context/DashboardRouterContext';

const DashboardLayout: FunctionComponent = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [noteType, setNoteType] = useState<NOTIFICATION_TYPE>(NOTIFICATION_TYPE.INFO);
    const [noteMsg, setNoteMsg] = useState('');
    const classes = useStyles();
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
      const msg = `Welcome ${userName}`;
      setNoteMsg(msg);
    }
  },[userName]);

  useEffect(()=>{
    fetchLoggedInUserDetails();
    // implement perfect scrollbar
  },[]);

    return (
    <React.Fragment>
      <DashboardRouterContextProvider>
        <HeaderContextProvider>
          <SnackbarHelper type={noteType} message={noteMsg} />
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
              <main className={classes.main} id="container">
                <DashboardRouter />
              </main>
              <footer className={classes.footer}>
                <Copyright />
              </footer>
            </div>
          </div>
        </HeaderContextProvider>
      </DashboardRouterContextProvider>
    </React.Fragment>
    );

};

export default DashboardLayout;