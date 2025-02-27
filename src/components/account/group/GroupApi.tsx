import { useState } from 'react';
import { Group } from '../../../types/GroupPermission';
import useGroupService from './GroupService';
import { TableSearchModel } from '../../customs/pagination/usePagination';
const useUserApi = () => {
  const { getGroups } = useGroupService();

  const getGroupsData = (data: TableSearchModel,
    setGroupsList: (lst: Group[]) => void) => {
    getGroups(data).then(({ data: response }) => {
      setGroupsList(response.results);
    });
  };
  return { getGroupsData };
};

export default useUserApi;
