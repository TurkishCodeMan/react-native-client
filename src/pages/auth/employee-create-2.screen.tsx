import React from 'react';
import {Layout} from '../../shared/components/layout';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamsList} from '../../app/navigation/types';
import {ScrollView} from 'react-native';
import {Auth} from 'src/features/auth';

type EmployeeCreate2Props = StackScreenProps<
  AuthStackParamsList,
  'EmployeeCreate2'
>;

export function EmployeeCreate2({route, navigation}: EmployeeCreate2Props) {
  const {company, language} = route.params;

  return (
    <ScrollView style={{flex: 1}}>
      <Layout>
        <Auth.EmployeeForm2
          company={company}
          language={language}
          navigation={navigation}
        />
      </Layout>
    </ScrollView>
  );
}
