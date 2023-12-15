import axios from "axios";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
  function (config) {
    if (config.url && configFile.isFireBase) {
      const containsSlash = /\/$/gi.test(config.url);
      config.url =
        (containsSlash ? config.url?.slice(0, -1) : config.url) + ".json";
      console.log(config.url);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

interface User {
  id: string;
  name: string;
  email: string;
}

interface Note {
  id: string;
  userId: string;
  title: string;
  body: string;
}

type DataType = { [key: string]: Note | User };

const transformData = (data: DataType | null | undefined): (Note | User)[] => {
  return data
    ? Object.keys(data).map((key) => ({
        ...data[key],
        id: key
      }))
    : [];
};

axios.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
export default httpService;
