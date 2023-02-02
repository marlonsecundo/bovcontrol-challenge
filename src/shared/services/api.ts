import axios, {AxiosInstance} from 'axios';
import camelCaseKeys from 'camelcase-keys';
import {API_URL} from '@env';

class API {
  axiosApi!: AxiosInstance;

  init = () => {
    this.axiosApi = axios.create({
      baseURL: API_URL,
    });

    // camelcase object from the API
    this.axiosApi.interceptors.response.use(
      this.camelCaseResponseConverter,
      function (error: any) {
        return Promise.reject(error);
      },
    );

    this.axiosApi.interceptors.request.use(
      function (config) {
        console.log(`REQUEST: ${config.method?.toUpperCase()} ${config.url}`);

        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  };

  camelCaseResponseConverter = (response: any) => {
    const camelCaseData = camelCaseKeys(response.data, {deep: true});

    return {...response, data: camelCaseData};
  };
}

export default API;
