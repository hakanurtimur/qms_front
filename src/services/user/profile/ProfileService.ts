import api from "@/services/Api";
import { ResponseProfileModel } from "@/models/user/profile/profileModel";
import { ResponseModel } from "@/models/api/response";

export class ProfileService {
  /*
          Profil bilgilerinin getirilmesi
          Http Method : HttpGet
      
          Endpoint : api/user/user-profile-by-id/{userId}
      */
  public async getProfile(userId: number): Promise<ResponseProfileModel> {
    return await api.get(`user/user-profile-by-id/${userId}`);
  }

  /*
      Profil fotoğrafının kaldırılması
      Http Method : HttpPost
  
      Endpoint : api/user/user-delete-profile-img/{userId}
  
      Request : UserId INT , PathProfileState INT
  
      Response : Success 200
    */

  public async deleteProfileImg(userId: number): Promise<ResponseModel> {
    return await api.post(`user/user-delete-profile-img/${userId}`, {
      pathProfileState: 0,
    });
  }

  /*    
    api/user/user-change-profile-img/{userId}
    Http Method : HttpPost
    Request : userId INT , formFile FILE
    Response : Success 200
  */
  public async changeProfileImg(
    userId: number,
    formFile: File,
  ): Promise<ResponseModel> {
    const formData = new FormData();
    formData.append("formFile", formFile);
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });
    return await api.post(`user/user-change-profile-img/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const profileService = new ProfileService();
export default profileService;
