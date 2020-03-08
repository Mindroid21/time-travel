import React, { Component } from 'react';
// custom components
import { AppStateContext, IAppContextState } from './../common/context/AppContext';
import Paperbase from '../layouts/paper/Paperbase';

class App extends Component {
    // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-useless-constructor
  constructor (props: any, context: IAppContextState) {
    super(props, context);
  }
  render() {
    return (        
      <Paperbase/>        
    );
  }
}

App.contextType = AppStateContext;

export default App;

