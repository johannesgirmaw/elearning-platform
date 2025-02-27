import { useEffect, useState } from 'react';

import useLoading from '../../customs/loading/LoadingHook';
import { FaEdit, FaEllipsisV, FaRedo, FaRegSquare, FaTimesCircle, FaTrashAlt } from 'react-icons/fa';
import CustomCard from '../../customs/custom-card/CustomCard';
import useGroupService from './GroupService';
import { Group } from '../../../types/GroupPermission';
import GroupAdd from './GroupAdd';
import { useOutletContext } from 'react-router-dom';
import { assignOrsetNull } from '../../../utils/modal';
import { componentType } from '../../../types/Enums';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { Button, Card, Modal, Pagination, message } from 'antd';
import { usePagination } from '../../customs/pagination/usePagination';
import SearchBar from '../../commons/search-bar/SearchBar';
import useAuthorization, { isVisible } from '../auth/authorization';
import { useNavigate } from "react-router-dom";
import Loading from '../../customs/loading/Loading';

function GroupList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedData, setSelectedData] = useState<Group>()
  const [open, setOpen] = useState(false)

  const useGroup = useGroupService();
  const [addNew, setAddNew] = useState(false);
  const context: any = useOutletContext();
  const paginator = usePagination();
  const authorization = useAuthorization();
  const navigate = useNavigate()

  const components: SearchComponentProps[] = [
		{
			placeholder: "Search",
			key: "search",
			type: componentType.TEXT,
		},
    // {placeholder: positions
    //   key:"positi",
    //   options:
    // }
    
	]

  const onClose = () => {
    setOpen(false);
    setAddNew(false);
    setSelectedData(undefined);
  }

  useEffect(() => {
    // if(!authorization.canRead('customuser')){
    //   navigate(-1)
    // }
    authorization.requireRead('group')
    context.setTitle("Groups")
  },[])

  const loading = useLoading();
  useEffect(() => searchGroup(), [paginator.filterData]);

  const searchGroup = () => {
    loading.startLoading();
    useGroup
      .getGroups(paginator.filterData)
      .then(({ data: value }) => {
        setGroups(value.results);
        paginator.setTotal(value.count)
        loading.stopLoading();
      })
      .catch((error) => loading.stopLoading());
  };


  const deleteGroup = () => {
    if(selectedData?.id){
      useGroup.deleteGroup(selectedData?.id).then(value => {
        setSelectedData(undefined)
        setOpen(false)
        searchGroup()
        message.success("You have deleted successfully")
      })
    }
  }

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:mx-10">
        <div className="w-full pt-4 md:p-4">
          <div className="flex gap-2 flex-wrap items-center">
            <h1 className=" text-custom_orange-800 text-2xl font-bold text-center">
              Group Lists
            </h1>
            <button className="text-white px-3 py-1 text-lg rounded-lg border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out md:hidden "  onClick ={(() => setAddNew(!addNew))} >Add New</button>
            <SearchBar components={components} handleChange={paginator.handleChange} filteredData={paginator.filterData} />
          </div>
          <div className="flex flex-row gap-4 py-3 items-center text-gray-500">
            <i>
              <FaRegSquare />
            </i>
            <button onClick={searchGroup}>
            <i>
              <FaRedo />
            </i>
            </button>
            <i>
              <FaEllipsisV />
            </i>
             {selectedData && <Button className='border-none p-0'
                                onClick={() => setOpen(true)} ><FaTrashAlt className='p-0' /></Button>}
          </div>
          <Card >
            <div className='py-2 relative flex flex-wrap gap-4 '>    
              <Loading {...loading} />
            {groups?.map((group) => (
                <div key={group.id} onClick={()=> assignOrsetNull(setSelectedData, selectedData, group)} className='w-fit'>
                  <CustomCard className={`${selectedData?.id === group.id && ' border-custom_orange-900 '} relative `}>
                    <h1 className="text-gray-500 font-medium pr-4">
                      {group.name}
                    </h1>
                <div className='group-hover:flex hidden absolute top-1 right-1'>
                    <button type="button"
                        className="text-custom_orange-700 bg-transparent
                        hover:bg-custom_orange-800 hover:text-gray-900 rounded-lg 
                        text-sm p-1.5 ml-auto  items-center dark:hover:bg-gray-600
                        dark:hover:text-white md:hidden " onClick={(event) =>  {event.stopPropagation(); setAddNew(true)}} >
                 
                         <FaEdit />
                            <span className="sr-only">Edit modal</span>
                        </button>
                    <button type="button"
                        className="text-custom_orange-700 bg-transparent 
                        hover:bg-custom_orange-800 hover:text-gray-900 rounded-lg 
                        text-sm p-1.5 ml-auto  items-center dark:hover:bg-gray-600
                        dark:hover:text-white " onClick={() =>  {setSelectedData(group); setOpen(true)}} >
                 
                         <FaTimesCircle />
                            <span className="sr-only">Delete modal</span>
                        </button>
                      </div>
                  </CustomCard>{' '}
                </div>
              ))}
              </div>
              <hr className='pt-2'/>
              <Pagination    {...paginator} />
            </Card>
        </div>
        <div className={`w-full p-4 ${isVisible(authorization.canCreate('group'))} hidden md:block`}>
          <div className="col-span-4">
          <GroupAdd searchGroup={searchGroup} detail={selectedData} />
          </div>
        </div>
      </div>
      <Modal open={open} closable={false} okText={<span className='text-black'>Delete</span>} onCancel={onClose} title={<div className='bg-red-500 w-full text-white p-2'>Warning!</div>} onOk={deleteGroup}>
          Are you sure you want to Delete '{selectedData?.name}'
      </Modal>
        <Modal open={addNew && (window.innerWidth < 768)} onCancel={onClose} footer={[]} >
          <GroupAdd searchGroup={searchGroup} detail={selectedData} cancel={onClose} />
        </Modal>
    </>
  );
}
export default GroupList;
