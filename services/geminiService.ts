import { GoogleGenAI, Type } from "@google/genai";
import { SUBJECT_YEAR_MAP, COMMON_ABBREVIATIONS } from "../constants";
import { StudentEntry } from "../types";

export const extractDataFromText = async (inputText: string): Promise<StudentEntry[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const subjectList = Object.keys(SUBJECT_YEAR_MAP).join(", ");

  const systemInstruction = `
    You are a strict data extraction engine. 
    Your goal is to parse unstructured WhatsApp conversation logs into a structured JSON format.
    
    RULES:
    1. **Course**: Always set to "bds".
    2. **Phone Number**: Extract the 10-digit number. Remove '+91', spaces, dashes, or brackets. If a number is not found, leave empty.
    3. **Subject**: You must normalize the subject to EXACTLY one of the strings in this list: [${subjectList}].
       - Use the provided abbreviations to help identify subjects: ${COMMON_ABBREVIATIONS}.
       - If "Oral Medicine" and "Oral Radiology" are mentioned or implied together (e.g. "OMR"), create TWO separate entries, one for each subject.
       - Case sensitivity is critical. Use the exact spelling from the allowed list.
    4. **Year**: Map the Year strictly based on the normalized Subject using the provided mapping context. Ignore year mentioned in the text if it conflicts with the subject map.
    5. **Name**: Extract the student name. Remove batch numbers like "15]" or "50]" or timestamps.
    6. **Multi-Subject**: If a student lists multiple subjects, create a separate JSON object for each subject with the same Name and Phone Number.
    7. **Cleanliness**: Ensure the output is a valid JSON array.
  `;

  // We construct a specific mapping prompt to ensure the model has the look-up table
  const mappingContext = JSON.stringify(SUBJECT_YEAR_MAP);

  const prompt = `
    Reference Mapping (Subject -> Year):
    ${mappingContext}

    Input Data:
    ${inputText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              Name: { type: Type.STRING },
              Course: { type: Type.STRING },
              Year: { type: Type.STRING },
              Subject: { type: Type.STRING },
              PhoneNumber: { type: Type.STRING }
            },
            required: ["Name", "Course", "Year", "Subject", "PhoneNumber"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const parsedData = JSON.parse(jsonText) as StudentEntry[];
    return parsedData;

  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    throw error;
  }
};