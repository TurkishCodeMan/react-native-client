import {PropsWithChildren} from 'react';
import {AuthProvider} from 'src/app/context DELETED/auth-context';

export function WithAuth ({children}: PropsWithChildren)  {
  return <AuthProvider>{children}</AuthProvider>;
};


