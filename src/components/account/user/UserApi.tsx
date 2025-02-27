import { useState } from 'react';
import { User } from '../../../types/UserItem';
import useUserService from './UserService';
const useUserApi = () => {
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');
  const { getUsers } = useUserService();

  const getUsersData = (data: {
    pageSize: number;
    cursor: string;
    searchText: string;
    setUsersList: (lst: User[]) => void;
  }) => {
    if (data.cursor === '1') {
      data.cursor = next;
    } else if (data.cursor === '2') {
      data['cursor'] = prev;
    } else {
      data.cursor = next;
    }
    getUsers(data).then(({ data: response }) => {
      data.setUsersList(response.results);
    });
  };
  return { getUsersData };
};

export default useUserApi;
