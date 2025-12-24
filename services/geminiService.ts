
import { GoogleGenAI } from "@google/genai";

// 安全地獲取 API Key
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

export const getFengShuiInsight = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "系統尚未配置 API Key，無法提供 AI 分析。";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Feng Shui master specializing in the Luo Pan (24 Mountains Compass). Explain relationships in Traditional Chinese (Taiwan). Keep it concise.",
        temperature: 0.7,
      },
    });
    return response.text || "抱歉，我現在無法提供分析。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "分析過程中發生錯誤。";
  }
};
