import axios from "axios";

export const generateContentAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct", // ✅ WORKING MODEL
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "blogapp"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};