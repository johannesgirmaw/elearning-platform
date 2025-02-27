import CustomInput from "../../customs/custom-input/CustomInput";
import { useEffect, useState } from "react";
import CustomButton from "../../customs/custom-button/CustomButton";
import CustomText from "../../customs/custom-text/CustomText";
import CustomImageFileInput from "../../customs/custom-input/CustomImageFileInput";
import { Advert } from "../../../types/AdvertItem";
import useLoading from "../../customs/loading/LoadingHook";
import Loading from "../../customs/loading/Loading";
import useTranslation from "../../../utils/translation";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectItem } from "../../../types/MenuItems";
import useFileService from "../../commons/file/FileService";
import useAdvertService from "./AdvertService";
import SmallLoading from "../../customs/loading/SmallLoading";
import { data } from "../../../pages/course/InstructorDashboard";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { Position } from "../../../types/Enums";
import { type } from "os";

interface Props { 
  searchAdverts: () => void, 
  advertDetail?: Advert 
  cancel?: () => void;
}

function AdvertAdd(props:Props) {
  const { register, setError, control, handleSubmit, reset, getValues, formState: { errors } } = useForm<Advert>();
  const advertService = useAdvertService()
  const loading = useLoading()
  const {translate} = useTranslation()

  const navigate = useNavigate()
  const fileService = useFileService()
  const [resetValue, setResetValue] = useState({})
  const advertLevel: SelectItem<number>[] = [
    { value: 100, label: "Image" },
    { value: 101, label: "Video" },
  ];
  
  const [postionData, setGroupsData] = useState<SelectItem<string>[]>([
    {value:Position.Top,label:"Top"},
  {value:Position.Middle,label:"Middle"},
  {value:Position.Bottem,label:"Bottom"}])
  
  const resetVal = ()=>{
     reset({
            "company_name":"",
            "description":"",
            "link":"",
            "image_url":"",
            "video_url":"",
            "start_time":"",
            "end_time":"",
            'position':""
            
              })
  }

  useEffect(()=>{
      
       if(props?.advertDetail){
        reset({...props.advertDetail})
       }else{
       resetVal()
       }
  },[ props.advertDetail, reset])

  const onSubmit : SubmitHandler<Advert> = (data) => {
    
      
   

  if(data.image_url[0]!==undefined){
    console.log("printed")
    const image_name = (data.image_url[0] as File)?.name
      const formData = new FormData()
      formData.append(
        "url",
        data.image_url[0] as Blob,
        (data.image_url[0] as File)?.name
      );
      formData.append("file_type",'101');
      fileService.addFile(formData).then(({data:value})=>{
      data.image_url = value.url;
        loading.startLoading()
        if(props.advertDetail){
        advertService.editAdvert(data)
        .then(({data: value}) => {
          loading.stopLoading()
          props.searchAdverts()
          props.cancel?.();
          resetVal()
          navigate(`/instructor_dashboard/advert_list`)
        }).catch(
        (error) => {
          loading.stopLoading()
          handleError(error)
          loading.stopLoading()
        }
        )
      }else{
        advertService.addAdvert(data)
        .then(({data: value}) => {
          loading.stopLoading()
          props.searchAdverts()
          props.cancel?.();
          resetVal()
          navigate(`/instructor_dashboard/advert_list`)
        }).catch(
        (error) => {
          loading.stopLoading()
          handleError(error)
          loading.stopLoading()
        }
        )
      }

      })
  }else{
    if(props.advertDetail !== null){
      advertService.editAdvert(data)
      .then(({data: value}) => {
        loading.stopLoading()
        props.searchAdverts()
        props.cancel?.();
        resetVal()
        navigate(`/instructor_dashboard/advert_list`)
      }).catch(
      (error) => {
        loading.stopLoading()
        handleError(error)
        loading.stopLoading()
      }
      )
    }
  }


  };
  const handleError = (error: any) => {
    
    const errors = error.response.data.error.details;
    for (const err in errors){
        if (err === 'non_field_errors'){
            setError('root', {message: errors[err]})
        }else {
            setError(err as keyof Advert, {message: errors[err]})
        }
  }}
  const cancelEdit = ()=>{
    reset({})
    navigate('/instructor_dashboard/advert_list')
  }

  return (
    <div className="relative">
    {/*<Loading {...loading} />*/}
    <h1 className="text-left text-2xl font-bold my-2 ml-7 ">
        {props?.advertDetail?"Edit":"Add"} <CustomText text="Advert" />
      </h1>
      <div className="container mx-auto ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-7">
          <CustomImageFileInput 
              register={register}
              className="w-20 mx-10 h-20"
              label="image_url"
              placeholder="Profile picture"
              val={props?.advertDetail?.id?getValues().image_url:null}
              error={errors?.image_url} />
          
            <CustomInput
              register={register}
              label="company_name"
              error={errors.company_name}
              options={{
                required: "Company Name is required"
              }}
              placeholder="Company Name"
            />
            <CustomInput 
            type="text" 
            placeholder={translate("description")} 
            register={register} 
            label="description" 
            />
          
            <CustomInput
              register={register}
              label="link"
              error={errors.link}
              options={{
                required: "link is required"
              }}
              placeholder="link"
            />
             <CustomInput 
            type="datetime-local" 
            placeholder="Start Date"
            register={register} 
            label="start_time" 
            error={errors.end_time} 
            options = {{
            required: "start_date is required"
               }} />

            <CustomInput 
            type="datetime-local" 
            placeholder="End Date" 
            register={register} 
            label="end_time" 
            error={errors.end_time} 
            options = {{
            required: "end_date is required"
               }} />

<CustomDropdown
            placeholder="Position"
            data={postionData}
            register={register}
            label='position'
            options={{
              required: 'Position is required'
            }}
            isSearchable={true}
            error={errors.position}
            control={control}
          />

               
<CustomInput 
            type="text" 
            placeholder='Video Url' 
            register={register} 
            label="video_url" 
            />
            {!props.advertDetail &&
            <CustomButton type="submit" text="Add Advert" />}
            {props.advertDetail &&
            <CustomButton type="submit" text="Edit Advert" is_loading={<SmallLoading {...loading} />}/>}
          
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdvertAdd;
