import { GoogleGenAI } from '@google/genai';

// In a real production app, this would interact with our Express backend
// which securely holds the GEMINI_API_KEY.
// For the hackathon prototype, we simulate the AI processing if no backend is available,
// or we proxy it to our local Express /api/ai/simulate endpoint.

export const aiService = {
  async predictRisk(currentData: any, variables: any) {
    try {
      const res = await fetch('/api/ai/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentData, variables })
      });
      return await res.json();
    } catch (e) {
      console.warn("AI Backend unavailable. Using Demo Data.");
      return {
        status: "DEMO_MODE",
        prediction: "Risk is increasing due to +30% rainfall."
      };
    }
  },

  async classifyImage(imageData: File | null) {
    // Simulate image classification for demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          classification: 'Severe Waterlogging Detected',
          confidence: 94,
          severity: 'HIGH',
          category: 'Flooded Road',
          estimatedDepth: '0.4m - 0.6m',
          action: 'Road impassable for standard vehicles. Immediate closure recommended.'
        });
      }, 2000);
    });
  }
};
