import { createContext, useEffect, useState } from 'react';
import useUserService from './UserService';
import Loading from '../../customs/loading/Loading';
import useLoading from '../../customs/loading/LoadingHook';
import { PartialUser, User } from '../../../types/UserItem';
import { FaEllipsisV, FaRedo, FaRegSquare } from 'react-icons/fa';
import CustomCard from '../../customs/custom-card/CustomCard';
import UserAdd from './UserAdd';
import { assignOrsetNull } from '../../../utils/modal';
import { useOutletContext } from 'react-router-dom';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { GenderOption, componentType } from '../../../types/Enums';
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, Button, Modal, Pagination } from 'antd';
import useAuthorization, { isVisible } from '../auth/authorization';
import Profile from '../../../pages/course/ProfileInstructor';
import { usePagination } from '../../customs/pagination/usePagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../../slicers/store';
import CustomButton from '../../customs/custom-button/CustomButton';
import SearchBar from '../../commons/search-bar/SearchBar';
import SmallLoading from '../../customs/loading/SmallLoading';


export interface UserContextType{
  userId:string
}
export const UserContext = createContext<UserContextType>({} as UserContextType);



function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [selectedData, setSelectedData] = useState<User>();
  const userService = useUserService();
  const loading = useLoading();
  const context: any = useOutletContext();
  const authorization = useAuthorization();
  const paginator = usePagination({ps:5});
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const userDetail = useSelector((state: RootState) => state.user)

  const components: SearchComponentProps[] = [
		{
			placeholder: "Search",
			key: "search",
			type: componentType.TEXT,
		},
	]

  useEffect(() => {
    authorization.requireRead('customuser')
    context.setTitle("Users")
    searchUsers()
  }, [paginator.filterData]);

  const onClose = () => {
    setCreateUser(false)
    setSelectedData(undefined)
  }

  const searchUsers = ()=> {
    loading.startLoading();
    userService
      .getUsers(paginator.filterData)
      .then(({ data: result }) => {
        setUsers(result.results);
        paginator.setTotal(result.count)
        loading.stopLoading();
      })
      .catch((error) => loading.stopLoading());
  }

  const handleUserActivation = (user:User) => {
    loading.startLoading();
    userService.updateUser(user.id, {is_active:!user.is_active} as PartialUser).then((result) => {
      searchUsers();
      loading.stopLoading()
    })
  }

  return (
    <>
      {/*<SmallLoading {...loading}/>*/}
        <div className="flex flex-col-reverse p-1 sm:flex-row">
          <div className='flex-wrap sm:w-3/4' >
            <div className='flex flex-wrap items-center gap-2 pt-5'>

            <h1 className="p-1 text-2xl font-bold text-custom_orange-800">Users</h1>
  
            <button className="px-5 py-1 text-lg text-white transition duration-300 ease-out border border-gray-300 rounded-lg bg-custom_orange-700 hover:bg-black hover:ease-out md:hidden "  onClick ={(() => setCreateUser(!createUser))} >New User</button>
            <SearchBar  components={components} handleChange={paginator.handleChange} filteredData={paginator.filterData} />
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
              <div className="relative flex flex-col flex-wrap gap-4 mb-10 md:mr-10 max-sm:text-sm">
                {/* <Loading {...loading} /> */}
                {users.map((user) => (
                  <div key={user.id}
                  >
                    {' '}
                    <CustomCard 
                    className={`${selectedData?.id === user.id && ' border-custom_orange-900 '}`}
                    >
                    <div className="flex flex-row justify-between max-lg:flex-wrap">
                      <div className='flex flex-col flex-wrap max-sm:p-5'>
                          <div className="flex flex-row justify-start xl:space-x-5">
                            <div className='flex flex-col items-center space-y-2'>
                              <img src={user.profile_picture as string} className='w-[50px] h-[50px] rounded-full mx-6' />
                              <h1>{user.username}</h1>
                            </div>
                            <div className='flex flex-col flex-wrap'>
                              <div className='flex flex-row flex-wrap xl:space-x-5'>
                                <div>
                                  <h1> {user.first_name} {user.middle_name} {user.last_name}</h1>
                                </div>
                                <div>
                                <p>{user.email}</p>
                                </div>
                              </div>
                              <div className='flex flex-row flex-wrap xl:space-x-5'>
                                {/* <div>
                                    {user.date_of_birth}
                                </div> */}
                                <div>
                                    {user.phone_number}
                                </div>
                                <div>
                                    <h1> {GenderOption.find(val=>val.value===user?.gender)?.label}</h1>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className='self-center w-full pt-4 mt-5'/>
                          <div className='flex flex-row flex-wrap mx-5 space-x-3 lg:mx-16'>
                                {user.bio}
                            </div>
                      </div>
                      <div>
                        <div className="flex flex-col flex-wrap items-center justify-center space-y-2 max-sm:flex-row">
                          <CustomButton className="custom-button" 
                            text='View Detail' type='button'   
                            fun={() => {setUserId(user.id);setOpen(true);}} 
                            is_loading={<SmallLoading {...loading}/>}/>
                          <CustomButton className="custom-button" 
                            text='Edit' type='button'  
                            fun={()=>{assignOrsetNull(setSelectedData, selectedData, user); setCreateUser(true)}}  
                            is_loading={<SmallLoading {...loading}/>}/>
                          <CustomButton className={`custom-button ${user.id === userDetail.id && "hidden"}`}  
                            text={user.is_active?"Deactivate":"Activate"} 
                            fun={()=>handleUserActivation(user)}  
                            is_loading={<SmallLoading {...loading}/>}/>
                          </div>
                        </div>
                    </div>
                    </CustomCard>{' '}
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
                  onCancel={() => {setOpen(false);setUserId('')}}
                  width={1200}
                >
                  <Profile userId={userId} userListDetail={true}/>
                </Modal>
                <Pagination
                  className="mt-3 pagination-bar"
                  {...paginator}
                />
            </div>
          </div>
          <div className={`${isVisible(authorization.canCreate('customuser'))} hidden md:block sm:w-1/4`}>
            {selectedData ? <UserAdd userDetail={selectedData} searchUsers={searchUsers}/>  : <UserAdd  searchUsers={searchUsers}/>  }
          </div>
          </div>
    <Modal onCancel={onClose} destroyOnClose open={createUser && (window.innerWidth < 768)} footer={[]}>
      <UserAdd userDetail={selectedData} searchUsers={searchUsers} onClose={onClose} />
    </Modal>

    </>
  );
}
export default UsersList;
