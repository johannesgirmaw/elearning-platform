import useApi from "../../../utils/api";
import { QuestionOption } from "../../../types/Course";

export const useQuestionOptionService = () => {
  const { appApi } = useApi();  

  const deleteOption = (id: string) => {
    const response = appApi.delete<QuestionOption>(`questions/options/${id}/`);
    return response;
  };

  const updateOption = (questionOption: QuestionOption) => {
    const response = appApi.patch<QuestionOption>(
      "questions/options/" + questionOption.id + "/",
      questionOption
    );
    return response;
  };

  const addOption = (questionOption: QuestionOption) => {
    const response = appApi.post<QuestionOption>(`questions/options/`, questionOption);
    return response;
  };

  return {
    deleteOption,
    updateOption,
    addOption
  };
};

export default useQuestionOptionService;
