import { FetchData } from "../../../types/FetchData";
import useCommonApi from "../../../utils/api";
import { FileModel, FileModelSearch } from "./FileModel";
import { Files } from "./types";

const useFileService = () => {
  const { commonApi } = useCommonApi();

  const addFile = (file: FormData) => {
      const response = commonApi.post<Files>("file/",
        file, {headers: {
          'content-type': 'multipart/form-data'
      }});
      return response;
    };
    
  const getFiles = (filterData?:FileModelSearch) => {
      const response = commonApi.get<FetchData<FileModel>>("file/", {
        params:{
          ...filterData
        }
      });
      return response;
    };
  const updateFile = (id:string, file: FormData) => {
      const response = commonApi.patch<Files>(`file/${id}/`,
        file, {headers: {
          'content-type': 'multipart/form-data'
      }});
      return response;
    };

  return {addFile, updateFile, getFiles}
}

export default useFileService