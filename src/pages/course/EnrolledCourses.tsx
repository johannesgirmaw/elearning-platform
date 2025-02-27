import { useEffect, useState } from "react";
import {useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BsMailbox } from "react-icons/bs";
import { BsTelephoneFill } from "react-icons/bs";
import { FaClock, FaBookOpen, FaStar, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import { Collapse } from "antd";
import type { CollapseProps } from 'antd';
import { UserLogin } from "../../types/UserItem";
import useTranslation from "../../utils/translation";
import { RootState } from "../../slicers/store";
import { Languages } from "../../types/Translation";
import { SelectItem } from "../../types/MenuItems";
import { setLanguage } from "../../slicers/user";
import useCourseService from "../../components/courses/course/CourseService";
import { Course } from "../../types/Course";
import useLoading from "../../components/customs/loading/LoadingHook";
import CustomDropdown from "../../components/customs/custom-input/CustomDropdown";
import PasswordChange from "../../components/account/auth/PasswordChange";
import Loading from "../../components/customs/loading/Loading";

function EnrolledCourses() {
    const { register,control, formState: { errors } } = useForm<UserLogin>();
    const { translate } = useTranslation()
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user)
    const context: any = useOutletContext();
    
    
    
    const [selectedLanguage, setSelectedLanguage] = useState<{ name: string, id: Languages }>();
    const [openPanel, setOpenPanel] = useState(false);

    const languages: SelectItem<string | number>[] = [
        { label: "Amharic", value: Languages.AMH },
        { label: Languages.ENG, value: "English" },
    ];

    const applyLanguage = (language: { name: string, id: Languages }) => {
        setSelectedLanguage(language)
        dispatch(setLanguage(language.id));
    }
    const courseService = useCourseService();
    const [courses,setCourses] = useState<Course[]>([]);
    
    const loading = useLoading()
    useEffect( () => 
    {
        loading.startLoading()
        context.setTitle("Profile")
        courseService.getCourses({search: '', category_id: undefined}).then(
        ({data: courses}) => {
            setCourses(courses.results)
            loading.stopLoading()
        }
    ).catch(error => loading.stopLoading())}
    , [])
    
   const courseDetailUrl=(id:string)=>{
    return "/course_detail/"+id+"/video";
    }

    const items: CollapseProps['items'] = [
        {
          key: '1',
          label: 'Change Password',
          children: (
                        <>
                        <div className="sm:mt-[5%] md:mt-[5%] lg:mt-[5%] mb-4 ">
                                <CustomDropdown
                                    placeholder={translate("languages")}
                                    data={languages}
                                    val={selectedLanguage}
                                    onValueChange={applyLanguage}
                                    id="id"
                                    label="username"
                                    control={control}
                                    isSearchable={false} 
                                    register={register}                            />

                            </div>
                            <div className="border-[#E7F8EE] border-[1px] border-solid  py-5 px-8 rounded-md">
                            <PasswordChange/>
                            </div>
                        </>
    
                    ),
        },

      ];
      const enrolledCourses: CollapseProps['items'] = [
        {
            key: '1',
            label:"Enrolled Courses",
            children:(
                <>
                    <div className="border-[#E7F8EE] border-[1px] border-solid flex flex-wrap  rounded-md gap-3 relative lg:flex-row md:flex-row justify-center p-5  pb-10">
                        {courses?.map(course=>
                            <div key={course.id}>
                                <Link  to={courseDetailUrl(course.id)} className="flex-col border-[#E7F8EE] border-[1px] w-[200px] h-[150px] bg-slate-100 flex justify-center  place-items-center relative mb-2 p-[3px]">
                                        <img src={course.course_image as string} className="h-[150px]" alt={course.name} />
                                        <p  className="mt-[-0.5em] p-2 bg-white text-center text-custom_orange-900 text-xs rounded-t-lg">
                                            {course.name}
                                        </p>
                                </Link>
                            </div>)
                        }
                        <div className="absolute bottom-0 right-1/2 ">
                            <div className="flex justify-center">
                                <p className="p-3 bg-custom_orange-800 bg-opacity-20 text-center text-sm rounded-t-lg">
                                    Courses Given
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
      ]
      const onChange = (key: string | string[]) => {
        console.log(key);
      };
    
    return (
        <>
             <div>
                <div >
                    <div className="w-full bg-[#212832] relative">
                        <div className="absolute bottom-5  right-5 text-white align-right">
                            <p className="flex justify-end"> {user.email}  <BsMailbox size={25} className="pl-2" /></p>
                            <p className="flex justify-end"> {""} <BsTelephoneFill size={25} className="pl-2" /> </p>
                            <div className="h-5"></div>
                        </div>
                    </div>


                </div>
                <div className="flex flex-col lg:flex-row md:flex-col" >
                    <div className="mt-[-75px] md:ml-0 lg:ml-[200px] z-auto relative bg-transparent shadow-sm flex flex-col justify-center place-items-center">
                    </div>
                    <div className="flex flex-wrap my-10 relative">
                        <div>
                            <Loading {...loading}/>
                            <Collapse items={enrolledCourses} defaultActiveKey={['1']} onChange={onChange} className="w-[1000px] mx-10 my-10" />                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EnrolledCourses;
