import useApi from '../../../utils/api';
import { Answer, UserAnswers, Question, UserQuizeResultsType } from '../../../types/Course';
import { FetchedApi } from '../../../types/FetchedApi';
import { TableSearchModel } from '../../../utils/modal';

export interface QuestionTableSearchModel extends TableSearchModel {
  content_id?: string
}

export interface QuestionResultType {
  id: string;
}

export const useQuestionService = () => {
  const { appApi } = useApi();

  const addQuestion = (question: Question) => {
    const response = appApi.post<Question>("questions/instructor/", question);
    return response;
  };

  const updateQuestion = (question: Question) => {
    const response = appApi.put<Question>(
      "questions/" + question.id + "/",
      question
    );
    return response;
  };

  const addAnswer = (answer: Answer) => {
    const response = appApi.post<Answer>(
      'questions/answer/', answer
    );
    return response;
  };

  const updateAnswer = (answer: Answer) => {
    const response = appApi.put<Question>(
      'questions/answer/' + answer.id + '/', answer
    );
    return response;
  };

  const getQuestion = (id: string) => {
    const response = appApi.get<Question>(`questions/${id}/`);
    return response;
  };

  const getQuestions = (filterData: QuestionTableSearchModel) => {
    const response = appApi.get<FetchedApi<Question>>(
      'questions/', {
        params: {
          ...filterData
        }
    }
    );
    return response;
  }

  const getInstructorQuestions = (filterData: QuestionTableSearchModel) => {
    const response = appApi.get<FetchedApi<Question>>(
      'questions/instructor/', {
        params: {
          ...filterData
        }
    }
    );
    return response;
  }

  const deleteQuestion = (id: string) => {
    const response = appApi.delete<Question>(`questions/${id}/`);
    return response;
  };

  const deleteAnswer = (id: string) => {
    const response = appApi.delete<Answer>(`answer/${id}/`);
    return response;
  };

  const getQuizeResults = (data: {content_id?: string, course?: string, is_passed?: boolean, user?: string}) => {
    const response = appApi.get<FetchedApi< UserQuizeResultsType>>("questions/user_result/", {params:{
      ...data
    }})
    return response;
  }

  const addValue = (value: string) => {
    const response = appApi.post<Question>(
      'values/', value
    );
    return response;
  };
  const addUserAnswer = (answers: UserAnswers[]) => {
    const response = appApi.post<UserQuizeResultsType>("questions/user_answer/", answers)
    return response;
  }

  const getValue = (id: string) => {
    const response = appApi.get<Question>(`values/${id}/`);
    return response;
  };

  const getValues = () => {
    const response = appApi.get<Question[]>(
      'values/',
    );
    return response;
  };


  const deleteValue = (id: string) => {
    const response = appApi.delete<Question>(`values/${id}/`);
    return response;
  };

  return {
    addQuestion,
    getQuestion,
    updateQuestion,
    getQuestions,
    deleteQuestion,
    addValue,
    getValue,
    getValues,
    deleteValue,
    addAnswer, 
    updateAnswer, 
    deleteAnswer, 
    addUserAnswer,
    getInstructorQuestions,
    getQuizeResults
  }
}

export default useQuestionService;
