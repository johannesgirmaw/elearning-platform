import { FiLogOut, FiBookOpen} from "react-icons/fi";
import logo from "../../../assets/images/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import { Link } from "react-router-dom";
import { useUserService } from "../../account/auth/UserService";
import { refreshKey, tokenKey } from "../../../utils/api";
import { useNavigate } from 'react-router-dom';
import { removeUser } from "../../../slicers/user";
import { useDispatch } from "react-redux";
import CustomText from "../../customs/custom-text/CustomText";
import useAuthentication from "../../account/auth/authentication";
import { Popover, Space } from "antd";

interface Props {
  title: string
}

function DashboardHeader(props: Props) {
  const user = useSelector((state: RootState) => state.user)
  const authentication= useAuthentication()
  const userService = useUserService()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const current_path = "/instructor_dashboard/profile";
  
  const handleLogout = () => {
    userService.logout().then(() => {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(refreshKey)
      dispatch(removeUser());
      navigate("/login");
    });
  }

function cropName(str: string) { return str.substring(0, 1).charAt(0).toUpperCase() }


const content = 
(
          <div
            className="z-50 w-32 bg-white border border-gray-300 rounded-md shadow-lg right-16">
            <Link
              to="/login"
              onClick={handleLogout}
              className="flex items-center justify-start px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              <FiLogOut className="mr-2"></FiLogOut>
              <span>Log out</span>
            </Link>
          </div>
  )
 return (
 <div className="sticky top-0 z-50 flex items-center justify-between w-full p-0 flex-nowrap bg-custom_black-200">
    <div className=" bg-custom_black-300">
    <Link to="/">
        <img src={logo} alt="Logo" className="pl-1 align-middle  w-28 sm:pl-4" />
      </Link>
    </div>

      <h1 className="w-full pl-2 text-xl text-left md:pl-10 text-custom_orange-900 md:text-3xl"><CustomText text={props.title ||"Dashboard"}/> </h1>
    <div className="flex items-center mr-2 lg:pr-6">
      <div className="flex text-white ">
        <FiBookOpen className="mt-1"/><Link to={"/"}><p className="px-1 text-custom_orange-900">Student</p></Link>
      </div>
      <div>
      <span className="px-1 text-custom_orange-900">{user.username}</span>
      </div>
      <div className="flex items-center justify-center ">
          {authentication.isLoggedIn() && 
                <Space wrap>
                  <Popover content={content}
                                trigger="hover">
                      <div   
                        className='w-[50px] h-[50px] rounded-full bg-custom_orange-800 text-white shadow-sm flex justify-center place-items-center cursor-pointer'>
                        {user.profile_picture ? 
                        <img src={user.profile_picture as string} alt="Logo" className="w-[50px] h-[50px] lg:w-29 rounded-full border-white" /> 
                        : 
                        <span className="text-white">{cropName(user.first_name) + cropName(user.last_name)}</span>
                        
                        }
                      </div>

                  </Popover>
                </Space>
                }
     
      </div>
    </div>
</div>)
}



export default DashboardHeader;
