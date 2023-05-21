import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ResponseMetaSchema {
  code: number;
  dateTime: string;
  message: string;
  sId: string;
}

// 기본 셋팅.
export const instance = axios.create({
  headers: { 'content-type': 'application/json' },
});

// 선처리. 헤더에 accessToken 담아서 호출 필요.
instance.interceptors.request
  .use
  //   (requestConfig) => {
  //     if (requestConfig.url !== config.SIGN_URL["get-refresh-token"]) {
  //         const token = AuthService.getLocalAccessToken();
  //         if (token) {
  //             requestConfig.headers["Authorization"] = 'Bearer ' + token;
  //         }
  //     }

  //     return requestConfig;
  // },
  // (error) => {
  //     return Promise.reject(error);
  // }
  ();

// 후처리.
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const HTTP = {
  get: <ResponseType>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseType>> =>
    instance.get(url, options),
};
