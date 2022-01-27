import axios from 'axios';
import {sign, decode} from 'react-native-pure-jwt';

const axiosInstance = axios.create({
  baseURL: 'https://apidev.emaar.com',
});

axiosInstance.interceptors.request.use(
  async (req) => {
    req.headers = {
      ...req.headers,
      'X-Token': 'DN8S0MSH4MIZEOHBGH4D0XMOZ56SD',
    };
    if (req.method === 'post' && req?.data?.body) {
      req.data = await sign(req.data.body, 'e@h@d@s@cr@t', {
        alg: 'HS256',
        typ: 'JWT',
      });
      console.log({req});
      return req;
    } else {
      return req;
    }
  },
  (config) => config,
  (error) => {
    console.log({error});
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    if (typeof response.data === 'string') {
      console.log({response});
      let decodedResponse = {};
      try {
        console.log('decrypting');
        if (
          response.headers['content-type'].includes('application/json') ||
          response.headers['content-type'].includes('text/html')
        ) {
          decodedResponse = await decode(response.data, 'e@h@d@s@cr@t', {
            skipValidation: true,
          });
        } else {
          alert('Some Error in API!');
        }
      } catch (e) {
        console.log('decoding error', e);
        return {};
      }
      console.log({response, decodedResponse});
      return decodedResponse?.payload || {};
    }
    return response;
  },
  (error) => {
    console.log({error});
    return Promise.reject(error);
  },
);

export default axiosInstance;