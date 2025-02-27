import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthorization from "../../account/auth/authorization";
import { useUserService } from "../../account/auth/UserService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import useAuthentication from "../../account/auth/authentication";
import { refreshKey, tokenKey } from "../../../utils/api";
import { removeUser } from "../../../slicers/user";
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/images/logo1.png";
import MobileMenu from "../../menu/MobileMenu";

function SideNav(props: any) {
    const { setShowSideNav } = props;
    const userService = useUserService();
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
            userService.logout().then(() => {
              localStorage.removeItem(tokenKey);
              localStorage.removeItem(refreshKey)
              dispatch(removeUser());
              navigate("/login");
            });
        }
    const authorization = useAuthorization();
    const authentication = useAuthentication();
    function cropName(str: string) { return str?str.substring(0, 1).charAt(0).toUpperCase():"" }

    return <div className="left-0 fixed top-0 w-80 h-full bg-white z-50 pt-7 overflow-auto">
        <Link to = "" className="absolute top-5 right-6 text-3xl text-custom_black-200" onClick={() => setShowSideNav(false)}>
            <i className="text-lg"><FaTimes /></i>
        </Link>
        <div className="pt-7">
           { authentication.isLoggedIn()?
            <>
                <p className="text-sm text-custom_black-200white font-normal mb-0 flex justify-center">
                
                <Link to='/instructor_dashboard/profile'  
                  className='w-[100px] h-[100px] rounded-full bg-custom_orange-800 text-white shadow-sm flex justify-center place-items-center cursor-pointer'>
                  { user.profile_picture ? 
                    <img src={user.profile_picture as string} alt="Logo" className="w-[100px] h-[100px] lg:w-29 rounded-full border-white" /> : 
                    <span className="text-white">{cropName(user.first_name) + cropName(user.last_name)}</span>}
                </Link>
            </p>
            </>
            :
            <div>
            <Link
              to="/"
              className="flex text-2xl no-underline text-inherit place-items-center justify-center"
            >
              <img src={logo} alt="Logo" className="w-14" />
              <span className="text-custom_dark_green">Tutorhub</span>
            </Link>
          </div>  
          }  
    
        </div>
        {
            authentication.isLoggedIn()? 
            <div className="pt-7">
                <ul className="flex items-center justify-center">
                    <li className="mr-5">
                        <button onClick={handleLogout} className="text-sm font-medium capitalize text-custom_black-200 transition-all duration-300 ease-in block h-11 leading-10 px-7
                        border border-custom_orange-900 rounded-md bg-white hover:bg-custom_orange-900 hover:text-white">Logout</button>
                    </li>
                    
                </ul>
            </div>:  
            <div className="pt-7">
                <ul className="flex items-center justify-center">
                    <li className="mr-5">
                        <button><Link to="/login" className="text-sm font-medium capitalize text-custom_black-200 transition-all duration-300 ease-in block h-11 leading-10 px-7
                        border border-custom_orange-900 rounded-md bg-white hover:bg-custom_orange-900 hover:text-white">
                        Sign In
                        </Link></button>
                    </li>
                </ul>
            </div>
        }
        <MobileMenu />
    </div>;
}

export default SideNav;