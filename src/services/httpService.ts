import axios from "axios";
import configFile from "../config.json";
import { Note } from "../types/custom";
import { User } from "../types/custom";
import { httpAuth } from "../context/AuthProvider";
import { localStorageService } from "./localStorageService";

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
  async function (config) {
    if (config.url && configFile.isFireBase) {
      const containsSlash = /\/$/gi.test(config.url);
      config.url =
        (containsSlash ? config.url?.slice(0, -1) : config.url) + ".json";

      const tokenExpiresDate = parseInt(
        localStorageService.getTokenExpiresDate()
      );

      const refreshToken = localStorageService.getRefreshToken();

      if (refreshToken && tokenExpiresDate && tokenExpiresDate < Date.now()) {
        const { data } = await httpAuth.post("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken
        });

        console.log("token refresh");

        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

type DataType = { [key: string]: Note | User };

const transformData = (
  data: DataType | null | undefined
): Note | User | (Note | User)[] => {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
        id: key
      }))
    : data;
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
