import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StartPage} from 'src/pages/auth/start-page.screen';
import {AuthStackParamsList} from 'src/app/navigation/types';
import {EmployeeCreate} from 'src/pages/auth/employee-create.screen';
import {EmployeeCreate2} from 'src/pages/auth/employee-create-2.screen';
import {EmployerCreate} from 'src/pages/auth/employer-create.screen';
import {EmployerPreferences} from 'src/pages/auth/employer-preferences.screen';
import {EmployerPreferences2} from 'src/pages/auth/employer-preferences-2.screen';
import {Login} from 'src/pages/auth/login.screen';

const AuthStack = createNativeStackNavigator<AuthStackParamsList>();

export function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{headerShown: false}}
        name="StartPage"
        component={StartPage}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="EmployeeCreate"
        component={EmployeeCreate}
      />
      <AuthStack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: 'snowGray',
          },
        }}
        name="EmployeeCreate2"
        component={EmployeeCreate2}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: 'snowGray',
          },
        }}
        name="EmployerCreate"
        component={EmployerCreate}
      />
      <AuthStack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: 'snowGray',
          },
        }}
        name="EmployerPreferences"
        component={EmployerPreferences}
      />
      <AuthStack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: 'snowGray',
          },
        }}
        name="EmployerPreferences2"
        component={EmployerPreferences2}
      />
    </AuthStack.Navigator>
  );
}
