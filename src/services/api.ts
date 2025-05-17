
  
  import axios from 'axios';

  
  const API_BASE_URL = 'http://127.0.0.1:8000';
  
  export const evaluateResponse = async (
    questionId: string,
    userResponse: string,
    userId: number,
    assessmentId: string | null
  ) => {
    try {
      const payload: any = {
        question_id: questionId,
        user_response: userResponse,
        user_id: userId,
      };
  
      if (assessmentId) {
        payload.assessment_id = assessmentId;
      }
  
      const response = await axios.post(`${API_BASE_URL}/evaluate`, payload);
      return response.data;
  
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Erreur API Axios :", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("Erreur JS :", error.message);
      } else {
        console.error("Erreur inconnue :", error);
      }
      throw error;
    }
  };
  
  