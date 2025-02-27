import useApi from '../../../utils/api';
import { Content, ContentSideNav, Question } from '../../../types/Course';
import { FetchData } from "../../../types/FetchData";

export const useContentService = () => {
    const {appApi} = useApi()

 const addContent = (content: Content) => {
    const response = appApi.post<Content>(
        'content/', content,
      //   {headers: {
      //     'content-type': 'application/json'
      // }}
    );
    return response;
};

const updateContent = (content: Content) => {
  const response = appApi.put<Content>(
      `content/${content.id}/`, content,
    //   {headers: {
    //     'content-type': 'application/json'
    // }}
  );
  return response;
};

const getContent = (id: string) => {
  const response = appApi.get<ContentSideNav>(`content/${id}/`);
  return response;
};

const getAdminContent = (id: string) => {
  const response = appApi.get<ContentSideNav>(`content/admin/${id}/`);
  return response;
};

 const getContents = (chapter_id: string) => {
    const response = appApi.get<FetchData<Content>>(
        'content/',
        {
          params: {
            chapter_id
          }
        }
    );
    return response;
};

const getSidNavContents = (chapter_id: string) => {
  const response = appApi.get<FetchData<ContentSideNav>>(
      'content/sidenav/',
      {
        params: {
          chapter_id
        }
      }
  );
  return response;
};

const deleteContent = (id: string) => {
  const response = appApi.delete<Question>(`content/${id}/`);
  return response;
};


return {addContent, getContent, getContents, deleteContent, getSidNavContents, updateContent, getAdminContent}
}
