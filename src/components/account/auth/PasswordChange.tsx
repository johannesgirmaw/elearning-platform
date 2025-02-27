import CustomInput from "../../customs/custom-input/CustomInput";
import CustomButton from "../../customs/custom-button/CustomButton";
import { useUserService } from "./UserService";
import useTranslation from "../../../utils/translation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangePassword } from "../../../types/UserItem";
import { useNavigate } from 'react-router-dom';
import useToast from "../../customs/toast/ToastHook";
import useLoading from "../../customs/loading/LoadingHook";
import SmallLoading from "../../customs/loading/SmallLoading";

function PasswordChange({onClose}: {onClose?: () => void}) {
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePassword>();
    const userService = useUserService()
    const loading = useLoading()
    const navigator = useNavigate();
    const {translate} = useTranslation()
    const toast = useToast()

    const onSubmit: SubmitHandler<ChangePassword>  = (data) => {
        loading.startLoading()
         
             userService.passwordChange(data).then(
                ({data: value}) => {
                    loading.stopLoading()
                    onClose?.()
                    // if(value){
                    //     toast.success("Your password has been changed successfully")
                    //     navigator('/login')    
                    // }
                    
                 }
            ).catch(error => {
                const errors = error.response.data.error.details;
                  for (let err in errors){
                    toast.warning(errors[err]);
                  }
                  loading.stopLoading();
            });
        
    };
    

    return <>
    {/*<Loading {...loading} />*/}
        
            <form onSubmit={handleSubmit(onSubmit)}>
           
                    <>
                        <CustomInput type="password" placeholder={translate('password')} register={register} label="new_password1" options={{
                        required: "Password is required"
                    }}  error={errors.new_password1} />
                        <CustomInput type="password" placeholder="Confirm Password" register={register} label="new_password2" options={{
                        required: "Confirm Pssword is required"
                    }} error={errors.new_password2}  />
                    </>
                
                <div className="mt-5">
                    <CustomButton text={translate("change_password") } is_loading = {<SmallLoading {...loading}/> } type="submit" />
                </div>
            </form>
            
    </>;
}

export default PasswordChange;