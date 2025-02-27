import useApi from "../../../utils/api";
import {User} from "../../../types/UserItem";
import { EducationalBackground } from "./EducationBackgroundModel";
import { EducationBackgroundFilterModel } from "./EducationBackgroundModel";

export interface FetchData<T>{
    results:EducationalBackground[]
}
export const useEducationBackgroundService = () => {
    const { commonApi } = useApi()

    const getEducationBackgrounds = (params:EducationBackgroundFilterModel) => {
        const response = commonApi.get<FetchData<EducationalBackground[]>>(
            'authorize/user/educational_background/', 
            {
                params:
                    {
                        ...params
                        
                    }
            },
        );
        return response;
    };

    const addEducationalBackground = (data:EducationalBackground) => {
        const response = commonApi.post<EducationalBackground>("authorize/user/educational_background/", data)
        return response
    }

    const updateEducationalBackground = (data:EducationalBackground) => {
        const id = data?.id
        const response = commonApi.patch<EducationalBackground>(`authorize/user/educational_background/${id}/`, data)
        return response
    }

    const deleteEducationBackground = (data:EducationalBackground) => {
        const id = data?.id
        const response = commonApi.delete(`authorize/user/educational_background/${id}/`)
        return response
    }

    return {getEducationBackgrounds, addEducationalBackground, updateEducationalBackground, deleteEducationBackground}
}