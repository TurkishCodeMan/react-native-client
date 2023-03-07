import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EmployerStackList} from 'src/app/navigation/types';
import {Dashboard} from 'src/pages/employer/dashboard';
import {HomeIcon, ListIcon, PlusIcon} from 'src/shared/assets/icons/Icons';
import Drawer from './employer/drawer';
const MainBottom = createBottomTabNavigator<EmployerStackList>();

export function MyTabs() {
  return (
    <MainBottom.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          if (route.name === 'Drawer') {
            return <HomeIcon color={color} size={size} />;
          }
          if (route.name === 'Tasks') {
            return <ListIcon color={color} size={size} />;
          }
          if (route.name === 'Employees') {
            return <PlusIcon color={color} />;
          }
        },
      })}>
      <MainBottom.Screen
        name="Drawer"
        component={Drawer}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />

      <MainBottom.Screen
        name="Tasks"
        component={Dashboard}
        options={{
          headerShown: false,
          title: `Tasks's`,
        }}
      />

      <MainBottom.Screen
        name="Employees"
        component={Dashboard}
        options={{
          headerShown: false,
          title: `Employee's`,
        }}
      />
    </MainBottom.Navigator>
  );
}
