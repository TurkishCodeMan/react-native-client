import React from 'react';
import {useMe} from 'src/entities/user/model';
import {useProfileSettings} from 'src/features/profile-settings/hooks';
import {Avatar} from 'src/shared/components/avatar';
import {
  StyledText,
  StyledTextInput,
  StyledView,
} from 'src/shared/styled/components';

export function ProfileSettings() {
  const {attributes, id} = useMe();

  const {email, username, password, submit} = useProfileSettings();
  return (
    <StyledView
      bg="snowGray"
      py={30}
      flex={1}
      alignItems="center"
      justifyContent="flex-start">
      <StyledView>
        <Avatar name={attributes?.username ?? ''} />
      </StyledView>

      <StyledView mt={48} p={35} width="100%" bg="white">
        <StyledText mb={2} fontWeight="semibold">
          Username
        </StyledText>
        <StyledTextInput
          onBlur={submit}
          value={username.value}
          onChangeText={username.onChange}
          variant="primary"
        />
        <StyledText mb={2} marginTop={3} fontWeight="semibold">
          Email
        </StyledText>
        <StyledTextInput
          onBlur={submit}
          value={email.value}
          onChangeText={email.onChange}
          variant="primary"
        />
      </StyledView>
    </StyledView>
  );
}
