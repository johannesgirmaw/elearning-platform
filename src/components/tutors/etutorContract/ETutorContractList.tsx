
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import { Empty, MenuProps, Pagination, message } from 'antd';
import { usePagination } from '../../customs/pagination/usePagination';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { ContractStatus, ContractStatusWithLable, componentType } from '../../../types/Enums';
import Loading from '../../customs/loading/Loading';
import useLoading from '../../customs/loading/LoadingHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../../slicers/store';
import { ETutorContract, ETutorContractFilterModel } from "../../../types/ETutorContractItem";
import { useETutorContractService } from './ETutorContractService';
import { UserIdContext } from '../../account/auth/UserPages';
import SearchBar from '../../commons/search-bar/SearchBar';
import EtutorContractCard from './EtutorContractCard'
export interface Props {
 
  navigateTo?:string
}


const TutorContractList = (props: Props) => {
  const user = useSelector((state: RootState) => state.user)
  const [data,setData] = useState<ETutorContract[]>([]);
  const [showAdd, setShowAdd] = useState(false)
  const [selectedData, setSelectedData] = useState<ETutorContract>();
  const [toBeDeleteId, setToBeDeleteId] = useState<string>('')
  const [destroyOnHide, setDestroyOnHid] = useState<boolean>(false)
  const loading = useLoading();
  const apiService = useETutorContractService();
  const {registeredUserId} = useContext(UserIdContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const paginator = usePagination<ETutorContractFilterModel>(
    {
      ps:5,
      user_id:user.id
    });

  useEffect(() => {
    searchDatas()
  }, [paginator.filterData,])

  const searchDatas = () => {
    loading.startLoading()
    apiService.getETutorContracts(paginator?.filterData).then((value)=>{
      setData(value?.data.results)
      setShowAdd(false)
    
      // if(props.navigateTo){navigate(`${props.navigateTo}`)}
      paginator.setTotal(value.data.count)
      loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      });
  }

  const deleteData = () => {
    loading.startLoading()
    apiService.deleteETutorContract(selectedData!).then((value)=>{
      setData(value.data.results)
      searchDatas()
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


  
 

  const items: MenuProps['items'] = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
      key: '1',
    },
   
  ];


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
      <SearchBar components={components} handleChange={paginator.handleChange} filteredData={paginator.filterData} />

      <div className='container mx-auto mt-5 ns-card'>
          <div className="flex flex-row ">
            <div className="flex justify-start mx-1 text-2xl">
             Tutor Contract 
            </div>
            <div className="flex justify-self-end relative">
              <Loading {...loading} />
            {
              (data?.some((value:ETutorContract)=>(value.status===ContractStatus.REQUESTED)||(value.status===ContractStatus.REQUESTED)))&&(!user.is_superuser)?
              <div className="items-center">
                <button onClick={()=>{setShowAdd(!showAdd);setSelectedData(undefined)}} className="flex items-center justify-center w-20 h-10 rounded-md hover:bg-custom_orange-800 hover:text-white">
                  <FaPlus className=""/>
                </button>  
              </div>:""
            }
            </div>
        </div>
        <div className=" mx-auto w-full ">
            <div className='  pb-2 w-full flex flex-col'>
              <div className='w-full flex flex-wrap justify-center'>
              {data?.map((value: ETutorContract) => (
                 <EtutorContractCard value={value}  searchDatas={ searchDatas} key={value.id}/>
             ))}
              </div>
              <Pagination
                className={`pagination-bar mt-3 ${data?.length===0?"hidden":""}`}
                {...paginator}
              />
              {data?.length===0?<Empty className="flex justify-center w-full"/>:""}
            </div>
        </div>
      </div>
    </>
  );
};

export default TutorContractList;
