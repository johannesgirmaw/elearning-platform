import useApi from '../../../utils/api';
import { FetchData } from '../../../types/FetchData';
import { Course, CourseEnrolled, CourseEnrollment, CourseProgress } from '../../../types/Course';
import { TableSearchModel } from '../../../utils/modal';

export interface UserCourseProgressSearchModel extends TableSearchModel {
  course?: string;
  method?: string;
}

const useCourseProgressService = () => {
  const { appApi } = useApi();

  const getCourseProgress = (enroll: {}) => {
    const response = appApi.post<CourseEnrolled>('/course/enroll/', enroll, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    
    return response;
  };

  const getUserCourseProgress = (filterData: UserCourseProgressSearchModel) => {
    const response = appApi.get<FetchData<CourseProgress>>('/progress/course/', {
      params: {
        ...filterData
      }
    });
    
    return response;
  };

  return { getCourseProgress, getUserCourseProgress };
};

export default useCourseProgressService;
