import DownloadSection from "../../components/courses/download/DownloadSection";
import course1 from "../assets/images/courses-01.webp";
import Footer from "../../components/layout/footer/Footer";

import { FaStar, FaSearch, FaEllipsisH, FaShare, FaPlus, FaArchive } from "react-icons/fa"
import { MenuItem } from "../../types/MenuItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../../utils/translation";
import useCourseService from "../../components/courses/course/CourseService";
import { Course } from "../../types/Course";
import useLoading from "../../components/customs/loading/LoadingHook";
import Header from "../../components/layout/header/Header";
import ContextMenu from "../../components/menu/ContextMenu";


export const options: MenuItem[] = [
  {
    id: 'share',
    name: 'Share',
    link: "/",
    icon: <FaShare />
  },
  {
    id: 'creat_collection',
    name: 'Create Collection',
    link: "/",
    icon: <FaPlus />

  },
  {
    id: 'favourite',
    name: 'Favourite',
    link: "/",
    icon: <FaStar />
  },
  {
    id: 'archive',
    name: 'Archive',
    link: "/",
    icon: <FaArchive />
  }
];




function Courses() {

  const [courses, setCourses]= useState<Course[]>([])
  const sortMenuByTime = [{name:"Newest First",value:"Old First"},{name:"Old First"}]
  const getDataYearorMonth= [{name:"This Year",value:"This Year"},
     {name:"This Month",value:"This Month"},{name:"This Week",value:"This Week"}]
  const courseService = useCourseService()
  const loading = useLoading()

  useEffect( () => 
      {
          loading.startLoading()
          courseService.getCourses({search: '', category_id:undefined}).then(
          ({data: result}) => {
              setCourses(result.results)
              loading.stopLoading()
          }
      ).catch(error => loading.stopLoading())}
      , [])
  const [id, setId] = useState('');
  const [count, setCount] = useState(0);
  const {translate} = useTranslation()
  const handleClick = (e: any) => {
    e.preventDefault();
    if (count === 1) {
      hanldeClose(e); setCount(0)
    } else { setId(e.target.id); setCount(1); }

  }

  const hanldeClose = (e: any) => {
    setId('');
  }
  return (
    <>
      <Header title="My" underlined={translate('courses')} activeTab="courses" />
      <div className="w-full my-20">
        <div className="container lg:max-w-[1200px] mx-100% mr-auto ml-auto ">
          <div className="bg-[#eefbf3] py-[40px] px-[40px] rounded-[10px]  relative box-border flex">
            <ul className=" relative w-full h-full z-[1] transition-transform box-content p-0 m-0 flex flex-wrap pl-0 mb-0 list-none transform-[translate3d(0,0,0)]">
              <li className="w-[160px] mr-[30px] flex-shrink-0 h-[60px] relative transition-transform ">
                <button className="w-full h-[60px] border-[1px] border-solid border-[rgba(48,146,85,0.2)] rounded-[10px] bg-custom_orange-900 text-white text-[15px] font-medium transition-[all 0.3s ease-in-out 0s] px-[15px] py-0 whitespace-nowrap active:border-custom_dark_green active:text-custom_dark_green hover:border-custom_dark_green hover:text-white hover:bg-custom_dark_green " >
                  {translate('all_courses')}
                </button>
              </li>
              <li className="w-[160px] mr-[30px] flex-shrink-0 h-[60px] relative transition-transform ">
                <button className="w-full h-[60px] border-[1px] border-solid border-[rgba(48,146,85,0.2)] rounded-[10px] bg-white text-[15px] font-medium transition-[all 0.3s ease-in-out 0s] px-[15px] py-0 whitespace-nowrap active:border-custom_dark_green active:text-custom_dark_green hover:border-custom_dark_green hover:text-white hover:bg-custom_orange-800" >
                  Collections
                </button>
              </li>
              <li className="w-[160px] mr-[30px] flex-shrink-0 h-[60px] relative transition-transform ">
                <button className="w-full h-[60px] border-[1px] border-solid border-[rgba(48,146,85,0.2)] rounded-[10px] bg-white text-[15px] font-medium transition-[all 0.3s ease-in-out 0s] px-[15px] py-0 whitespace-nowrap active:border-custom_dark_green active:text-custom_dark_green hover:border-custom_dark_green hover:text-white hover:bg-custom_orange-800" >
                  Wishlist
                </button>
              </li>
              <li className="w-[160px] mr-[30px] flex-shrink-0 h-[60px] relative transition-transform ">
                <button className="w-full h-[60px] border-[1px] border-solid border-[rgba(48,146,85,0.2)] rounded-[10px] bg-white text-[15px] font-medium transition-[all 0.3s ease-in-out 0s] px-[15px] py-0 whitespace-nowrap active:border-custom_dark_green active:text-custom_dark_green hover:border-custom_dark_green hover:text-white hover:bg-custom_orange-800" >
                  Archived
                </button>
              </li>

            </ul>
            <div className="relative max-w-[300px] w-full h-full">
              <form action="#">
                <input type="text" name="" placeholder="Search here" id="" className="w-full h-[60px] rounded-[10px] border-[1px] border-[solid] border-[rgba(48,146,85,0.2)] py-0 px-[30px] pr-[90px] outline-none transition-[all 0.3s ease-in-out 0s] " />
                <button className="flex justify-center place-items-center absolute w-[50px] h-[50px] leading-[54px] text-center rounded-[10px] bg-custom_dark_green border-0 top-[7px] right-[7px] text-[16px] text-white">
                  <FaSearch />

                </button>
              </form>
            </div>


          </div>
          <div className="box-border">
            <div className="block overflow-hidden">
              <div className="pt-[20px]">
                <div className="flex flex-row flex-wrap justify-between">
                   {courses.map(course=><>
                    <div className="max-w-full flex-grow-0 flex-shrink-0 basis-auto lg:w-[33%]">
                    <div className="mt-[30px] border-[1px] border-solid bg-white border-[rgba(48,146,85,0.2)] hover:border-custom_dark_green rounded-[15px] p-[20px] transition-[all 0.3s ease 0s]">
                      <div className="relative">
                        <Link to={`/course_detail/${course.id}`}>
                          <img src={course.course_image as string} alt="" className="w-[350px] h-[300px] rounded-[15px]  align-middle " />
                        </Link>
                        <div className="absolute top-[10px] right-[10px] z-[2]">
                          <button onClick={handleClick} onDoubleClick={hanldeClose} id="1" className="w-[35px] h-[35px] border-none bg-white rounded-[50%] flex justify-center place-items-center "><FaEllipsisH className="text-[#52565b]" onClick={handleClick} id="1" /></button>
                          {ContextMenu(options, '1', id)}
                        </div>
                      </div>
                      <div className="pt-[25px]">
                        <div className="flex justify-between place-items-center">
                          <div className="">
                            <Link to={`/instruction_dashboard/courses/${course.id}`}>
                              <img src={course.course_image as string} alt="" className="w-[45px] h-[45px]  rounded-[50%]  max-w-full align-middle " />
                            </Link>
                            <div className="absolute top-[10px] right-[10px] z-[2]">
                              <button className="w-[35px] h-[35px] border-none bg-white 
                              rounded-[50%] flex justify-center place-items-center "><FaEllipsisH className="text-[#52565b]"  
                              onClick={handleClick} id="2" /></button>
                            </div>
                          </div>
                          <div className="flex-1 pl-[12px]">
                            <div className="text-[13px] text-[#52565b] font-normal"> Jason Williams || 
                            <span className="text-custom_dark_green">Ohula Malsh</span></div>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-[calc(1.275rem + 0.3vw)]">
                        <Link to={`/course_detail/${course.id}`} className="font-medium text-[#212832] 
                         hover:text-custom_dark_green text-[16px]  mt-[14px] inline-block leading-[1.4]">{course.name}</Link>

                      </h4>
                      <div>
                        <p className="text-[14px] text-[#52565b] font-normal mb-0 leading-[1.8]">38% Complete</p>
                        <div className="w-full h-[3px] bg-[#d3ded7] mt-[10px]">
                          <div className="w-[38%] h-full bg-custom_dark_green"></div>
                        </div>
                        <div className="flex justify-between place-items-center pt-[8px]">
                          <span className="text-[14px]  text-[#ffba00] space-[2px] flex "><FaStar />
                          <FaStar /><FaStar /> <FaStar /><FaStar className="text-[#d0d0d0]" /></span>
                          <p className="text-[14px] text-[#52565b] font-normal">Your rating</p>

                        </div>
                      </div>
                    </div>
                  </div>
                   </>)}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <DownloadSection />

      <Footer />
    </>
  );
}

export default Courses;
