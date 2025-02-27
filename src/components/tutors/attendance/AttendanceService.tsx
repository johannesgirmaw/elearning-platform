import useCommonApi from '../../../utils/api';
import { Attendance } from '../../../types/Attendance';
import { TableSearchModel } from '../../customs/pagination/usePagination';
import { FetchedApi } from '../../../types/FetchedApi';

export interface AttendanceTableSearchModel extends TableSearchModel {
  start_date?: Date
  end_date?: Date
  student?: string
  tutor_contract?: string;
}


const useAttendanceService = () => {
  const { appApi } = useCommonApi();

  const getAttendance = (id: string) => {
    const response = appApi.get<Attendance>(`tutor/attendance/${id}`);
    return response;
  };

  const addAttendance = (attendance: {}) => {
    const response = appApi.post<Attendance>(
      'tutor/attendance/',
      attendance,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );
    return response;
  };

  const updateAttendance = (attendance: Attendance) => {
    const response = appApi.put<Attendance>(
      `tutor/attendance/${attendance.id}/`,
      attendance,
    );
    return response;
  };

  const getAttendances = (filteredData?: AttendanceTableSearchModel) => {
    const response = appApi.get<FetchedApi<Attendance>>('tutor/attendance/', {
      params: {
        ...filteredData
      },
    });
    return response;
  };

  const deleteAttendance = (id: string) => {
    const response = appApi.delete<Attendance>(`tutor/attendance/${id}/`);
    return response;
  };

  return {
    getAttendances,
    getAttendance,
    addAttendance,
    deleteAttendance,
    updateAttendance,
  };
};

export default useAttendanceService;
