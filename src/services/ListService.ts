import api from "@/services/Api";
import { LocationData } from "@/models/location";
import { ModuleData } from "@/models/module";

export class ListService {
  public async getLocations(): Promise<LocationData> {
    return await api.get(`/location`, {});
  }
  public async getModules(): Promise<ModuleData> {
    return await api.get(`/module/get-non-login-module-list`, {});
  }
}

const listService = new ListService();
export default listService;
