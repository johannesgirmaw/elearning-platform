import {useContext, useEffect } from "react";
import CustomTextArea from "../../customs/custom-input/CustomTextArea";
import CustomButton from "../../customs/custom-button/CustomButton";
import { SubmitHandler, useForm } from "react-hook-form";
import useLoading from "../../customs/loading/LoadingHook";
import { useNavigate } from "react-router-dom";
import useTranslation from "../../../utils/translation";
import useFileService from "../../commons/file/FileService";
import { useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import { ToBeInstructorRequest } from "./ToBeInstructorRequestModel";
import { useToBeInstructorService } from "./ToBeInstructorRequestService";
import { UserIdContext } from '../../account/auth/UserPages';
import SmallLoading from "../../customs/loading/SmallLoading";
import { LocalStorage } from "../../../utils/localstorage";
import useAuthentication from "../../account/auth/authentication";

interface Props { 
  searchDatas: () => void, 
  itemDetail?: ToBeInstructorRequest ;
  cancel?: () => void;
}

function ToBeInstructorRequestAdd(props:Props) {  
  const { register, handleSubmit,reset,control,setError, formState: { errors } } = useForm<ToBeInstructorRequest>();
  const apiService = useToBeInstructorService()
  const loading = useLoading()
  const navigate = useNavigate()
  const {translate} = useTranslation()
  const fileService = useFileService()
  const user = useSelector((state: RootState) => state.user)
  const {registeredUserId} = useContext(UserIdContext)
  const authentication = useAuthentication()

  useEffect(()=>{
       if(props?.itemDetail){
        reset({...props.itemDetail})
       }else{
       resetVal()
       }
  },[ props.itemDetail, reset])

  const onSubmit : SubmitHandler<ToBeInstructorRequest> = (data:ToBeInstructorRequest) => {
    loading.startLoading()
    data.user = user.id?user.id:registeredUserId;
    addEdit(data)
  };
  const resetVal = ()=>{
     reset({
            "cover_letter":"",
          })
      props.cancel?.();
  }
  const handleError = (error: any) => {
    const errors = error.response.data.error?.details;
    for (const err in errors){
        if (err === 'non_field_errors'){
            setError('root', {message: errors[err]})
        }else {
            setError(err as keyof ToBeInstructorRequest, {message: errors[err]})
        }
  }}

  const addEdit = (data:ToBeInstructorRequest) => {
    if(props?.itemDetail){
      apiService.updateToBeInstructorRequest(data).then(()=>{
          loading.stopLoading()
          props.searchDatas()
          resetVal()
      }).catch(
          (error) => {
            loading.stopLoading()
            handleError(error)
            loading.stopLoading()
          }
          )
    }else{
      apiService.addToBeInstructorRequest(data).then(()=>{
            loading.stopLoading()
            props.searchDatas()
            resetVal()
      }).catch(
          (error) => {
            loading.stopLoading()
            handleError(error)
            loading.stopLoading()
          }
       )
    }
  }


  return (
    <>
      <div className="container mx-2 mb-2 add-border"> 
        <form className=""  onSubmit={handleSubmit(onSubmit)}>
            <CustomTextArea
              register={register}
              label="cover_letter"
              // rows={}
              error={errors.cover_letter}
              options={{
              required: "Cover letter is required"
              }}
              placeholder="Cover letter"
              className={`${props?.itemDetail?.cover_letter.length!>300?"overflow-y-auto":""}`}
            />
            {!props.itemDetail?.id &&
            <CustomButton type="submit" text="Submit Request" is_loading={<SmallLoading {...loading} />}/>}
            {props.itemDetail?.id &&
            <CustomButton type="submit" text="Edit Request" is_loading={<SmallLoading {...loading} />} />}
        </form>
      </div>
    </>
  );
}

export default ToBeInstructorRequestAdd;
