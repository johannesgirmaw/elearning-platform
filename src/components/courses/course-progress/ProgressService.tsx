import useApi from '../../../utils/api';
import { FetchData } from '../../../types/FetchData';
import {
  ContentProgress,
  CourseProgress,
  ChapterProgress,
} from '../../../types/Course';

const useProgressService = () => {
  const { appApi } = useApi();

  const updateContentProgress = (content_id: string, progress_id: string) => {
    const response = appApi.put<ContentProgress>(
      `/progress/content/${progress_id}/`,
      { content: content_id }
    );
    return response;
  };

  return { updateContentProgress };
};

export default useProgressService;
