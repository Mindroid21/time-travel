import React, { Component } from 'react';
// material
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
// custom components
import { AppStateContext, IContextState } from './../common/context/AppContext';
import { getThemeOptions } from './../common/helper/ThemeConfigProvider';
// CSS
import './App.css';

class App extends Component {
    // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-useless-constructor
  constructor (props: any, context: IContextState) {
    super(props, context);
  }

  render() {
    const { themePalette }: IContextState = this.context;
    return ( <MuiThemeProvider theme={getThemeOptions(themePalette)}>
        <SnackbarProvider
            maxSnack={3} anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}>

        </SnackbarProvider>
        </MuiThemeProvider>
    );
  }
  
}

App.contextType = AppStateContext;

export default App;

