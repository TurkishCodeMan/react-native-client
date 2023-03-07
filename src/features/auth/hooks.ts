import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {useMe, useMutationLogin} from 'src/entities/user/model';
import {StrapiResponseType} from 'src/shared/api/api-client';
import {User, Workspace} from 'src/shared/api/client-types';
import {RootStackParamsList} from 'src/app/navigation/types';
import {
  getStorageToken,
  getUserWithToken,
  setStorageToken,
  setUserWithToken,
  removeStorageToken,
  removeUserWithToken,
} from 'src/shared/helpers/auth-provider';
import {getFirstLetter} from 'src/shared/helpers/get-first-letter';

interface IOnCreateUser {
  username: string;
  password: string;
  email: string;
  role: string;
  company?: string;
  language?: string;
  workspaces: string[];
  employerCompanies?: string;
}
interface ILoginParams {
  identifier: string;
  password: string;
}
export type CreateUserFn = (
  data: IOnCreateUser,
) => Promise<StrapiResponseType<User>>;
type OnLoginFn = (
  data: ILoginParams,
) => Promise<StrapiResponseType<{user: User; jwt: string}>>;

export const useWorkspace = ({wpListArr}: {wpListArr?: Workspace[]} = {}) => {
  const [wpList, setWpList] = React.useState<Workspace[]>([
    {name: 'Starters', tag: 'S', id: '1'},
    {name: 'Finished', tag: 'F', id: '2'},
  ]);
  const [selectedWorkspaces, setSelectedWorkspaces] =
    React.useState<Workspace[]>();

  const updateItem = (val: string, item: Workspace) => {
    return setWpList(curr =>
      curr.map(v => {
        if (v.id === item.id) {
          return {
            ...v,
            name: val,
            tag: getFirstLetter(val),
          };
        }
        return v;
      }),
    );
  };

  function addSelectedWp(wp: Workspace) {
    if (!selectedWorkspaces?.some(val => val?.id === wp.id)) {
      return setSelectedWorkspaces(curr => [...(curr ?? []), wp]);
    }
    return setSelectedWorkspaces(curr =>
      curr?.filter(val => val?.id !== wp.id),
    );
  }

  const selectedWp = (id: string) => {
    const item = !wpListArr
      ? wpList?.find((val: Workspace) => val?.id == id)
      : wpListArr?.find((val: Workspace) => val?.id == id);
    addSelectedWp(item as Workspace);
  };
  const plusWpList = () => {
    return setWpList(curr => [
      ...(curr ?? []),
      {id: String((wpList?.length as number) + 1), name: 'Test', tag: 'T'},
    ]);
  };
  return {
    wpList,
    selectedWorkspaces,
    updateItem,
    addSelectedWp,
    selectedWp,
    plusWpList,
  };
};

export function useLogin() {
  const {mutateAsync: loginFn, isLoading, isError} = useMutationLogin();
  const {user, token, onLogin} = useAuthProvider();
  const {navigate, dispatch: dispatchNav} =
    useNavigation<NavigationProp<RootStackParamsList>>();
  function onSubmit() {
    return onLogin({identifier: user?.email ?? '', loginFn}).then(val =>
      navigate('EmployerStack', {screen: 'Drawer'}),
    );
  }

  return {
    onSubmit,
    user,
    token,
    isLoading,
  };
}

export function useAuthProvider() {
  const [user, setUser] = React.useState<User>();
  const [token, setToken] = React.useState<string | undefined>();
  const [pass, setPass] = React.useState<string | undefined>();
  const {attributes, id} = useMe();

  const onLogin = async ({
    identifier,
    loginFn,
  }: Omit<ILoginParams, 'password'> & {loginFn: OnLoginFn}) => {
    const {password} = await getUserWithToken();
    setPass(password);
    return loginFn({identifier, password})
      .then(val => {
        setUserWithToken({
          ...val.attributes.user,
          jwt: val.attributes.jwt,
          password,
        });
        setToken(val.attributes.jwt);
        setStorageToken(val.attributes.jwt);
        setUser(val.attributes.user);
        return val;
      })
      .catch(e => `Error-Login ${e}`);
  };
  const onCreateUser = async ({
    username,
    password,
    email,
    role,
    company,
    language,
    workspaces,
    employerCompanies,
    createUserFn,
  }: IOnCreateUser & {createUserFn: CreateUserFn}) => {
    return createUserFn({
      username,
      password,
      email,
      role,
      company,
      language,
      workspaces,
      employerCompanies,
    }).then(val => {
      console.log(val);
      setUserWithToken({...val.attributes, password});

      setUser(val.attributes);
      return val;
    });
  };
  const logout = async () => {
    // await removeUserWithToken();
    await removeStorageToken();
  };
  const value = React.useMemo(
    () => ({user, token, pass, logout, onLogin, onCreateUser} as const),
    [user, token, pass, onLogin, onCreateUser],
  );
  React.useEffect(() => {
    async function getUserWithTokenStorage() {
      const value = await getUserWithToken();
      const tkn = await getStorageToken();
       setUser(value);
      setToken(tkn);
    }
    getUserWithTokenStorage();
  }, []);

  React.useEffect(() => {
    async function setUserValue() {
      setUser(attributes);
    }
    setUserValue();
  }, [id, attributes]);

  return {
    ...value,
  };
}

export function   useAuthControl() {
  const {navigate, dispatch: dispatchNav} =
    useNavigation<NavigationProp<RootStackParamsList>>();
  const {user} = useAuthProvider();
  React.useEffect(() => {
    if (!user) {
      return navigate('AuthStack', {screen: 'StartPage'});
    }
    return navigate('AuthStack', {screen: 'Login'});
  }, [user]);
}
