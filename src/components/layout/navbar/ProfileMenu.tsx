import { FaTimes } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail, AiOutlineSkype } from "react-icons/ai";
import MobileMenu from "../../menu/MobileMenu";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import { useUserService } from "../../account/auth/UserService";
import { appURL } from "../../../utils/api";
import { Button } from "../../customs/custom-components/components";

function ProfileMenu(props: any) {
    const { setShowProfileMenu } = props;
    const user = useSelector((state: RootState) => state.user)
    const userService = useUserService()
    const navigate = useNavigate();

    const handleLogout = () => {
        userService.logout().then(res=>{
            localStorage.removeItem(`${appURL}.token.authorizationData`)
            if(res){
                navigate('/login')
            }
        });
      }
    return <div className="top-36 right-2 fixed w-auto h-auto bg-white z-50 overflow-none shadow-md p-3">

        <div className="flex justify-start place-items-center gap-2 mb-3">
            <Link to='/profile' className='w-[60px] h-[60px] rounded-full bg-custom_orange-800 text-white text-lg shadow-sm flex justify-center place-items-center cursor-pointer'>
                {user.profile_picture ? <img src={user.profile_picture as string} alt="Logo" className="w-29 lg:w-29 rounded-full border-white" /> : user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()}
            </Link>
            <div>
                <span className="text-xl">{user.first_name} {user.last_name}</span>
                <div className="text-sm text-gray-400">{user.email}</div>
            </div>

        </div>
        <hr />
        <div className="flex flex-col pt-3 gap-3 text-md">
            <Link to="/mycourse"> My Courses</Link>
            <Link to="/wishlist"> Wish List</Link>
            <Link to="/mycart"> My Cart </Link>
            <hr className="p-3" />
            <Link to="/messages" className="relative"> Messages<span className=" h-6 w-6   absolute top-0 right-1  text-center  bg-custom_orange-900 text-white rounded-[50%]">1</span></Link>
            <Link to="/notification" className="relative"> Notifications<span className=" h-6 w-6   absolute top-0 right-1  text-center  bg-custom_orange-900 text-white rounded-[50%]">2</span></Link>
            <Button onClick={handleLogout}> 
            Logout`</Button>

        </div>

    </div>;
}

export default ProfileMenu;