import { useEffect, useState } from "react";
import useCourseService from "../course/CourseService"
import { usePagination } from "../../customs/pagination/usePagination";
import { Course, CourseMissingType, CourseTableSearchModel } from "../../../types/Course";
import { Button, Card, Empty, Modal, Pagination } from "antd";
import { SearchComponentProps } from "../../commons/search-bar/search";
import { Course_Status, componentType, courseLevel, courseStatus, courseType } from "../../../types/Enums";
import SearchBar from "../../commons/search-bar/SearchBar";
import CustomText from "../../customs/custom-text/CustomText";
import { getLabelByValue } from "../../../utils/array";
import { Link } from "react-router-dom";
import CourseMissing from "../course/CourseMissing";
import useLoading from "../../customs/loading/LoadingHook";
import Loading from "../../customs/loading/Loading";

const CourseListAdmin = () => {
    const courseService = useCourseService();
    const [courseMissing, setCourseMissing]= useState<CourseMissingType>();
    const [open, setOpen] = useState(false);
    const [courseDatas, setCourseDatas] = useState<Course[]>([])
    const loading = useLoading();
    const paginator = usePagination<CourseTableSearchModel>({ course_status: Course_Status.READY_FOR_PUBLISHING })

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
    ]

    const coursePublish = (id: string) => {
        loading.startLoading();
        courseService.courseAdminDo(id, "publish").then(({data:value}) => {
            if(value.invalid){
                setCourseMissing(value as any)
                setOpen(true)
            }else {
                searchCourses()
            }
            loading.stopLoading();
        }).catch(loading.stopLoading)
    }

    useEffect(() => {
        searchCourses()
    }, [paginator.filterData])
    const searchCourses = () => {
        loading.startLoading();
        courseService.getCourses(paginator.filterData).then(({ data: response }) => {
            setCourseDatas(response.results)
            loading.stopLoading();
            paginator.setTotal(response.count)
        }).catch(loading.stopLoading)
    }
    return <div className="sm:px-5 sm:pr-20 pt-5 flex-col gap-2 flex">
        <div className="flex items-center flex-wrap gap-5 pb-4">
            <h1 className="text-xl">Course <CustomText className="" text="List" /></h1>
            <SearchBar filteredData={paginator.filterData} handleChange={paginator.handleChange} components={components} />
        </div>
        <div className="flex flex-col relative sm:grid grid-cols-2 gap-2">
            <Loading  {...loading} />
            {courseDatas.map((course, index) => <Card>
                <div className="flex flex-col  sm:grid grid-cols-4">
                    <div className="col-span-3">
                        <div className="p-1 text-lg font-semibold">{course.name}</div>
                        <div className="flex flex-wrap  self-start mb-0  justify-start gap-2 sm:gap-4">
                                    <span className="bg-custom_orange-100 text-custom_orange-700 px-4 py-0.5 rounded-3xl text-center text-sm" >{getLabelByValue(courseType, course.course_type)}</span>
                                    <span className="px-4 py-0.5 mr-2 bg-orange-400 rounded-3xl text-center text-sm" >{getLabelByValue(courseLevel, course.course_level)}</span>
                                    <span className=" mr-2 bg-gray-300 text-blue-500 px-4 py-0.5 rounded-3xl text-center text-sm" >{getLabelByValue(courseStatus, course.course_status)}</span>
                                </div>
                        <div className="flex gap-2">
                            <span className="font-semibold">Instructors:</span>
                            <div>
                                {course.instructor.map(value => <div>{value["first_name"]} {value["middle_name"]}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                        <Link className="bg-gray-200  text-custom_orange-800 px-3 py-2 rounded-lg" to={"/instructor_dashboard/course_publish/" + course.id} children="View Detail" />
                        {course.course_status === Course_Status.READY_FOR_PUBLISHING && <button children="Publish" className="bg-gray-200 text-custom_orange-800 px-3 py-2 rounded-lg" onClick={() => coursePublish(course.id)} />}
                    </div>
                </div>
            </Card>)}
        </div>

       {courseDatas.length ?  <Pagination  {...paginator} /> : <Empty className="flex justify-center w-full"/>}

       <Modal open={open} destroyOnClose width={880} className="w-full" onCancel={() => setOpen(false)}
       footer={[
        <Button  className="bg-blue-500 text-white rounded-md px-3 py-1" onClick={()=> setOpen(false)}>
        Okay
      </Button>,]} >
       {courseMissing && <CourseMissing  data={courseMissing} />}
        </Modal>   
    </div>
}

export default CourseListAdmin