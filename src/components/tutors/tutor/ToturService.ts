import { FetchedApi } from '../../../types/FetchedApi';
import useApi from '../../../utils/api';
import { TableSearchModel } from '../../customs/pagination/usePagination';
import { LocationTableSearchModel, PartialTutorRequest, Tutor, Location,TutorTableSearchModel } from './TutorInfoModel';


export const useTutorService = () => {
    const {appApi} = useApi()

 const addTutor = (question: Tutor) => {
    const response = appApi.post<Tutor>(
        'tutor/', question
    );
    return response;
};

const getTutor = (id: string) => {
  const response = appApi.get<Tutor>(`tutor/${id}/`);
  return response;
};

 const getTutors = (filterdata?: TutorTableSearchModel) => {
    const response = appApi.get<FetchedApi<Tutor>>(
        'tutor/', {params:{
          ...filterdata
        }}
    );
    return response;
};
const getTutorsData = (params:TutorTableSearchModel) => {
  const response = appApi.patch<FetchedApi<Tutor>>('tutor/', null, {params}
  );
  return response;
};
const partialUpdateTutorRequest = (id:string, data:PartialTutorRequest) => {
  const response = appApi.patch<Tutor>(`tutor/${id}/`, data)
  return response
}

const deleteTutor = (id: string) => {
  const response = appApi.delete<Tutor>(`tutor/${id}/`);
  return response;
};

const addValue = (value: string) => {
  const response = appApi.post<Tutor>(
      'values/', value
  );
  return response;
};

const getValue = (id: string) => {
const response = appApi.get<Tutor>(`values/${id}/`);
return response;
};

const getValues = () => {
  const response = appApi.get<Tutor[]>(
      'values/',
  );
  return response;
};
const getLocations = (filterdata?: LocationTableSearchModel) => {
  const response = appApi.get<FetchedApi<Location>>("tutor/location/", {
    params: {
      ...filterdata
    }
  });
  return response;
}

const deleteValue = (id: string) => {
const response = appApi.delete<Tutor>(`values/${id}/`);
return response;
};
return {addTutor, getTutor, getTutors, deleteTutor, addValue, getValue, getValues, deleteValue, getLocations, partialUpdateTutorRequest, getTutorsData}
}

export default useTutorService
