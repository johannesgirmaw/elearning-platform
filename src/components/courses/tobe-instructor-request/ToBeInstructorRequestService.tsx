import useApi from "../../../utils/api";
import { FetchData } from "../../../types/FetchData";
import { ToBeInstructorRequestFilterModel, ToBeInstructorRequest, PartialToBeInstructorRequest } from "./ToBeInstructorRequestModel";

export const useToBeInstructorService = () => {
    const { commonApi } = useApi()

    const getToBeInstructorRequests = (params:ToBeInstructorRequestFilterModel) => {
        const response = commonApi.get<FetchData<ToBeInstructorRequest>>(
            'authorize/user/tobe_instructor_request/',
            {
                params:{
                    ...params
                }
            }
        );
        return response;
    };
    const getToBeInstructorRequestsData = (params:ToBeInstructorRequestFilterModel) => {
        const response = commonApi.patch<FetchData<ToBeInstructorRequest>>(
            'authorize/user/tobe_instructor_request/', null, {params}
            
        );
        return response;
    };
    const addToBeInstructorRequest = (data:ToBeInstructorRequest) => {
        const response = commonApi.post<ToBeInstructorRequest>("authorize/user/tobe_instructor_request/", data)
        return response
    }

    const updateToBeInstructorRequest = (data:ToBeInstructorRequest) => {
        const id = data.id
        const response = commonApi.put<ToBeInstructorRequest>(`authorize/user/tobe_instructor_request/${id}/`, data)
        return response
    }

    const partialUpdateToBeInstructorRequest = (id:string, data:PartialToBeInstructorRequest) => {
        const response = commonApi.patch<ToBeInstructorRequest>(`authorize/user/tobe_instructor_request/${id}/`, data)
        return response
    }

    
    const deleteToBeInstructorRequest = (data:ToBeInstructorRequest) =>{
        const id = data.id
        const response = commonApi.delete(`authorize/user/tobe_instructor_request/${id}/`)
        return response
    }

    return {getToBeInstructorRequests, addToBeInstructorRequest, updateToBeInstructorRequest,
            partialUpdateToBeInstructorRequest, deleteToBeInstructorRequest, getToBeInstructorRequestsData}
}