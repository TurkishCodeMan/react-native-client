import {NavigatorScreenParams} from '@react-navigation/native';
import {Company, Workspace} from '../../shared/api/client-types';

type Stack<K extends RootStackParamsList> = {
  [P in keyof K]: P extends NavigatorScreenParams<infer X> ? X : never;
};
type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T] &
  keyof T;

export type RootStackParamsList = {
  AuthStack: NavigatorScreenParams<AuthStackParamsList>;
  EmployerStack:NavigatorScreenParams<EmployerStackList>
};



export type EmployerStackList = {
  Drawer:undefined,
  Tasks:undefined,
  Employees:undefined,
  
}


export type AuthStackParamsList = {
  EmployeeCreate: undefined;
  EmployeeCreate2: EmployeeCreate2Props;
  Login: undefined;
  LoginFingerprint:undefined;
  EmployerCreate: undefined;
  EmployerPreferences: EmployerPreferencesProps;
  EmployerPreferences2: EmployerPreferences2Props;
} & StartPage;


export type StartPage = {
  StartPage: undefined;
};

export type EmployeeCreate2Props = {language: string; company: Company};
export type EmployerPreferencesProps = {
  email: string;
  password: string;
  companyName: string;
  username: string;
};
export type EmployerPreferences2Props = {
  employeeSize: string;
  selectedWorkspaces: Workspace[];
  companySize: string;
} & EmployerPreferencesProps;
