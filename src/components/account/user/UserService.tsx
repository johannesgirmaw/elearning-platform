import useApi from "../../../utils/api";
import { PartialUser, User } from "../../../types/UserItem"
import { FetchData } from "../../../types/FetchData";
import { UserSearchModel } from "../../customs/pagination/usePagination";

const useUserService = () => {
  const { commonApi } = useApi();

  const authUser = () => {
      const response = commonApi.get<User>(
          'authorize/user/'
      );
      return response;
  };

  const getUser = (id: string) => {
    const response = commonApi.get<User>(`users/${id}/`);
    return response;
  };
  const getUsers = (data: UserSearchModel) => {
    const response = commonApi.get<FetchData<User>>("users/", {
      params: {
        ...data
      },
    });
    return response;
  };
  const addUser = (data: User) => {
    const response = commonApi.post<User>("users/", data);
    return response;
  };
  const editUser = (data: User) => {
    const response = commonApi.patch<User>(`users/${data.id}/`, data);
    return response;
  };
  const updateUser = (id:string, data:PartialUser) => {
    const response = commonApi.patch<User>(`users/${id}/`,data);
    return response;
  }
  return {authUser, getUsers,editUser,addUser, getUser,updateUser }
};

export default useUserService
