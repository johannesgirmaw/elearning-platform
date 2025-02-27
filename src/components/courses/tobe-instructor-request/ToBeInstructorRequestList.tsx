import  { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button, Empty, Flex, Form, Modal, Pagination, Popover, Space } from 'antd';
import CustomCard from '../../customs/custom-card/CustomCard';
import { assignOrsetNull } from '../../../utils/modal';
import { usePagination } from '../../customs/pagination/usePagination';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { ActionStatus, ActionStatusName, componentType } from '../../../types/Enums';
import Loading from '../../customs/loading/Loading';
import useLoading from '../../customs/loading/LoadingHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../../slicers/store';
import { PartialToBeInstructorRequest, ToBeInstructorRequest, ToBeInstructorRequestFilterModel } from './ToBeInstructorRequestModel';
import { useToBeInstructorService } from './ToBeInstructorRequestService';
import ToBeInstructorRequestAdd from './ToBeInstructorRequestAdd';
import { formatDateTime } from '../../../utils/date';
import TextArea from 'antd/es/input/TextArea';
import { UserIdContext } from '../../account/auth/UserPages';
import SearchBar from '../../commons/search-bar/SearchBar';
import Profile, { UserContext } from '../../../pages/course/ProfileInstructor';
import CustomButton from '../../customs/custom-button/CustomButton';
import SmallLoading from '../../customs/loading/SmallLoading';
import CustomPopConfirm from '../../customs/custom-modals/CustomPopConfirm';
import useAuthorization from '../../account/auth/authorization';
import useAuthentication from '../../account/auth/authentication';

export interface Props {
  navigateTo?:string
}

const ToBeInstructorRequestList = (props: Props) => {
  const user = useSelector((state: RootState) => state.user)
  const [data,setData] = useState<ToBeInstructorRequest[]>([]);
  const [showAdd, setShowAdd] = useState(false)
  const [selectedData, setSelectedData] = useState<ToBeInstructorRequest>();
  const [toBeDeleteId, setToBeDeleteId] = useState<string>('')
  const [destroyOnHide, setDestroyOnHid] = useState<boolean>(false);
  const [userDetailId, setUserDetailId] = useState("")
  const loading = useLoading();
  const apiService = useToBeInstructorService();
  const {userId} = useContext(UserContext)
  const {registeredUserId} = useContext(UserIdContext)
  const [open, setOpen] = useState(false);
  const authorization = useAuthorization();
  const authentication = useAuthentication();

  const paginator = usePagination<ToBeInstructorRequestFilterModel>(
    {
      ps:5,
      user_id:registeredUserId?registeredUserId:userId,
      status:ActionStatusName.RequestSubmitted,
    });

  useEffect(() => {
    if(authorization.otherAction("tobeinstructorrequest")){
      searchAllData("get_data")
    }else{
      searchDatas()
    }
    console.log(paginator.filterData)
  }, [paginator.filterData])

  const searchDatas = () => {
    loading.startLoading()
    apiService.getToBeInstructorRequests({...paginator.filterData}).then((value)=>{
        setData(value.data.results)
        setShowAdd(false)
        paginator.setTotal(value.data.count)
      loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      });
  }
  
  const searchAllData = (get_data:string)=>{
    loading.startLoading()
    apiService.getToBeInstructorRequestsData({...paginator.filterData, get_data}).then((value)=>{
      if(value?.data?.results?.length > 0){
        setData(value.data.results)
        setShowAdd(false)
        paginator.setTotal(value.data.count)
      }
      loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      });
  }

  const deleteData = (selectedData:ToBeInstructorRequest) => {
    loading.startLoading()
    apiService.deleteToBeInstructorRequest(selectedData!).then((value)=>{
      setData(value.data.results)
      searchDatas()
      setSelectedData(undefined)
      loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      });
  }

  const onClose = () => {
    setShowAdd(false);
    setSelectedData(undefined)
  }

  const handleInstructorApprove = (id:string)=> {
    loading.startLoading()
    let data: PartialToBeInstructorRequest = { status: ActionStatusName.RequestApproved}
    apiService.partialUpdateToBeInstructorRequest(id, data).then((value)=>{
      searchDatas()
      loading.stopLoading()
    }).catch(()=>{
      loading.stopLoading()
    })
  }

  const handleInstructorReject = (id:string, item: PartialToBeInstructorRequest)=> {
    loading.startLoading()
    let data: PartialToBeInstructorRequest = { status: ActionStatusName.RequestRejected, comment:item.comment}
    apiService.partialUpdateToBeInstructorRequest(id, data).then((value)=>{
      searchDatas()
      setDestroyOnHid(true)
      loading.stopLoading()
    }).catch(()=>{
      loading.stopLoading()
    })
  }

  const checkRequest = ()=>{
    data?.forEach((val)=>{
      if(val.status === ActionStatusName.RequestApproved){
        return false
      }
    })
    return true;
  }

  const onFinish = (items: PartialToBeInstructorRequest) => {
     handleInstructorReject(toBeDeleteId, items)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
      <Form.Item <PartialToBeInstructorRequest> name="comment">
        <TextArea rows={4} />
      </Form.Item>
      <Button htmlType="submit" style={{color:'gray'}} className="hover:bg-gray-100">Submit</Button>  
      </Form>
    </>  
    )

    const handleRequestStatusJsx =(value:ToBeInstructorRequest)=> 
    (
      <>
      {
      authorization.otherAction("tobeinstructorrequest")?
      <>
      {
        value?.status===ActionStatusName.RequestSubmitted?
        <>
          <Flex gap="small" vertical>
          <Flex gap="small" wrap="wrap">
            <CustomButton text="Approve Request" fun={()=>handleInstructorApprove(value.id)} className="custom-button" is_loading={<SmallLoading {...loading}/>} />
          </Flex>
        </Flex>
        <Flex gap="small" vertical>
          <Flex gap="small" wrap="wrap">
            <Space wrap>
              <Popover destroyTooltipOnHide={destroyOnHide} content={content} title="Rejection comment" trigger="click">
        
              <span><CustomButton text="Reject Request" fun={()=>{setToBeDeleteId(value.id)}} className="custom-button" is_loading={<SmallLoading {...loading}/> }/></span>
            </Popover>
            </Space>
          </Flex>
        </Flex>
        </>
        :value?.status===ActionStatusName.RequestApproved
        ?<Flex gap="small" vertical>
          <Flex gap="small" wrap="wrap">
            <CustomButton text="Request Approved" disabled={(!value.status)?false:true} className="custom-button-disabled"/>
          </Flex>
        </Flex>
        :<Flex gap="small" vertical>
          <Flex gap="small" wrap="wrap">
            <CustomButton text="Request Rejected" disabled={(!value.status)?false:true} className="custom-button-disabled"/>
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

    const components: SearchComponentProps[] = [
      {
          placeholder: "Search",
          key: "search",
          type: componentType.TEXT,
      },
      {
          placeholder: "Request Status",
          key:"status",
          type: componentType.DROPDOWN,
          options: ActionStatus,
          default:ActionStatusName.RequestSubmitted
      },
  ]

  return (
    <>
      <SearchBar components={components} handleChange={paginator.handleChange} filteredData={paginator.filterData} />

      <div className='container mx-auto ns-card mt-5'>
          <div className="flex flex-row ">
            <div className="flex justify-start mx-1 text-2xl">
              To Be Instructor Request
            </div>
            <div className="flex justify-self-end">
            {
              (!data?.some((value:ToBeInstructorRequest)=>(value.status===(ActionStatusName.RequestApproved || ActionStatusName.RequestSubmitted))))&&(!authentication.isLoggedIn()||authorization.canCreate("tobeinstructorrequest"))?
              <div className="items-center">
                <button onClick={()=>{setShowAdd(!showAdd);setSelectedData(undefined)}} className="w-20 h-10 hover:bg-custom_orange-800 rounded-md hover:text-white flex items-center justify-center">
                  <FaPlus className=""/>
                </button>  
              </div>:""
            }
            </div>
        </div>
        <div className="flex flex-col md:flex-row justify-around mx-auto ">
            <div className='gap-2  pb-2 relative justify-center items-center '>
              <Loading {...loading} />
              {data?.map((value: ToBeInstructorRequest) => (
                  <div key={value.id} 
                    className='max-w-5xl group mt-4 '>
                    <CustomCard className={` border relative m-5 ${selectedData?.id === value.id && ' border-custom_orange-900'}`}>
                      {
                        value.status === ActionStatusName.RequestSubmitted && value.user === user.id?
                        <CustomPopConfirm func={()=>deleteData(value)} editFun={setShowAdd}/>
                        :""
                        }
                        <div className="flex w-full flex-col lg:flex-row justify-between items-center md:pl-3 text-wrap hover:cursor-pointer">
                          <div className='p-3'>
                            <img src={value.profile_picture} alt="Profile Image" className='w-20 h-20' />
                          </div>
                          <div className="flex flex-col max-md:justify-center items-center lg:mt-0 lg:pr-6 "
                            onClick={() => {
                            if(value?.status===ActionStatusName.RequestSubmitted&&value?.user===user.id){
                              // setShowAdd(!showAdd);
                              assignOrsetNull(setSelectedData, selectedData, value)
                                }
                              }}
                              >
                              <h1 className='self-start pb-2 font-bold '>{value.username} ({value.first_name} {value.middle_name})</h1>
                              <h3 className="text-lg  max-w-[250px] md:max-w-lg self-start overflow-x-auto">
                                {value?.cover_letter}
                              </h3>
                              <h1 className={`font-bold text-lg flex self-start mt-5 ${value?.comment?'':'hidden'}`}>Rejection comment</h1>
                              <h3 className="ml-3 text-lg self-start italic bg-gray-200">
                                {value?.comment}
                              </h3>
                              <p>Requested at:  {formatDateTime(value?.request_date)}</p>
                          </div>
                          <div className='flex flex-col md:flex-row'>
                          <div className="">
                                {handleRequestStatusJsx(value)}
                          </div>
                          <div className=''>
                            {
                              authorization.otherAction("tobeinstructorrequest") ?
                                <CustomButton text='View Detail' className='custom-button' fun={() => {setUserDetailId(value.user);setOpen(true);}} />
                              :""
                            }
                          </div>
                          </div>
                      </div>
                    </CustomCard>
                  </div>
              ))}
              <Modal
                mask={false}
                title="Instructor Request"
                className="mt-20"
                centered
                destroyOnClose
                open={open}
                okText={"Close"}
                onOk={() => setOpen(false)}
                onCancel={() => {setOpen(false);}}
                width={1200}
              >
                <Profile userId={userDetailId} userListDetail={true}/>
              </Modal>
              <Pagination
                className={`pagination-bar mt-3 ${data?.length===0?"hidden":""}`}
                {...paginator}
              />
              {data?.length===0?<Empty className="flex justify-center w-full"/>:""}
            </div>
            {
              (showAdd || selectedData )&&
            <div className="container max-w-[400px]  flex-wrap  justify-evenly space-x-2 my-20 md:my-0 slide-in 0.3s ease-in-out forwards hidden md:flex">
              <ToBeInstructorRequestAdd searchDatas={searchDatas} itemDetail={selectedData}/>
            </div>
            }
        </div>
      </div>
      <Modal open={showAdd && (window.innerWidth < 768)} onCancel={onClose} footer={[]} >
        <ToBeInstructorRequestAdd  searchDatas={searchDatas} itemDetail={selectedData} cancel={onClose} />
      </Modal>
    </>
  );
};

export default ToBeInstructorRequestList;
