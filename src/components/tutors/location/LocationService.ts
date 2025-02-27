import { FetchedApi } from '../../../types/FetchedApi';
import useApi from '../../../utils/api';
import { Location, LocationTableSearchModel } from '../tutor/TutorInfoModel';


export const useLocationService = () => {
    const {appApi} = useApi()

 const addLocation = (location: Location) => {
    const response = appApi.post<Location>(
        'tutor/location/', location
    );
    return response;
};

const getLocation = (id: string) => {
  const response = appApi.get<Location>(`tutor/location/${id}/`);
  return response;
};

const updateLocation = (id: string, location: Location) => {
  const response = appApi.patch<Location>(`tutor/location/${id}/`, location);
  return response;
};

 const getLocations = (filterdata?: LocationTableSearchModel) => {
    const response = appApi.get<FetchedApi<Location>>(
        'tutor/location/', {params:{
          ...filterdata
        }}
    );
    return response;
};

const deleteLocation = (id: string) => {
  const response = appApi.delete<Location>(`tutor/location/${id}/`);
  return response;
};


return { getLocations, deleteLocation, getLocation, addLocation, updateLocation}
}

export default useLocationService
