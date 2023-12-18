import httpService from "./httpService";
import { localStorageService } from "./localStorageService";

const usersEndpoint = "users/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(usersEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      usersEndpoint + payload._id,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      usersEndpoint + localStorageService.getUserId()
    );

    return data;
  }
};
export default userService;
