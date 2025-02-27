import useCommonApi from '../../../utils/api';
import { UserPermission } from '../../../types/UserPermission';
import { TableSearchModel } from '../../customs/pagination/usePagination';
import { FetchedApi } from '../../../types/FetchedApi';

const useUserPermissionService = () => {
  const { commonApi } = useCommonApi();

  const getUserPermission = (id: string) => {
    const response = commonApi.get<UserPermission>(`user_permissions/${id}`);
    return response;
  };

  const addUserPermission = (user_permissions: {}) => {
    const response = commonApi.post<UserPermission>(
      'user_permissions_add/',
      user_permissions,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    );
    return response;
  };

  const updateUserPermission = (user_permission: UserPermission) => {
    const response = commonApi.put<UserPermission>(
      `user_permissions/${user_permission.id}/`,
      user_permission,
    );
    return response;
  };

  const getUserPermissions = (filteredData?: TableSearchModel) => {
    const response = commonApi.get<FetchedApi<UserPermission>>('user_permissions/', {
      params: {
        ...filteredData
      },
    });
    return response;
  };

  const deleteUserPermission = (id: string) => {
    const response = commonApi.delete<UserPermission>(`user_permissions/${id}/`);
    return response;
  };

  return {
    getUserPermissions,
    getUserPermission,
    addUserPermission,
    deleteUserPermission,
    updateUserPermission,
  };
};

export default useUserPermissionService;
