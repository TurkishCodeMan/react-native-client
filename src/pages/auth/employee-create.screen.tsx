import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {AuthStackParamsList} from '../../app/navigation/types';
import {Layout} from '../../shared/components/layout';
import {
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../shared/styled/components';
import { Auth } from 'src/features/auth';

type EmployeeCreateProps = StackScreenProps<
  AuthStackParamsList,
  'EmployeeCreate'
>;


export function EmployeeCreate({navigation}: EmployeeCreateProps) {
  return (
    <Layout>
      <StyledView flex={1} justifyContent={'center'} alignItems={'center'}>
        <StyledView alignItems="center">
          <StyledText textAlign="center" size="heading">
            Welcomme to Dsumma Time Track
          </StyledText>
        </StyledView>

        <Auth.EmployeeForm navigation={navigation} />
      </StyledView>
    </Layout>
  );
}
