import React from 'react';

import {
  SHADOW,
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from 'src/shared/styled/components';
import {WorkpaceProvider, WorkspaceTag} from 'src/shared/components/workspace';
import {useController, useForm} from 'react-hook-form';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamsList} from 'src/app/navigation/types';

export function EmployerForm({
  navigation,
}: {
  navigation: StackNavigationProp<AuthStackParamsList, 'EmployerCreate'>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    control,
  } = useForm({
    defaultValues: {
      username: '',
      companyName: '',
      email: '',
      password: '',
    },
  });
  const {field: username} = useController({
    control,
    defaultValue: '',
    name: 'username',
  });
  const {field: companyName} = useController({
    control,
    defaultValue: '',
    name: 'companyName',
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
  function submit() {
    return navigation.navigate('EmployerPreferences', {
      email: email.value,
      password: password.value,
      companyName: companyName.value,
      username: username.value,
    });
  }
  return (
    <StyledView>
      <StyledView display="flex" alignItems="center">
        <StyledText mb={4} fontWeight="bold" color="lightBlack" fontSize={30}>
          Hi, Create your account!
        </StyledText>
        <WorkpaceProvider title={username.value}>
          <StyledView display="flex" flexDirection="row" alignItems="center">
            <WorkspaceTag />
          </StyledView>
        </WorkpaceProvider>
      </StyledView>

      <StyledView mt={45}>
        <StyledText mb={2} fontWeight="semibold">
          Username
        </StyledText>
        <StyledTextInput
        {...SHADOW}
          variant="secondary"
          value={username.value}
          onChangeText={username.onChange}
        />
        <StyledText mb={2} mt={2} fontWeight="semibold">
          Company Name
        </StyledText>
        <StyledTextInput
        {...SHADOW}
          variant="secondary"
          value={companyName.value}
          onChangeText={companyName.onChange}
        />
        <StyledText mb={2} mt={2} fontWeight="semibold">
          Email
        </StyledText>
        <StyledTextInput
        {...SHADOW}
          variant="secondary"
          keyboardType="email-address"
          value={email.value}
          onChangeText={email.onChange}
        />
        <StyledText mb={2} mt={2} fontWeight="semibold">
          Password
        </StyledText>
        <StyledTextInput
        {...SHADOW}
          secureTextEntry
          variant="secondary"
          value={password.value}
          onChangeText={password.onChange}
        />
      </StyledView>
      <StyledView mt={30}>
        <StyledButton onPress={handleSubmit(submit)} variant="primary">
          <StyledText size="buttonPrimary" textAlign="center" color="white" fontWeight="bold">
            Next
          </StyledText>
        </StyledButton>
      </StyledView>
    </StyledView>
  );
}
