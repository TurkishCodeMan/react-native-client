import {WithAuth} from './with-auth';
import {WithNavigation} from './with-navigation';
import {WithStyled} from './with-styled';
import {WithReactQuery} from './with-react-query';
import {PropsWithChildren} from 'react';

export default function WithHocs({children}: PropsWithChildren) {
  return (
 
      <WithStyled>
        <WithReactQuery>
          <WithNavigation>{children}</WithNavigation>
        </WithReactQuery>
      </WithStyled>
   
  );
}
