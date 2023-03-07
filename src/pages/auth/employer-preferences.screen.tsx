import React from 'react';
import {Layout} from '../../shared/components/layout';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamsList} from '../../app/navigation/types';
import {ScrollView} from 'react-native';
import {Auth} from 'src/features/auth';

type EmployerPreferencesProps = StackScreenProps<
  AuthStackParamsList,
  'EmployerPreferences'
>;

export function EmployerPreferences({
  navigation,
  route,
}: EmployerPreferencesProps) {
  const userInfo = route.params;

  return (
    <ScrollView style={{flex: 1}}>
      <Layout>
        <Auth.EmployerPreferences navigation={navigation} userInfo={userInfo} />
      </Layout>
    </ScrollView>
  );
}
