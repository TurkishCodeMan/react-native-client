import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {DrawerStackList} from './types';
import {Dashboard} from 'src/pages/employer/dashboard';
import {StyledText, StyledView} from 'src/shared/styled/components';
import {ImageBackground} from 'react-native';
import {Avatar} from 'src/shared/components/avatar';
import {
  NavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import {
  AuthStackParamsList,
  EmployerStackList,
  RootStackParamsList,
} from '../types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useAuthProvider} from 'src/features/auth/hooks';
import {ProfileSettings} from 'src/pages/employer/profile-settings';
import type {PropsWithChildren} from 'react';
import {MapIcon} from 'src/shared/assets/icons/Icons';
import {getFirstLetter} from 'src/shared/helpers/get-first-letter';
import { useMe } from 'src/entities/user/model';
const DrawerNav = createDrawerNavigator<DrawerStackList>();

function CustomDrawer(props: any) {
  const navigation = useNavigation<NavigationProp<AuthStackParamsList>>();
  const navigationEmployer = useNavigation<NavigationProp<EmployerStackList>>();
  const navigationDrawer = useNavigation<NavigationProp<DrawerStackList>>();

  const goToStack = (stackName: keyof EmployerStackList) => {
    navigationEmployer.navigate(stackName);
  };
  const goToDrawer = (stackName: keyof DrawerStackList) => {
    navigationDrawer.navigate(stackName);
  };
  const gotoLogout = (
    stackName: Extract<keyof AuthStackParamsList, 'Login'>,
  ) => {
    navigation.navigate(stackName);
  };
  const {user, logout} = useAuthProvider();

  return (
    <StyledView style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#fafafa', flex: 1}}>
        <StyledView flex={1}>
          <StyledView
            p={20}
            borderWidth={1}
            borderColor="darkSnowGray"
            display="flex"
            bg="#fff"
            alignItems="center"
            flexDirection="row">
            <Avatar name={user?.username ?? ''} />
            <StyledView ml={10}>
              <StyledText
                maxWidth={200}
                color="lightBlack"
                fontSize={20}
                fontWeight="bold">
                {user?.username}
              </StyledText>
              <StyledText fontSize={16} color="mutedTextColor" fontWeight="400">
                {user?.email}
              </StyledText>
            </StyledView>
          </StyledView>
          <StyledText
            fontSize={14}
            my={14}
            mx={20}
            color="lightBlack"
            fontWeight="bold">
            Settings
          </StyledText>
          <StyledView
            borderWidth={1}
            borderColor="darkSnowGray"
            p={20}
            bg="white">
            <StyledView>
              <DrawerItem
                label="Profile Settings"
                icon={props => <FontAwesomeIcon name="gear" {...props} />}
                onPress={() => goToDrawer('ProfileSettings')}
              />
              <DrawerItem
                label="Dashboard"
                icon={props => <FontAwesomeIcon name="home" {...props} />}
                onPress={() => goToDrawer('Dashboard')}
              />
              <DrawerItem
                label="Tasks"
                icon={props => <FontAwesomeIcon name="calendar" {...props} />}
                onPress={() => goToStack('Tasks')}
              />
              <DrawerItem
                label="Employees"
                icon={props => <FontAwesomeIcon name="user-o" {...props} />}
                onPress={() => goToStack('Employees')}
              />
            </StyledView>
          </StyledView>

          <StyledView
            p={20}
            bg="white"
            mt={'auto'}
            borderTopWidth={1}
            borderTopColor="darkSnowGray">
            <DrawerItem
              label="Log ud"
              icon={props => <FontAwesomeIcon name="sign-out" {...props} />}
              onPress={async () => {
                await logout();
                gotoLogout('Login');
              }}
            />
          </StyledView>
        </StyledView>
      </DrawerContentScrollView>
    </StyledView>
  );
}

function Drawer() {
  const {user, logout} = useAuthProvider();


  return (
    <DrawerNav.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor:'transparent'
        },
        headerRight: () => {
          return (
            <StyledView
              flex={1}
              flexDirection="row"
              alignItems="center"
              marginX={2}>
              <MapIcon />
              <StyledText
                m={2}
                fontSize={24}
                color="lightBlack"
                fontWeight="bold">
                {getFirstLetter(user?.username ?? '')}
              </StyledText>
              <Avatar size={40} name={user?.username ?? ''} />
            </StyledView>
          );
        },
     
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <DrawerNav.Screen
        name="Dashboard"
        component={Dashboard}
        
        options={{
          title: 'Dashboard',
        
        }}
      />
      <DrawerNav.Screen
        options={{title: 'Profile Settings'}}
        name="ProfileSettings"
        component={ProfileSettings}
      />
    </DrawerNav.Navigator>
  );
}

export default Drawer;
