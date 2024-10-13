import api from "@/services/Api";
import { ManagerLogin, UserLogin } from "@/models/auth";
import tokenService, { AuthData } from "@/services/TokenService";

class AuthService {
  // User login
  async userLogin(data: UserLogin) {
    const response = await api.post<unknown>("/user-login", { ...data });
    tokenService.setAuthData(response.data as AuthData);
  }

  // Manager login
  async managerLogin(data: ManagerLogin) {
    const response = await api.post<unknown>("/manager-login", {
      ...data,
    });
    tokenService.setAuthData(response.data as AuthData);
  }

  async logout() {
    tokenService.clearAuthData();
  }
}

const authService = new AuthService();
export default authService;
