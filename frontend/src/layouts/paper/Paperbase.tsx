import React, { FunctionComponent } from 'react';
// material
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { getThemeOptions } from './../../common/helper/ThemeConfigProvider';
import { NotificationContextProvider } from './../../common/context/SnackbarContext';

import RouterApp from '../../router/RouterApp';

const Paperbase: FunctionComponent = () => {
  return (
    <ThemeProvider theme={getThemeOptions()}>
      <SnackbarProvider
            maxSnack={3} anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}>
        <NotificationContextProvider>
          <RouterApp/>
        </NotificationContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Paperbase;
