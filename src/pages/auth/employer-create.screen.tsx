import React from 'react';
import {Layout} from '../../shared/components/layout';
import {
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../shared/styled/components';
import {
  WorkpaceProvider,
  WorkspaceTag,
} from '../../shared/components/workspace';
import {ScrollView} from 'react-native';
import {useController, useForm} from 'react-hook-form';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamsList} from '../../app/navigation/types';
import { Auth } from 'src/features/auth';
type EmployerCreateProps = StackScreenProps<
  AuthStackParamsList,
  'EmployerCreate'
>;


export function EmployerCreate({navigation}: EmployerCreateProps) {
  return (
    <ScrollView style={{flex: 1}}>
      <Layout>
        <Auth.EmployerForm navigation={navigation} />
      </Layout>
    </ScrollView>
  );
}
