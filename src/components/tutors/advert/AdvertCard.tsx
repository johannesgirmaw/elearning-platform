
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Flex, MenuProps, Space } from 'antd';
import CustomCard from '../../customs/custom-card/CustomCard';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { AdvertStatus, ContractStatus, ContractStatusWithLable, componentType } from '../../../types/Enums';
import useLoading from '../../customs/loading/LoadingHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../../slicers/store';
import { Advert, PartialAdvert,  } from "../../../types/AdvertItem";
import useAdvertService  from './AdvertService';
import { formatDateTime } from '../../../utils/date';
import { UserContext } from '../../account/user/UserList';
import { UserIdContext } from '../../account/auth/UserPages';
import CustomButton from '../../customs/custom-button/CustomButton';
import SmallLoading from '../../customs/loading/SmallLoading';
import { DashOutlined } from '@ant-design/icons';
import useAuthorization from '../../account/auth/authorization';
import ReactPlayer from 'react-player';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export interface Props {
 
  navigateTo?:string,
  value:Advert,
  searchDatas:()=>void
  editAdvert:(data:Advert)=>void
}


const AdvertCard = (props: Props) => {
  const user = useSelector((state: RootState) => state.user)
  const [data,setData] = useState<Advert[]>([]);
  const [showAdd, setShowAdd] = useState(false)
  const [selectedData, setSelectedData] = useState<Advert>();
  
  const loading = useLoading();
  const apiService = useAdvertService();
  const {userId} = useContext(UserContext)
  const {registeredUserId} = useContext(UserIdContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const authorization = useAuthorization();
  const [hideDetail, setHideDetail] = useState<boolean>(true);
 

  // const deleteData = () => {
  //   loading.startLoading()
  //   apiService.deleteAdvert(selectedData!).then((value)=>{
  //     setData(value.data.results)
  //     props.searchDatas()
  //     setSelectedData(undefined)
  //     loading.stopLoading()
  //     }).catch(()=>{
  //       loading.stopLoading()
  //     });
  // }

 


  const handleAdvertApprove = (id:string, status:number)=> {
    loading.startLoading()
    let data: PartialAdvert; 
    data = { status: status}
   
    apiService.partialUpdateTutorContract(id, data).then((value:any)=>{
      props.searchDatas()
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
          props.value?.status===AdvertStatus.ACTIVE?
          <>
            <Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
              <CustomButton text="inactive" fun={()=>handleAdvertApprove(props.value.id,AdvertStatus.INACTIVE)} className="custom-button" is_loading={<SmallLoading {...loading}/>} />
            </Flex>
          </Flex>

          <Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
              <CustomButton text="Edit" fun={()=>props.editAdvert(props.value)} className="custom-button"  />
            </Flex>
          </Flex>
                       
          </>
          :<>
              <Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
              <CustomButton text="active" fun={()=>handleAdvertApprove(props.value.id,AdvertStatus.ACTIVE)} className="custom-button" is_loading={<SmallLoading {...loading}/>} />
            </Flex>
          </Flex>
          <Flex gap="small" vertical>
            <Flex gap="small" wrap="wrap">
              <CustomButton text="Edit" fun={()=>props.editAdvert(props.value)} className="custom-button"  />
            </Flex>
          </Flex>
          </>
        
        
      }
        </>
      ),
      key: '0',
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

  return (
    <>
     
       
                
                    
                    <CustomCard className={` border relative mt-5  ${selectedData?.id === props.value.id && ' border-custom_orange-900'}`}>
                      
                      <div className="flex flex-col justify-between w-full text-wrap hover:cursor-pointer">
                      <div className="flex ">
                                <div className='max-h-32 w-full'>
                                 <img src={props.value.image_url.toString()} className='h-full w-full object-cover' alt="" />
                                </div>
                               
                            </div>
                          <div className="flex flex-col pr-6 lg:mt-0 "
                          >
                              <h3 className="text-lg  max-w-[250px] md:max-w-lg self-start overflow-x-auto">
                             <span className="text-bold">Company Name:</span>   {props.value?.company_name } 
                              </h3>
                              <h3 className="text-lg  max-w-[250px] md:max-w-lg self-start overflow-x-auto">
                            <span className='text-bold'> date :</span>    {formatDateTime(props.value?.start_time.toLocaleString()) } - {formatDateTime(props.value?.end_time.toLocaleString())} 
                              </h3>
                              <h3 className="text-lg  max-w-[250px] md:max-w-lg self-start overflow-x-auto">
                            <span className='text-bold'> Link :</span>   <a href={props.value.link} target='_blank'>{props.value.link}</a> 
                              </h3>
                            <div className='flex justify-between items-center'>
                              <div>
                              <span className='text-bold'>  Status : </span>
                            <Button 
                         
                          className="custom-button" 
                          disabled={(!props.value.status)?false:true} 
                          loading={loading.loading}>
                         
                          {
                          props.value?.status===AdvertStatus.ACTIVE
                          ?"Active"
                          :
                          "Inactive"
                          }
                          </Button>
                              </div>
                            
                          <div   className="cursor-pointer px-2 md:pl-0" onClick={(e) => {e.stopPropagation(); setHideDetail(!hideDetail)}}>
                          {hideDetail ? <div className='flex items-center'>More <IoIosArrowDown /></div> : <div className='flex items-center'> Less<IoIosArrowUp /></div> }
                          </div>
                            </div>
                  
      
                         
      
    
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
                            { authorization.otherAction("advert")?
                            <Dropdown menu={{ items }}>
  
      <Space>
        
        <DashOutlined  rev={undefined} />
      </Space>
  
  </Dropdown>:<></>}
                          </div>
                          </div>
                          
                      </div>

                      {hideDetail ? (
        <></>
      ) : (
        <>
         

        <div className={`sm:p-10 pb-0`}>
          <ReactPlayer
            url={props.value.video_url.toString()}
            width={100 +'%'}
            controls={true} 
          />
        </div>
        <div>
          <p>{props.value.description}</p>
        </div>
        </>
      )}
                    </CustomCard>
                  
              
   
    </>
  );
};

export default AdvertCard;
