import { useEffect, useState } from "react";
import Loading from "../../customs/loading/Loading";
import useLoading from "../../customs/loading/LoadingHook";
import { ETutorContract } from "../../../types/ETutorContractItem";
import { useETutorContractService } from "./ETutorContractService";
import { useParams } from "react-router-dom";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Days } from "../../../types/Enums";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import CustomInput from "../../customs/custom-input/CustomInput";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { AvailableTime } from "../tutor/TutorInfoModel";
import { Button, Card,Modal } from "antd";
import { toDateAndTime } from "../../../utils/timeUtils";
import useToast from "../../customs/toast/ToastHook";
import useAuthentication from "../../account/auth/authentication";
import { useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import CustomButton from "../../customs/custom-button/CustomButton";


export interface Props {
  navigateTo?: string;
}

const TutorContractDetail = () => {
  const [data, setData] = useState<ETutorContract>();
  let { id } = useParams();
  const loading = useLoading();
  const apiService = useETutorContractService();
  const avaliblityForm = useForm<ETutorContract>({});
  const toast = useToast()
  const user = useSelector((state: RootState) => state.user)

  const tutorContractForm = useForm<ETutorContract >();
    

  const { fields, remove, append } = useFieldArray({
    name: "contract_availabilty_times",
    control: avaliblityForm.control,
  });

  const [modal2Open, setModal2Open] = useState(false);
  const [valueD, setValueD] = useState(null)
  const [paymentDate,setPaymentDate]=useState<string>('')


  const removeEmptyFieldFromObject = (obj: any) => {
    const newObj: any = {};
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }


  const onSubmit: SubmitHandler<ETutorContract> = (data: ETutorContract) => {
   
    
    loading.startLoading()
      apiService.editETutorContract(data).then(value => {
        if (value){
          toast.success("Successfully Updated")
          avaliblityForm.reset(value)
        }
        loading.stopLoading()
      }).catch(() => loading.stopLoading())
  };

  useEffect(() => {
    searchDatas();
  }, []);

  const searchDatas = () => {
    loading.startLoading();
    id &&
      apiService
        .getETutorContract(id)
        .then((value) => {
          setData(value?.data);
          
        
            tutorContractForm.setValue('id', value?.data.id);
           
            tutorContractForm.setValue('student_subject', value?.data.student_subject);
            tutorContractForm.setValue('student_level', value?.data.student_level);
            tutorContractForm.setValue('student_location', value?.data.student_location);

            tutorContractForm.setValue('payment_date', value?.data.payment_date);
            setPaymentDate(toDateAndTime(value?.data.payment_date)|| "")
            
       console.log("data ", tutorContractForm.getValues("payment_date"))
         

          avaliblityForm.reset(value?.data)
          loading.stopLoading();
        })
        .catch(() => {
          loading.stopLoading();
        });
  };

  const handleArrayField = (
    field_array:
      | Merge<
          FieldError,
          (Merge<FieldError, FieldErrorsImpl<AvailableTime>> | undefined)[]
        >
      | undefined,
    index: number,
    field: string
  ) => {
    return field_array && field_array[index];
  };

 const onEditSubmit: SubmitHandler<ETutorContract> =(value)=>{
   console.log("Value ", value)
  
    //        const date = new Date(value.payment_date);
    //     const convertedDate = date.toLocaleString('en-US', { timeZone: 'UTC' });
    //  const isoString = new Date(convertedDate).toISOString();

    //   value.payment_date = isoString;

   apiService.partialUpdateTutorContract(value.id,value).then(res=>{
      searchDatas()
      setModal2Open(false)
   }).catch(err=>{

   })
 }

  return (
    <>
      <Loading {...loading} />
      <div className="container mx-auto mt-5 ns-card">
        <div className="flex flex-row ">
          <div className="flex justify-start mx-1 text-2xl">ETutorContract</div>
        </div>
      </div>
      <div className="container flex flex-col items-start gap-4 mx-auto mt-4 md:flex-row">
        <Card className="w-full shadow-md md:w-1/3">
          <span className="font-semibold uppercase">Contract </span> <br />
          <br />
          <div className="flex justify-start gap-5 sm:flex-row">
            <div className="flex flex-col pl-3 justify-between border-custom_orange-900 border-solid border-l-[4px]">
              <div>
                <b>Student:</b>{" "}
                <span className="font-bold text-custom_orange-900">
                  {`${data?.student_first_name} ${data?.student_last_name}`}
                </span>{" "}
              </div>
              <div>
                <b>Tutor:</b> {data?.tutor_name}
              </div>
              <div>
                <b>Start Date:</b> {toDateAndTime(data?.payment_date)}
              </div>
              
              <div>
                <b>Created Date:</b> {toDateAndTime(data?.create_date)}
              </div>
            {
              user.id === data?.student  && data.status=== 100 &&
              <Button
              loading={loading.loading}
              type="primary"
              className="bg-custom_orange-700"
              onClick={()=>setModal2Open(true)}
            >
              edit
            </Button>

            }
             
            </div>
            {/* <div className="flex flex-col pl-3 justify-between border-custom_orange-900 border-solid border-l-[4px]">
              <div>
                <b>Student:</b>{" "}
                <span className="font-bold text-custom_orange-900">
                  {`${data?.student_first_name} ${data?.student_last_name}`}
                </span>{" "}
              </div>
              <div>
                <b>Tutor:</b> {data?.tutor_name}
              </div>
              <div>
                <b>Date:</b> {toDateAndTime(data?.create_date)}
              </div>
            </div> */}
          </div>
        </Card>
        <Card className="w-full shadow-md md:w-2/3">
        <form onSubmit={avaliblityForm.handleSubmit(onSubmit)}>
          <div className="justify-center md:flex-col md:mr-10">
            <div className="mt-5 text-slate-400">
              <h1>*Please Add Availability below</h1>
            </div>
             
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex-wrap items-center justify-between w-full md:flex gap-x-2 md:flex-nowrap md:gap-4"
              >
                <CustomDropdown
                  type="number"
                  register={avaliblityForm.register}
                  label={`contract_availabilty_times.${index}.day` as const}
                  error={
                    handleArrayField(
                      avaliblityForm.formState.errors
                        .contract_availabilty_times,
                      index,
                      "day"
                    )?.day
                  }
                  options={{
                    required: "Day is required",
                  }}
                  control={avaliblityForm.control}
                  data={Days}
                  placeholder="Day....."
                />
                <CustomInput
                  type="time"
                  register={avaliblityForm.register}
                  label={
                    `contract_availabilty_times.${index}.start_time` as const
                  }
                  error={
                    handleArrayField(
                      avaliblityForm.formState.errors
                        .contract_availabilty_times,
                      index,
                      "start_time"
                    )?.start_time
                  }
                  options={{
                    required: "Start Time is required",
                  }}
                  placeholder="Start Time"
                />
                <CustomInput
                  type="time"
                  register={avaliblityForm.register}
                  label={
                    `contract_availabilty_times.${index}.end_time` as const
                  }
                  error={
                    handleArrayField(
                      avaliblityForm.formState.errors
                        .contract_availabilty_times,
                      index,
                      "end_time"
                    )?.end_time
                  }
                  options={{
                    required: "End Time is required",
                  }}
                  placeholder="End Time"
                />
 {
              user.id === data?.student  &&
                <button
                  type="button"
                  className="mt-5 text-red-700"
                  onClick={() => remove(index)}
                >
                  <FaMinusCircle size={24} scale={2} />{" "}
                </button>
}
              </div>
            ))}
             {
              user.id === data?.student &&
            <div className="flex justify-between">
              <button
                type="button"
                className="mt-5 text-custom_orange-700"
                onClick={() =>
                  append({
                    day: 100,
                    start_time: "luo",
                    end_time: "luo",
                  })
                }
              >
                <FaPlusCircle size={24} scale={2} />
              </button>

              <Button
                loading={loading.loading}
                type="primary"
                htmlType="submit"
                className="bg-custom_orange-700"
              >
                Save
              </Button>
            </div>
}
          </div>
          </form>
        </Card>
      </div>

      {
              user.id === data?.student && loading.loading===false  && data.status=== 100 &&
      <Modal
        title="Edit Tutor Contract"
        centered
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        
        <>
        <form  onSubmit={tutorContractForm.handleSubmit(onEditSubmit)}>

         
                        <CustomInput
                            register={tutorContractForm.register}
                            label="student_subject"
                            error={tutorContractForm.formState.errors.student_subject}
                            options={{
                                required: "Student Subject is required"
                            }}
                            placeholder="student subject "
                            />
                        <CustomInput
                            register={tutorContractForm.register}
                            label="student_level"
                            error={tutorContractForm.formState.errors.student_level}
                            options={{
                                required: "student level  is required"
                            }}
                            placeholder="student level"
                            />
                        <CustomInput
                            register={tutorContractForm.register}
                            label="student_location"
                            error={tutorContractForm.formState.errors.student_location}
                            options={{
                                required: "student location is required"
                            }}
                            placeholder="student location"
                            />

                        <CustomInput
                            type="datetime-local"
                            placeholder="Start Date"
                            register={tutorContractForm.register}
                            label="payment_date"
                            error={tutorContractForm.formState.errors.payment_date}
                           />  
                           <div>{paymentDate}</div>

                         <CustomButton type='submit' text="Update Contract"
                            className="relative 
                            overflow-hidden w-full cursor-pointer mt-5 leading-[3.75rem]
                            rounded-xl text-sm sm:text-lg sm:leading-[3.75rem] font-medium 
                            transition-all duration-300 ease-in inline-block px-4 
                            whitespace-nowrap  text-white bg-custom_orange-900
                            border-custom_orange-900 disabled:cursor-not-allowed
                                disabled:opacity-75 hover:opacity-75"
                                />
                            </form>
                    </>

      </Modal>
     }
    </>
  );
};

export default TutorContractDetail;
