import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../app/navigation/types';
import {AuthNavigator} from '../app/navigation/auth-navigation';
import {MyTabs} from 'src/app/navigation/employer-navigation';
import {Auth} from 'src/features/auth';

const RootStack = createNativeStackNavigator<RootStackParamsList>();

export function AppContainer() {
  Auth.useAuthControl();
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="AuthStack" component={AuthNavigator} />
      <RootStack.Screen name="EmployerStack" component={MyTabs} />
    </RootStack.Navigator>
  );
}
