import apiClient from "@/services/ApiClient";
import { LocationData } from "@/models/location";
import { ModuleData } from "@/models/module";

export class ListService {
  public async getLocations(): Promise<LocationData> {
    return await apiClient.get(`/location`, {});
  }
  public async getModules(): Promise<ModuleData> {
    return await apiClient.get(`/modul`, {});
  }
}

const listService = new ListService();
export default listService;
