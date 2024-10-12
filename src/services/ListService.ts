import apiClient from "@/services/ApiClient";
import { Location } from "@/models/location";

export class ListService {
  public async getLocations(): Promise<Location[]> {
    return await apiClient.get(`/location`, {});
  }
}

const listService = new ListService();
export default listService;
