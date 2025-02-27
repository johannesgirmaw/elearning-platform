import CustomInput from "../../customs/custom-input/CustomInput";
import {useContext, useEffect, useState } from "react";
import CustomButton from "../../customs/custom-button/CustomButton";
import { SubmitHandler, useForm } from "react-hook-form";
import useLoading from "../../customs/loading/LoadingHook";
import { EducationalBackground } from "./EducationBackgroundModel";
import { useEducationBackgroundService } from "./EducationBackgroundService";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { ContentType, EducationalLevel } from "../../../types/Enums";
import useTranslation from "../../../utils/translation";
import { useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import { UserIdContext } from '../auth/UserPages';
import CustomCheckbox from "../../customs/custom-input/CustomCheckbox";
import { validateNotOnlyNumber } from "../../../utils/validation";
import { CustomFileUploader } from "../../customs/custom-input/CustomFileUploader";
import SmallLoading from "../../customs/loading/SmallLoading";

interface Props { 
  searchEducationalBackground: () => void, 
  educationalBackgroundDetail?: EducationalBackground 
  cancel?: () => void;
}


function EducationBackgroundAdd(props:Props) {  
  const { register,getValues, handleSubmit,reset, control, setValue, setError, clearErrors, watch, formState: { errors } } = useForm<EducationalBackground>({mode:"onTouched"});
  const educationBackgroundService = useEducationBackgroundService()
  const loading = useLoading()
  const {translate} = useTranslation()
  const user = useSelector((state: RootState) => state.user)
  const {registeredUserId} = useContext(UserIdContext)


  useEffect(()=>{
       if(props?.educationalBackgroundDetail){
        reset({...props.educationalBackgroundDetail})
       } else {
        resetVal()
       }
  },[ props.educationalBackgroundDetail, reset])

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }, [])

  const onSubmit : SubmitHandler<EducationalBackground> = (data:EducationalBackground) => {
    loading.startLoading()
    data.user = user.id?user.id:registeredUserId
    loading.startLoading()
    addEdit(data)
  };
  
  const resetVal = ()=>{
     reset({
            "school_of_education":"",
            "level_of_education":undefined,
            "start_date":"",
            "year_of_graduation":"",
            "document":"",
            "currently_learning":false,
            "url":"",
            "field_of_study":""
          })
      props.cancel?.();
  }

  const handleError = (error: any) => {
    const errors = error.response.data.error?.details;
    for (const err in errors){
        if (err === 'non_field_errors'){
            setError('root', {message: errors[err]})
        }else {
            setError(err as keyof EducationalBackground, {message: errors[err]})
        }
  }}
  
  const addEdit = (data:EducationalBackground) => {
    if(props?.educationalBackgroundDetail){
      data.currently_learning && (data.year_of_graduation = undefined)
      educationBackgroundService.updateEducationalBackground(data).then(()=>{
          loading.stopLoading()
          props.searchEducationalBackground()
          resetVal()
      }).catch(
          (error) => {
            loading.stopLoading()
            handleError(error)
            loading.stopLoading()
          }
          )
    }else{
      data.currently_learning &&(data.year_of_graduation = undefined);
      educationBackgroundService.addEducationalBackground(data).then(()=>{
            loading.stopLoading()
            props.searchEducationalBackground()
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

  const currentlyLearning = watch('currently_learning');
  const yearOfGraduation = watch('year_of_graduation');
  

  return (
    <>
     <div className="container mx-auto mb-2 add-border"> 
        <form  onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              register={register}
              label="school_of_education"
              error={errors.school_of_education}
              options={{
                required: "School of education is required",
                minLength:{value:5, message:"Please enter full name of school(length is too short)"},
                validate:{
                  validateNotOnlyNumber:validateNotOnlyNumber
                }
              }}
              placeholder="School of education"
            />
            <CustomInput
              register={register}
              label="field_of_study"
              error={errors.field_of_study}
              options={{
                required: "Field of study is required",
                minLength:{value:3, message:"Please enter full name of Field(length is too short)"},
                validate:{
                  validateNotOnlyNumber:validateNotOnlyNumber
                }
              }}
              placeholder="Field of study"
            />
            <CustomDropdown
              placeholder="Level of education"
              id='id'
              data={EducationalLevel}
              register={register}
              label='level_of_education'
              options={{
                required: 'Level of education is required'
              }}
              control={control}
              isSearchable={false}
              error={errors.level_of_education}
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
              placeholder="Currently Learning"
              label="currently_learning"
              register={register}
              error={errors.currently_learning}
              options={{
                required: yearOfGraduation==="" && 'currently working is required'
              }}
              onValueChange={()=>setValue("year_of_graduation", "")}
            />
            {
              !(currentlyLearning) && <CustomInput 
              type="date" 
              placeholder={translate("year_of_graduation")} 
              register={register} 
              label="year_of_graduation" 
              error={errors.year_of_graduation} 
              options={{required: !(currentlyLearning) && "year of graduation is required"}} 
              onValueChange={()=>setValue("currently_learning", false)}
            />
            }
             {/* <CustomFileInput 
              register={register}
              fileType={ContentType.DOCUMENT}
              label="document"
              options={{
                required:  "file is required" 
              }}
              placeholder="Education Document "
              error={errors?.document} 
            />  */}
          
            <CustomFileUploader 
              register={register}
              fileType={ContentType.DOCUMENT}
              label="document"
              control={control}
              placeholder="Educational Document "
              error={errors?.document} 
              setError={setError}
              clearErrors={clearErrors}
              setValue={setValue}
              getValues={getValues}
              options={{
                required: 'Educational document is required'
              }}
            />
            <div>

            
            </div>
            {!props.educationalBackgroundDetail?.id &&
            <CustomButton type="submit" text="Add Education Background" is_loading={<SmallLoading {...loading} />}/>}
            {props.educationalBackgroundDetail?.id &&
            <CustomButton type="submit" text="Edit Education Background" is_loading={<SmallLoading {...loading} />}/>}
        </form>
      </div>
    </>
  );
}

export default EducationBackgroundAdd;
