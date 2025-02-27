import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi"
import { CourseEnrolled } from "../../../types/Course"
import CustomButton from "../custom-button/CustomButton"
import { FaBook, FaTelegram } from "react-icons/fa"
import { GiDuration, GiLevelEndFlag } from "react-icons/gi"
import { MdOndemandVideo } from "react-icons/md"
import useAuthentication from "../../account/auth/authentication"
import { useNavigate } from "react-router-dom"
import useEnrollmentService from "../../courses/course/EnrollmentService"
import { useSelector } from "react-redux"
import { RootState } from "../../../slicers/store"
import { LocalStorage } from "../../../utils/localstorage"
import { getLabelByValue } from "../../../utils/array"
import { courseLevel } from "../../../types/Enums"
import { useState } from "react"

interface Props {
  course?: CourseEnrolled;
  id?: string
}

export const CoursePayment = (props: Props) => {
  const authentication = useAuthentication()
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const enrollmentService = useEnrollmentService()
  const [isCopied, setIsCopied] = useState(false);


  const handleTweet= (  ) => {
    const tweetContent = encodeURIComponent("Check out this awesome content!"); // The message you want to share
    const url = encodeURIComponent(window.location.href); // The URL you want to share

    // Construct the Twitter share URL
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetContent}&url=${url}`;

    // Open the Twitter share URL in a new window
    window.open(twitterShareUrl, '_blank');
  };

  const handleTelegram= (  ) => {    
    const message = encodeURIComponent("Check out this awesome content!"); // The message you want to share
    const url = encodeURIComponent(window.location.href); // The URL you want to share

  // Construct the Telegram share URL
  const telegramShareUrl = `https://t.me/share/url?text=${message}&url=${url}`;

  // Open the Telegram share URL in a new window
  window.open(telegramShareUrl, '_blank');
  };

  const handleFacebook = (  ) => {    
    // const message = encodeURIComponent("Check out this awesome content!"); // The message you want to share
    const url = encodeURIComponent(window.location.href); // The URL you want to share

    // Construct the Facebook share URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    // Open the Facebook share URL in a new window
    window.open(facebookShareUrl, '_blank');
  };

  const handleLinkedin = (  ) => {    
    const url = encodeURIComponent(window.location.href); // The URL you want to share
    const title = encodeURIComponent("Check out this awesome content!"); // The title you want to share

    // Construct the LinkedIn share URL
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;

    // Open the LinkedIn share URL in a new window
    window.open(linkedinShareUrl, '_blank');
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href); // Copy URL to clipboard
    setIsCopied(true); // Update copy status
    setTimeout(() => setIsCopied(false), 2000); // Reset copy status after 2 seconds
  };
 

  const handleEnrollment = () => {
    const data = { course: props.course?.id };
    if (props.course?.is_enrolled) {
      return navigate(`/course_detail/${props.id}/contents`)
    } else {
      enrollmentService.addCourseEnrollment(data).then((data) => {
        if (data) {
          return navigate(`/course_detail/${props.id}/contents`);
        } else {
          return navigate(`/course_detail/${props.id}`);
        }
      });
    }

  };

  const handleSaveRegisterCurrentPage = ()=>{
    setLocalstorage();
    navigate('/student_register')
  }
  const handleSaveLoginCurrentPage = ()=>{
    setLocalstorage();
    navigate('/login')
  }
  const setLocalstorage = ()=>{
    const localstorage = new LocalStorage();
    localstorage.setKeyValue('enrolmentpage',window.location.pathname)
  }

  return <div className=" w-full sm:w-11/12 ml-auto">
    <div className="bg-custom_light_green p-10 border border-custom_orange-900 rounded-xl">
      <h1 className="text-3xl font-bold text-custom_orange-900 text-center">
        {props.course?.course_price} (ETB)
      </h1>
      <ul className="border-t mt-9">
        <li className="border-b py-2">
          <i className="text-lg pr-1 text-custom_orange-900 inline-block">
            <GiDuration></GiDuration>
          </i>
          <strong className="text-lg font-medium text-custom_black">
            Duration
          </strong>
          <span className="block float-right font-normal text-lg text-gray-500">
            {props.course?.durations?.slice(0,-3)}hr
          </span>
        </li>
        <li className="border-b py-4">
          <i className="text-lg mr-1 text-custom_orange-900 inline-block">
            <MdOndemandVideo></MdOndemandVideo>
          </i>
          <strong className="text-lg font-medium text-custom_black">
            Lectures
          </strong>
          <span className="block float-right font-normal text-lg text-gray-500">
           {props.course?.contents}
          </span>
        </li>
        <li className="border-b py-4">
          <i className="text-lg mr-1 text-custom_orange-900 inline-block">
            <GiLevelEndFlag></GiLevelEndFlag>
          </i>
          <strong className="text-lg font-medium text-custom_black">
            Level
          </strong>
          <span className="block float-right font-normal text-lg text-gray-500">
             {getLabelByValue(courseLevel, props.course?.course_level)}
          </span>
        </li>
        <li className="border-b py-4">
          <i className="text-lg mr-1 text-custom_orange-900 inline-block">
            <FaBook></FaBook>
          </i>
          <strong className="text-lg font-medium text-custom_black">
            Language
          </strong>
          <span className="block float-right font-normal text-lg text-gray-500">
            English
          </span>
        </li>
        {/* <li className="border-b py-4">
          <i className="text-lg mr-1 text-custom_orange-900 inline-block">
            <TbCertificate></TbCertificate>
          </i>
          <strong className="text-lg font-medium text-custom_black">
            Certificate
          </strong>
          <span className="block float-right font-normal text-lg text-gray-500">
            Yes
          </span>
        </li> */}
      </ul>
      {
      !authentication.isLoggedIn()?<h1 className="text-custom_orange-900 font-extrabold text-xl mt-10">To enroll this course</h1>:""
      }
      {
        authentication.isLoggedIn() ?
          <>
            <CustomButton
              text={
                props.course?.is_enrolled ? 'Go To Course' : 'Enroll Now'}
              fun={handleEnrollment}
            />
          </> :
         <div className="flex max-sm:flex-wrap">
          <CustomButton
            // to="/student_register"
            text={"Register here"}
            fun={()=>handleSaveRegisterCurrentPage()}
            className='bg-custom_orange-700 text-white w-full p-5 mt-1 border rounded-2xl flex justify-center text-lg'
          />
          <CustomButton
          // to="/login"
          text={"Login here"}
          fun={()=>handleSaveLoginCurrentPage()}
          className='bg-custom_orange-700 text-white p-5 w-full mt-1 border rounded-2xl flex justify-center text-lg'
            />
         </div>
      }
    </div>
    <div className="mt-12">
      <h4 className="text-2xl font-medium -mt-2 mb-0">Share Course:</h4>
      <button onClick={handleCopy} className={`relative overflow-hidden w-full cursor-pointer mt-5 leading-[3.75rem] rounded-xl text-sm sm:text-lg sm:leading-[3.75rem] font-medium transition-all duration-300 ease-in inline-block px-8 whitespace-nowrap bg-custom_orange-900 text-white hover:text-custom_orange-900 hover:bg-white ${isCopied ? 'copied' : ''}`}>
                  {isCopied ? 'Course Link Copied' : 'Copy Course Link'}
              </button>
      <ul className="flex justify-between mt-6 flex-wrap">
        <li className="pt-2 mr-2">
          <button
            onClick={handleFacebook}
            className="w-12 h-12 leading-[52px] border border-custom_light_green rounded-lg
      flex items-center justify-center text-lg text-custom_black transition-all duration-300 ease-in"
          >
            <i>
              <FiFacebook></FiFacebook>
            </i>
          </button>
        </li>
        <li className="pt-2 mr-2">
          <button
            onClick={handleLinkedin}
            className="w-12 h-12 leading-[52px] border border-custom_light_green rounded-lg
      flex items-center justify-center text-lg text-custom_black transition-all duration-300 ease-in"
          >
            <i>
              <FiLinkedin></FiLinkedin>
            </i>
          </button>
        </li>
        <li className="pt-2 mr-2">
          <button
            onClick={handleTelegram}
            className="w-12 h-12 leading-[52px] border border-custom_light_green rounded-lg
      flex items-center justify-center text-lg text-custom_black transition-all duration-300 ease-in"
          >
            <i>
              <FaTelegram />
            </i>
          </button>
        </li>
        <li className="pt-2 mr-2">
          <button
            onClick={handleTweet}
            className="w-12 h-12 leading-[52px] border border-custom_light_green rounded-lg
      flex items-center justify-center text-lg text-custom_black transition-all duration-300 ease-in"
          >
            <i>
              <FiTwitter></FiTwitter>
            </i>
          </button>
        </li>
        {/* <li className="pt-2 mr-2">
          <button
            onClick={handleInstagram}
            className="w-12 h-12 leading-[52px] border border-custom_light_green rounded-lg
      flex items-center justify-center text-lg text-custom_black transition-all duration-300 ease-in"
          >
            <i>
              <FiInstagram></FiInstagram>
            </i>
          </button>
        </li> */}
      </ul>
    </div>
  </div>
}