import { useEffect, useState } from "react"
import { usePagination } from "../../customs/pagination/usePagination"
import useTutorService from "./ToturService"
import { Avatar, Card, Table, TableProps, Tag } from "antd"
import { IoLocation, IoDesktopSharp, IoLocationSharp, IoLocationOutline } from "react-icons/io5"
import { useNavigate, useParams } from "react-router-dom"
import useTranslation from "../../../utils/translation"
import CustomButton from "../../customs/custom-button/CustomButton"
import { ContractStatus, Days, EducationalLevel } from "../../../types/Enums"
import { AvailableTime, Tutor } from "./TutorInfoModel"
import useETutorContractService from "../etutorContract/ETutorContractService"
import CustomInput from "../../customs/custom-input/CustomInput"
import { FieldError, FieldErrorsImpl, Merge, SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { ETutorContract } from "../../../types/ETutorContractItem"
import { Reviewers } from "../../commons/Reviewers/Reviewers"
import { useExperienceService } from "../../account/experience/ExperienceService"
import { Experience } from "../../account/experience/ExperienceModel"
import { yearDifferences } from '../../../utils/timeUtils'
import { LocalStorage } from "../../../utils/localstorage"
import useAuthentication from "../../account/auth/authentication"
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { calculateDateDifference } from "../../../utils/func_utils"
import useLoading from "../../customs/loading/LoadingHook"



const TutorInfoDetail = () => {

    const { translate } = useTranslation();
    const tutorService = useTutorService();
    const etutorContractService = useETutorContractService()
    const loading = useLoading();
    const [tutor, setTutor] = useState<Tutor>();
    const experienceService = useExperienceService();
    const navigate = useNavigate()
    const authentication = useAuthentication();

    let { id } = useParams();
    const tutorContractForm = useForm<ETutorContract>();

    useEffect(() => window.scrollTo(0, 0), [])

    useEffect(() => {
        const localstorage = new LocalStorage();
        if(!authentication.isLoggedIn()){
            localstorage.setKeyValue('tutorinfopage', window.location.pathname);  
        }
        {
            localstorage.remove('tutorinfopage');  
        }
        getTutor()
    }, [id]);

    const getExperience = (user_id: string) => {
        experienceService.getTutorExperiences({ user_id }).then(({ data: value }) => {
            console.log(value)
        })
    }

    const getTutor = () => {
        loading.startLoading()
        tutorService.getTutor(id ? id : '')
            .then(({ data: tutor }) => {
                tutor.availabilty_times = [...tutor.availabilty_times].sort((a, b) => a.day - b.day);
                setTutor(tutor);
                getExperience(tutor.tutor)
                tutorService.getLocations();
                loading.stopLoading();
            })
            .catch((error) => loading.stopLoading());
    }

    const columns: TableProps<AvailableTime>['columns'] = [
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day',
            render: (d) => <a>{Days[d-1]?.label}</a>,
        },
        {
            title: 'Schedule',
            dataIndex: 'availability_time',
            render: (d, { start_time, end_time }) => <a> <Tag>{convertTo12HourFormat(start_time)}</Tag> - <Tag>{convertTo12HourFormat(end_time)}</Tag> </a>,
        }
    ]

    const convertTo12HourFormat = (time:string) => {
      let [hours, minutes, seconds] = time.split(':');
      let hour = parseInt(hours);
      let period = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
      // Add leading zero to minutes and seconds if they are single digit
      minutes = minutes.padStart(2, '0');
      seconds = seconds.padStart(2, '0');      
      return `${hour}:${minutes}:${seconds} ${period}`;
  }

    const onSubmit: SubmitHandler<ETutorContract> = (data) => {
        etutorContractService.addETutorContract({
            ...data,
            status: ContractStatus.REQUESTED,
            tutor: tutor?.id,
           
        }).then(res => {
            getTutor()
        }).catch(err => {

        })
    };

      const handleSaveLoginCurrentPage = ()=>{
        setLocalstorage();
        navigate('/login')
      }

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

      const { fields, remove, append } = useFieldArray({
        name: "contract_availabilty_times",
        control: tutorContractForm.control,
      });
    
      const setLocalstorage = ()=>{
        const localstorage = new LocalStorage();
        localstorage.setKeyValue('tutorinfopage',window.location.pathname)
      }


    return <>
    {/* <form onSubmit={tutorContractForm.handleSubmit(onSubmit)}> */}
        <div className="container px-3 mx-auto my-3">
            <h1 className="py-5 text-3xl capitalize">{tutor?.tutor_name}</h1>
            <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex flex-col md:w-2/3 gap-y-7">
                    <Card className="bg-white shadow-md block sm:h-[240px]">
                        <div className="flex flex-col w-full h-full gap-12 sm:flex-row sm:justify-start place-items-center ">
                            <div className="w-20 h-20 text-center lg:w-40 lg:h-40">
                                {tutor?.profile_picture ? <Avatar src={tutor?.profile_picture} shape="circle" className="w-full h-full" /> :
                                    <Avatar src="/profile_avatar.jpg" shape="square" className="w-full h-full" />}
                            </div>
                            <div className="flex flex-col font-bold gap-y-2">
                                <h1 className="px-4 py-1 font-bold text-center text-white uppercase bg-green-500">ID VERIFIED</h1>
                                <h1 className="text-xl uppercase text-custom_orange-700">{tutor?.tutor_name}</h1>
                                {/* <p className="flex gap-2 place-items-center ">Tutor</p> */}

                                <p className="flex gap-2 place-items-center "><IoLocationOutline className="text-custom_orange-700" />{tutor?.woreda_name}, Ethiopia</p>
                                <p className="flex gap-2 px-4 py-1 text-white uppercase border-4 border-gray-300 border-solid rounded-full place-items-center bg-custom_orange-900">
                                    <IoLocation />{tutor?.nearest_location}</p>
                            </div>
                            <div className="flex flex-col text-center gap-y-4 sm:text-start">
                                {/* <p><span className="font-bold">Nearest Location:</span> {tutor?.nearest_location}</p> */}
                                <p><span className="font-bold">Preferred Subjects:</span> {tutor?.preferred_subject_names?.map(val=>(<a>{val}, </a>))}</p>
                                <p><span className="font-bold">Tutor Type:</span>{tutor?.tutor_type}</p>
                                <p><span className="font-bold"> Hourly Rate:</span> ETB {tutor?.hourly_rate}</p>
                                <p><span className="font-bold">No of Review:</span> {tutor?.reviews}</p>
                            </div>
                        </div>
                    </Card>
                   
                    <Card className="shadow-md">
                        <span className="font-semibold uppercase">Tutor Backgruond Info</span>  <br />
                        <br />
                        {tutor?.introduction}

                        <p className="mt-5 mb-2 uppercase"><span className="font-bold text-custom_orange-800">Educational Background:</span></p>
                        <div className="flex flex-col justify-start gap-5 sm:flex-row">
                            {tutor?.educations?.map((education) => (<div className="flex flex-col pl-3 justify-between border-custom_orange-900 border-solid border-l-[4px]">

                                <div><b>School of Education:</b>   <span className="font-bold text-custom_orange-900">{education.school_of_education}</span> </div>
                                <div><b>Field of Study:</b>  {education.field_of_study}({EducationalLevel.find(val => val.value === education.level_of_education)?.label})</div>
                                <div><b>Started at:</b>  {education.start_date} {education.currently_learning && " - Present"} </div>
                                {!education.currently_learning &&<div><b>Year of Graduation :</b>  {education.year_of_graduation} </div>}
                            </div>))}
                        </div>

                    </Card>
                    <Card className="shadow-md">
                        <span className="font-semibold uppercase">Experience </span>  <br />
                        <br />
                        <div className="flex flex-col justify-start gap-5 sm:flex-row">
                            {tutor?.experiences?.map((experience) => (<div className="flex flex-col pl-3 justify-between border-custom_orange-900 border-solid border-l-[4px]">

                                <div><b>Company:</b>   <span className="font-bold text-custom_orange-900">{experience.company}</span> </div>
                                <div><b>Position:</b>  {experience.job_title}</div>
                                <div><b>From:</b>  {experience.start_date} <b>-</b> {experience.currently_working? "Present":experience.end_date}{ !experience.currently_working && <span className="text-custom_orange-900">  ({calculateDateDifference(experience.start_date, experience.end_date)})</span>} </div>
                            </div>))}
                        </div>

                    </Card>
                    <Card className="shadow-md">
                        <span className="font-semibold uppercase">Availability</span>  <br />
                        <br />
                        <div>
                            <Table columns={columns} dataSource={tutor?.availabilty_times} pagination={false} size="small" />
                        </div>
                    </Card>
                </div>

                <div className="flex flex-col md:w-1/3 gap-y-7">
                <form onSubmit={tutorContractForm.handleSubmit(onSubmit)}>

                    {
                        authentication.isLoggedIn()&&!tutor?.is_contracted &&
                        <><CustomInput
                            type="datetime-local"
                            placeholder="Start Date"
                            register={tutorContractForm.register}
                            label="payment_date"
                            error={tutorContractForm.formState.errors.payment_date}
                            options={{
                                required: "start_date is required"
                            }} />   
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
                    </>
                }
                {
                    !authentication.isLoggedIn()?<h1 className="text-xl font-extrabold text-custom_orange-900">To contact this tutor</h1>:""
                }

                {
                  authentication.isLoggedIn()&&!tutor?.is_contracted && <Card className="w-full shadow-md">
                  <div className="flex flex-col justify-center">
                    <div className="mt-5 text-slate-400">
                      <h1>*Please Add Your schedule below</h1>
                    </div>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="max-2xl:flex-col flex-wrap items-center justify-between w-full 2xl:flex gap-x-2 md:flex-nowrap md:gap-4"
                      >
                        <CustomDropdown
                          type="number"
                          register={tutorContractForm.register}
                          label={`contract_availabilty_times.${index}.day` as const}
                          error={
                            handleArrayField(
                                tutorContractForm.formState.errors
                                .contract_availabilty_times,
                              index,
                              "day"
                            )?.day
                          }
                          options={{
                            required: "Day is required",
                          }}
                          className="2xl:w-32"
                          control={tutorContractForm.control}
                          data={Days}
                          placeholder="Day....."
                        />
                        <CustomInput
                          type="time"
                          register={tutorContractForm.register}
                          label={
                            `contract_availabilty_times.${index}.start_time` as const
                          }
                          error={
                            handleArrayField(
                                tutorContractForm.formState.errors
                                .contract_availabilty_times,
                              index,
                              "start_time"
                            )?.start_time
                          }
                          className="2xl:w-[136px]"
                          options={{
                            required: "Start Time is required",
                          }}
                          placeholder="Start Time"
                        />
                        <CustomInput
                          type="time"
                          register={tutorContractForm.register}
                          label={
                            `contract_availabilty_times.${index}.end_time` as const
                          }
                          error={
                            handleArrayField(
                                tutorContractForm.formState.errors
                                .contract_availabilty_times,
                              index,
                              "end_time"
                            )?.end_time
                          }
                          className="2xl:w-[136px]"
                          options={{
                            required: "End Time is required",
                          }}
                          placeholder="End Time"
                        />

                        <button
                          type="button"
                          className="mt-5 2xl:-ml-3 text-red-700"
                          onClick={() => remove(index)}
                        >
                          <FaMinusCircle size={24} scale={2} />{" "}
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="mt-5 text-custom_orange-700"
                        onClick={() =>
                          append({
                            // id: '',
                            day: 100,
                            start_time: "luo",
                            end_time: "luo",
                          })
                        }
                      >
                        <FaPlusCircle size={24} scale={2} />
                      </button>
                      {/* 
                      <Button
                        loading={loading.loading}
                        type="primary"
                        htmlType="submit"
                        className="bg-custom_orange-700"
                      >
                        Save
                      </Button> */}
                    </div>
                  </div>
                </Card>
                }
                 

                <div className="flex flex-col xl:space-x-5">
                {  !authentication.isLoggedIn()?
                    <CustomButton 
                        type={tutor?.is_contracted?'button':`submit`} 
                        text={authentication.isLoggedIn()?tutor?.is_contracted?"Go to Contract":`Contact This Tutor`:"Please login"}
                        className="relative 
                        overflow-hidden w-full cursor-pointer mt-5 leading-[3.75rem]
                        rounded-xl text-sm sm:text-lg sm:leading-[3.75rem] font-medium 
                        transition-all duration-300 ease-in inline-block px-4 
                        whitespace-nowrap  text-white bg-custom_orange-900
                        border-custom_orange-900 disabled:cursor-not-allowed
                        disabled:opacity-75 hover:opacity-75"
                        fun={authentication.isLoggedIn()?tutor?.is_contracted?()=>navigate('/portal#2'):()=>{}:()=>handleSaveLoginCurrentPage()}
                        />
                        :
                        <CustomButton type={tutor?.is_contracted?'button':`submit`} text={tutor?.is_contracted?"Go to Contract":`Contact This Tutor`}
                        className="relative 
                            overflow-hidden w-full cursor-pointer mt-5 leading-[3.75rem]
                            rounded-xl text-sm sm:text-lg sm:leading-[3.75rem] font-medium 
                            transition-all duration-300 ease-in inline-block px-4 
                            whitespace-nowrap  text-white bg-custom_orange-900
                            border-custom_orange-900 disabled:cursor-not-allowed
                                disabled:opacity-75 hover:opacity-75"
                                fun={tutor?.is_contracted?()=>navigate('/portal#my_tutor'):()=>{}}
                                />
                }
                </div>
                </form> 

                <Card  >
                    <Reviewers id={id} />
                </Card>
                </div>
                </div>
            </div>
        {/* </form>  */}
    </>
}

export default TutorInfoDetail