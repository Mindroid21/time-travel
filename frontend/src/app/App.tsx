import React, { Component } from 'react';
// material
import { SnackbarProvider } from 'notistack';
// custom components
import { AppStateContext, IContextState } from './../common/context/AppContext';
import Paperbase from '../layouts/paper/Paperbase';
// CSS
import './App.css';

class App extends Component {
    // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-useless-constructor
  constructor (props: any, context: IContextState) {
    super(props, context);
  }

  render() {
    return (
        <SnackbarProvider
            maxSnack={3} anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}>
          <Paperbase/>
        </SnackbarProvider>
    );
  }
  
}

App.contextType = AppStateContext;

export default App;

