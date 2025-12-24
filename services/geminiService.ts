
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFengShuiInsight = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Feng Shui master specializing in the Luo Pan (24 Mountains Compass) and the I Ching. Explain the spatial relationships, family member associations, and elemental balances based on the user's query in traditional Chinese. Keep answers concise but insightful.",
        temperature: 0.7,
      },
    });
    return response.text || "抱歉，我現在無法提供分析。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "連線至風水大師時發生錯誤，請稍後再試。";
  }
};
