import {useMutation, useQuery} from 'react-query';
import {StrapiResponseType, client} from 'src/shared/api/api-client';
import {Company} from 'src/shared/api/client-types';
import {queryClient} from 'src/app/hocs/with-react-query';
import {ErrorHand} from 'src/features/error';

export function useAllCompanies() {
  const data = useQuery({
    queryKey: 'companies',
    queryFn: () =>
      client<StrapiResponseType<Company>[]>('companies?populate=*'),

    onError(error) {
      return ErrorHand.handler(new Error(error as string), 'Error All Companies');
    },
  });

  return {
    companies: data.data,
    ...data,
  };
}

export function useMutationCreateCompany() {
  return useMutation(
    (value: {name: string}) =>
      client<StrapiResponseType<{company: Company}>, {name: string}>(
        'companies',
        {
          data: {data: value},
        },
      ),
    {
      onError(error, variables, context) {
        return ErrorHand.handler(new Error(error as string), 'Error Update');
      },
      onSettled: () => queryClient.invalidateQueries('companies'),
    },
  );
}
