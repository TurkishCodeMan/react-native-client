import React from 'react';
import {useController, useForm} from 'react-hook-form';
import {useMe, useProfileSettingsQuery} from 'src/entities/user/model';
import {getUserWithToken} from 'src/shared/helpers/auth-provider';
import { ErrorHand } from '../error';

export function useProfileSettings() {
  const {attributes, id} = useMe();

  const {mutateAsync: onUpdate,isLoading, isError,isSuccess} = useProfileSettingsQuery();
  const {
    handleSubmit,
    formState: {errors},
    control,
    setValue,
    
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    
  });
  const {field: username} = useController({
    control,
    name: 'username',
  
  });
  const {field: email} = useController({
    control,
    name: 'email',
  });
  const {field: password} = useController({
    control,
    name: 'password',
  });

  function submit() {
    onUpdate({
      email: email.value,
      username: username.value,
      id:id??'',
    })
      .then(val => console.log(val))
    
  }

  React.useEffect(() => {
    async function getPass() {
      const {password} = await getUserWithToken();
      setValue('password', password ?? '');
    }
    getPass();
     setValue('email', attributes?.email ?? '');
     setValue('username', attributes?.username ?? '');
  }, [attributes,isError,isSuccess]);

  return {
    username,
    email,
    password,
    errors,
    submit,
    isLoading,
  };
}
