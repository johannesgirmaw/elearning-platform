import { Chapter, ChapterModelSideNav } from "../../../types/Course";
import { FetchData } from "../../../types/FetchData";
import useApi from "../../../utils/api";
import { TableSearchModel } from "../../../utils/modal";
import useLoading from "../../customs/loading/LoadingHook";

export interface ChapterTableSearchModel extends TableSearchModel {
  course_id?: string;
} 

const useChapterService = () => {
  const { appApi } = useApi();
  const loading = useLoading()

  const getChapter = (id: string) => {
    const response = appApi.get<Chapter>(`chapters/${id}/`);
    return response;
  };

  const addChapter = (Chapter: Chapter) => {
    const response = appApi.post<Chapter>("chapters/",
      Chapter);
    return response;
  };

  const editChapter = (chapter: Chapter) => {
    const response = appApi.put<Chapter>(`chapters/${chapter.id}/`, 
      chapter,
      {headers: {
        'content-type': 'multipart/form-data'
    }}
      );
    return response;
  };

  const getChapters = (data?: ChapterTableSearchModel) => {
    const response = appApi.get<FetchData<Chapter>>("chapters/", {
      params: {
        ...data
      },
    });
    return response;
  };

  const getSidNavChapters = (data?: ChapterTableSearchModel) => {
    const response = appApi.get<FetchData<ChapterModelSideNav>>("chapters/sidebar/", {
      params: {
        ...data
      },
    });
    return response;
  };

  const deleteChapter = (id: string) => {
    const response = appApi.delete<Chapter>(`chapters/${id}/`);
    return response;
  };

  return {getChapters, getChapter, addChapter, deleteChapter,editChapter, getSidNavChapters}
};

export default useChapterService;
