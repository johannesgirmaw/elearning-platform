import CustomInput from "../../customs/custom-input/CustomInput";
import {useContext, useEffect} from "react";
import CustomButton from "../../customs/custom-button/CustomButton";
import { SubmitHandler, useForm } from "react-hook-form";
import useLoading from "../../customs/loading/LoadingHook";
import { useNavigate } from "react-router-dom";
import { Experience } from "./ExperienceModel";
import { useExperienceService } from "./ExperienceService";
import { ContentType } from "../../../types/Enums";
import useTranslation from "../../../utils/translation";
import useFileService from "../../commons/file/FileService";
import { useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import { UserIdContext } from '../auth/UserPages';
import CustomCheckbox from "../../customs/custom-input/CustomCheckbox";
import useAuthentication from "../auth/authentication";
import { CustomFileUploader } from "../../customs/custom-input/CustomFileUploader";
import SmallLoading from "../../customs/loading/SmallLoading";

interface Props { 
  searchExperiences: () => void, 
  experienceDetail?: Experience,
  cancel?: () => void; 
}

function ExperienceAdd(props:Props) {  
  const { register, handleSubmit,reset,control,setValue, setError,clearErrors,watch, formState: { errors } } = useForm<Experience>();
  const experienceService = useExperienceService()
  const loading = useLoading()
  const navigate = useNavigate()
  const {translate} = useTranslation()
  const fileService = useFileService()
  const user = useSelector((state: RootState) => state.user)
  const {registeredUserId} = useContext(UserIdContext)
  const authentication = useAuthentication()

  useEffect(()=>{
       if(props?.experienceDetail){
        reset({...props.experienceDetail})
       }else{
       resetVal()
       }
  },[ props.experienceDetail, reset])

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
  })
  }, []);

  const onSubmit : SubmitHandler<Experience> = (data:Experience) => {
    loading.startLoading()
    data.user = user.id?user.id:registeredUserId
    loading.startLoading()
    addEdit(data)
  };

  const resetVal = ()=>{
     reset({
            "job_title":"",
            "company":"",
            "start_date":"",
            "end_date":"",
            "currently_working":false,
            "experience_document":""
          })
      props.cancel?.();
  }

  const handleError = (error: any) => {
    const errors = error.response.data.error?.details;
    for (const err in errors){
        if (err === 'non_field_errors'){
            setError('root', {message: errors[err]})
        }else {
            setError(err as keyof Experience, {message: errors[err]})
        }
  }}

  const addEdit = (data:Experience) => {
    if(props?.experienceDetail){
      data.currently_working && (data.end_date = undefined)
      experienceService.updateExperience(data).then(()=>{
          loading.stopLoading()
          props.searchExperiences()
          resetVal()
          // navigate(`/instructor_dashboard/profile`)
      }).catch(
          (error) => {
            loading.stopLoading()
            handleError(error)
            loading.stopLoading()
          }
        )
    }
    else
    {
      data.currently_working && (data.end_date = undefined)
      experienceService.addExperience(data).then(()=>{
            loading.stopLoading()
            props.searchExperiences()
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

  const currently_working = watch('currently_working');
  const end_date = watch('end_date');

  return (
    <>
      <div className="container mx-auto mb-2 add-border"> 
        <form  onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              register={register}
              label="job_title"
              error={errors.job_title}
              options={{
                required: "Job Title is required"
              }}
              placeholder="Job Title"
            />

             <CustomInput
              register={register}
              label="company"
              error={errors.company}
              options={{
                required: "Company is required"
              }}
              placeholder="Company"
            />
            
            <CustomInput 
              type="date" 
              placeholder={translate("start_date")} 
              register={register} 
              label="start_date" 
              error={errors.start_date} 
              options = {{
              required: "start date is required"
               }} />
            <CustomCheckbox 
              placeholder="Currently Working"
              label="currently_working"
              register={register}
              error={errors.currently_working} 
              options={{
                required: end_date==="" && "currently working is required", 
              }}
              onValueChange={()=>setValue("end_date", "")}

            />
            {!currently_working&&<CustomInput 
              type="date" 
              placeholder={translate("end_date")} 
              register={register} 
              label="end_date" 
              error={errors.end_date} 
              options={{required: !(currently_working)&&"End date is required"}} 
              onValueChange={()=>setValue("currently_working", false)}
              />}

               <CustomFileUploader 
                register={register}
                fileType={ContentType.DOCUMENT}
                label="experience_document"
                control={control}
                placeholder="Experience Document "
                error={errors?.experience_document} 
                setError={setError}
                clearErrors={clearErrors}
                setValue={setValue}
                options={{
                  required: 'Experience document is required'
                }}
              />
            {!props.experienceDetail?.id &&
            <CustomButton type="submit" text="Add Experience" is_loading={<SmallLoading {...loading} />}/>}
            {props.experienceDetail?.id &&
            <CustomButton type="submit" text="Edit Experience" is_loading={<SmallLoading {...loading} />}/>}

        </form>
      </div>
    </>
  );
}

export default ExperienceAdd;
