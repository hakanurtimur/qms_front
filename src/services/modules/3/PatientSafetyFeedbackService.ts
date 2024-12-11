import {
  EventSceneListResponseModel,
  FeedbackEventTypeListResponseModel,
  PatientSafetyFeedbackInsertRequestModel,
} from "@/models/modules/3/PatientSafetyFeedbackModels";
import api from "@/services/Api";

export class PatientSafetyFeedbackService {
  //HTTP GET: api/patientsecurityevent/get-patient-security-event-type-list
  public async getFeedbackEventTypeList(): Promise<FeedbackEventTypeListResponseModel> {
    return await api.get(
      "/patientsecurityevent/get-patient-security-event-type-list",
    );
  }

  //HTTP GET: api/eventscene/event-scene-get-list
  public async getEventSceneList(): Promise<EventSceneListResponseModel> {
    return await api.get("/eventscene/event-scene-get-list");
  }

  // HTTP POST: api/patientsecurityevent/patient-general-request/{userId}     ----userId opsiyonel

  public async insertPatientSafetyFeedback(
    data: PatientSafetyFeedbackInsertRequestModel,
    userId?: string,
  ) {
    const formFile = new FormData();
    Object.entries(data?.formFile).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formFile.append(key, value instanceof File ? value : String(value));
      }
    });
    return await api.post(
      `/patientsecurityevent/patient-general-request?userId=${userId || ""} `,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  }
}

const patientSafetyFeedbackService = new PatientSafetyFeedbackService();
export default patientSafetyFeedbackService;