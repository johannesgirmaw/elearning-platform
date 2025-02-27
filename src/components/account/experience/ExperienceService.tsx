import useApi from "../../../utils/api";
import {User} from "../../../types/UserItem";
import { Experience } from "./ExperienceModel";
import { FetchData } from "../../../types/FetchData";
import { ExperienceFilterModel } from "./ExperienceModel";

export const useExperienceService = () => {
    const { commonApi } = useApi()

    const getExperiences = (params:ExperienceFilterModel) => {
        const response = commonApi.get<FetchData<Experience>>(
            'authorize/user/experience/',
            {
                params:{
                    ...params
                }
            }
        );
        return response;
    };


    const getTutorExperiences = (params:ExperienceFilterModel) => {
        const response = commonApi.get<FetchData<Experience>>(
            'authorize/user/experience_tutor/',
            {
                params:{
                    ...params
                }
            }
        );
        return response;
    };

    const addExperience = (data:Experience) => {
        const response = commonApi.post<Experience>("authorize/user/experience/", data)
        return response
    }

    const updateExperience = (data:Experience) => {
        const id = data.id
        const response = commonApi.patch<Experience>(`authorize/user/experience/${id}/`, data)
        return response
    }

    const deleteExperience = (data:Experience) =>{
        const id = data.id
        const response = commonApi.delete(`authorize/user/experience/${id}/`)
        return response
    }

    return {getExperiences, addExperience, updateExperience, deleteExperience, getTutorExperiences}
}