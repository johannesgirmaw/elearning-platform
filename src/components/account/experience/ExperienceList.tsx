import React, { useContext, useEffect, useState } from 'react';
import { Modal } from '../../commons/modal/Modal';
import { FaPlus,FaDownload } from 'react-icons/fa';
import { Empty, Modal as Dialog } from 'antd';
import CustomCard from '../../customs/custom-card/CustomCard';
import { assignOrsetNull } from '../../../utils/modal';
import { usePagination } from '../../customs/pagination/usePagination';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { componentType } from '../../../types/Enums';
import useLoading from '../../customs/loading/LoadingHook';
import { useExperienceService } from './ExperienceService';
import { Experience } from './ExperienceModel';
import ExperienceAdd from './ExperienceAdd';
import { ExperienceFilterModel } from './ExperienceModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../../slicers/store';
import { UserIdContext } from '../auth/UserPages';
import CustomPopConfirm from '../../customs/custom-modals/CustomPopConfirm';
import useAuthentication from '../auth/authentication';
import { LocalStorage } from '../../../utils/localstorage';
import { UserContext } from '../../../pages/course/ProfileInstructor';
import Loading from '../../customs/loading/Loading';

export interface Props{
setExperienceData:React.Dispatch<React.SetStateAction<Experience[]>>
show_add?: boolean
}

const ExperienceList = ({show_add = false, setExperienceData}: Props) => {
  let pageSizeList = [5, 10, 20, 25];
  const [data,setData] = useState<Experience[]>([]);
  const [showAdd, setShowAdd] = useState(show_add); 
  const loading = useLoading();
  const user = useSelector((state: RootState) => state.user)
  const [selectedData, setSelectedData] = useState<Experience>();
  const [cursor,setCursor]=useState("")
  const [openModel, setOpenModel] = useState('');
  const experienceService = useExperienceService();
  const [pageSize, setPageSize] = useState(5);
  const {userId} = useContext(UserContext);
  const {registeredUserId} = useContext(UserIdContext)
  const authentication = useAuthentication();

  const paginator = usePagination<ExperienceFilterModel>(
    {
      ps:5,
      user_id:registeredUserId?registeredUserId:userId?userId:user.id
    });
  const componets: SearchComponentProps[] = [
    {
			placeholder: "Search",
			key: "search",
			type: componentType.TEXT,
		},
  ]

  useEffect(() => {
    searchExperiences()
  }, [paginator.filterData])

  const searchExperiences = () => {
    loading.startLoading()
    experienceService.getExperiences(paginator.filterData).then((value)=>{
      setData(value.data.results)
      setExperienceData(value.data.results)
      
        loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      });
  }
  const cancel = () => {
    setShowAdd(false);
    setSelectedData(undefined);
  }

  const deleteData = (experience:Experience) => {
    loading.startLoading()
    experienceService.deleteExperience(experience!).then((value)=>{
      setData(value.data.results)
      searchExperiences()
      setSelectedData(undefined)
      loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      });
  }

  return (
    <>
         <div className="container mx-auto flex flex-col max-h-full ns-card w-full mt-5">
                <div
                    className={`fixed top-0 left-0 right-0 z-50
                   bg-slate-300 bg-opacity-80 flex items-center justify-center
                     w-full p-4 
                     overflow-x-hidden 
                     overflow-y-auto md:inset-0 h-modal md:h-full  transition ease-in-out duration-1000 ${
                       openModel === '' ? 'hidden' : 'block'
                     }`}
                  >
                          <Modal setOpenModel={setOpenModel} deleteMethod={deleteData} />
                </div>
                <div className="flex flex-row ">
                  <div className="flex justify-start mx-1 text-2xl">
                    Work Experience
                  </div>
                  <div className="flex justify-self-end">
                    <div className="items-center">
                      <button onClick={()=>{setShowAdd(!showAdd);setSelectedData(undefined)}} className="w-20 h-10 hover:bg-custom_orange-800 rounded-md hover:text-white flex items-center justify-center">
                        <FaPlus className=""/>
                      </button>  
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between ">
                <div className='flex gap-2 relative md:mx-2 flex-wrap pb-2 w-full justify-center items-center'>
                  <Loading {...loading} />
                {data?.map((experience: Experience) => (
                    <div key={experience.id} 
                     className='max-w-md group relative'>
                    <CustomCard className={`${selectedData?.id === experience.id && ' border-custom_orange-900'}`}>
                      {
                         authentication.isLoggedIn() && 
                    <CustomPopConfirm func={()=>{deleteData(experience); setSelectedData(experience)}} editFun={setShowAdd}/>

                      }
                                <div className="flex w-full justify-between pl-3 hover:cursor-pointer" 
                                onClick={() => {authentication.isLoggedIn() && assignOrsetNull(setSelectedData, selectedData, experience);}}
                                >
                                    <div className="flex flex-col items-center lg:mt-0 pr-6 ">
                                        <h3 className="text-lg self-start ">
                                          {experience?.job_title} / {experience?.company}
                                        </h3>
                                        <p>({experience?.start_date} - {!experience.currently_working?experience?.end_date:"Currently Working"})</p>
                                    </div>
                                </div>
                                <a href={`${experience?.experience_document}`} target='_blank'> <FaDownload className="text-gray-400 text-3xl" /> </a>
                                </CustomCard>
                            </div>
                ))}
                {data?.length===0?<Empty className="my-20 max-w-md"/>:""}
                </div>
                {
                  (showAdd || selectedData)?
                  <div className="container mx-auto flex-wrap  hidden md:block justify-center">
                    <ExperienceAdd searchExperiences={searchExperiences} experienceDetail={selectedData}/>
                  </div>
                  :""
                }  
                </div>
         </div>  
         
        <Dialog open={showAdd && (window.innerWidth < 768)} onCancel={cancel} footer={[]} >
        <ExperienceAdd searchExperiences={searchExperiences} experienceDetail={selectedData} 
        // cancel={cancel} 
        />
        </Dialog> 
    </>
  );
};

export default ExperienceList;
