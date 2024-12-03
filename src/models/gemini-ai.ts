import { z } from "zod";

// Define a schema for the request body
const SGeminiRequest = z.object({
  contents: zod.array(
    zod.object({
      parts: zod.array(
        zod.object({
          text: zod.string(),
        }),
      ),
    }),
  ),
});

export type GeminiRequest = z.infer<typeof SGeminiRequest>;

/*
  {
  "candidates": [
    {
      "content": {
        "parts": [
          {
            
            "text": "Merhaba!  Nasılsın?  Yardımcı olabileceğim bir şey var mı?\n"
          }
        ],
        "role": "model"

      },
      "finishReason": "STOP",
      "avgLogprobs": -0.139429353532337
    } 
  ],
  "usageMetadata": {
    "promptTokenCount": 3,
    "candidatesTokenCount": 21,
    "totalTokenCount": 24
  },
  "modelVersion": "gemini-1.5-flash-latest"
}


*/
// Define a schema for the response body
const SGeminiResponse = z.object({
  candidates: z.array(
    z.object({
      content: z.object({
        parts: z.array(
          z.object({
            text: z.string(),
          }),
        ),
        role: z.string(),
      }),
      finishReason: z.string(),
      avgLogprobs: z.number(),
    }),
  ),
  usageMetadata: z.object({
    promptTokenCount: z.number(),
    candidatesTokenCount: z.number(),
    totalTokenCount: z.number(),
  }),
  modelVersion: z.string(),
});

export type GeminiResponse = z.infer<typeof SGeminiResponse>;
