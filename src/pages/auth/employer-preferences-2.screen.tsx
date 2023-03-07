import React from 'react';
import {Layout} from '../../shared/components/layout';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamsList} from '../../app/navigation/types';
import {ScrollView} from 'react-native';
import { Auth } from 'src/features/auth';

type EmployerPreferencesProps = StackScreenProps<
  AuthStackParamsList,
  'EmployerPreferences2'
>;

export function EmployerPreferences2({
  navigation,
  route,
}: EmployerPreferencesProps) {
  const allUserInfo = route.params;

  return (
    <ScrollView style={{flex: 1}}>
      <Layout>
        <Auth.EmployerPreferences2
          navigation={navigation}
          allUserInfo={allUserInfo}
        />
      </Layout>
    </ScrollView>
  );
}
