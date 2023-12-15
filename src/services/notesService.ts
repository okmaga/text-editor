import httpService from "./httpService";

const notesEndpoint = "notes/";

const notesService = {
  get: async () => {
    const { data } = await httpService.get(notesEndpoint);
    return data;
  }
};
export default notesService;
