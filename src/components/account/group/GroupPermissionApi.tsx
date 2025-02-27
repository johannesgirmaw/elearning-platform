import { useState } from 'react';
import useGroupPermissionService from './GroupPermissionService';
import { GroupPermission } from '../../../types/GroupPermission';

const useGroupPermissionApi = () => {
  const { getGroupPermissions } = useGroupPermissionService();

  const getUserPermission = (data: {
    pageSize: number;
    cursor: string;
    searchText: string;
    setGroupPermissionsList: (lst: GroupPermission[]) => void;
  }) => {
    // getGroupPermissions(data).then(({ data: response }) => {
    //   data.setGroupPermissionsList(response);
    // });
  };
  return { getUserPermission };
};

export default useGroupPermissionApi;
