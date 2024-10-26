import axios, { AxiosInstance, AxiosResponse } from "axios";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.response.use(
      (response) => {
        if (
          response.data &&
          response.data.statusCode &&
          response.data.statusCode === 400
        ) {
          const errorMessage = response.data.error?.errors[0];
          return Promise.reject({
            message: errorMessage,
            status: response.data.statusCode,
          });
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  // GET
  public async get<T, R = AxiosResponse<T>>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<R> {
    const url = `/api/${path}`;
    console.log(url);
    const response = await this.api.get<R>(url, { params });
    return response.data;
  }
  // GET PUBLIC
  public async getPublic<T, R = AxiosResponse<T>>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<R> {
    const url = `/public/${path}`;
    console.log(url);
    const response = await this.api.get<R>(url, { params });
    return response.data;
  }

  // POST
  public async post<T, R = AxiosResponse<T>>(
    path: string,
    data: T,
  ): Promise<R> {
    const url = `/api/${path}`;
    console.log(url);
    const response = await this.api.post<R>(url, data);
    return response.data;
  }

  // PUT
  public async put<T, R = AxiosResponse<T>>(
    path: string,
    data: Record<string, unknown>,
  ): Promise<R> {
    const url = `/api/${path}`;
    const response = await this.api.put<R>(url, data);
    return response.data;
  }

  // DELETE
  public async delete<T, R = AxiosResponse<T>>(path: string): Promise<R> {
    const url = `/api/${path}`;
    const response = await this.api.delete<R>(url);
    return response.data;
  }
}

const api = new ApiService();
export default api;
