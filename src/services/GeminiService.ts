import { GeminiAxiosResponse, GeminiRequest } from "@/models/gemini-ai";
import axios from "axios";

export class GeminiService {
  URL = process.env.NEXT_PUBLIC_GEMINI_API_URL;
  TOKEN = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  /*
    curl \
  -H "Content-Type: application/json" \
  -d "{\"contents\":[{\"parts\":[{\"text\":\"Explain how AI works\"}]}]}" \
  -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY"
  */

  public async getAIResponse(
    data: GeminiRequest,
  ): Promise<GeminiAxiosResponse> {
    return await axios.post(
      `${this.URL}` +
        "/models/gemini-1.5-flash-latest:generateContent?key=" +
        this.TOKEN,
      data,
    );
  }
}

const geminiService = new GeminiService();
export default geminiService;
