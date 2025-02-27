import { createContext } from 'react';
import registerLogin from '../../assets/images/register-login.jpg';
import { UserPage } from "../../../types/UserPages";
import useTranslation from "../../../utils/translation";

export interface UserContextType{
  userId:string
}
export const UserContext = createContext<UserContextType>({} as UserContextType);

function InstructorUser(props: UserPage) {
    const {translate} = useTranslation()
    const { page:{title, element }} = props;

    return <div className="container mx-auto px-2 my-5 flex justify-center min-h-[700px]">
                    <div className="">
                      <h1 className="text-2xl font-medium text-center">{title}</h1>
                        <div className="pt-3 relative">
                            {element}
                        </div>
                    </div>
            </div>;
}
export default InstructorUser;