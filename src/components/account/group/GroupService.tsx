import useApi from "../../../utils/api";
import { FetchData } from "../../../types/FetchData";
import { Group } from "../../../types/GroupPermission";
import { TableSearchModel } from "../../customs/pagination/usePagination";

const useGroupService = () => {
  const { commonApi } = useApi();

  const getGroup = (id: string) => {
    const response = commonApi.get<Group>(`groups/${id}/`);
    return response;
  };
 
  const getGroups = (data?: TableSearchModel) => {
    const response = commonApi.get<FetchData<Group>>("groups/", {
      params: {
        ...data
      },
    });
    return response;
  };
 
  const updateGroup = (id:string, groups: Group) => {
    const response = commonApi.put<Group>(`groups/${id}/`,
    groups);
    return response;
  };

  const deleteGroup = (id:string) => {
    const response = commonApi.delete<Group>(`groups/${id}/`);
    return response;
  };

  const addGroup = (groups: Group) => {
    const response = commonApi.post<Group>("groups/",
    groups);
    
    return response;
  };
  return {getGroups, getGroup, addGroup, updateGroup, deleteGroup }
};

export default useGroupService
