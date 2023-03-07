import React from 'react';
import {
  StyledButton,
  StyledText,
  StyledTouchOpacity,
  StyledView,
} from 'src/shared/styled/components';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  AuthStackParamsList,
  EmployerPreferences2Props,
} from 'src/app/navigation/types';
import {MinusIcon, PlusIcon} from 'src/shared/assets/icons/Icons';
import {SHADOW} from 'src/shared/constants/theme';
import {Workspace} from 'src/shared/api/client-types';
import {
  WorkpaceProvider,
  WorkspaceTag,
  WorkspaceTitle,
} from 'src/shared/components/workspace';
import {ControllerRenderProps, useController, useForm} from 'react-hook-form';
import {Roles} from 'src/shared/constants/constants';
import {useMutationCreateCompany} from 'src/entities/company/model';
import {useMutationCreateWorkspace} from 'src/entities/workspace/model';
import {LogoLoading} from 'src/shared/components/logo-loading';
import {Auth} from 'src/features/auth';
import {useMutationCreateUser} from 'src/entities/user/model';
import {CreateUserFn} from '../../hooks';

export function EmployerPreferences2Form({
  navigation,
  allUserInfo,
}: {
  navigation: StackNavigationProp<AuthStackParamsList, 'EmployerPreferences2'>;
  allUserInfo: EmployerPreferences2Props;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
    control,
  } = useForm({
    defaultValues: {
      contracterSize: '1',
      contracterEmployeeSize: '1',
    },
  });
  const {field: contracterSize} = useController({
    control,
    defaultValue: '1',
    name: 'contracterSize',
  });
  const {field: contracterEmployeeSize} = useController({
    control,
    defaultValue: '1',
    name: 'contracterEmployeeSize',
  });

  const {selectedWorkspaces, selectedWp} = Auth.useWorkspace({
    wpListArr: allUserInfo.selectedWorkspaces,
  });

  const {onCreateUser, user} = Auth.useAuth();
  const {mutateAsync: createUserFn, isLoading: isLoadingCreateUser} =
    useMutationCreateUser();
  const {mutateAsync: createCompany, isLoading: isLoadingCompany} =
    useMutationCreateCompany();
  const {mutateAsync: createWorkspace, isLoading: isLoadingWorkspaces} =
    useMutationCreateWorkspace();

  function add(
    element:
      | ControllerRenderProps<
          {
            contracterSize: string;
            contracterEmployeeSize: string;
          },
          'contracterSize'
        >
      | ControllerRenderProps<
          {
            contracterSize: string;
            contracterEmployeeSize: string;
          },
          'contracterEmployeeSize'
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
            contracterSize: string;
            contracterEmployeeSize: string;
          },
          'contracterSize'
        >
      | ControllerRenderProps<
          {
            contracterSize: string;
            contracterEmployeeSize: string;
          },
          'contracterEmployeeSize'
        >,
  ) {
    if (+element.value > 0) {
      const newValue = +element.value - 1;
      setValue(element.name, String(newValue));
    }
  }
  console.log(selectedWorkspaces);
  const submit = () => {
    return createCompany({name: allUserInfo.companyName})
      .then(val => {
        return Promise.all(
          selectedWorkspaces?.map(v =>
            createWorkspace({name: v.name, tag: v.tag, company: val.id}),
          ) ?? [],
        );
      })
      .then(value =>
        onCreateUser({
          username: allUserInfo.username,
          email: allUserInfo.email,
          password: allUserInfo.password,
          role: Roles.EMPLOYER,
          employerCompanies: '2',
          workspaces: [...(value?.map(val => val.id ?? '') ?? [])],
          createUserFn: createUserFn as CreateUserFn,
        }),
      )
      .then(() => navigation.navigate('Login'))
      .catch(console.error);
  };

  return (
    <StyledView>
      <StyledView>
        <StyledText
          color="lightBlack"
          textAlign="center"
          fontSize={28}
          fontWeight="bold">
          How many Sub Contracters
        </StyledText>
        <StyledText
          color="lightBlack"
          textAlign="center"
          fontSize={18}
          fontWeight="bold">
          are you using in your Company?
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
            How many contracters?
          </StyledText>
        </StyledView>
        <StyledView mt={10}>
          <StyledView display="flex" flexDirection="row" width="100%">
            <StyledTouchOpacity
              onPress={() => remove(contracterSize)}
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
              {contracterSize.value}
            </StyledText>
            <StyledTouchOpacity
              onPress={() => add(contracterSize)}
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
          How many Employees do they have?
        </StyledText>
        <StyledView style={{...SHADOW}} mt={10}>
          <StyledView display="flex" flexDirection="row" width="100%">
            <StyledTouchOpacity
              onPress={() => remove(contracterEmployeeSize)}
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
              {contracterEmployeeSize.value}
            </StyledText>
            <StyledTouchOpacity
              onPress={() => add(contracterEmployeeSize)}
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
          Wich Group do they Work under?
        </StyledText>
        <StyledView
          display="flex"
          flexWrap="wrap"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around">
          {allUserInfo.selectedWorkspaces.map((item: Workspace) => (
            <WorkpaceProvider
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
                  selected={selectedWorkspaces?.some(val => val?.id == item.id)}
                />
                <WorkspaceTitle />
              </StyledView>
            </WorkpaceProvider>
          ))}
        </StyledView>
        {isLoadingCompany || isLoadingCreateUser || isLoadingWorkspaces ? (
          <StyledView
            mt={30}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <LogoLoading />
          </StyledView>
        ) : (
          <StyledButton
            onPress={handleSubmit(submit)}
            mt={50}
            width="100%"
            variant="primary">
            <StyledText textAlign="center" color="white" fontWeight="bold">
              Next
            </StyledText>
          </StyledButton>
        )}
      </StyledView>
    </StyledView>
  );
}
