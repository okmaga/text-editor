import httpService from "./httpService";
import { Note } from "../types/custom";

const notesEndpoint = "notes/";

interface UpdateResponse {
  content: Note;
  [key: string]: any;
}

const notesService = {
  get: async (userId: string | null) => {
    const { data } = await httpService.get(notesEndpoint, {
      params: {
        orderBy: `"userId"`,
        equalTo: `"${userId}"`
      }
    });
    return data;
  },
  create: async (payload: Note) => {
    const { data } = await httpService.put(
      notesEndpoint + payload._id,
      payload
    );
    return data;
  },
  update: async (payload: Note): Promise<UpdateResponse> => {
    const { data } = await httpService.put(
      notesEndpoint + payload._id,
      payload
    );
    return data as UpdateResponse;
  }
};
export default notesService;
