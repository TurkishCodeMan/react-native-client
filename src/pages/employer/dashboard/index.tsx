import React from 'react';
import {StyledText, StyledView} from 'src/shared/styled/components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Card} from 'src/shared/components/card';
import {ScrollView} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          margin: 20,
          borderRadius: 20,
          padding: 2,
        },
        tabBarLabelStyle: {
          paddingVertical: 5,
          paddingHorizontal: 16,
          fontSize: 14,
          textTransform: 'none',
        },
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen name="Home" component={Employee} />
      <Tab.Screen name="Settings" component={SubConstracters} />
    </Tab.Navigator>
  );
}
function Employee() {
  return (
    <ScrollView style={{flex: 1}}>
      <StyledView flex={1}>
        <StyledView
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start">
          <Card style={{marginBottom: 25}}>
            <StyledText
              paddingX={20}
              paddingY={15}
              width="100%"
              borderBottomWidth={1}
              borderBottomColor="darkSnowGray"
              fontWeight="bold"
              fontSize={20}
              color="lightBlack">
              Tjeck in/out
            </StyledText>

            <StyledView
              padding={20}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <StyledView
                display="flex"
                alignItems="center"
                flexDirection="column">
                <StyledText fontWeight="bold" fontSize={20} color="lightBlack">
                  8
                </StyledText>
                <StyledText>Tjecket in</StyledText>
              </StyledView>

              <StyledView
                display="flex"
                alignItems="center"
                flexDirection="column">
                <StyledText fontWeight="bold" fontSize={20} color="lightBlack">
                  1
                </StyledText>
                <StyledText>Not Started</StyledText>
              </StyledView>
            </StyledView>
          </Card>

          <Card>
            <StyledView
              display="flex"
              flexDirection="row"
              justifyContent="space-between">
              <StyledText
                paddingX={20}
                paddingY={15}
                borderBottomWidth={1}
                borderBottomColor="darkSnowGray"
                fontWeight="bold"
                fontSize={20}
                color="lightBlack">
                Time Statistics
              </StyledText>
              <StyledText
                paddingX={20}
                paddingY={15}
                borderBottomWidth={1}
                borderBottomColor="darkSnowGray"
                fontWeight="bold"
                fontSize={20}
                color="lightBlack">
                2022 June
              </StyledText>
            </StyledView>
            <StyledView height={300}>
              <StyledText>Chart</StyledText>
            </StyledView>
            <StyledView
              padding={20}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <StyledView
                display="flex"
                mr={15}
                alignItems="center"
                flexDirection="column">
                <StyledText fontWeight="bold" fontSize={20} color="lightBlack">
                  800h
                </StyledText>
                <StyledText width={10} height={10} bg="green"></StyledText>
              </StyledView>

              <StyledView
                display="flex"
                ml={15}
                alignItems="center"
                flexDirection="column">
                <StyledText fontWeight="bold" fontSize={20} color="lightBlack">
                  10h
                </StyledText>
                <StyledText width={10} height={10} bg="red"></StyledText>
              </StyledView>
            </StyledView>
          </Card>
        </StyledView>
      </StyledView>
    </ScrollView>
  );
}

function SubConstracters() {
  return (
    <StyledView flex={1}>
      <StyledText>Employer Home</StyledText>
    </StyledView>
  );
}
