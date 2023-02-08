import axios, {AxiosInstance} from 'axios';
import {API_URL} from 'react-native-dotenv';
import {convertToCamelCase} from '~/utils/camelcase-keys';

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
    let data = {};

    if (Array.isArray(response.data)) {
      data = response.data.map(d => convertToCamelCase(d));
    } else data = convertToCamelCase(response.data);

    return {...response, data};
  };
}

export default API;
