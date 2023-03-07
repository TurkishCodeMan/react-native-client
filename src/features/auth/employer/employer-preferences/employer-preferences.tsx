import React from 'react';
import {
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledTouchOpacity,
  StyledView,
} from 'src/shared/styled/components';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamsList, EmployerPreferencesProps} from 'src/app/navigation/types';
import {MinusIcon, PlusIcon} from 'src/shared/assets/icons/Icons';
import {SHADOW} from 'src/shared/constants/theme';
import {Workspace} from 'src/shared/api/client-types';
import {
  WorkpaceProvider,
  WorkspaceEditableTitle,
  WorkspaceTag,
} from 'src/shared/components/workspace';
import {ControllerRenderProps, useController, useForm} from 'react-hook-form';
import { Auth } from '../..';


export function EmployerPreferencesForm({
    navigation,
    userInfo
}:{
    navigation:StackNavigationProp<AuthStackParamsList,'EmployerPreferences'>,
    userInfo:EmployerPreferencesProps
}){

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
        control,
      } = useForm({
        defaultValues: {
          employeeSize: '1',
          companySize: '1',
        },
      });
      const {field: employeeSize} = useController({
        control,
        defaultValue: '1',
        name: 'employeeSize',
      });
      const {field: companySize} = useController({
        control,
        defaultValue: '1',
        name: 'companySize',
      });
    
      const {
        wpList,
        selectedWorkspaces,
        updateItem,
        addSelectedWp,
        selectedWp,
        plusWpList,
      } = Auth.useWorkspace();
    
      function add(
        element:
          | ControllerRenderProps<
              {
                employeeSize: string;
                companySize: string;
              },
              'employeeSize'
            >
          | ControllerRenderProps<
              {
                employeeSize: string;
                companySize: string;
              },
              'companySize'
            >,
      ) {
        if (+element.value < 10) {
          const newValue = +element.value + 1;
          setValue(element.name, String(newValue));
        }
      }
      function remove(
        element:
          | ControllerRenderProps<
              {
                employeeSize: string;
                companySize: string;
              },
              'employeeSize'
            >
          | ControllerRenderProps<
              {
                employeeSize: string;
                companySize: string;
              },
              'companySize'
            >,
      ) {
        if (+element.value > 0) {
          const newValue = +element.value - 1;
          setValue(element.name, String(newValue));
        }
      }
      function submit() {
        return navigation.navigate('EmployerPreferences2', {
          ...userInfo,
          employeeSize: employeeSize.value,
          companySize: companySize.value,
          selectedWorkspaces: wpList,
        });
      } 
    return (
        <StyledView>
        <StyledView>
          <StyledText
            color="lightBlack"
            textAlign="center"
            fontSize={28}
            fontWeight="bold">
            Your preferences
          </StyledText>
          <StyledText
            color="lightBlack"
            textAlign="center"
            fontSize={18}
            fontWeight="bold">
            Tell us a little about your company
          </StyledText>
        </StyledView>

        <StyledView alignItems="center">
          <StyledView>
            <StyledText
              mt={30}
              color="lightBlack"
              textAlign="center"
              fontSize={18}
              fontWeight="bold">
              How many employees?
            </StyledText>
            <StyledText>You can always change it later on ...</StyledText>
          </StyledView>
          <StyledView mt={10}>
            <StyledView display="flex" flexDirection="row" width="100%">
              <StyledTouchOpacity
                onPress={() => remove(employeeSize)}
                borderRadius={15}
                border="1px solid"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderColor="blue">
                <MinusIcon color="blue" />
              </StyledTouchOpacity>
              <StyledText
                textAlign="center"
                fontSize={25}
                color="lightBlack"
                fontWeight="bold"
                mx={10}
                borderRadius={15}
                border="1px solid"
                borderColor="blue"
                pt={1}
                width="50%">
                {employeeSize.value}
              </StyledText>
              <StyledTouchOpacity
                onPress={() => add(employeeSize)}
                borderRadius={15}
                border="1px solid"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderColor="blue">
                <PlusIcon color="blue" />
              </StyledTouchOpacity>
            </StyledView>
          </StyledView>
          <StyledText
            mt={30}
            color="lightBlack"
            textAlign="center"
            fontSize={18}
            fontWeight="bold">
            How many Groups in your Company?
          </StyledText>
          <StyledView style={{...SHADOW}} mt={10}>
            <StyledView display="flex" flexDirection="row" width="100%">
              <StyledTouchOpacity
                onPress={() => remove(companySize)}
                borderRadius={15}
                border="1px solid"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderColor="blue">
                <MinusIcon color="blue" />
              </StyledTouchOpacity>
              <StyledText
                pt={1}
                textAlign="center"
                fontSize={25}
                color="lightBlack"
                fontWeight="bold"
                mx={10}
                borderRadius={15}
                border="1px solid"
                borderColor="blue"
                width="50%">
                {companySize.value}
              </StyledText>
              <StyledTouchOpacity
                onPress={() => add(companySize)}
                borderRadius={15}
                border="1px solid"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderColor="blue">
                <PlusIcon width={40} height={40} color="blue" />
              </StyledTouchOpacity>
            </StyledView>
          </StyledView>
        </StyledView>

        <StyledView>
          <StyledText
            mt={30}
            color="lightBlack"
            textAlign="left"
            width={'100%'}
            fontSize={18}
            fontWeight="bold">
            Name your groups.
          </StyledText>
          <StyledView
            display="flex"
            flexWrap="wrap"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around">
            {wpList.map((item: Workspace) => (
              <WorkpaceProvider
                onUpdate={val => updateItem(val, item)}
                key={item.id}
                id={item.id}
                onSelect={id => selectedWp(id)}
                title={item.name}>
                <StyledView
                  my={20}
                  display="flex"
                  flexDirection="row"
                  alignItems="center">
                  <WorkspaceTag
                    selected={selectedWorkspaces?.some(
                      val => val.id == item.id,
                    )}
                  />
                  <WorkspaceEditableTitle />
                </StyledView>
              </WorkpaceProvider>
            ))}

            <WorkpaceProvider onSelect={plusWpList} title="+">
              <StyledView
                display="flex"
                flexDirection="row"
                alignItems="center">
                <WorkspaceTag selected />
              </StyledView>
            </WorkpaceProvider>
          </StyledView>
          <StyledButton
            onPress={handleSubmit(submit)}
            mt={50}
            width="100%"
            variant="primary">
            <StyledText textAlign="center" color="white" fontWeight="bold">
              Next
            </StyledText>
          </StyledButton>
        </StyledView>
      </StyledView>
    )
}