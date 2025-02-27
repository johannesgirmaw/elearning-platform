import useApi from "../../../utils/api";
import { ReviewTableSearchModel, Reviewer } from "../../../types/Course";
import { FetchedApi } from "../../../types/FetchedApi";

const useReviewerService = () => {
  const { appApi } = useApi();
  const getContent = (id: string) => {
    const response = appApi.get<Reviewer>(`course/review/${id}/`);
    return response;
  };

  const addReviewer = (review: Reviewer) => {
    const response = appApi.post<Reviewer>("course/review/", 
      review,
      {headers: {
        'content-type': 'multipart/form-data'
    }}
      );
    return response;
  };

  const getReviewers = (data: ReviewTableSearchModel) => {
    const response = appApi.get<FetchedApi<Reviewer>>("course/review/", {
      params: {
       ...data
      },
    });
    return response;
  };
  const editReview = (id:string,review:Reviewer) => {
    const response = appApi.patch<Reviewer>(`course/review/${id}/`,review);
    return response;
  };

  const deleteReviewer = (id: string) => {
    const response = appApi.delete<Reviewer>(`course/review/${id}/`);
    return response;
  };

  return {getContent, getReviewers, addReviewer, deleteReviewer,editReview}
};

export default useReviewerService
