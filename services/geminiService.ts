import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PERSONAL_INFO, SKILLS, PROJECTS, EDUCATION, CERTIFICATIONS, INTERNSHIPS } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Construct a system prompt based on Khizra's data
const systemPrompt = `
You are an AI assistant for the personal portfolio of ${PERSONAL_INFO.name}.
Your role is to answer questions about Khizra's skills, projects, education, and background based STRICTLY on the following information.
Be polite, professional, and encouraging. Keep answers concise.

Details:
Name: ${PERSONAL_INFO.name}
Role: ${PERSONAL_INFO.role}
About: ${PERSONAL_INFO.about}

Professional Experience (Internships):
${INTERNSHIPS.map(i => `- ${i.role} at ${i.company} (Domain: ${i.domain})`).join('\n')}

Education:
${EDUCATION.map(e => `- ${e.degree} at ${e.institution}: ${e.description}`).join('\n')}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Link: ${p.link})`).join('\n')}

Skills:
${SKILLS.map(s => `- ${s.name} (${s.category}) ${s.status ? '- ' + s.status : ''}`).join('\n')}

Certifications:
${CERTIFICATIONS.map(c => `- ${c.title} from ${c.issuer}`).join('\n')}

If asked about something not in this list, say you don't have that information but suggest contacting Khizra directly via email.
`;

export const chatWithGemini = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, my AI brain is missing its API key. Please check the configuration.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return response.text || "I didn't get a clear response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while thinking. Please try again later.";
  }
};
