import api from "@/services/Api";
import { ManagerLogin, UserLogin } from "@/models/auth";
import tokenService, { AuthData } from "@/services/TokenService";
import { parseJwt, User } from "@/models/user";
import { jwtDecode } from "jwt-decode";

class AuthService {
  // User login
  async userLogin(data: UserLogin): Promise<User> {
    const response = await api.post<unknown>("/user-login", { ...data });
    const authData = response.data as AuthData;
    const user = parseJwt(authData.accessToken);
    tokenService.setAuthData(response.data as AuthData);
    return user;
  }

  // Manager login
  async managerLogin(data: ManagerLogin): Promise<User> {
    const response = await api.post<unknown>("/manager-login", {
      ...data,
    });
    console.log(response);
    const authData = response.data as AuthData;
    console.log(jwtDecode(authData.accessToken));
    const user = parseJwt(authData.accessToken);
    tokenService.setAuthData(response.data as AuthData);
    return user;
  }

  async logout() {
    tokenService.clearAuthData();
  }
}

const authService = new AuthService();
export default authService;
