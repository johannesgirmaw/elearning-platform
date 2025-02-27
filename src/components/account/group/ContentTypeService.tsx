import useApi from "../../../utils/api";
import { FetchData } from "../../../types/FetchData";
import { ContentType } from "../../../types/ContentType";

const useContentTypeService = () => {
  const { commonApi } = useApi();

  const getContentType = (id: string) => {
    const response = commonApi.get<ContentType>(`content_types/${id}/`);
    return response;
  };
 
  const getContentTypes = (data: { pageSize:number,cursor: string, searchText: string }) => {
    const response = commonApi.get<FetchData<ContentType>>("content_types/", {
      params: {
        ps:data.pageSize,
        cursor:data.cursor,
        search: data.searchText
      },
    });
    return response;
  };
 

  return {getContentTypes, getContentType }
};

export default useContentTypeService
