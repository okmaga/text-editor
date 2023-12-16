import httpService from "./httpService";

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
  }
};
export default userService;
