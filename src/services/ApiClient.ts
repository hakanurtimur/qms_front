import axios, { AxiosInstance, AxiosResponse } from "axios";

export const BASE_PATH = "/api".replace(/\/+$/, "");

class ApiClient {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: BASE_PATH,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get<T, R = AxiosResponse<T>>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<R> {
    const url = BASE_PATH + path;
    const response = await this.apiClient.get<R>(url, { params });
    return response.data;
  }
}

const apiClient = new ApiClient();
export default apiClient;
