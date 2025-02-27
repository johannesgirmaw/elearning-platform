import useApi, { host } from "../../../utils/api";
import { FetchData } from "../../../types/FetchData";
import { Course, CourseEnrolled, CourseMissingType, CourseTableSearchModel } from "../../../types/Course";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { FetchedApi } from "../../../types/FetchedApi";
import api from "../../../utils/api";
import { useState } from "react";
    // export const host = "http://127.0.0.1:8000";

    export const appURL = `${host}/applications/`;
const useCourseService = () => {
  const { appApi } = useApi();
  const [activeTab, setActiveTab] = useState("1")
  const getCourse = (id: string) => {
    const response = appApi.get<Course>(`course/${id}/`);
    return response;
  };
  const getEnrolledCourse = (id: string) => {
    const response = appApi.get<CourseEnrolled>(`course/${id}/`);
    return response;
  };
  const addCourse = (course: Course) => {
    const response = appApi.post<Course>("course/",
      course);
    return response;
  };

  const editCourse = (course: Course) => {
    const response = appApi.put<Course>(`course/${course.id}/`,
      course);
    return response;
  };

  const courseDo = (id: string, method: string, payload?: any) => {
    const response = appApi.patch<Course | CourseMissingType>(`course/${id}/?method=${method}`, { payload});
    return response;
  }

  const courseAdminDo = (id: string, method: string, payload?: any) => {
    const response = appApi.patch<Course | CourseMissingType>(`course/admin/${id}/?method=${method}`, { payload});
    return response;
  }
  // const getCourses = (data: { filterText: string, category_id:any }) => {
  //   const response = appApi.get<Course[]>("course/", {
  //     params: {
  //       search: data.filterText,
  //       category_id: data.category_id,
  //     },
  //   });
  //   return response;
  // };

  const getCourses = (filterData?: CourseTableSearchModel) => {

    const response = appApi.get<FetchData<Course>>("course/", {
      params: {
        ...filterData
      },
    
    });
    return response;
  };

  const deleteCourse = (data:{id: string,
   }) => {
    const response = appApi.delete<Course>(`course/${data.id}`);
    return response;
  };

  return {getCourses, getCourse,getEnrolledCourse, addCourse, deleteCourse, editCourse, courseDo, courseAdminDo, activeTab, setActiveTab}
};

export default useCourseService;
