import {useMutation} from 'react-query';
import {StrapiResponseType, client} from 'src/shared/api/api-client';
import {Company, Workspace} from 'src/shared/api/client-types';
import { queryClient } from 'src/app/hocs/with-react-query';

export function useMutationCreateWorkspace() {
  return useMutation(
    (value: {name: string; tag: string; company: string}) =>
      client<
        StrapiResponseType<{workspace: Workspace}>,
        {name: string; tag: string; company: string}
      >('workspaces', {
        data: {data: value},
      }),
    {
      onError: (err, variables, recover) =>
        typeof recover === 'function' ? recover() : null,
      onSettled: () => queryClient.invalidateQueries('user'),
    },
  );
}
