import React from 'react';
import {Layout} from '../../shared/components/layout';
import {StyledButton, StyledImage, StyledText, StyledView} from '../../shared/styled/components';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamsList } from '../../app/navigation/types';
const imageSrc = require('../../../public/start.png');

type StartPageProps=StackScreenProps<AuthStackParamsList,'StartPage'>

export function StartPage({navigation}:StartPageProps) {
  return (
    <Layout>
      <StyledView flex={1}  alignItems="center">
        <StyledView display="flex" justifyContent="center" alignItems="center">
          <StyledText size="heading" paddingBottom={47}>
            D-summa Time Track
          </StyledText>
          <StyledText size="title">
            Keep better track on your employéers working hours
          </StyledText>
        </StyledView>
        <StyledView>
          <StyledImage source={imageSrc} width={360} height={340}/>
        </StyledView>
        <StyledView
          alignItems="center"
          flexDirection="row"
          mt="auto"
          justifyContent="space-between">
          <StyledButton onPress={()=>navigation.navigate('EmployeeCreate')} variant="primary">
            <StyledText size="buttonPrimary">Im a Employee</StyledText>
          </StyledButton>
          <StyledButton onPress={()=>navigation.navigate('EmployerCreate')} ml={9} variant="secondary">
            <StyledText size="buttonSecondary">Im a Employer</StyledText>
          </StyledButton>
        </StyledView>
      </StyledView>
    </Layout>
  );
}
