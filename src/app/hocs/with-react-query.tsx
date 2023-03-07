import React, { PropsWithChildren } from 'react';
import {QueryCache, QueryClient, QueryClientProvider} from 'react-query';


export const queryClient = new QueryClient();
export const queryCache = new QueryCache({
  onError: error => {
    console.log(error);
  },
  onSuccess: data => {
    console.log(data);
  },
});

export function WithReactQuery({children}:PropsWithChildren){

    return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    )
}



