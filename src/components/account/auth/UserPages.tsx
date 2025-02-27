import { createContext, useState} from 'react';
import { UserPage} from "../../../types/UserPages";
import useTranslation from "../../../utils/translation";
import InstructorUserRegister from "./InstructorUserRegister";
import ResetPassword from "./ResetPassword";
import UserEmailVerification from "./UserEmailVerification";
import Login from "./UserLogin";
import Register from "./UserRegister";

export interface UserIdContextType{
    registeredUserId:string
}
export const UserIdContext = createContext<UserIdContextType>({} as UserIdContextType);

const useUserPages = () => {
  const [registeredUserId, setRegisteredUserId] = useState("");

    console.log("UserIdContext",registeredUserId);
    
    const {translate} = useTranslation()

    const UserPages: UserPage = {
        login: {
            title: translate('login'),
            element: <Login />
        },
        student_register: {
            title: translate("register"),
            element: <Register/>
        },
        instructor_register: {
            title: translate("instructor_request"),
            element: <UserIdContext.Provider value={{registeredUserId}}>
                <InstructorUserRegister user_type="INSTRUCTOR" setUserId={setRegisteredUserId}/></UserIdContext.Provider>
        },
        tutor_register: {
            title: translate("tutor_request"),
            element: <UserIdContext.Provider value={{registeredUserId}}>
                <InstructorUserRegister user_type="TUTOR" setUserId={setRegisteredUserId}/></UserIdContext.Provider>
        },
        email_verification_code:{
            title: translate("verification_code"),
            element: <UserEmailVerification />
        },
        reset_request: {
            title: translate("reset_password"),
            element: <ResetPassword isRequest={true} />
        },
        reset_pwd: {
            title: translate("reset_password"),
            element: <ResetPassword isRequest={false} />
        }
    };
    return UserPages;
}

export default useUserPages