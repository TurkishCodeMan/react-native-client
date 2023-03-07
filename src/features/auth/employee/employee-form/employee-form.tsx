import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from 'src/shared/styled/components';
import {useAllCompanies} from 'src/entities/company/model';
import {Company} from 'src/shared/api/client-types';
import RNPickerSelect from 'react-native-picker-select';
import {useController, useForm} from 'react-hook-form';
import { AuthStackParamsList } from 'src/app/navigation/types'



type FieldValues = {
  language: string;
  company: Company;
};


export function EmployeeForm({
  navigation,
}: {
  navigation: StackNavigationProp<
    AuthStackParamsList,
    'EmployeeCreate',
    undefined
  >;
}) {

  
  const {companies, isLoading, isError} = useAllCompanies();
  const {
    handleSubmit,
    register,
    watch,
    formState: {errors},
    setValue,
    getValues,
    control,
  } = useForm<FieldValues>({
    defaultValues: {
      language: '',
    },
  });
  const {field: fieldLanguage} = useController<FieldValues>({
    control,
    defaultValue: '',
    name: 'language',
  });
  const watchAll = watch();
  function onSelectItem(value: Company) {
    return setValue('company', value);
  }
  function onSubmit() {
    return navigation.navigate('EmployeeCreate2', {
      language: watchAll.language,
      company: watchAll.company,
    });
  }

  return (
    <>
      <StyledView p={30}>
        <StyledText mb={10} textAlign="center">
          Find the Company you Work for...
        </StyledText>
        <StyledTextInput
          variant="primary"
          value={fieldLanguage.value as string}
          onChangeText={fieldLanguage.onChange}
          mb={20}
        />
        <RNPickerSelect
          style={{
            chevronActive: {borderColor: 'black', borderWidth: 1},
            inputAndroidContainer: {maxHeight: 500},
          }}
          onValueChange={onSelectItem}
          items={
            companies?.map(comp => ({
              label: comp.attributes.name,
              value: {id: comp.id, ...comp.attributes},
            })) ?? []
          }
          {...register('company', {
            required: {
              message: 'Company Required',
              value: true,
            },
          })}
        />
        {errors.company && (
          <StyledText color="red">{errors.company.message}</StyledText>
        )}
      </StyledView>
      <StyledView mt={'auto'}>
        <StyledText fontWeight="bold" color="lightBlack">
          Do you allready have an account?
          <StyledText color="lightBlue">Log in</StyledText>
        </StyledText>

        {getValues('company') && (
          <StyledButton
            mt={22}
            variant="primary"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onPress={handleSubmit(onSubmit)}>
            <StyledText size="buttonPrimary">Next</StyledText>
          </StyledButton>
        )}
      </StyledView>
    </>
  );
}
