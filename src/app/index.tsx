/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';

import React from 'react';
import {AppContainer} from 'src/pages';
import {removeUserWithToken} from 'src/shared/helpers/auth-provider';
import WithHocs from 'src/app/hocs';

function App(): JSX.Element {
   //removeUserWithToken()
 
  return (
    <WithHocs>
      <AppContainer />
    </WithHocs>
  );
}

export default App;
