import { FieldError, FieldErrorsImpl, Merge, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import useTutorService from "./ToturService";
import useLoading from "../../customs/loading/LoadingHook";
import CustomTextArea from "../../customs/custom-input/CustomTextArea";
import CustomInput from "../../customs/custom-input/CustomInput";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { Days, location_type, tutorTypeOptions } from "../../../types/Enums";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { SelectItem } from "../../../types/MenuItems";
import useToast from "../../customs/toast/ToastHook";
import { UserIdContext } from '../../account/auth/UserPages';
import { AvailableTime, Tutor , Location} from "./TutorInfoModel";
import CustomButton from "../../customs/custom-button/CustomButton";
import SmallLoading from "../../customs/loading/SmallLoading";
import { RootState } from "../../../slicers/store";
import { useSelector } from "react-redux";
import useSubjectService, { Subject } from "../subject/SubjectService";

interface Props {
  id?: string;
  searchDatas: () => void;
  itemDetail?:Tutor
  cancel?: () => void;
}

const TutorAdd = (props: Props) => {
  const [availablityTimes, setAvailablityTimes] = useState<AvailableTime[]>([])
  const [locationOptions, setLocationOptions] = useState<SelectItem<string>[]>([])
  const [preferredSubjectOptions, setPreferredSubjectOptions] = useState<SelectItem<string>[]>([])
  const [zoneOptions, setZoneOptions] = useState<SelectItem<string>[]>([])
  const [regionOptions, setRegionOptions] = useState<SelectItem<string>[]>([])
  const {registeredUserId} = useContext(UserIdContext)
  const user = useSelector((state: RootState) => state.user)
  const loading = useLoading();
  const tutorService = useTutorService();
  const subjectService = useSubjectService();
  const toast = useToast()
  const { register, handleSubmit, reset, control, getValues, formState: { errors } } = useForm<Tutor>(
    {
      defaultValues:{
        availabilty_times:[
          {day: 0, start_time: "", end_time: ""}
        ]
      }
    }
  );
  const {fields, remove, append} = useFieldArray({
    name:"availabilty_times",
    control,
  })

  useEffect(()=>{
    getPreferredSubjects()
    if(props?.itemDetail){
      setAvailablityTimes(props?.itemDetail.availabilty_times)
     reset({...props.itemDetail})
     setRegionOptions(
      [{
        label: props.itemDetail.region_name,
        value: props.itemDetail.region,
      }]
     )
     setZoneOptions([{
      label:props.itemDetail.zone_name,
      value: props.itemDetail.zone
     }])
     setLocationOptions([{
      label: props.itemDetail.woreda_name,
      value: props.itemDetail.location
     }])

    }else{
    resetVal()
    }
  },[ props.itemDetail, reset])
  const resetVal = ()=>{
    reset({})
  }

  const onSubmit: SubmitHandler<Tutor> = (data: Tutor) => {
    loading.startLoading()
    setAvailablityTimes(data.availabilty_times)
    if(!props?.itemDetail){
      data.tutor = user.id?user.id:registeredUserId

      tutorService.addTutor(data).then(value => {
        if (value){
          props.searchDatas()
          props.cancel?.();
          toast.success("Successfully Added"
          )
        }
        loading.stopLoading()
      }).catch(value => loading.stopLoading())
    }
    else{
      tutorService.partialUpdateTutorRequest(data.id, data).then(value => {
        if (value){
          props.searchDatas()
          props.cancel?.();
          toast.success("Successfully Updated"
          )
        }
        loading.stopLoading()
      }).catch(value => loading.stopLoading())
    }
  };

  const changeT2Num = (time: string) => {
    let [x, y] = time.split(":")
    return Number(x) * 60 + Number(y)
  }
  const isOverape = (a: number, b: number, x: number, y: number) => {
    return Math.max(a, x) <= Math.min(b, y)
  }
  
  // const onSubmitAvalabilty = (data: AvailableTime, index:number) => {
  //   if (changeT2Num(data.start_time) > changeT2Num(data.end_time)) {
  //     setError(`availabilty_times.${index}.end_time`, { message: "Must greater than start time" })
  //   } else if (availablityTimes.some(value => value.day === data.day && 
  //             isOverape(changeT2Num(value.start_time), changeT2Num(value.end_time),
  //             changeT2Num(data.start_time), changeT2Num(data.end_time))))
  //   {
  //     setError(`availabilty_times.${index}.day`, { message: "There is Overlap in availabilty" })
  //   } else {
  //     reset({
  //         "availabilty_times": []
  //     })
  //     setAvailablityTimes([data, ...availablityTimes])
  //   }
  // };

  // const removeEntry = (data: AvailableTime) => {
  //   setAvailablityTimes(availablityTimes.filter(value => value !==data))
  // }

  const getLocations = (search: string, location_type: number, setLocationOptions: (arg1: SelectItem<string>[], ) => void, parent?: string) => {
    tutorService.getLocations({search, location_type, parent}).then(({data: value}) => {
      if (value){
        setLocationOptions(value.results.map((val:Location) => ({
          label: val.address,
          value: val.id,
        })))
        
      }
    })
  }

  const getPreferredSubjects = (search: string="") => {
    subjectService.getSubjects({search}).then(({data: value}) => {
      if (value){
        setPreferredSubjectOptions(value.results.map((val:Subject) => ({
          label: val.subject_name,
          value: val.id,
        })))
        
      }
    })
  }

  const handleArrayField = 
  (field_array:Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<AvailableTime>> | undefined)[]> | undefined,index:number, field:string)=>{
    return field_array && field_array[index] 
  }

  return <div className="relative w-full pb-20 add-border">
    {/* <h1 className="py-2 text-2xl text-center">
      Add  <CustomText text="Tutor" />
    </h1> */}

    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex-wrap md:flex md:gap-x-2 md:gap-4 md:flex-nowrap">
        <legend>Prefered tuition area</legend>
        <CustomDropdown
          register={register}
          label="region"
          error={errors.region}
          options={{
            required: "Region is required"
          }}
          placeholder="Region"
          data={regionOptions}
          isSearchable
          onInputChange={(search) => getLocations(search, location_type.region, setRegionOptions)}
          control={control}
          />
        <CustomDropdown
          register={register}
          label="zone"
          error={errors.zone}
          options={{
            required: "K/Ketema/Zone is required"
          }}
          placeholder="K/Ketema/Zone"
          isDisable={!getValues("region")}
          data={zoneOptions}
          isSearchable
          onInputChange={(search) => getLocations(search, location_type.zone, setZoneOptions, getValues("region"))}
          control={control}
        />
        <CustomDropdown
          register={register}
          label="location"
          error={errors.location}
          options={{
            required: "Woreda is required"
          }}
          isDisable={!getValues("zone")}
          placeholder="Woreda"
          data={locationOptions}
          isSearchable
          onInputChange={(search) => getLocations(search, location_type.woreda, setLocationOptions, getValues("zone"))}
          control={control}
        />
      </fieldset>
      <div className="flex-wrap items-center md:flex md:gap-x-2 md:gap-4 md:flex-nowrap">
      <CustomInput type="text"
      className="w-full "
        register={register}
        label="nearest_location"
        error={errors.nearest_location}
        options={{
          required: "Nearest location is required"
        }}
        placeholder="Your nearest location"
      />
      <CustomInput type="text"
      className="w-full "
        register={register}
        label="hourly_rate"
        error={errors.hourly_rate}
        options={{
          required: "Hourly Rate is required"
        }}
        placeholder="Price per hour"
      />
       <CustomDropdown
        className="w-full "
        register={register}
        label="tutor_type"
        error={errors.tutor_type}
        options={{
          required: "Tutor Type is required"
        }}
        control={control}
        data={tutorTypeOptions}
        placeholder="Tutor Type(Grade Level)"
        />
        <CustomDropdown
          register={register}
          label="preferred_subject"
          // error={errors.preferred_subject}
          options={{
            required: "Preferred subject is required"
          }}
          placeholder="Subject(Organize them in your preferred order.)"
          data={preferredSubjectOptions}
          isSearchable
          onInputChange={(search) => getPreferredSubjects(search)}
          control={control}
          multiple
        />
      <div className="w-full"></div>
      </div>
      <div className="justify-center md:flex md:mr-10">
        <CustomTextArea
        register={register}
        label="introduction"
        error={errors.introduction}
        options={{
          required: "Introduction is required"
        }}
        placeholder="Introduction"
        className="w-10"
      />
      </div>
      <div className="justify-center md:flex-col md:mr-10">
        <div className="mt-5 text-slate-400"><h1>*Please Add Availability below</h1></div>
            {
              fields.map((field, index)=>(
                <div key={field.id} className="flex-wrap items-center justify-between w-full md:flex gap-x-2 md:flex-nowrap md:gap-4">
                  <CustomDropdown type="number"
                      register={register}
                      label={`availabilty_times.${index}.day` as const}
                      error={handleArrayField(errors.availabilty_times, index, "day")?.day}
                      options={{
                        required: "Day is required",
                        validate:{
                          
                        }
                      }}
                      control={control}
                      data={Days}
                      placeholder="Day....."
                    />
                    <CustomInput type="time"
                      register={register}
                      label={`availabilty_times.${index}.start_time` as const}
                      error={handleArrayField(errors.availabilty_times, index, "start_time")?.start_time}
                      options={{
                        required: "Start Time is required"
                      }}
                      placeholder="Start Time"
                      />
                    <CustomInput type="time"
                      register={register}
                      label={`availabilty_times.${index}.end_time` as const}
                      error={handleArrayField(errors.availabilty_times, index, "end_time")?.end_time}
                      options={{
                        required: "End Time is required",
                        validate:{
                          // validateDifferenceOfStartTime:()=>{
                          //   console.log(changeT2Num(field.start_time) > changeT2Num(field.end_time));
                          //   return changeT2Num(field.start_time) > changeT2Num(field.end_time) && "Must greater than start time"
                          // }
                        }
                      }}
                      placeholder="End Time"
                      />
                      <button type="button" className="mt-5 text-red-700" onClick={() => remove(index)}><FaMinusCircle size={24} scale={2} /> </button>
                </div>
              ))
          }
      <button
        type="button"
        className="mt-5 text-custom_orange-700"
        onClick={() => append({day: 100, start_time: "luo", end_time: "luo"})}
      >
        <FaPlusCircle size={24} scale={2} />
      </button>

      {!props?.itemDetail && <CustomButton is_loading={<SmallLoading {...loading}/>} text={"Submit Request"} type="submit" className="absolute bottom-2 overflow-hidden w-full cursor-pointer mt-5 leading-[3.75rem] 
        rounded-xl text-sm sm:text-lg sm:leading-[3.75rem] font-medium transition-all duration-300
         ease-in inline-block px-4 whitespace-nowrap bg-custom_orange-900 text-white max-w-56" />
         }
      {props?.itemDetail &&
        <CustomButton is_loading={<SmallLoading {...loading}/>} text={"Edit Request"} type="submit" className="absolute bottom-2 overflow-hidden w-full cursor-pointer mt-5 leading-[3.75rem] 
        rounded-xl text-sm sm:text-lg sm:leading-[3.75rem] font-medium transition-all duration-300
         ease-in inline-block px-4 whitespace-nowrap bg-custom_orange-900 text-white max-w-56" />
      }
      </div>
    </form>
    {/* <h1 className="text-center text-red-700">{errors.root?.message} </h1>
    <form onSubmit={avaliblityForm.handleSubmit(onSubmitAvalabilty)} className="flex-wrap items-center justify-between w-full md:flex gap-x-2 md:flex-nowrap md:gap-4">
      <CustomDropdown type="number"
        register={avaliblityForm.register}
        label="day"
        error={avaliblityForm.formState.errors.day}
        options={{
          required: "Day is required"
        }}
        control={avaliblityForm.control}
        data={Days}
        placeholder="Day....."
      />
      <CustomInput type="time"
        register={avaliblityForm.register}
        label="start_time"
        error={avaliblityForm.formState.errors.start_time}
        options={{
          required: "Start Time is required"
        }}
        placeholder="Start Time"
        />
      <CustomInput type="time"
        register={avaliblityForm.register}
        label="end_time"
        error={avaliblityForm.formState.errors.end_time}
        options={{
          required: "End Time is required"
        }}
        placeholder="End Time"
        />
      <button type="submit" className="mt-5 text-custom_orange-700" >  <FaPlusCircle size={24} scale={2} /> </button>
    </form>
    {availablityTimes.map(value => <div className="flex flex-wrap justify-between w-full gap-2 md:gap-4 md:flex-nowrap">
      <input type="text" disabled value={getLabelByValue(Days, value.day)} className={classNameInput} />
      <input type="time" disabled value={value.start_time} className={classNameInput} />
      <input type="time" disabled value={value.end_time} className={classNameInput} />
      <button type="button" className="mt-5 text-red-700" onClick={() => removeEntry(value)} >  <FaMinusCircle size={24} scale={2} /> </button>
    </div>)} */}
  </div>
}

export default TutorAdd

const classNameInput = "h-12 w-full px-6 mt-2 text-base text-custom_black-200 transition-all duration-300 ease-in border-solid focus:outline-custom_orange-900 border-custom_orange-100 border rounded-xl bg-white"