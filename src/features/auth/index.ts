import {EmployeeForm2} from './employee/employee-form-2/employee-form-2';
import {EmployeeForm} from './employee/employee-form/employee-form';
import {EmployerForm} from './employer/employer-form';
import {EmployerPreferencesForm} from './employer/employer-preferences';
import {EmployerPreferences2Form} from './employer/employer-preferences-2';
import {useAuthControl, useAuthProvider, useLogin, useWorkspace} from './hooks';

export const Auth = {
  EmployeeForm: EmployeeForm,
  EmployeeForm2: EmployeeForm2,
  EmployerForm: EmployerForm,
  EmployerPreferences: EmployerPreferencesForm,
  EmployerPreferences2: EmployerPreferences2Form,
  useAuth: useAuthProvider,
  useLogin: useLogin,
  useAuthControl: useAuthControl,
  useWorkspace: useWorkspace,
};
