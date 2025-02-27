import { useEffect, useState } from "react";
import { BsGlobe,  } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo1.png";
import { setLanguage } from "../../../slicers/user";
import { Language, Languages } from "../../../types/Translation";
import useTranslation from "../../../utils/translation";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { useUserService } from "../../account/auth/UserService";
import SideNav from "./SideNav";
import { RootState } from '../../../slicers/store';
import { useForm } from "react-hook-form";
import { SelectItem } from "../../../types/MenuItems";
import { refreshKey, tokenKey } from "../../../utils/api";
import { useNavigate } from 'react-router-dom';
import { removeUser } from "../../../slicers/user";
import useAuthentication from "../../account/auth/authentication";
import { Popover, Space } from "antd";
import { PartialUser } from "../../../types/UserItem";
import CheckableTag from "antd/es/tag/CheckableTag";
import { isVisible } from "../../account/auth/authorization";
import useMenuService from "../../menu/menuItems";
import Menu from "../../menu/Menu";

function Navbar() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [sticky, setSticky] = useState("");
  const location = useLocation();
  const { menuList} = useMenuService();
  const { translate } = useTranslation();
  const dispatch = useDispatch();
  const userService = useUserService()
  const navigate = useNavigate();

  const languages: SelectItem<string>[] = [
    { label: 'Amharic', value: Languages.AMH },
    { value: Languages.ENG, label: 'English' },
  ];
  const authentication = useAuthentication();
  const user = useSelector((state: RootState) => state.user)
  function cropName(str: string) { return str?str.substring(0, 1).charAt(0).toUpperCase():"" }
  const { register, control, formState: { errors } } = useForm<Language>();
 
 
  const applyLanguage: (val: string) => void = (val: string) => {
    let data: PartialUser = { lang: val as Languages }
    if(authentication.isLoggedIn()){
      userService.updateUser(user.id, data).then((val) => {
        dispatch(setLanguage(val.data.lang));
      })
    }else{
      dispatch(setLanguage(val as Languages));
    }

  };


  const handleLogout = () => {
    userService.logout().then(() => {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(refreshKey)
      dispatch(removeUser());
      navigate("/login");
    });
}
  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const top = window.innerWidth > 1024 ? 68 : 28;
    const stickyClass =
      scrollTop >= top
        ? ' animate-sticky fixed top-0 left-0 w-full z-30 bg-white shadow-md  '
        : '';
    setSticky(stickyClass);
  }
  // on render, set listener
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    }
  });
  useEffect(() => {
    window.scroll(0,0)
  }, [location.pathname])

const content = 
(
 <div className="z-50 w-40 mt-2 bg-white border border-gray-300 rounded-md shadow-lg right-4 top-12">
    <Link to={user.is_staff? "/instructor_dashboard/profile" : "/portal#profile" }
      className="flex items-center justify-start px-4 py-2 text-gray-800 hover:bg-gray-200"
    >
      <FiUser className="mr-2"></FiUser>
     <span>Profile</span> 
    </Link>

    <Link
      to="/login"
      onClick={handleLogout}
      className="flex items-center justify-start px-4 py-2 text-gray-800 hover:bg-gray-200"
    >
      <FiLogOut className="mr-2"></FiLogOut>
      <span>Log out</span>
    </Link>
  </div>
);
  return (
    <>
      {/* <div className={sticky}> */}
      <div className={sticky}>

        <div className="container mx-auto">
          <div
            className={
              " flex justify-between items-center px-2 py-3 relative mr-1 lg:mr-0" +
              (sticky
                ? " border-none roundeded-none "
                : " rounded-2xl mt-2 md:mt-7 border border-custom_orange-900 ")
            }
          >
            <div>
              <Link
                to="/"
                className="flex text-2xl no-underline text-inherit place-items-center"
              >
                <img src={logo} alt="Logo" className="w-14" />
                <span className="text-custom_dark_green">Tutorhub</span>
              </Link>
            </div>

            <div className="hidden lg:block">
            </div>
            <div className="hidden lg:block">
              <ul className="flex items-center">
              <li className="mr-2">
             
                </li>
                <li className="mr-1"> 
                      <Menu />
                    </li>
                {!authentication.isLoggedIn() && 
                  <>
                    <li className="mr-4">
                      <Link
                        to="/login"
                        replace={true}
                        className="hover:text-custom_orange-900 relative text-md font-medium capitalize text-custom_black-200 block 
                        transition-all duration-300 ease-in px-1 py-2.5     leading-tight  rounded   focus:outline-none focus:ring-0   items-center"
                      >Log in
                      </Link>
                    </li>
             
                  </>
                
                }
              <li className="mx-7 p-[0.5em] rounded-md bg-transparent flex place-items-center">
                  <Space wrap>
                    <Popover 
                        content=
                          {
                            <CustomDropdown
                              placeholder={translate('languages')}
                              data={languages}
                              register={register}
                              label='language'
                              val={user?.lang}
                              onValueChange={(value) => applyLanguage(value)}
                              options={{
                                required: 'Language is required'
                              }}
                              className="w-40"
                              isSearchable={true}
                              control={control}
                            />
                          }
                        title="Select Language" 
                        trigger="hover"
                        >
                        <BsGlobe className='mr-1 text-3xl' />
                    </Popover>
                  </Space>
                </li>
                
                {
                authentication.isLoggedIn() && 
                <Space wrap>
                  <Popover content={content}
                                title="Profile setting" 
                                trigger="hover">
                      <div  
                        className='w-[50px] h-[50px] rounded-full bg-custom_orange-800 text-white shadow-sm flex justify-center 
                        place-items-center cursor-pointer'>
                        {user.profile_picture ? 
                        <img src={user.profile_picture as string} alt="Logo" className="w-[50px] h-[50px] lg:w-29 rounded-full border-white" /> : 
                        <span className="text-white">{cropName(user.first_name) + cropName(user.last_name)}</span>}
                      </div>
                  </Popover>
                </Space>
                }
              </ul>
            </div>
            <div className={`lg:hidden ${isVisible(!authentication.isLoggedIn())}`}>
              <Link
                  to="/login"
                  replace={true}
                  className="hover:text-custom_orange-900 relative text-md font-medium capitalize text-custom_black-200 block 
                  transition-all duration-300 ease-in px-1 leading-tight  rounded   focus:outline-none focus:ring-0   items-center"
                >Log in
              </Link>
            </div>
             <div className="absolute hover:cursor-pointer right-3 lg:hidden hover:text-custom_orange-700" onClick={()=>setShowSideNav(!showSideNav)}>
             {!showSideNav?
               <AiOutlineMenu className="text-black text-[30px] post"/>:
               <AiOutlineClose className="text-black text-[30px] post"/>}
             </div>
            {showSideNav ? (
              <div
                className="fixed top-0 left-0 z-20 w-full h-full transition-all duration-300 ease-in bg-custom_black-200 opacity-70"
                onClick={() => setShowSideNav(false)}
              ></div>
            ) : (
              ''
            )}
            <div className="lg:hidden">
              {showSideNav ? <SideNav setShowSideNav={setShowSideNav} /> : ''}
            </div>
          </div>
        <div className="flex px-2 md:px-4 rounded-lg items-center  overflow-x-auto hide-scrollbar lg:hidden py-2">
            {menuList.map((tag) => (
                            <CheckableTag
                            className={`px-4 text-lg md:w-64 text-center md:text-wrap text-black  hover:bg-custom_orange-700 hover:font-semibold py-1  border-none ${location.pathname === tag.link ? 'bg-custom_orange-700 text-white' : 'bg-gray-100'} rounded-xl`}
                            key={tag.id}
                            checked={location.pathname === tag.link}
                            onChange={(checked) => navigate(tag.link, {state:{id: tag.id}})}
                            >
                            {tag.name}
                        </CheckableTag>
                        ))}
            </div>
        </div>

      </div>
      {showSideNav ? (
        <div
          className="fixed top-0 left-0 z-20 w-full h-full transition-all duration-300 ease-in bg-custom_black-200 opacity-70"
          onClick={() => setShowSideNav(false)}
        ></div>
      ) : (
        ""
      )}
      <div className="lg:hidden">
        {showSideNav ? <SideNav setShowSideNav={setShowSideNav} /> : ""}
      </div>
    </>
  );
}

export default Navbar;
