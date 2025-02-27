import useApi from "../../../utils/api";
import { Advert, PartialAdvert } from "../../../types/AdvertItem"
import { FetchData } from "../../../types/FetchData";
import { positions } from "slate";

const useAdvertService = () => {
  const { appApi } = useApi();

  const getAdvert = (id: string) => {
    const response = appApi.get<Advert>(`adverts/${id}/`);
    return response;
  };
 
  const getAdverts = (data:any) => {
    let params ={position: data.position, is_homepage: data.isHome}
    const response = appApi.get<FetchData<Advert>>(`adverts/`, {
      params: {
        ...params
      }
    });
    return response;
  };

  const partialUpdateTutorContract = (id:string, data:PartialAdvert) => {
    const response = appApi.patch<Advert>(`adverts/${id}/`, data)
    return response
}

  const addAdvert = (data: Advert) => {
    const response = appApi.post<Advert>("adverts/", data);
    return response;
  };
  const editAdvert = (data: Advert) => {
    const response = appApi.patch<Advert>(`adverts/${data.id}/`, data);
    return response;
  };


  const deleteAdvert = (data:Advert) =>{
    const id = data.id
    const response = appApi.delete(`advert/${id}/`)
    return response
}

  return {getAdverts,editAdvert,addAdvert, getAdvert,partialUpdateTutorContract,deleteAdvert }
};

export default useAdvertService
