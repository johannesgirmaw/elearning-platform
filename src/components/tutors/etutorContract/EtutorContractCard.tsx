
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Flex, MenuProps, Space, message } from 'antd';
import CustomCard from '../../customs/custom-card/CustomCard';
import { assignOrsetNull } from '../../../utils/modal';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { ContractStatus, ContractStatusWithLable, componentType } from '../../../types/Enums';
import useLoading from '../../customs/loading/LoadingHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../../slicers/store';
import { ETutorContract, PartialETutorContract } from "../../../types/ETutorContractItem";
import { useETutorContractService } from './ETutorContractService';
import { formatDateTime } from '../../../utils/date';
import CustomButton from '../../customs/custom-button/CustomButton';
import SmallLoading from '../../customs/loading/SmallLoading';
import CustomPopConfirm from '../../customs/custom-modals/CustomPopConfirm';
import { DashOutlined } from '@ant-design/icons';
import useAuthorization from '../../account/auth/authorization';

export interface Props {
 
  navigateTo?:string,
  value:ETutorContract,
  searchDatas:()=>void
}


const TutorContractCard = (props: Props) => {
  const user = useSelector((state: RootState) => state.user)
  const [data,setData] = useState<ETutorContract[]>([]);
  const [showAdd, setShowAdd] = useState(false)
  const [selectedData, setSelectedData] = useState<ETutorContract>();
  const [toBeDeleteId, setToBeDeleteId] = useState<string>('')
  const [destroyOnHide, setDestroyOnHid] = useState<boolean>(false)
  const loading = useLoading();
  const apiService = useETutorContractService();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const authorization = useAuthorization();
 
 

  const deleteData = () => {
    loading.startLoading()
    apiService.deleteETutorContract(props.value).then((value)=>{
      setData(value.data.results)
      props.searchDatas()
      setSelectedData(undefined)
      loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      });
  }

  const confirm = (e?: React.MouseEvent<HTMLElement>) => {
    deleteData();
  };

  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Click on No');
  };


  const handleETutorContractApprove = (id:string, whichStatus=ContractStatus.ACCEPTED)=> {
    loading.startLoading()
    let data: PartialETutorContract; 
    if(whichStatus===ContractStatus.ACCEPTED){
       data = { status: ContractStatus.ACCEPTED}
    }else if(whichStatus===ContractStatus.TERMINATED){
      data = { status: ContractStatus.TERMINATED, end_date: new Date()}
    }else{
      data = { status: ContractStatus.SUSPEND}
    }
   
    apiService.partialUpdateTutorContract(id, data).then((value:any)=>{
      props.searchDatas()
      loading.stopLoading()
    }).catch(()=>{
      loading.stopLoading()
    })
  }

  const handleETutorContractReject = (id:string, item: PartialETutorContract)=> {
    loading.startLoading()
    let data: PartialETutorContract = { status: ContractStatus.REJECTED}
    apiService.partialUpdateTutorContract(id, data).then((value:any)=>{
      props.searchDatas()
      setDestroyOnHid(true)
      loading.stopLoading()
    }).catch(()=>{
      loading.stopLoading()
    })
  }

  const items: MenuProps['items'] = [
    {
      label: (
        
       
        <>
        {
          props.value?.status===ContractStatus.REQUESTED?
          <>
            <Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
              <CustomButton text="Approve Request" fun={()=>handleETutorContractApprove(props.value.id)} className="custom-button" is_loading={<SmallLoading {...loading}/>} />
            </Flex>
          </Flex>
          
          </>
          :<></>
        
        
      }
        </>
      ),
      key: '0',
    },
   

     

      {
        label: (
         
         
          <>
          {
          
            props.value?.status===ContractStatus.ACCEPTED
            ?<><Flex gap="small" vertical>
              
              <Flex gap="small" wrap="wrap">
                <CustomButton text="Terminate" fun={()=>handleETutorContractApprove(props.value.id,ContractStatus.TERMINATED)}  className="custom-button-disabled"/>
              </Flex>
             
            </Flex></>
            :<></>
          }
          </>
          
       
        ),
        key: '5',
      },

      {
        label: (
          
         
          <>
          {
          
            props.value?.status===ContractStatus.ACCEPTED
            ?<><Flex gap="small" vertical>
             
              <Flex gap="small" wrap="wrap">
                <CustomButton text="Sespend" fun={()=>handleETutorContractApprove(props.value.id,ContractStatus.SUSPEND)}  className="custom-button-disabled"/>
              </Flex>
            </Flex></>
            :<></>
          }
          </>
          
        
        ),
        key: '6',
      },
      
      
     
       
     
      {
        label: (
          <>
         
          {
          props.value?.status===ContractStatus.TERMINATED
            ?<Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
                <CustomButton text="Approve Request" fun={()=>handleETutorContractApprove(props.value.id)} className="custom-button" is_loading={<SmallLoading {...loading}/>} />
              </Flex>
          </Flex>
          :<></>
          }
          
          </>
        ),
        key: '7',
      },
      {
        label: (
          <>
         
          {
          props.value?.status===ContractStatus.SUSPEND
            ?<Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
                <CustomButton text="Approve Request" fun={()=>handleETutorContractApprove(props.value.id)} className="custom-button" is_loading={<SmallLoading {...loading}/>} />
              </Flex>
          </Flex>
          :<></>
          }
          
          </>
        ),
        key: '8',
      },
   
  ];

  const checkRequest = ()=>{
    data?.forEach((val)=>{
      if(val.status === ContractStatus.ACCEPTED){
        return false
      }
    })
    return true;
  }

  const onFinish = (items: PartialETutorContract) => {
     handleETutorContractReject(toBeDeleteId, items)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
          options: ContractStatusWithLable,
          default:ContractStatus.REQUESTED
      },
  ]

  useEffect(()=>{
    // window.location.pathname
  }, [])

  return (
    <>
      <CustomCard className={` border relative mt-5 max-w-xl lg:mr-5  ${selectedData?.id === props.value.id && ' border-custom_orange-900 '} `}>
        {
          props.value.status === ContractStatus.REQUESTED && props.value.user === user.id?
          <CustomPopConfirm func={deleteData}/>
        :""
        }
        <div className="flex flex-col items-center justify-between w-full md:flex-row text-wrap hover:cursor-pointer hover:text-black">
        <div className="flex ">
                  <div className="w-40 h-40 mr-4">
                  <Link to={`${props.value.id}`} >
                      {props.value.profile_picture ? <Avatar src={props.value.profile_picture} shape="square" className="w-full h-full" /> :
                              <Avatar src="/profile_avatar.jpg" shape="square" className="w-full h-full" />}
                  </Link>
                  </div>
                  
              </div>
            <div className="flex flex-col items-center pr-6 lg:mt-0 "
              onClick={() => {
              if(props.value?.status===ContractStatus.REQUESTED&&props.value?.user===user.id){
                setShowAdd(!showAdd);
                assignOrsetNull(setSelectedData, selectedData, props.value)
              }
            }}
            >
                <h3 className="text-lg  max-w-[250px] md:max-w-lg self-start overflow-x-auto">
                <span className='font-bold'>Student Name: </span>  {props.value?.student_first_name } {props.value?.student_last_name}
                </h3>
                <h3 className="text-lg  max-w-[250px] md:max-w-lg self-start overflow-x-auto">
                <span className='font-bold'> Tutor Name:</span>  {props.value?.tutor_name } 
                </h3>
                <h3 className="text-lg  max-w-[250px] md:max-w-lg self-start overflow-x-auto">
                <span className='font-bold'> Subject:</span>  {props.value?.student_subject } 
                </h3>
                <h3 className="text-lg  max-w-[250px] md:max-w-lg self-start overflow-x-auto">
                <span className='font-bold'> Grade:</span>  {props.value?.student_level } 
                </h3>
                <h3 className="text-lg  max-w-[250px] md:max-w-lg self-start overflow-x-auto">
                <span className='font-bold'> Location:</span>  {props.value?.student_location } 
                </h3>
              
                <p>Started at:  {formatDateTime(props.value?.payment_date)}</p>
                < Flex gap="small" vertical>
                <Flex gap="small" wrap="wrap">
                  <Button 
                  className="custom-button" 
                  disabled={(!props.value.status)?false:true} 
                  loading={loading.loading}>
                  {
                    props.value?.status===ContractStatus.REQUESTED
                    ?"Request Submitted"
                    :props.value?.status===ContractStatus.ACCEPTED
                    ?"Request Approved"
                    :props.value?.status===ContractStatus.REJECTED
                    ?"Request Rejected"
                    :props.value?.status===ContractStatus.TERMINATED?
                    "Request TERMINATED"
                    :props.value?.status===ContractStatus.SUSPEND?
                    "Request SUSPEND":""
                  }
                  </Button>
                </Flex>
              </Flex>
            </div>
            <div className='flex flex-col md:flex-row'>
            {/* <div className="">
                  {handleRequestStatusJsx(props.value)}
            </div> */}
            <div className='absolute top-2 right-2'>
              {/* {
                user.is_superuser ?
                  <CustomButton text='View Detail' className='custom-button' fun={() => {setOpen(true);}} />
                :""
              } */}
              { authorization.otherAction("etutorcontract")?
              <Dropdown menu={{ items }}>

  <Space>

  <DashOutlined  rev={undefined} />
  </Space>

  </Dropdown>:<></>}
            </div>
            </div>
        
        </div>
      </CustomCard>
    </>
  );
};

export default TutorContractCard;
