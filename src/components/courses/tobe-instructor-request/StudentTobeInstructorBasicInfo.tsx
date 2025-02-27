import CustomButton from "../../customs/custom-button/CustomButton";
import { useEffect, useState } from "react";
import { User } from "../../../types/UserItem";
import useLoading from "../../customs/loading/LoadingHook";
import SmallLoading from "../../customs/loading/SmallLoading";
import useTranslation from "../../../utils/translation";
import { SubmitHandler, useForm } from "react-hook-form";
import useToast from "../../customs/toast/ToastHook";
import useFileService from "../../commons/file/FileService";
import { useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import useUserService from "../../account/user/UserService";
import { CustomFileUploader } from "../../customs/custom-input/CustomFileUploader";
import { ContentType } from "../../../types/Enums";

export interface Props{
    setCurrent:React.Dispatch<React.SetStateAction<number>>,
    setUserId:React.Dispatch<React.SetStateAction<string>>,
    previous:number
}

function StudentToBeInstructorBasicInfo(props:Props){
    const registerForm = useForm<User>();
    const userService = useUserService()
    const loading = useLoading()
    const {translate} = useTranslation()
    const toast = useToast()
    const fileService = useFileService()
    const [valueD, setValueD] = useState("2011-12-13")
    const user = useSelector((state: RootState) => state.user)

    useEffect(()=>{
        if(user){
        registerForm.reset({...user})
       }else{
       }
  },[ ])


  const onSubmit : SubmitHandler<User> = (data) => {
    const image_name = (data.profile_pic[0] as File)?.name
    if(image_name){
      const formData = new FormData()
      formData.append("url",data.profile_pic[0] as Blob,(data.profile_pic[0] as File)?.name);
      formData.append("file_type",'101');
      fileService.addFile(formData).then(({data:value})=>{
      data.profile_pic = value.url;
        loading.startLoading()
       addEdit(data)
      })
    }else{
        data.profile_pic="https://static.vecteezy.com/system/resources/previews/011/675/382/original/man-avatar-image-for-profile-png.png"
        loading.startLoading()
        addEdit(data)
    }
  };
  const handleError = (error: any) => {
    const errors = error.response.data.error?.details;
    for (const err in errors){
        if (err === 'non_field_errors'){
            registerForm.setError('root', {message: errors[err]})
        }else {
            registerForm.setError(err as keyof User, {message: errors[err]})
        }
  }}
  const addEdit = (data:User)=>{
   if(user){
          userService.editUser(data)
          .then(({data: value}) => {
            loading.stopLoading()
            props.setUserId(value.id)
            props.setCurrent(1)
          }).catch(
          (error) => {
            loading.stopLoading()
            handleError(error)
          }
          )
        }
  }

        return (
        <div className="relative w-full pb-20">
             <form onSubmit={registerForm.handleSubmit(onSubmit)}>
                <div className="flex flex-col flex-wrap items-center gap-x-4" >
                <div className="w-60 ">
                    <CustomFileUploader 
              register={registerForm.register}
              fileType={ContentType.IMAGE}
              label="profile_pic"
              control={registerForm.control}
              placeholder="Profile Picture "
            //   setError={registerForm.setError}
            //   clearErrors={registerForm.clearErrors}
              setValue={registerForm.setValue}
              
            /> 
            </div>
                </div>
                <div className="flex flex-col justify-center my-5 md:flex-row ">
                    <div className="">
                        <CustomButton type="submit" text={translate("add")}  className="custom-button" is_loading={<SmallLoading {...loading} />}/>                      
                    </div>
                </div>
            </form>
          </div>
    )
}

export default StudentToBeInstructorBasicInfo