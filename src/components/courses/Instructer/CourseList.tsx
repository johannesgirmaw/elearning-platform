import Footer from "../../layout/footer/Footer"
import { FiAlignLeft, FiAlignJustify, FiEyeOff } from "react-icons/fi"
import Dropdown from "../../menu/Dropdown"
import { Link, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { Course, CourseMissingType, CourseTableSearchModel } from "../../../types/Course"
import useCourseService from "../course/CourseService"
import Loading from "../../customs/loading/Loading"
import useLoading from "../../customs/loading/LoadingHook"
import { Modal } from '../../commons/modal/Modal';
import {Modal as Dialog, Empty} from 'antd';
import CustomDropdown from "../../customs/custom-input/CustomDropdown"
import { SelectItem } from "../../../types/MenuItems"
import { useForm } from "react-hook-form"
import CustomText from "../../customs/custom-text/CustomText"
import { FaEdit, FaEllipsisV, FaRedo, FaTimes, FaTimesCircle, FaTrashAlt } from "react-icons/fa"
import { Button } from "../../customs/custom-components/components"
import CourseAddPage from "../../../pages/course/CourseAddPage"
import { Course_Status, componentType, courseLevel, courseStatus, courseType } from "../../../types/Enums"
import { SearchComponentProps } from "../../commons/search-bar/search"
import { usePagination } from "../../customs/pagination/usePagination"
import CourseAdd from "../course/CourseAdd"
import { Checkbox, Pagination } from "antd"
import SearchBar from "../../commons/search-bar/SearchBar"
import CustomCard from "../../customs/custom-card/CustomCard"
import { assignOrsetNull } from "../../../utils/modal"
import { Rating } from "../../customs/custom-components/Star"
import { getLabelByValue } from "../../../utils/array"
import CourseMissing from "../course/CourseMissing"
import { data } from "../../../pages/course/InstructorDashboard"


function CoursesList(props: any) {
    const [courses, setCourses] = useState<Course[]>([])
    const paginator = usePagination<CourseTableSearchModel>({method : "my_courses"})
    const [courseMissing, setCourseMissing] = useState<CourseMissingType>();
    const [open, setOpen] = useState(false);
    const context: any = useOutletContext();
    const courseService = useCourseService();
    const [selectedData, setSelectedData] = useState<Course>();
    const loading = useLoading()
    const [createNewCourse, setCreateNewCourse] = useState(false);
    

	const components: SearchComponentProps[] = [
		{
			placeholder: "Search",
			key: "search",
			type: componentType.TEXT,
		},
        {
            placeholder: "Course Status",
            key: "course_status",
            type: componentType.DROPDOWN,
            options: courseStatus,
        }
		// {
		// 	placeholder: "Start date",
		// 	key: "sd",
		// 	type: componentType.DATE,
		// },
		// {
		// 	placeholder: "End date",
		// 	key: "ed",
		// 	type: componentType.DATE,
		// },
	]


    useEffect(() => {
        context.setTitle("Courses")
    }, [])

    useEffect(() => {
        searchCourses()
       }, [paginator.filterData])

    const searchCourses = () => {
        loading.startLoading()
        courseService.getCourses(paginator.filterData).then(
            ({ data: result }) => {
                setCourses(result.results)
                paginator.setTotal(result.count)
                loading.stopLoading()
            }
        ).catch(error => loading.stopLoading())
    
    }
    const cancel = ()=>{
        setSelectedData(undefined);
        setCreateNewCourse(false)
    }
       
    const [openModel, setOpenModel] = useState("")
    const deleteCourse = async () => {
        let id = openModel === "" ? openModel : ""
        courseService.deleteCourse( {id: openModel ? openModel : ''}).then(result => {
            courseService.getCourses(paginator.filterData).then(
                ({ data: result }) => {
                    
                    setCourses(result.results)
                    loading.stopLoading()
                }
            )
            setOpenModel("")
        })
    }
    
    const courseRequestPublish = (id: string) => {
        courseService.courseDo(id, "ready_to_publish").then(({data:value}) => {
            if (value.invalid){
                setOpen(true)
                setCourseMissing(value as any)
            }else {
                searchCourses()
            }
        })
    }


    return <>
        <div className="sm:px-0 pb-20 overflow-hidden">
            <div className="flex flex-wrap">
            <div className=" flex-1 pb-20 h-fit  mr-0 flex flex-wrap">
            <div className="w-full flex items-center flex-wrap gap-4 sm:pl-4 mt-5 text-center">
                <span className="text-3xl pl-2">My Courses</span>
            <div className="" >
                        <Button className="text-white px-5 py-3 text-lg rounded-lg border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out" 
                        onClick ={(() => setCreateNewCourse(!createNewCourse))}
                        >New Course</Button>
                    </div>
            <SearchBar components={components} filteredData={paginator.filterData} handleChange={paginator.handleChange} />
          </div>

            <div className="flex w-full flex-row gap-4 items-center py-3 text-gray-500">
            <Checkbox  />
            <button onClick={searchCourses}>
            <i>
              <FaRedo />
            </i>
            </button>
            <i>
              <FaEllipsisV />
            </i>
             {selectedData && <Button className='border-none p-0 font-semibold'
                                onClick={() => setOpenModel(selectedData.id)} ><FaTrashAlt className='p-0' /></Button>}
          </div> 
                <div className={`fixed top-0 left-0 right-0 z-50
         bg-slate-300 bg-opacity-80 flex flex-wrap items-center justify-center
           w-full p-4 
           overflow-x-hidden 
           overflow-y-auto md:inset-0 h-modal md:h-full  transition ease-in-out duration-1000 ${openModel === "" ? "hidden" : 'block'}`}
                >
                    <Modal setOpenModel={setOpenModel} deleteMethod={deleteCourse} />
                </div>     
                <div className="flex flex-wrap gap-4 relative">
                    <Loading {...loading} />
                {courses?.map(course =>
            <CustomCard className={`${selectedData?.id === course.id && ' border-custom_orange-900'} relative`}>

                    <div className="flex flex-wrap items-center justify-between max-w-[720px] group ">
                       <Button className='text-custom_orange-700 bg-transparent absolute top-0 right-8
                            hover:bg-custom_orange-800 hover:text-gray-900 rounded-lg 
                            text-sm p-2 ml-auto items-center dark:hover:bg-gray-600
                            dark:hover:text-white hidden group-hover:flex ' 
                            onClick={() =>{assignOrsetNull(setSelectedData, selectedData, course); setCreateNewCourse(!createNewCourse) 
                            }} >
                            <FaEdit  />  
                      </Button>

                      <button type="button"
                        className="text-custom_orange-700 bg-transparent absolute top-1 right-1
                        hover:bg-custom_orange-800 hover:text-gray-900 rounded-lg 
                        text-sm p-1.5 ml-auto items-center dark:hover:bg-gray-600
                        dark:hover:text-white hidden group-hover:flex " onClick={() => setOpenModel(course.id)} >
                 
                         <FaTimesCircle />
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div className="grid md:grid-cols-5 grid-cols-3 gap-y-4 md:gap-y-0 items-center  ml-3">
                            <div className="mr-5 h-full row-span-2 lg:mb-0">
                                <Link to={`/instructor_dashboard/courses/${course.id}`}>
                                    <img className="rounded w-20 h-20 sm:w-24 sm:h-24" src={course.course_image as string} alt="" />
                                </Link>
                            </div>
                             <div className="flex w-full  col-span-2 row-span-2 md:row-span-1 md:col-span-4 flex-row flex-wrap sm:justify-between gap-x-2  items-center lg:mt-0 ">

                                <h3 className="text-lg font-bold self-start ">
                                    {course?.name}
                                </h3>
                                <div className="flex flex-wrap  self-start mb-0  justify-start gap-2 sm:gap-4">
                                    <span className="bg-custom_orange-100 text-custom_orange-700 px-4 py-0.5 rounded-3xl text-center text-sm" >{getLabelByValue(courseType, course.course_type)}</span>
                                    <span className="px-4 py-0.5 mr-2 bg-orange-400 rounded-3xl text-center text-sm" >{getLabelByValue(courseLevel, course.course_level)}</span>

                                    <span className=" mr-2 bg-gray-300 text-blue-500 px-4 py-0.5 rounded-3xl text-center text-sm" >{getLabelByValue(courseStatus, course.course_status)}</span>
                                    {course.course_status === Course_Status.DRAFT && <button className=" bg-gray-200 self-center text-custom_orange-800 px-1 py-1 rounded-lg" onClick={() => courseRequestPublish(course.id)}>Request Publish</button>}
                                </div>
                            </div>
                        
                        <div className={`flex flex-wrap item-center col-span-3 md:col-span-4  mt-0 sm:mt-10 justify-start gap-2 sm:gap-4  ${props.visibleMenuList ? 'mt-10' : 'mt-0 lg:mt-10'}`}>
                            <div className="text-xs p-1 w-36 lg:36 bg-gray-300 h-10 rounded-lg  xl:w-44 flex items-center justify-center flex-col">
                                <p className="text-md ">Earned</p>
                                <span className="text-md font-bold text-blue-600">$5,68.00</span>
                            </div>
                            <div className="text-xs p-1 w-36 lg:36 bg-custom_orange-100 h-10 rounded-lg  xl:w-44 flex items-center justify-center flex-col">
                                <p className="text-md ">Enrollment’s</p>
                                <span className="text-md font-bold ">{course.enrolled_count}</span>
                            </div>
                            <div className="text-xs p-1 w-36 lg:36 bg-red-100 h-10 rounded-lg  xl:w-44 flex items-center justify-center flex-col">
                                <p className="text-md ">Course Rating</p>
                                <span>
                                    <div className="flex items-center gap-1">
                                        <p className="ml-2 text-md text-yellow-600 font-medium  dark:text-gray-400">{course.rating || '0.0'}</p>
                                        <Rating  rating={course.rating || 0} widthHeight="w-3 h-3" />
                                    </div>
                                </span>
                            </div>
                        </div>
                     </div>
                    </div>
                </CustomCard>
                )}
                </div>
                <hr className="mt-2 w-full" />
                {courses.length ?  <Pagination  {...paginator} className="w-full"/> : <Empty className="flex justify-center w-full"/>}
            </div>
            {(createNewCourse || selectedData) && <div className="hidden md:block flex-1">
                <CourseAdd courseData={selectedData} searchCourses={searchCourses} cancel={cancel} />
            </div>}
            </div>
        </div>
        <Dialog open={createNewCourse && (window.innerWidth < 768)}  onCancel={cancel}  footer={[]} > 
            <CourseAdd courseData={selectedData} searchCourses={searchCourses} cancel={cancel} />
        </Dialog>
       <Dialog open={open} destroyOnClose width={880} className="w-full" onCancel={() => setOpen(false)}
       footer={[ <Button type="button" className="bg-blue-500 text-white rounded-md px-3 py-1" onClick={()=> setOpen(false)}> Okay </Button>,]} >
       {courseMissing && <CourseMissing  data={courseMissing} />}
        </Dialog>                         
    </>
}
export default CoursesList