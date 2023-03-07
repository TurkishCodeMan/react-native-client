import React, {PropsWithChildren} from 'react';
import {StatusBar, ScrollView, useColorScheme} from 'react-native';
import {SafeAreaView, StyledView} from '../styled/components';

function Layout({children}: PropsWithChildren) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex:1}}  bg="snowGray">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
     
        <StyledView  flex={1} p={40}>
          {children}
        </StyledView>
     
    </SafeAreaView>
  );
}

export {Layout};
