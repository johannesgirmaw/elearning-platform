import slider1 from "../../assets/images/slider-1.png";
import shape15 from "../../assets/images/shape-15.webp";
import { FaSearch, FaAngleRight, FaAngleLeft, FaBookOpen, FaBook, FaAward } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Course } from "../../types/Course";
import { Category } from "../../types/Category";
import useCourseService from "../courses/course/CourseService";
import useCategoryService from "../courses/category/CategoryService";
import { FetchData } from "../../types/FetchData";
import ExternalAdvert from "../tutors/advert/ExternalAdvert";
import { Course_Status } from "../../types/Enums";
import { Tag } from "antd";
import { assignOrsetNull } from "../../utils/modal";
import { Rating } from "../customs/custom-components/Star";
import { isVisible } from "../account/auth/authorization";
import { RootState } from "../../slicers/store";
import { useSelector } from "react-redux";
import useLoading from "../customs/loading/LoadingHook";
import Header from "../layout/header/Header";
import Loading from "../customs/loading/Loading";
import useMenuService from "../menu/menuItems";

function HeroSection(props: any) {
    const { CheckableTag } = Tag
    const {menuList} = useMenuService();
    const [courses, setCourses] = useState<FetchData<Course>>();
    const user = useSelector((state: RootState) => state.user)
    const [categories, setCategories] = useState<FetchData<Category>>();
    const [filterText, setFilterText] = useState("")
    const [pn, setPn]=useState(1)
    const [category_id, setCategoryId] = useState<any>(undefined)
    const [cursor, setCursor] = useState("")
    const courseService = useCourseService()
    const categoryService = useCategoryService();
    const loading = useLoading();
    const location = useLocation();
    
    useEffect(() => {
        if(window.location.hash && window.location.hash.length){
            const element = document.getElementById(window.location.hash.slice(1));
            element?.scrollIntoView({ behavior: 'smooth' })
        }
    },[window.location.hash])
    useEffect(() => setCategoryId(location.state?.id),[location.state?.id])

    useEffect(() => {  setPn(1); searchCourses(1); }, [filterText,  category_id])

    useEffect(() => {pn > 1 && searchCourses(pn)}, [pn])

    useEffect(() => searchCategory(), [cursor])

    const searchCourses = (pn: number) => {
        loading.startLoading();
        courseService.getCourses({search: filterText, ps:8,pn , category_id: category_id, course_status: Course_Status.PUBLISHED}).then(
        ({data: result}) => {
            if (pn > 1) result.results = [...(courses?.results||[]), ...result.results]
            setCourses(result)
            loading.stopLoading()
        }
        ).catch(error => loading.stopLoading())
    }

    const searchCategory = () => {
        categoryService.getCategories({ ps: 5, cursor: cursor, search: "" }).then(({ data: res }) => {
            setCategories(res)
        })
    }

    return (
        <>
            <div className="md:absolute top-0 left-0 w-full z-50">
                <Header title="Home" underlined="HomePage" activeTab="courses" />
            </div>
            <div className="bg-custom_orange-100">
                 <div className="container mx-auto md:pt-28">
                      <ExternalAdvert  position='100'/>
                 </div>
            </div>
          <div className="bg-custom_orange-100">
            <div className="container md:h-[750px] px-4 py-4 lg:h-[605px] w-full flex flex-col-reverse md:flex-row mx-auto justify-center md:justify-between place-items-center">
                <div className="">
                    <h4 className="text-[13px] font-medium text-custom_orange-900 mb-0 ">Start your favourite course</h4>
                    <div className=" text-[20px] lg:text-[45px] md:text-[35px] font-500 leading-[1.3] mt-1 md:mt-[25px] font-semibold">
                        <h2 className="md:w-[80%]">Now learning from anywhere, and build your bright career.
                        </h2>
                    </div>
                    <p className="mt-[55px] mb-0 text-[10px] leading-[1.8] hidden md:block text-[#52565b]">It has survived not only five centuries but also the leap into electronic typesetting.</p>
                </div>
                <div className="p-1 md:p-5">
                        {/* <img src={landing} alt="" className="w-full lg:w-[500px] md:pb-10 md:hidden" /> */}
                        <img src={slider1} alt="" className="w-full lg:w-[500px] hidden md:block md:pb-10" />
                </div>
            </div>
           </div>
            <div className="md:pt-[20px] w-full" id="courses">
                <div className="container lg:max-w-[1580px] mx-100% mr-auto ml-auto mx-4">
                    <div className="flex justify-between flex-col sm:flex-row place-items-center mx-4">
                        <div className="mt-5 md:mt-[-37px]">
                            <h2 className="md:text-[35px] text-2xl font-medium mb-0 leading-[1.4]">All Courses  of Tutorhub
                            {/* <span className="mx-2  relative text-custom_orange-900 before:absolute before:bg-shape_11 
                            before:bg-center before:bg-cover before:bg-no-repeat before:w-32 before:h-3 before:left-1/2 before:-bottom-3 
                            before:-translate-x-1/2"> */}
                                
                                {/* </span>  */}
                            </h2>
                        </div>
                        <div className="relative max-w-[500px] w-full mt-4 sm:mt-0">
                            <form>
                                <input type="text" name="" placeholder="Search Your course" id="" value={filterText} onChange={(e) => setFilterText(e.target.value)} className="w-full h-[54px] rounded-[10px] border-[1px] border-solid border-[rgba(48,146,85,0.2)] py-0 px-[30px] pr-[90px] outline-none transition-[all 0.3s ease-in-out 0s] " />
                                <button type="submit" className="flex justify-center place-items-center absolute w-[40px] h-[40px] leading-[44px] text-center rounded-[10px] bg-custom_orange-100 border-0 top-[7px] right-[7px] text-[16px] text-custom_orange-900">
                                    <FaSearch />

                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="flex px-4 md:px-8 gap-4 relative rounded-lg items-center bg-custom_orange-100 my-2  overflow-x-auto lg:flex-wrap lg:justify-center py-2">
                    {categories?.previous &&  <button className=" md:absolute left-2 rounded-full p-2 bg-white" onClick={() => setCursor(categories.previous.cursor)} ><FaAngleLeft size={24} /></button>}

                        {categories?.results.map((tag) => (
                            <CheckableTag
                            className={`px-4 text-lg md:w-64 text-center md:text-wrap text-black hover:bg-gray-100 bg-white hover:!text-custom_orange-700 py-2 border border-solid ${category_id === tag.id ? 'border-custom_orange-900' : 'border-gray-200'} rounded-xl`}
                            key={tag.id}
                            checked={category_id === tag.id}
                            onChange={(checked) => assignOrsetNull(setCategoryId,category_id, tag.id)}
                            >
                            {tag.category_name}
                        </CheckableTag>
                        ))}
                    {categories?.next && <button className="rounded-full md:absolute right-2 p-2 bg-white" onClick={() => setCursor(categories.next.cursor)}><FaAngleRight size={24} /></button>}
                    </div>

                    <div className="box-border mx-4 relative" >
                        <Loading   {...loading} />    
                        <div className="block overflow-hidden">
                            <div className="pt-[20px]">
                                <div className="flex  flex-row flex-wrap justify-evenly gap-3">
                                    {courses?.results?.map(course => <>
                                        <div key={course?.id} className="max-w-full flex-grow-0 flex-shrink-0 basis-auto lg:w-[350px] mr-[1px]">
                                            <div className="mt-[30px] border-[1px] border-solid bg-white border-[rgba(48,146,85,0.2)] rounded-[15px] p-[20px] transition-[all 0.3s ease 0s]">
                                                <div className="relative">
                                                    <Link to={`/course_detail/${course.id}`}>
                                                        <img src={course.course_image as string} alt="" className="w-[350px] h-[150px]  rounded-[15px] align-middle " />
                                                    </Link>
                                                </div>
                                                <h4 className="text-[calc(1.275rem + 0.3vw)]">
                                                    <Link to={`/course_detail/${course.id}`} className="font-medium text-[#212832]  hover:text-custom_orange-900 text-[16px]  mt-[13px] inline-block leading-[1.4]">{course.name}</Link>
                                                </h4>
                                                <div className="pt-[25px]">
                                                    <div className="flex place-items-center justify-between">
                                                      {course.instructor.map(instructor => <>
                                                        <div className="">
                                                            <img src={instructor["profile_picture"] as string} alt="" className="w-[45px] h-[45px]  rounded-[50%]  max-w-full align-middle " />
                                                        </div>
                                                        <div className="flex-1 pl-[12px]">
                                                            <div className="text-[13px] text-[#52565b] 
                                                        font-normal"> {instructor["first_name"]} {instructor["middle_name"] }
                                                            </div>
                                                        </div>
                                                        </>)}
                                                        <div className=" w-[80px] text-[13px] h-[35px] 
                                                    leading-[35px] bg-custom_orange-100 text-custom_orange-900 
                                                    inline-block text-center rounded-[5px] py-0 px-[10px]">{course.durations?.slice(0,-3)}hr</div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between  pt-[10px]">
                                                    <span className="text-[14px] font-normal text-[#212832] mr-[20px] flex place-items-center leading-[1]"><i className="text-custom_orange-900 mr-5px text-[18px] mr-[5px] leading-[1]"><FaBookOpen /></i>{course.chapters || 0} Chapters</span>
                                                    <span className="text-[14px] font-normal text-[#212832] mr-[20px] flex place-items-center leading-[1]"><i className="text-custom_orange-900 mr-5px text-[18px] mr-[5px] leading-[1]"><FaBookOpen /></i> {course.contents || 0} Contents</span>
                                                </div>
                                                <div className="p-[10px] bg-custom_orange-100 rounded-[10px] flex justify-between place-items-center mt-[20px]">
                                                    <div className="whitespace-nowrap p- flex place-items-center">
                                                        <span className="text-[16px] font-700 text-custom_orange-900 mr-[5px]">{course.course_price} (ETB)</span>
                                                        {/* <span className="text-[13px] font-700 text-[#212832] line-through mr-[5px]">400br </span> */}
                                                    </div>
                                                    <div className="whitespace-nowrap items-center flex place-items-center">
                                                        <span className="text-[13px] font-700 text-[#212832] mr-[5px]">{course.rating || 0}</span>
                                                        <Rating rating={course.rating || 0} widthHeight="h-[14px]" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </>)}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`mt-[40px] text-center ${isVisible(courses?.next !==undefined)}`}>
                        <button  onClick={() => setPn(1+pn)} className=" border-[1px] border-solid rounded-[10px]  border-custom_orange-900 text-custom_orange-900 hover:bg-custom_orange-900  hover:text-white font-medium  bg-custom_orange-100  py-2 px-2">Show more Courses</button>
                    </div>
                    <div className={`pt-[80px] w-full ${isVisible(!user.is_staff)}`}>
                            <div className="bg-custom_orange-100 rounded-[10px] px-4 lg:px-[100px] md:px-[100px] pt-[20px] pb-[50px] mb-[40px] relative">
                                <div className="flex flex-col lg:flex-row md:flex-row place-items-center flex-wrap">
                                    <div className=" w-full  flex-shrink-0 flex-grow-0 basis-auto max-w-full ">
                                        <div className="] mt-[25px] pb-[20px] ">
                                            <h5 className="text-custom_orange-900 font-medium mb-[20px] text-[20px]">Become A Instructor or Tutor</h5>
                                            <h2 className="md:text-[35px] font-medium mb-0 leading-[1.4]">You can join Tutorhub as an <Link className="font-bold" to="/instructor_register">instructor</Link> or a <Link className="font-bold" to="/tutor_register">Tutor</Link>?</h2>

                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-custom_orange-100">
                 <div className="container mx-auto ">
                      <ExternalAdvert  position='101'/>
                 </div>
            </div>

                    <div className="pt-[40px] pb-[80px] ">
                        <div className="w-full mx-auto ">
                            <div className="pb-[11px] text-center">
                                {/* <h5 className="text-[20px] font-medium text-custom_orange-900 mb-[20px] ">Over 1,235+ Course</h5> */}
                                <h2 className="text-[35px] font-medium text-[#212832] leading-[1.4] mb-0 ">How It Work?
                                </h2>

                            </div>

                            <div className="flex  flex-col md:flex-row justify-center lg:justify-between md:justify-between pt-[20px] place-items-center mx-4">
                                <div className="w-[300px] rounded-[10px] bg-custom_orange-100 p-[38px] pb-[35px] mt-[30px] z-[1] relative overflow-hidden">
                                    {/* <img src={shape15} alt="" className="absolute left-[-17px] top-0 z-[-1] max-w-full" /> */}
                                    <div> <i className="flex justify-center place-items-center w-[65px] h-[65px] leading-[68px] border-[1px] border-solid border-[rgba(48,146,85,0.2)] rounded-[10px] bg-white text-custom_orange-900 text-[32px] transition-[all 0.3s ease 0s]"><FaSearch /></i>
                                    </div>
                                    <div className="pt-[35px]">
                                        <h3 className="text-2xl font-medium text-[#212832] mb-0">Find Your Course</h3>
                                        <p className="text-[14px] text-[#696969] mb-0 mt-[15px] leading-[1.8]">It has survived not only counturie also leap into electronic</p>
                                    </div>
                                </div>
                                <div className="mt-[30px]">
                                    {/* <img src={shape17} alt="" className="max-w-full rotate-90 md:rotate-0 lg:rotate-0" /> */}
                                </div>
                                <div className="w-[300px] rounded-[10px] bg-custom_orange-100 p-[38px] pb-[35px] mt-[30px] z-[1] relative overflow-hidden">
                                    <img src={shape15} alt="" className="absolute right-[-34px] top-[-7px] z-[-1] max-w-full" />
                                    <div> <i className="flex justify-center place-items-center w-[65px] h-[65px] leading-[68px] border-[1px] border-solid border-[rgba(48,146,85,0.2)] rounded-[10px] bg-white text-custom_orange-900  text-[32px] transition-[all 0.3s ease 0s]"><FaBook /></i>
                                    </div>
                                    <div className="pt-[35px]">
                                        <h3 className="text-2xl font-medium text-[#212832] mb-0">Enroll to Course</h3>
                                        <p className="text-[14px] text-[#696969] mb-0 mt-[15px] leading-[1.8]">It has survived not only counturie also leap into electronic</p>
                                    </div>
                                </div>
                                <div className="mt-[30px]">
                                    {/* <img src={shape17} alt="" className="max-w-full rotate-90  md:rotate-0 lg:rotate-0" /> */}
                                </div>
                                <div className="w-[300px] rounded-[10px] bg-custom_orange-100 p-[38px] pb-[35px] mt-[30px] z-[1] relative overflow-hidden">
                                    {/* <img src={shape15} alt="" className="absolute right-[-10px] bottom-[-25px] z-[-1] max-w-full" /> */}
                                    <div> <i className="flex justify-center place-items-center w-[65px] h-[65px] leading-[68px] border-[1px] border-solid border-[rgba(48,146,85,0.2)] rounded-[10px] bg-white text-custom_orange-900  text-[32px] transition-[all 0.3s ease 0s]"><FaAward /></i>
                                    </div>
                                    <div className="pt-[35px]">
                                        <h3 className="text-2xl font-medium text-[#212832] mb-0">Get Certificate</h3>
                                        <p className="text-[14px] text-[#696969] mb-0 mt-[15px] leading-[1.8]">It has survived not only counturie also leap into electronic</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>

            </div>
            <div className="pt-[80px] w-full mt-[-0.3125rem]">
                            </div>
          
            <div className="bg-custom_orange-100"  >
                 <div className="container mx-auto ">
                      <ExternalAdvert  position='102'/>
                 </div>
            </div>
            <div className="py-[80px] w-full mt-[-0.3125rem]">
                <div className="w-full lg:max-w-[1200px] mx-auto">
                   
                </div>
            </div>

        </>
    );
}

export default HeroSection;
