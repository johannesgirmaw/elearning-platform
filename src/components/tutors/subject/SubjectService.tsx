import { FetchedApi } from '../../../types/FetchedApi';
import useApi from '../../../utils/api';
import { TableSearchModel } from '../../customs/pagination/usePagination';

export interface Subject {
    id:string;
    category: string;
    subject_name: string;
    description: string;
    serial_number: number;
}

export interface SubjectTableSearchModel extends TableSearchModel {

}
 
export const useSubjectService = () => {
    const {appApi} = useApi()

 const addSubject = (subject: Subject) => {
    const response = appApi.post<Subject>(
        'tutor/subject/', subject
    );
    return response;
};

const getSubject = (id: string) => {
  const response = appApi.get<Subject>(`tutor/subject/${id}/`);
  return response;
};

const updateSubject = (id: string, subject: Subject) => {
  const response = appApi.patch<Subject>(`tutor/subject/${id}/`, subject);
  return response;
};

 const getSubjects = (filterdata?: SubjectTableSearchModel) => {
    const response = appApi.get<FetchedApi<Subject>>(
        'tutor/subject/', {params:{
          ...filterdata
        }}
    );
    return response;
};

const deleteSubject = (id: string) => {
  const response = appApi.delete<Subject>(`tutor/subject/${id}/`);
  return response;
};


return { getSubjects, deleteSubject, getSubject, addSubject, updateSubject}
}

export default useSubjectService
