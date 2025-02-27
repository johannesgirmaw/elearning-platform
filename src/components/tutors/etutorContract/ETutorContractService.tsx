import useApi from "../../../utils/api";
import { ETutorContract, ETutorContractFilterModel, PartialETutorContract } from "../../../types/ETutorContractItem"
import { FetchData } from "../../../types/FetchData";
import { positions } from "slate";

export const useETutorContractService = () => {
  const { appApi } = useApi();

  const getETutorContract = (id: string) => {
    const response = appApi.get<ETutorContract>(`tutor/tutor_contract/${id}/`);
    return response;
  };
 
  const getETutorContracts = (params:any) => {
  
    const response = appApi.get<FetchData<ETutorContract>>(`tutor/tutor_contract/`, {
      params:{
        ...params
    }    
    });
    return response;
  };
  const addETutorContract = (data: any) => {
    const response = appApi.post<any>("tutor/tutor_contract/", data);
    return response;
  };
  const editETutorContract = (data: ETutorContract) => {
    const response = appApi.put<ETutorContract>(`tutor/tutor_contract/${data.id}/`, data);
    return response;
  };
  const partialUpdateTutorContract = (id:string, data:PartialETutorContract) => {
    const response = appApi.patch<ETutorContract>(`tutor/tutor_contract/${id}/`, data)
    return response
}
  const deleteETutorContract = (data:ETutorContract) =>{
    const id = data.id
    const response = appApi.delete(`tutor/tutor_contract/${id}/`)
    return response
}
  return {getETutorContracts,editETutorContract,addETutorContract, 
    getETutorContract,deleteETutorContract,partialUpdateTutorContract }
};

export default useETutorContractService
