import { useDispatch, useSelector, } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserRegister } from "../../../types/UserItem";
import { useUserService } from "../auth/UserService";
import useLoading from "../../customs/loading/LoadingHook";
import useTranslation from "../../../utils/translation";
import useToast from "../../customs/toast/ToastHook";
import { getUser } from "../../../slicers/user";
import CustomInput from "../../customs/custom-input/CustomInput";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { GenderOption } from "../../../types/Enums";
import CustomButton from "../../customs/custom-button/CustomButton";
import { RootState } from "../../../slicers/store";
import CustomTextArea from "../../customs/custom-input/CustomTextArea";
import SmallLoading from "../../customs/loading/SmallLoading";

function ProfileUpdate({onClose}:{onClose?: () => void}) {
    const user = useSelector((state: RootState) => state.user)
    const userService = useUserService();
    const registerForm = useForm<UserRegister>({ defaultValues: user });
    const dispatch = useDispatch();
    const loading = useLoading()
    const { translate } = useTranslation()
    const toast = useToast()

    const onSubmit: SubmitHandler<UserRegister> = (data) => {
        loading.startLoading();
        userService.updateUser(data.id, data).then(
            ({ data: value }) => {
                loading.stopLoading();
                onClose?.();
                value && dispatch(getUser(value));
            }
        ).catch(error => {
            loading.stopLoading();
            handleError(error);
        })
    };
    const handleError = (error: any) => {
        const errors = error.response?.data?.error?.details;
        for (const err in errors) {
            if (err === 'non_field_errors') {
                registerForm.setError('root', { message: errors[err] })
            } else {
                registerForm.setError(err as keyof UserRegister, { message: errors[err] })
            }
        }
    }

    return <>
        <form onSubmit={registerForm.handleSubmit(onSubmit)}>
            <div className="grid items-center grid-cols-2 gap-2">
                <CustomInput type="text" placeholder={translate("first_name")} {...registerForm} label="first_name" options={{
                    required: "first name is required"
                }} />
                <CustomInput type="text" placeholder={translate("middle_name")} {...registerForm} label="middle_name" options={{
                    required: "middle name is required"
                }} />
                <CustomInput type="text" placeholder={translate("last_name")} {...registerForm} label="last_name" options={{
                    required: "last name is required"
                }} />
                <CustomInput type="text" placeholder={translate("username")} {...registerForm} label="username" options={{
                    required: "username is required"
                }} />
                <CustomInput type="text" placeholder={translate("phone_number")} {...registerForm} label="phone_number" options={{
                    required: "phone number is required",
                }} />
                <CustomDropdown
                    {...registerForm}
                    type="select"
                    val={user.gender}
                    data={GenderOption}
                    key="gender"
                    placeholder="Gender"
                    label="gender"
                    options={
                        {
                            required: "Gender is required"
                        }
                    }
                    isSearchable={false}
                    control={registerForm.control}
                    error={registerForm.formState.errors.gender}
                />
            </div>
            <CustomTextArea {...registerForm} placeholder="About" className="w-full" label="bio" error={registerForm.formState.errors.bio} />
            <div className="mt-5">
                <CustomButton type="submit" text={"Update profile"} is_loading={<SmallLoading {...loading} />} />
            </div>
        </form>
    </>;
}

export default ProfileUpdate;