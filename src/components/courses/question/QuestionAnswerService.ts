import useApi from "../../../utils/api";
import { Answer } from "../../../types/Course";

export const useQuestionAnswerService = () => {
  const { appApi } = useApi();


  const addAnswer = (answer: Answer) => {
    const response = appApi.post<Answer>("questions/answer/", answer);
    return response;
  };

  const updateAnswer = (answer: Answer) => {
    const response = appApi.put<Answer>(
      "questions/answer/" + answer.id + "/",
      answer
    );
    return response;
  };

  const deleteAnswer = (id: string) => {
    const response = appApi.delete<Answer>(`questions/answer/${id}/`);
    return response;
  };


  return {
    addAnswer,
    updateAnswer,
    deleteAnswer,
  };
};

export default useQuestionAnswerService;
