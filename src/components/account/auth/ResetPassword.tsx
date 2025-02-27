import CustomInput from "../../customs/custom-input/CustomInput";
import CustomButton from "../../customs/custom-button/CustomButton";
import { useUserService } from "./UserService";
import useTranslation from "../../../utils/translation";
import {  UserVerificationCode } from "../../../types/UserItem";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordForm } from "../../../types/UserItem";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import CustomCard from "../../customs/custom-card/CustomCard";
import useToast from "../../customs/toast/ToastHook";
import CustomShowPassword from "../../customs/custom-input/CustomShowPassword";
import useLoading from "../../customs/loading/LoadingHook";
import SmallLoading from "../../customs/loading/SmallLoading";

function ResetPassword(props: { isRequest: boolean; }) {
    const { register, setError, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>();
    const [isLinkSent, setLinkSent] = useState(true)
    const userService = useUserService()
    const loading = useLoading()
    const navigator = useNavigate();
    const {translate} = useTranslation()
    const {uuid, token, code} = useParams()
    const toast = useToast()

    const onSubmit: SubmitHandler<ResetPasswordForm>  = (data) => {
        loading.startLoading()
        if(props.isRequest){
            userService.resetPassword(data.email).then(
                ({data: value}) => {
                    loading.stopLoading()
                    if (value.refresh_token) {
                        // localStorage.setItem(`${baseURL}.authorizationData`, value.access_token);
                        // dispatch(getUser(value.user));
                    }
                    setLinkSent(false)
                }
            ).catch(error => loading.stopLoading());
        }else{
             userService.resetPasswordConfirm(data,uuid, token ).then(
                ({data: value}) => {
                    loading.stopLoading()
                    toast.info("Your password is reset, please login!")
                    navigator('/login')
                }
            ).catch(error => {loading.stopLoading();navigator('/login')});
        }
    };
    
    useEffect(() =>{
        if(code !== undefined){
            verifyYourEmail()
        }
    },[])

    const verifyYourEmail = ()=>{
        userService.emailVerificationCode(code as unknown as UserVerificationCode).then(
            ({data: value}) => {
                loading.stopLoading()
                toast.info("Your email is verified, please insert your new password!")
            }
        ).catch(error =>
            {
            loading.stopLoading()
        })
    }
    const [isVisible, setIsVisible] = useState(false);

    return <>
        {
        isLinkSent?
            <form onSubmit={handleSubmit(onSubmit)}>
                {props.isRequest ?
                    <CustomInput type="text" placeholder={translate('email')} register={register} label="email" options={{
                        required: "Email is required"
                    }}  error={errors.email}/>:
                    <>
                        <CustomInput type={isVisible?'text':`password`} placeholder={translate('password')} register={register} label="new_password1" options={{
                        required: "Password is required"
                    }}  error={errors.new_password1} />
                        <CustomInput type={isVisible?'text':`password`} placeholder="Confirm Password" register={register} label="new_password2" options={{
                        required: "Confirm Pssword is required"
                    }} error={errors.new_password2}  />
                    <CustomShowPassword isVisible={isVisible} setIsVisible={setIsVisible}/>
                    </>
                }
                <div className="mt-5">
                    {props.isRequest ? <CustomButton text="Reset" type="submit" is_loading={<SmallLoading {...loading} />}/> : <CustomButton text={translate("reset_password") }type="submit" is_loading={<SmallLoading {...loading} />}/>}
                </div>
            </form>:
            <div className={"border border-l-8 border-l-custom_orange-900 text-center py-6 h-20   text-custom_orange-900 border-solid border-custom_orange-100" + 
                "transition-all duration-300 ease-in group hover:border-custom_orange-100 bg-custom_orange-100  hover:border-l-custom_orange-900"
                }>
                Password reset link is sent to your email
            </div>
        }
    </>;
}

export default ResetPassword;