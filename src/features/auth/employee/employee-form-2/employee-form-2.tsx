import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamsList} from 'src/app/navigation/types';
import {
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from 'src/shared/styled/components';
import {getFirstLetter} from 'src/shared/helpers/get-first-letter';
import {
  WorkpaceProvider,
  WorkspaceTag,
  WorkspaceTitle,
} from 'src/shared/components/workspace';
import {useController, useForm} from 'react-hook-form';
import {Roles} from 'src/shared/constants/constants';
import {Company, Workspace} from 'src/shared/api/client-types';
import {Auth} from 'src/features/auth';
import {useMutationCreateUser} from 'src/entities/user/model';
import { CreateUserFn } from '../../hooks';

export function EmployeeForm2({
  navigation,
  company,
  language,
}: {
  navigation: StackNavigationProp<
    AuthStackParamsList,
    'EmployeeCreate2',
    undefined
  >;
  company: Company;
  language: string;
}) {

  
  //@ts-ignore
  const companyWp = company.workspaces?.data.map(val => ({
    id: val.id,
    ...val.attributes,
  }));


  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
  });
  const {field: username} = useController({
    control,
    defaultValue: '',
    name: 'username',
  });
  const {field: email} = useController({
    control,
    defaultValue: '',
    name: 'email',
  });
  const {field: password} = useController({
    control,
    defaultValue: '',
    name: 'password',
  });
  const {field: phoneNumber} = useController({
    control,
    defaultValue: '',
    name: 'phoneNumber',
  });

  const {onCreateUser, user} = Auth.useAuth()
  const {mutateAsync: createUserFn, isLoading: isLoadingCreateUser} =
    useMutationCreateUser();

  // const [newWpIds, setNewWpIds] = React.useState<string[]>([]);
  const createUser = () => {
    return onCreateUser({
      username: username.value,
      email: email.value,
      password: password.value,
      role: Roles.EMPLOYEE,
      company: company.id ?? '',
      language: language ?? '',
      workspaces: [...(selectedWorkspaces?.map((val:Workspace) => val.id ?? '') ?? [])],
      createUserFn: createUserFn as CreateUserFn,
    });
  };

  const onSubmit = () => {
    return Promise.all([createUser()]).then(val =>
      navigation.navigate('Login'),
    );
  };

  const {selectedWorkspaces, updateItem, selectedWp} =Auth.useWorkspace({
    wpListArr: companyWp,
  });

  return (
    <StyledView flex={1} alignItems="center">
      <StyledView display="flex" justifyContent="center" alignItems="center">
        <StyledView
          bg="darkSnowGray"
          width={84}
          height={84}
          borderRadius={32}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StyledText color="mutedTextColor" fontSize={15} fontWeight="bold">
            #{getFirstLetter(company.name)}
          </StyledText>
        </StyledView>
        <StyledText fontSize={19} mt={10} color="lightBlack" fontWeight="bold">
          "{company.name}"
        </StyledText>
      </StyledView>

      <StyledView display="flex" width="100%" mt={68}>
        <StyledView>
          <StyledText>Your User Name</StyledText>
          <StyledTextInput
            variant="primary"
            value={username.value}
            onChangeText={username.onChange}
          />
        </StyledView>
        <StyledView mt={10}>
          <StyledText>Email</StyledText>
          <StyledTextInput
            keyboardType="email-address"
            variant="primary"
            value={email.value}
            onChangeText={email.onChange}
          />
        </StyledView>
        <StyledView mt={10}>
          <StyledText>Password</StyledText>
          <StyledTextInput
            secureTextEntry
            variant="primary"
            value={password.value}
            onChangeText={password.onChange}
          />
        </StyledView>
        <StyledView mt={10}>
          <StyledText>Phone Number</StyledText>
          <StyledTextInput
            variant="primary"
            value={phoneNumber.value}
            onChangeText={phoneNumber.onChange}
          />
        </StyledView>
      </StyledView>
      <StyledText textAlign="left" width="100%" mt={55} mb={20} fontWeight="bold">
        I Work here as
      </StyledText>

      <StyledView
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        {companyWp.map((item: Workspace) => (
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
                selected={selectedWorkspaces?.some((val:Workspace) => val?.id == item?.id)}
              />
              <WorkspaceTitle />
            </StyledView>
          </WorkpaceProvider>
        ))}
      </StyledView>

      <StyledView mt={120} width="100%">
        <StyledButton onPress={handleSubmit(onSubmit)} variant="primary">
          <StyledText textAlign="center" color="white" size="buttonPrimary" >
            Next
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
}
