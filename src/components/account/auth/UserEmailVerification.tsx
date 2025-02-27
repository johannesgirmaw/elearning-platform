import CustomButton from "../../customs/custom-button/CustomButton";
import { useUserService } from "./UserService";
import { UserVerificationCode } from "../../../types/UserItem";
import { useNavigate, useParams,  } from "react-router-dom";
import useTranslation from "../../../utils/translation";
import { SubmitHandler, useForm } from "react-hook-form";
import useToast from "../../customs/toast/ToastHook";
import { useState } from "react";
import CustomCard from "../../customs/custom-card/CustomCard";
import useLoading from "../../customs/loading/LoadingHook";
import Loading from "../../customs/loading/Loading";

function UserEmailVerification() {
    const { register, setError, handleSubmit, formState: { errors } } = useForm<UserVerificationCode>();
    const [isVerified, setIsVerified] = useState(false);
    const [isVerificationError, setIsVerificationError] = useState(false);
    const navigator = useNavigate();
    const userService = useUserService()
    const loading = useLoading()
    const {translate} = useTranslation()
    const toast = useToast()
    let { code } = useParams();
    
    const onSubmit: SubmitHandler<UserVerificationCode>  = (data) => {
        loading.startLoading()
        userService.emailVerificationCode(code as unknown as UserVerificationCode).then(
            ({data: value}) => {
                if (value.refresh_token) {
                    loading.stopLoading()
                    navigator('/login')
                }
                setIsVerified(true)
                navigator('/login')
                loading.stopLoading()
                toast.info("Your email is verified!")
            }
        ).catch(error =>
            {
                const errors = error.response.data.error.details;
                for (const err in errors){
                    if (err === 'non_field_errors'){
                        setError('root', {message: errors[err]})
                        setIsVerificationError(true)
                    }else {
                        setError(err as keyof UserVerificationCode, {message: errors[err]})
                        setIsVerificationError(true)
                    }
                }
            loading.stopLoading()
        })
    };


    return <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 relative">
            <Loading {...loading} />
            {
                !isVerified && !isVerificationError
                ?<CustomButton type="submit" 
                // key={1}
                 text={isVerified?translate("verified"):isVerificationError?translate('verfication_error'):translate("verify")}/>
                :<div className={"border border-l-8 border-l-custom_orange-900 text-center py-6 h-20   text-custom_orange-900 border-solid border-custom_orange-100" + 
                "transition-all duration-300 ease-in group hover:border-custom_orange-100 bg-custom_orange-100  hover:border-l-custom_orange-900"
                }>
                {isVerified?<h1>{translate("verified")}</h1>:isVerificationError?<h1>{translate('verfication_error')}</h1>:""}
                </div>
            }
            
        </div>
    </form>
    </>;
}

export default UserEmailVerification;