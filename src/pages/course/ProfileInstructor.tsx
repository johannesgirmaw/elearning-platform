import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../types/UserItem";
import { RootState } from "../../slicers/store";
import useCourseService from "../../components/courses/course/CourseService";
import { Course } from "../../types/Course";
import EducationBackgroundList from "../../components/account/educational-background/EducationalBackgroundList";
import ExperienceList from "../../components/account/experience/ExperienceList";
import ProfileDetail from "../../components/account/profile/ProfileDetail";
import { EducationalBackground} from "../../components/account/educational-background/EducationBackgroundModel";
import {Experience } from "../../components/account/experience/ExperienceModel";
import useUserService from "../../components/account/user/UserService";
import { useOutletContext } from "react-router-dom";
import { Card } from "antd";
import useLoading from "../../components/customs/loading/LoadingHook";
import Loading from "../../components/customs/loading/Loading";

export interface Props {
    userListDetail?: boolean
    userId: string;
}
export interface UserContextType{
    userId:string
  }
  export const UserContext = createContext<UserContextType>({} as UserContextType);
  
function Profile({userListDetail, userId}: Props) {
    const user = useSelector((state: RootState) => state.user)
    const context: any = useOutletContext();
    const [submitRequest, setSubmitRequest] = useState(false)
    const [openPanel, setOpenPanel] = useState(false);
    const [experienceData, setExperienceData] = useState<Experience[]>([])
    const [educationalBackgroundData, setEducationalBackgroundData] = useState<EducationalBackground[]>([])
    const courseService = useCourseService();
    const userService = useUserService();
    const [courses, setCourses] = useState<Course[]>([]);
    const [userData, setUserData] = useState<User>()
    const loading = useLoading()

    useEffect(() => {
        context.setTitle("Profile")
    }
        , [])

    return (
        <>
            <UserContext.Provider value={{userId}}>
                <div>
                    <div className="flex flex-col lg:flex-row md:flex-col " >
                        <div className="mx-auto my-10 relative">
                                <>
                                    <Loading {...loading} />
                                    {  
                                    <Card className="flex flex-row overflow-y-auto  max-h-full ml-1">
                                        <div className="flex flex-row ">
                                            <div className="flex justify-start mx-1 text-2xl md:p-2 mb-3">
                                                Profile Detail Information
                                            </div>
                                        </div>
                                        {(!userId) && <ProfileDetail  />}
                                        {
                                            (submitRequest || (user.is_superuser && userId))
                                                ?
                                                <>
                                                    <EducationBackgroundList setEducationalBackgroundData={setEducationalBackgroundData} show_add={false}/>
                                                    <ExperienceList setExperienceData={setExperienceData} show_add={false} />
                                                </>
                                                :
                                                ""
                                        }
                                        <div className='flex justify-center'>
                                            <button className='custom-button' onClick={() => setSubmitRequest(!submitRequest)}>
                                                {
                                                    submitRequest ? <span>Show Less</span> : "Show More"
                                                }
                                            </button>
                                        </div>
                                    </Card>
                                    }
                                </>
                                
                        </div>
                    </div>
                </div>
            </UserContext.Provider>
        </>
    );
}

export default Profile;
