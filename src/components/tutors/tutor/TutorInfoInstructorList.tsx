import { useEffect, useState } from "react"
import { ActionStatus, ActionStatusName, componentType, daysOption, tutorTypeOptions } from "../../../types/Enums"
import { usePagination } from "../../customs/pagination/usePagination"
import SearchBar from "../../commons/search-bar/SearchBar"
import { SearchComponentProps } from "../../commons/search-bar/search"
import useTutorService from "./ToturService"
import { Avatar, Button, Card, Empty, Flex, Form, Modal, Pagination, Popover, Space } from "antd"
import { Rating } from "../../customs/custom-components/Star"
import { IoLocation } from "react-icons/io5"
import { getLabelByValue } from "../../../utils/array"
import { Link } from "react-router-dom"
import { RootState } from "../../../slicers/store"
import { useSelector } from "react-redux"
import { AvailableTime, PartialTutorRequest, Tutor, TutorInfoFilterModel } from "./TutorInfoModel"
import useLoading from "../../customs/loading/LoadingHook"
import TextArea from "antd/es/input/TextArea"
import { FaEdit, FaPlus } from "react-icons/fa"
import { assignOrsetNull } from "../../../utils/modal"
import TutorAdd from "./TutorAdd"
import CustomButton from "../../customs/custom-button/CustomButton"
import SmallLoading from "../../customs/loading/SmallLoading"
import CustomPopConfirm from "../../customs/custom-modals/CustomPopConfirm"
import useAuthentication from "../../account/auth/authentication"
import useAuthorization from "../../account/auth/authorization"
import { formatDateTime } from "../../../utils/date"


const TutorInfoInstructorList = () => {
    const [datas, setDatas] = useState<Tutor[]>([])
    const [destroyOnHide, setDestroyOnHid] = useState<boolean>(false)
    const [toBeDeleteId, setToBeDeleteId] = useState<string>('')
    const [selectedData, setSelectedData] = useState<Tutor>();
    const [showAdd, setShowAdd] = useState(false)
    const apiService = useTutorService();
    const user = useSelector((state: RootState) => state.user)    
    const paginator = usePagination<TutorInfoFilterModel>({ps:5,status:ActionStatusName.RequestSubmitted})
    const authorization = useAuthorization()

    const loading = useLoading();

    const components: SearchComponentProps[] = [
        {
            placeholder: "Search",
            key: "search",
            type: componentType.TEXT,
        },
        {
            placeholder: "Grade",
            key:"tutor_type",
            type: componentType.DROPDOWN,
            options: tutorTypeOptions,
        },
        {
            placeholder: "Request Status",
            key:"status",
            type: componentType.DROPDOWN,
            options: ActionStatus,
            default:ActionStatusName.RequestSubmitted
        },
    ]


  const onClose = () => {
    setShowAdd(false);
    setSelectedData(undefined)
  }


    useEffect(() => {
      if(authorization.otherAction("tutor")){
        searchAllDatas()
      }
      else{
        searchDatas()
      }
    }, [paginator.filterData])
    
    const searchDatas = () => {
      apiService.getTutors(paginator.filterData).then(({ data: response }) => {
            if (response.results) {
                setDatas(response.results);
                setShowAdd(false);
                paginator.setTotal(response.count);
            }
        })
    }

    const searchAllDatas = () =>{
      apiService.getTutorsData({...paginator.filterData, get_data:"get_data"}).then(({ data: response }) => {
        if (response.results) {
            setDatas(response.results)
            paginator.setTotal(response.count)
        }
    })
    }

    const handleInstructorApprove = (id:string)=> {
      loading.startLoading()
      let data: PartialTutorRequest = { status: ActionStatusName.RequestApproved}
      apiService.partialUpdateTutorRequest(id, data).then((value)=>{
        searchDatas()
        loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      })
    }
  
    const handleInstructorReject = (id:string, item: PartialTutorRequest)=> {
      loading.startLoading()
      let data: PartialTutorRequest = { status: ActionStatusName.RequestRejected, comment:item.comment}
      apiService.partialUpdateTutorRequest(id, data).then((value)=>{
        searchDatas()
        setDestroyOnHid(true)
        loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      })
    }

  const handleReject = (value:Tutor) => {
    setToBeDeleteId(value.id)
  }

  const onFinish = (items: PartialTutorRequest) => {
    handleInstructorReject(toBeDeleteId, items)
 };

 const onFinishFailed = (errorInfo: any) => {
   console.log('Failed:', errorInfo);
 };

 const deleteData = () => {
  loading.startLoading()
  apiService.deleteTutor(selectedData?.id!).then((value)=>{
    searchDatas()
    setSelectedData(undefined)
    loading.stopLoading()
    }).catch(()=>{
      loading.stopLoading()
    });
}
    const content = 
    (
      <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item <PartialTutorRequest> name="comment">
          <TextArea rows={5} />
        </Form.Item>
        <Button htmlType="submit" style={{color:'gray'}} className="hover:bg-gray-100">Submit</Button>  
        </Form>
      </>  
    )

    const handleRequestStatusJsx =(value:Tutor)=> 
    (
      <>
      {
      authorization.otherAction("tutor")?
      <>
      {
          value?.status===ActionStatusName.RequestSubmitted?
          <>
            <Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
              <CustomButton text="Approve Request" className="custom-button" fun={()=>handleInstructorApprove(value.id)} is_loading={<SmallLoading {...loading}/>} />
            </Flex>
          </Flex>
          <Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
              <Space wrap>
                <Popover destroyTooltipOnHide={destroyOnHide} content={content} title="Rejection comment" trigger="click">
                  <span>
                      <CustomButton 
                      text="Reject Request" 
                      className="custom-button" 
                      fun={()=>handleReject(value)} 
                      is_loading={<SmallLoading {...loading}/>} />
                  </span> 
              </Popover>
               </Space>
            </Flex>
          </Flex>
          </>
          :value?.status===ActionStatusName.RequestApproved
          ?<Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
              <CustomButton text="Request Approved" disabled={(!value.status)?false:true}  className="custom-button-disabled" />
            </Flex>
          </Flex>
          :<Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
              <CustomButton text="Request Rejected" disabled={(!value.status)?false:true}  className="custom-button-disabled" />
            </Flex>
          </Flex>
      }
      </>
      :<Flex gap="small" vertical>
      <Flex gap="small" wrap="wrap">
        <Button 
          className="custom-button-disabled" 
          disabled={(!value.status)?false:true} 
          loading={loading.loading}>
          {
            value?.status===ActionStatusName.RequestSubmitted
            ?"Request Submitted"
            :value?.status===ActionStatusName.RequestApproved
            ?"Request Approved"
            :value?.status===ActionStatusName.RequestRejected
            ?"Request Rejected"
            :""
          }
        </Button>
      </Flex>
    </Flex>
    }
      </>
    )

    const filterUniqueDays = (times:AvailableTime[]) => {
        const seenDays = new Set<number>();
        
        return times.filter((time) => {
            if (!seenDays.has(time.day) && time.day >= 1 && time.day <= 7) {
                seenDays.add(time.day);
                return true;
            }
            return false;
        });
    }

    return <>
        <div className="container mx-auto ">
          <SearchBar components={components} handleChange={paginator.handleChange} filteredData={paginator.filterData} />
            <div className="my-2 gap-4 ns-card">
              <div className="flex flex-col md:flex-row ">
                <div className="flex flex-row ">
                  <div className="flex justify-start mx-1 text-2xl">
                    To Be Tutor Request
                  </div>
                  <div className="flex justify-self-end">
                  {
                  (!datas?.some((value:Tutor)=>(value.status===(ActionStatusName.RequestApproved||ActionStatusName.RequestSubmitted))))&&(authorization.canCreate("tutor"))?
                      <div className="items-center">
                        <button onClick={()=>{setShowAdd(!showAdd);setSelectedData(undefined)}} className="w-20 h-10 hover:bg-custom_orange-800 rounded-md hover:text-white flex items-center justify-center">
                          <FaPlus className=""/>
                        </button>  
                      </div>
                      :""
                  }
                  </div>
                  
                </div> 
              </div>
              <div className="flex flex-col md:flex-row justify-evenly space-x-5 gap-5 ">
                <div className="flex flex-col gap-4 w-full lg:w-3/4 relative"  >
                  {datas.map(tutorData => <Card className={`group shadow-md hover:border-custom_orange-900 ${selectedData?.id === tutorData.id && ' border-custom_orange-900'}`}>
                     {
                      tutorData.status === ActionStatusName.RequestSubmitted && tutorData.tutor === user.id?
                      <CustomPopConfirm func={deleteData} editFun={setShowAdd}/>
                        :""
                      }
                      {
                        tutorData.status === ActionStatusName.RequestSubmitted && tutorData.tutor === user.id?
                        <button type="button"
                            className="text-custom_orange-700 bg-transparent  
                            hover:bg-custom_orange-900 hover:text-white hover:rounded-full border
                            text-lg p-1 rounded-full  dark:hover:bg-gray-600 absolute top-8 right-1 group-hover:flex max-md:hidden"  >
                            <FaEdit />
                                <span className="sr-only">Edit modal</span>
                            </button>
                          :""
                      }
                      <div className="flex flex-row flex-wrap lg:flex-nowrap gap-4 mt-3 hover:cursor-pointer"
                      onClick={() => {
                        if(tutorData?.status===ActionStatusName.RequestSubmitted && tutorData.tutor===user.id){
                          // setShowAdd(!showAdd);
                          assignOrsetNull(setSelectedData, selectedData, tutorData)
                        }
                      }}>
                      <div className="flex gap-4">
                          <div className=" w-20 h-20 lg:w-40 lg:h-40">
                          <Link to={'/tutors/'+tutorData.id} > 
                              {tutorData.profile_picture ? <Avatar src={tutorData.profile_picture} shape="square" className="w-full h-full" /> :
                                      <Avatar src="/profile_avatar.jpg" shape="square" className="w-full h-full" />}
                          </Link>
                          </div>
                          <div className=" lg:hidden">
                              <h1 className="text-start text-lg"> {tutorData.tutor_name}</h1>
                              <div className="flex gap-2">
                                  <Rating rating={tutorData.average_rate_value} />
                                  <span className="font-semibold">{tutorData.average_rate_value}</span>
                                  <span>({tutorData.no_of_review} reviews)</span>
                              </div>
                              <div className="flex gap-2">
                                  <span className="font-semibold">{tutorData.preferred_subject_names?.map(val=>(<a>{val}, </a>)) || 0}</span>
                              </div>
                              <div className="font-bold px-5">Br{tutorData.hourly_rate} / hr</div>

                          </div>
                      </div>
                      <div className="flex flex-col w-full relative md:pb-10">
                          <div className="hidden lg:block relative w-full">
                              <Link to={'/tutors/'+tutorData.id} > <h1 className="text-start text-lg"> {tutorData.tutor_name}</h1></Link>
                              <div className="flex gap-2">
                                  <Rating rating={tutorData.average_rate_value} />
                                  <span className="font-semibold">{tutorData.average_rate_value}</span>
                                  <span>({tutorData.no_of_review} reviews)</span>
                              </div>
                              <div className="flex gap-2">
                                  <span className="font-semibold">{tutorData.preferred_subject_names?.map(val=>(<a>{val}, </a>)) || 0}</span>
                              </div>
                              <div className="absolute top-0 right-2 font-semibold">Br{tutorData.hourly_rate} / hr</div>
                          </div>
                          <hr className="hidden md:block" />
                          <p className="">
                              {tutorData.introduction.length <= 324 ? tutorData.introduction : tutorData.introduction.slice(0, 324) + " ..."}
                          </p>
                          <h1 className={`font-bold text-lg flex self-start mt-5 ${tutorData?.comment?'':'hidden'}`}>Rejection comment</h1>
                              <h3 className="ml-3 text-md self-start italic bg-gray-200">
                                {tutorData?.comment}
                              </h3>
                              <p>Requested at:  {formatDateTime(tutorData?.request_date)}</p>
                          <div className="lg:absolute bottom-0 flex flex-wrap gap-2 lg:gap-4"> <div className="bg-custom_orange-100 w-fit p-2 gap-2 flex items-center">{getLabelByValue(tutorTypeOptions, tutorData.tutor_type)} </div>
                              <div className="bg-custom_orange-100 w-fit p-2 gap-1 flex items-center"> <IoLocation /> <span>
                                  {tutorData.zone_name} - {tutorData.woreda_name}
                              </span>
                              </div>

                              <div className="flex gap-1 p-1 border-solid border-custom_orange-200 border-2">
                                  {filterUniqueDays(tutorData.availabilty_times).sort((a:any, b:any) => a.day - b.day).map((value:any) => <div className="bg-custom_orange-100 w-fit p-1 gap-2 flex items-center"> {getLabelByValue(daysOption, value.day)}
                                  </div>)}
                              </div>
                          </div>
                              <div className="flex flex-col  items-center md:justify-end md:flex-row">{handleRequestStatusJsx(tutorData)}</div>
                        </div>
                      </div>
                  </Card>
                    )
                  }
                  <Pagination
                    className={`pagination-bar mt-3 ${datas?.length===0?"hidden":""}`}
                    {...paginator}
                  />
                      {datas?.length===0?<Empty className="flex justify-center w-full"/>:""}
                </div>
                <div>
                  {
                  (showAdd || selectedData) &&
                  <div className="container hidden md:flex flex-col flex-wrap  justify-evenly space-x-2 mb-20 md:mb-0">
                    <TutorAdd searchDatas={searchDatas} itemDetail={selectedData}/>
                  </div>
                  }
                </div>
              </div>
            </div>
        </div>
      
      <Modal open={showAdd && (window.innerWidth < 768)} onCancel={onClose} footer={[]} >
          <TutorAdd  searchDatas={searchDatas} itemDetail={selectedData} cancel={onClose} />
        </Modal>

    </>
}

export default TutorInfoInstructorList