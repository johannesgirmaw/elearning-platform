import logo from "../../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faPhoneAlt,faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import useAuthorization, { isVisible } from "../../account/auth/authorization";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { Language, Languages } from "../../../types/Translation";
import { useForm } from "react-hook-form";
import { RootState } from "../../../slicers/store";
import { useDispatch, useSelector } from "react-redux";
import { useUserService } from "../../account/auth/UserService";
import useTranslation from "../../../utils/translation";
import { setLanguage } from "../../../slicers/user";
import { PartialUser } from "../../../types/UserItem";
import { languages } from "../../account/profile/ProfileDetail";
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa";
import useAuthentication from "../../account/auth/authentication";

function Footer() {
    const authorize = useAuthorization();
    const { register, control, formState: { errors } } = useForm<Language>();
    const user = useSelector((state: RootState) => state.user)
    const userService = useUserService();
    const dispatch = useDispatch();
    const { translate } = useTranslation();
    const authentication = useAuthentication();

    const applyLanguage: (val: string) => void = (val: string) => {
        let data: PartialUser = { lang: val as Languages }
        if(authentication.isLoggedIn()){
            userService.updateUser(user.id, data).then((val) => {
                dispatch(setLanguage(val.data.lang));
              })
            }
            {
                dispatch(setLanguage(val as Languages));
            }
      };    
    
    return (
        <div className="bg-custom_orange-100  ">
            <div className=" w-full mx-auto container max-md:px-2 ">
                <div className="relative w-full flex ">
                        <div className="flex justify-between flex-wrap md:mt-[20px] w-full">
                            <div className="m-0 w-[300px] sm:w-[200]">
                                <div className="grid grid-rows-3 grid-flow-col">
                                    <div className="widget-logo">
                                        <a href="#"><img src={logo} alt="Logo" className="w-20" /></a>
                                    </div>

                                    <div className="md:mt-[10px]">
                                        <h4 className="text-custom_black-200 font-medium text-[22px] mb-0">Ethiopia</h4>
                                        <p className="text-custom_orange-900 font-[400] text-[15px] mt-[6px]">Bole, Addis Ababa.</p>
                                    </div>

                                    <ul className="md:pt-[25px]">
                                        <li>
                                            <p className="font-light"> <FontAwesomeIcon icon={faEnvelope} className="text-custom_orange-900" /> <a href="mailto:address@gmail.com">address@gmail.com</a> </p>
                                        </li>
                                        <li>
                                            <p className="font-light"><FontAwesomeIcon icon={faPhoneAlt} className="text-custom_orange-900 rotate-90" /> <a href="tel:9702621413">(251)9 262-1413</a> </p>
                                        </li>
                                    </ul>

                                    {/* <ul className="flex pt-[20px]">
                                    <li className="mt-[12px]"><a href="#"><i className="flaticon-facebook"></i></a></li>
                                    <li className="mt-[12px]"><a href="#"><i className="flaticon-twitter"></i></a></li>
                                    <li className="mt-[12px]"><a href="#"><i className="flaticon-skype"></i></a></li>
                                    <li className="mt-[12px]"><a href="#"><i className="flaticon-instagram"></i></a></li>
                                    </ul> */}
                                </div>
                            </div>

                            <div className="">
                                <h4 className="text-[#212832] font-medium text-[22px] mb-0">Service</h4>
                                <ul className="pt-1 font-[300]">
                                   <li className="mt-[12px]"><Link to="/#courses">Courses</Link></li>
                                   <li className="mt-[12px]"><Link to="/tutors">Tutors</Link></li>
                                </ul>
                            </div>
                            <div className=" ">
                                <h4 className="text-[#212832] font-medium text-[22px] mb-0">Quick Links</h4>

                                <ul className="pt-1 font-[300]">
                                    <li className={`mt-[12px] ${isVisible(authorize.isLoggedIn())}`}><Link to="/student_register">Sign Up as Student</Link></li>
                                    <li className={`mt-[12px] ${isVisible(authorize.isStaff())}`}><Link to="/instructor_register">Sign Up as Instructor</Link></li>
                                    <li className={`mt-[12px] ${isVisible(authorize.isStaff())}`}><Link to="/tutor_register">Sign Up as Tutor</Link></li>
                                    <li className="mt-[12px]"><a href="#">Privacy Policy</a></li>
                                    <li className="mt-[12px]"><a href="#">Terms &amp; Conditions</a></li>
                                    {/* <li className="mt-[12px]"><a href="#">Customer Support</a></li> */}
                                    {/* <li className="mt-[12px]"><a href="#">Course FAQ’s</a></li> */}
                                </ul>
                            </div>
                            <div className="mt-10 sm:0">
                            <CustomDropdown
                                placeholder={translate("languages")}
                                data={languages}
                                val={user?.lang || Languages.ENG}
                                onValueChange={(value) => applyLanguage(value)}
                                id="id"
                                label="language"
                                prefix={<><FaGlobe /></>}
                                control={control}
                                isSearchable={false}
                                register={register} />
                            </div>
                            {/* <div className="mt-10 sm:mt-0  ">
                                <h4 className="text-[#212832] font-medium text-[22px] mb-0">Subscribe</h4>

                                <div className="pt-[36px] ">
                                    <p className="mt-[12px] max-w-[250px] font-[300] pb-3">Lorem Ipsum has been them an industry printer took a galley make book.</p>

                                    <div className="widget-form">
                                        <form action="#" className="flex flex-col justify-start">
                                            <input type="text" placeholder="Email here"  className="w-full max-w-[250px] h-[55px] py-0 px-[30px] border-[1px] border-solid bg-white text-[#212832] font-[15px] font-medium outline-none rounded-[16px]"/>
                                            <button className="bg-custom_orange-900 w-[150px] h-[40px] rounded-[7px] mt-2 text-white  font-smal font-medium btn:hover-dark">Subscribe Now</button>
                                        </form>
                                    </div>
                                </div>
                            </div> */}
                        </div>                       
                    </div>

             </div>
            <div className="bg-custom_black-200 py-2 sm:py-4 gap-4  w-full">
                    <ul className="flex mx-auto max-sm:flex-col-reverse gap-3 justify-between container max-md:px-2 ">
                        <p className="md:text-lg text-white font-normal flex items-start">
                            <a href="https://www.nisirtech.com" className="text-white no-underline">
                                ©2024 NISIR IT SOLUTIONS. All rights reserved.
                            </a>
                        </p>
                        <p className="md:text-lg gap-1 flex flex-col items-center text-white font-normal ">
                            <h1 className="sm:hidden">Follow Us</h1>
                            <p className="flex items-center sm:gap-4 px-3  w-full justify-evenly">
                            <a href="#" className=""> <FaFacebook size={24} /> </a>
                            <a href="#" className=""> <FaLinkedin size={24}  /> </a>
                            <a href="#" className=""> <FaTelegram size={24}  /> </a>
                            <a href="#" className=""> <FaTwitter size={24}  /> </a>
                            <a href="#" className=""> <FaInstagram size={24}  /> </a>
                            <a href="#" className=""> <FaYoutube size={24}  /> </a>
                            </p>
                        </p>
                    </ul>
            </div>
        </div>
    );
}

export default Footer;