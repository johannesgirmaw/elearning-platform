import useApi from '../../../utils/api';
import { FetchData } from '../../../types/FetchData';
import { Course, CourseEnrollment } from '../../../types/Course';
import { TableSearchModel } from '../../customs/pagination/usePagination';

const useEnrollmentService = () => {
  const { appApi } = useApi();

  const addCourseEnrollment = (enroll: {}) => {
    const response = appApi.post<CourseEnrollment>('/course/enroll/', enroll, {
      // headers: {
      //   'content-type': 'jsu/form-data',
      // },
    });
    
    return response;
  };

  const getEnrollments = (data: TableSearchModel) => {
    const response = appApi.get<FetchData<CourseEnrollment>>("course/enroll/", {
      params: {
        ...data
      },
    });
    return response;
  };

  return { addCourseEnrollment, getEnrollments };
};

export default useEnrollmentService;
