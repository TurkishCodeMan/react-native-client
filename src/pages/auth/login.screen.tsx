import React from 'react';
import {Layout} from '../../shared/components/layout';
import {
  StyledText,
  StyledView,
  StyledButton,
} from '../../shared/styled/components';
import {Logo} from 'src/shared/components/logo';
import {LogoLoading} from 'src/shared/components/logo-loading';
import { Auth } from 'src/features/auth';

export function Login() {
  const {user}=Auth.useAuth()
  const {onSubmit,isLoading}=Auth.useLogin()
  return (
    <Layout>
      <StyledView flex={1}>
        <StyledView display="flex" alignItems="center">
          <Logo />
          <StyledText
            textAlign="center"
            fontSize={30}
            fontWeight="bold"
            color="lightBlack">
            Welcomme to Dsumma Time Track
          </StyledText>
        </StyledView>
        <StyledView
          flexGrow={1}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StyledView bg="darkSnowGray" borderRadius={11} py={30} px={60}>
            <StyledText fontWeight="bold" fontSize={20}>
              {user?.username}
            </StyledText>
          </StyledView>
        </StyledView>
        <StyledView display="flex" justifyContent="center" alignItems="center">
          {isLoading ? (
            <LogoLoading />
          ) : (
            <StyledButton width="100%" onPress={onSubmit} variant="primary">
              <StyledText textAlign="center" color="white" fontWeight="bold">
                Login
              </StyledText>
            </StyledButton>
          )}
        </StyledView>
      </StyledView>
    </Layout>
  );
}
