import axios from 'axios';
import Environment from '../Environment';

const pingApi = () => {
  return axios.get(`${Environment().apiUrl}/api/ping`, {
    withCredentials: true,
  });
};

export default pingApi;
