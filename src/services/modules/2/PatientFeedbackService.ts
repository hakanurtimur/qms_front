import {
  FeedbackTypeResponseModel,
  ModulesUserListResponse,
  PatientFeedbackByIdResponseModel,
  PatientFeedbackInsertRequestModel,
} from "@/models/modules/2/PatientFeedbackModels";
import api from "@/services/Api";

export class PatientFeedbackService {
  //HTTP GET: api/userResource/users-get-list
  public async getUsers(): Promise<ModulesUserListResponse> {
    return await api.get(`/userResource/users-get-list`);
  }

  //HTTP GET: api/patient/patient-get-by-id/?userId=655&protocolId=7707778&identityNumber=53047341322
  public async getPatientById(
    userId: string,
    protocolId: string,
    identityNumber: string,
  ): Promise<PatientFeedbackByIdResponseModel> {
    return await api.get(
      `/patient/patient-get-by-id/?userId=${userId}&protocolId=${protocolId}&identityNumber=${identityNumber}`,
    );
  }

  //api/feedbacktype/feedback-type-get-list
  public async getFeedbackTypes(): Promise<FeedbackTypeResponseModel> {
    return await api.get(`/feedbacktype/feedback-type-get-list`);
  }
  //api/patientfeedback/nonlogin-patient-feedback-insert
  public async insertFeedback(data: PatientFeedbackInsertRequestModel) {
    return await api.post(
      `/patientfeedback/nonlogin-patient-feedback-insert`,
      data,
    );
  }
}

const patientFeedbackService = new PatientFeedbackService();
export default patientFeedbackService;
