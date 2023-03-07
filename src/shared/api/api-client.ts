import {getUserWithToken} from '../helpers/auth-provider';

 const apiURL = 'https://octopus-app-9s2t7.ondigitalocean.app/api';
//const apiURL = 'http://192.168.1.35:1337/api';
interface Data<K> {
  data?: K | {data: K}; //Change Client Types,
  headers?: string[];
  token?: string;
  method?: string;
}

type Res<K> = {id: string; attributes: Omit<K, 'id'>};

export type StrapiResponseType<K> = Res<K>;

export async function client<T, K = unknown>(
  endpoint: string,
  {data, method, headers: customHeaders, ...customConfig}: Data<K> = {},
): Promise<T> {
  const val = await getUserWithToken();

  const config: RequestInit | any = {
    method: method ? method : data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: val?.jwt ? `Bearer ${val?.jwt}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status == 401) {
      return Promise.reject( 'Please re-authenticate.');
    }
    try {
      const data = await response.json();

      if (response.ok) {
        return data.data ? data.data : {attributes: data, id: data.id};
      } else {
        return Promise.reject(data.error.message);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  });
}
