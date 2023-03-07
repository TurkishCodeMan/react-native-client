import {NavigationContainer} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';

export function  WithNavigation ({children}:PropsWithChildren) {
  return (
    <NavigationContainer>
      {children}
    </NavigationContainer>
  );
};

