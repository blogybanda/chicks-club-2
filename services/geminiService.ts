// This service has been deprecated. The application now uses static scientific data for simulations.
// The Gemini API integration has been removed.

export const generateSimulation = async (scenario: string): Promise<any> => {
  throw new Error("API deprecated");
};

export const askPaleontologist = async (question: string): Promise<string> => {
  return "Chat functionality is currently disabled.";
};