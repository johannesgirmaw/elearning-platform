import useApi from "../../../utils/api";
import { Category, CategoryTableSearchModel } from "../../../types/Category";
import { FetchData } from "../../../types/FetchData";
import axios from "axios";
import {host} from "../../../utils/api"
import { TableSearchModel } from "../../customs/pagination/usePagination";

export const appURL = `${host}/applications/`;

const useCategoryService = () => {
  const { appApi } = useApi();
  const getCategory = (id: string) => {
    const response = appApi.get<Category>(`category/${id}/`);
    return response;
  };

  const addCategory = (category: Category) => {
    const response = appApi.post<Category>("category/", 
      category,
      {headers: {
        'content-type': 'multipart/form-data'
    }}
      );
    return response;
  };

  const editCategory = (category: Category) => {
    const response = appApi.put<Category>(`category/${category.id}/`, 
      category,
      {headers: {
        'content-type': 'multipart/form-data'
    }}
      );
    return response;
  };

  const getCategories = (data?: CategoryTableSearchModel) => {
    const response = appApi.get<FetchData<Category>>("category/", {
      params: {
        ...data
      },
    });
    return response;
  };

  const deleteCategory = (id: string) => {
    const response = appApi.delete<Category>(`category/${id}/`);
    return response;
  };

  const categoryPatch = (id: string, method: string) => {
    const response = appApi.patch<Category>(`category/${id}/`, {}, {params:{
      method
    }});
    return response;
  }

  return {getCategories, getCategory, addCategory, deleteCategory ,editCategory, categoryPatch}
};

export default useCategoryService
