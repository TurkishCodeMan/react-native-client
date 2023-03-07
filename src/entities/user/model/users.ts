import {useMutation, useQuery} from 'react-query';
import {StrapiResponseType, client} from 'src/shared/api/api-client';
import {Company, User, Workspace} from 'src/shared/api/client-types';
import {queryClient} from 'src/app/hocs/with-react-query';
import { ErrorHand } from 'src/features/error';

export function useMutationCreateUser() {
  return useMutation(
    (value: {
      username: string;
      email: string;
      password: string;
      role: string;
      company: string;
      language: string;
      workspaces: string[];
      employerCompanies: string;
    }) =>
      client<
        StrapiResponseType<User>,
        {
          username: string;
          email: string;
          password: string;
          role: string;
          company: string;
          language: string;
          workspaces: string[];
          employerCompanies: string;
        }
      >('users', {data: value}),
    {
      onError(error, variables, context) {
        return ErrorHand.handler(new Error(error as string),'Error Create User')
      },
      onSettled: () => {
        queryClient.invalidateQueries('user')
        queryClient.invalidateQueries('me')

      },
    },
  );
}

export function useMutationLogin() {
  return useMutation(
    (value: {identifier: string; password: string}) =>
      client<
        StrapiResponseType<{user: User; jwt: string}>,
        {identifier: string; password: string}
      >('auth/local', {
        data: value,
      }),
    {
      onError(error, variables, context) {
        return ErrorHand.handler(new Error(error as string),'Error Login')
      },
        onSettled: () => {
          queryClient.invalidateQueries('user')
          queryClient.invalidateQueries('me')
  
        },
    },
  );
}

export function useProfileSettingsQuery() {
  return useMutation(
    (value: {email: string; username: string,id:string}) =>
      client<
        StrapiResponseType<{user: User}>,
        {email: string; username: string}
      >(`users/${value.id}`, {
        data: value,
        method: 'PUT',
      }),
    {
      onError(error, variables, context) {
        return ErrorHand.handler(new Error(error as string),'Error Update')
      },
        onSettled: () => {
          queryClient.invalidateQueries('user')
          queryClient.invalidateQueries('me')
  
        },
    },
  );
}

export function useMe() {
  const data = useQuery({
    queryKey: 'me',
    queryFn: () => client<StrapiResponseType<User>>('users/me?populate=*'),
    // onError(error) {
    //   return ErrorHand.handler(new Error(error as string), 'Error Me');
    // },
  });

  return {
    ...data?.data,
  };
}
