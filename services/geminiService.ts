
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPropertyEnhancement = async (propertyTitle: string, location: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Rédige une description immobilière ultra-luxueuse pour un bien nommé "${propertyTitle}" situé à "${location}". 
      L'agence s'appelle Dynasty 8. Utilise un ton sophistiqué, élitiste et évocateur. Maximum 100 mots. 
      Inclus des termes comme "exclusivité", "raffinement" et "art de vivre".`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const getConciergeResponse = async (userQuery: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userQuery,
      config: {
        systemInstruction: "Tu es le concierge virtuel de Dynasty 8, une agence immobilière de luxe. Ton ton est extrêmement poli, serviable et sophistiqué. Tu aides les clients à trouver la propriété de leurs rêves.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Je m'excuse, une erreur technique m'empêche de vous répondre. Veuillez réessayer ultérieurement.";
  }
};
