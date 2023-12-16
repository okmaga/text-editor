import axios from "axios";
import configFile from "../config.json";
import { Note } from "@/types/custom";

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
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

type DataType = { [key: string]: Note | User };

const transformData = (data: DataType | null | undefined): (Note | User)[] => {
  return data
    ? Object.keys(data).map((key) => ({
        ...data[key],
        id: key
      }))
    : [];
};

http.interceptors.response.use(
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
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};
export default httpService;
