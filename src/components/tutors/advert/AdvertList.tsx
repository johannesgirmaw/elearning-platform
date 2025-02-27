import { useEffect, useState } from 'react';
import Loading from '../../customs/loading/Loading';
import useLoading from '../../customs/loading/LoadingHook';
import { Advert } from '../../../types/AdvertItem';
import { FaEllipsisV, FaRedo, FaRegSquare } from 'react-icons/fa';
import CustomCard from '../../customs/custom-card/CustomCard';
import AdvertAdd from './AdvertAdd';
import { assignOrsetNull } from '../../../utils/modal';
import { useOutletContext } from 'react-router-dom';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { componentType } from '../../../types/Enums';
import AdvertCard from './AdvertCard'


import { Checkbox, Modal } from 'antd';
import useAdvertService from './AdvertService';
function AdvertsList() {
  const [adverts, setAdverts] = useState<Advert[]>([
   ]);
  const [userId, setUserId] = useState("");
  const [selectedData, setSelectedData] = useState<Advert>();
  const [addNew, setAddNew] = useState(false);
  const advertservice = useAdvertService();
  const loading = useLoading();
  const context: any = useOutletContext();
  const components: SearchComponentProps[] = [
		{
			placeholder: "Search",
			key: "search",
			type: componentType.TEXT,
		},
	]

  const cancel = () => {
    setAddNew(false);
    setSelectedData(undefined);
  }

 const editAdvert=(data:Advert)=>{
  console.log("data",data.end_time)
   setSelectedData(data)
  }

  
  useEffect(() => {
    context.setTitle("Adverts")
  },[])
  
  useEffect(() => {
    searchAdverts()
  }, []);

const searchAdverts = ()=> {
    loading.startLoading();
    advertservice
      .getAdverts({position:null,isHome:false})
      .then(({ data: result }) => {
        
        setAdverts(result.results);
        loading.stopLoading();
      })
      .catch((error) => loading.stopLoading());
}
  return (
    <>
      {/*<SmallLoading {...loading}/>*/}
        <div className="flex md:mx-10 p-2">
        <div className='w-full flex-wrap pt-2 md:p-4' >
          <div className='flex justify-between gap-2 '>
            <h1 className="text-custom_orange-800 text-2xl font-bold">Adverts</h1>

            <button className="text-white text-md rounded-[30px] border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out md:hidden  px-[10px] py-0"  onClick ={(() => setAddNew(!addNew))} >Add New</button>
          </div>
          <div className="flex flex-row gap-4 py-3 text-gray-500">
            
            <Checkbox  />
            <i>
              <FaRedo />
            </i>
            <i>
              <FaEllipsisV />
            </i>
          </div>
            <div className="md:mr-10 mb-10 relative flex flex-col gap-4">
              <Loading {...loading} />
              {adverts.map((advert) => (
                <AdvertCard value={advert}  searchDatas={ searchAdverts} editAdvert={editAdvert}/>
              ))}
          </div>
        </div>
        <div className='w-2/5 hidden md:block p-4'>
          <div className="col-span-3">
            <AdvertAdd advertDetail={selectedData} cancel={cancel} searchAdverts={searchAdverts}/>
          </div>
        </div>
        </div>
        <Modal open={addNew && (window.innerWidth < 768)} onCancel={cancel} footer={[]} >
          <AdvertAdd advertDetail={selectedData} cancel={cancel} searchAdverts={searchAdverts}/>
        </Modal>
    </>
  );
}
export default AdvertsList;
