import { EmployeeFeedbackInsertRequestModel } from "@/models/modules/10/EmployeeFeedbackModels";
import api from "@/services/Api";

class EmployeeFeedbackService {
  //HTTP POST: api/personelsecurityevent/personel-security-request?userId=1
  public async insertEmployeeFeedback(
    data: EmployeeFeedbackInsertRequestModel,
    userId?: number,
  ) {
    const formFile = new FormData();
    if (data?.formFile) {
      Object.entries(data.formFile).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formFile.append(key, value instanceof File ? value : String(value));
        }
      });
    }
    return await api.post(
      `/personelsecurityevent/personel-security-request?userId=
      ${userId || ""} `,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }
}

const employeeFeedbackService = new EmployeeFeedbackService();
export default employeeFeedbackService;
