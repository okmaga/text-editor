import httpService from "./httpService";

const notesEndpoint = "notes/";

const notesService = {
  get: async (userId: string | null) => {
    const { data } = await httpService.get(notesEndpoint, {
      params: {
        orderBy: `"userId"`,
        equalTo: `"${userId}"`
      }
    });
    console.log(data);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      notesEndpoint + payload._id,
      payload
    );
    return data;
  }
};
export default notesService;
