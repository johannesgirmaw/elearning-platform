import useCommonApi from "../../../utils/api";
import { GroupPermission } from "../../../types/GroupPermission";
import { TableSearchModel } from "../../customs/pagination/usePagination";
import { FetchedApi } from "../../../types/FetchedApi";

const useGroupPermissionService = () => {
  const { commonApi } = useCommonApi();

  const getGroupPermission = (id: string) => {
    const response = commonApi.get<GroupPermission>(`group_permissions/${id}`);
    return response;
  };

  const addGroupPermission = (group_permissions: {}) => {
    const response = commonApi.post<GroupPermission>("group_permissions/",
    group_permissions);
    return response;
  };

  const updateGroupPermission = (group_permission: GroupPermission) => {
    const response = commonApi.put<GroupPermission>(
      `group_permissions/${group_permission.id}/`,
      group_permission,
    );
    return response;
  };

 

  const getGroupPermissions = (filteredData?: TableSearchModel) => {
    const response = commonApi.get<FetchedApi<GroupPermission>>("group_permissions/", {
      params: {
        ...filteredData
      },
    });
    return response;
  };

  const deleteGroupPermission = (id: string) => {
    const response = commonApi.delete<GroupPermission>(`group_permissions/${id}/`);
    return response;
  };

  return {getGroupPermissions, getGroupPermission, addGroupPermission, deleteGroupPermission, updateGroupPermission}
};

export default useGroupPermissionService;
