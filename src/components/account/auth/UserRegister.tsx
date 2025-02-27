import CustomInput from "../../customs/custom-input/CustomInput";
import CustomButton from "../../customs/custom-button/CustomButton";
import { useState } from "react";
import { useUserService } from "./UserService";
import { appURL } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { AuthUser, BackEndError, UserLogin, UserRegister } from "../../../types/UserItem";
import CustomInputError from "../../customs/custom-input-error/CustomInputError";
import { Link, useNavigate } from "react-router-dom";
import useTranslation from "../../../utils/translation";
import { getUser } from "../../../slicers/user";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useToast from "../../customs/toast/ToastHook";
import { ContentType, Gender, GenderOption, UserType } from "../../../types/Enums";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import CustomImageFileInput from "../../customs/custom-input/CustomImageFileInput";
import { RootState } from "../../../slicers/store";
import useFileService from "../../commons/file/FileService";
import {emailRegex, emailRegexEmpty} from "../../../utils/regex"
import { validateNotOnlyNumber } from "../../../utils/validation";
import CustomShowPassword from "../../customs/custom-input/CustomShowPassword";
import zxcvbn from 'zxcvbn';
import { pwnedPassword } from 'hibp';
import CustomProgress from "../../customs/custom-progress-bar/CustomProgress";
import { CustomFileUploader } from "../../customs/custom-input/CustomFileUploader";
import { LocalStorage } from "../../../utils/localstorage";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { FaStarOfLife } from "react-icons/fa";
import SmallLoading from "../../customs/loading/SmallLoading";
import useLoading from "../../customs/loading/LoadingHook";


const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    if(phone.length < 5){
        return false;
    }
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

function Register() {
    const registerForm = useForm<UserRegister>();
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const userService = useUserService()
    const loading = useLoading()
    const {translate} = useTranslation()
    const toast = useToast()
    const user = useSelector((state: RootState) => state.user)
    const fileService = useFileService()

    const onSubmit: SubmitHandler<UserRegister>  = (data) => {
        loading.startLoading();
      
        if(data.full_name!==""){
            const names = data?.full_name?.split(" ")!
            data.first_name = names[0];
            data.middle_name = names[0];
            data.last_name = names[0];
        }
        data.password2 = data.password1;
        if(data.email === "") {
             data.email = undefined;
        }
        // fileService.addFile(formData).then(({data:value})=>{
        // data.profile_pic = value.url;
        //   loading.startLoading()
            userService.student_register(data).then(
            ({data: value}) => {
                if (value.refresh_token) {
                    localStorage.setItem(`${appURL}.authorizationData`, value.access_token);
                    dispatch(getUser(value.user));
                    loading.stopLoading()
                    navigator('/login')
                }
                // navigator('/login')
                loginAfterRegistration(value)
                loading.stopLoading()
                // toast.info("Check your email to verify")
            }
        ).catch(error =>
            {
            handleError(error);
            loading.stopLoading()})
        // })
        
        
    };

    const loginAfterRegistration = (data:UserLogin) =>{
        userService.login(data).then(
            ({data: value}) => {
                if (value.refresh_token) {
                 addToken(value)   
                 loading.stopLoading()
                }
            }
        ).catch(error =>
            {
                handleError(error);            
            });
    };

        const addToken = (value: AuthUser) => {
            localStorage.setItem(`${appURL}.token.authorizationData`, value.access_token);
            localStorage.setItem(`${appURL}.refresh.authorizationData`, value.refresh_token)
            dispatch(getUser({...value.user, lang: value.user.lang}));
            loading.stopLoading()
    
            const localstorage = new LocalStorage();
            const redirect_url = localstorage.getValueAndRemove(["enrolmentpage","tutorinfopage","instructorrequest", "tutorrequest"]);
            localstorage.remove("userId");
            
            if(redirect_url){
                navigator(`${redirect_url}`);
            }else{
                if(value.user.is_staff){
                    navigator('/instructor_dashboard/profile');
                }else{
                    navigator('/');
                }
            }
    
        }
    const handleError = (error: any) => {
        const errors = error.response.data.error.details;
        for (const err in errors){
            if (err === 'non_field_errors'){
                registerForm.setError('root', {message: errors[err]})
            }else {
                registerForm.setError(err as keyof UserRegister, {message: errors[err]})
            }
      }}
    const [valueD, setValueD] = useState("2011-12-13")
    const [loadingComponent, setLoadingComponent] = useState<JSX.Element>();
    const [loadingGoogleComponent, setLoadingGoogleComponent] = useState<JSX.Element>();
    const [isVisible, setIsVisible] = useState(false);
    const [passStrength,setPassStrength]=useState(0)

     

    const passwordStrength= async (password:string)=>{
           
        const isCommonPassword = await pwnedPassword(password);
        const score = evaluatePasswordStrength(password);

      
        switch (score) {
            case 0:
                
                setPassStrength(30); 
                break;
            case 1:
                
                setPassStrength(60); 
                break;
            case 2:
                if(isCommonPassword){
                    setPassStrength(60);
                }else{
                    setPassStrength(85);
                }
               
                break;
            case 3:
            case 4:
                if(isCommonPassword){
                    setPassStrength(60);
                }else{
                    setPassStrength(100);
                }
                break;
            default:
                setPassStrength(0);
                break;

       }
    }

    function evaluatePasswordStrength(password:string) {
        const result = zxcvbn(password);
        return result.score; // Returns a score from 0 to 4 indicating password strength
    }

    return <>
    <form onSubmit={registerForm.handleSubmit(onSubmit)}>
    <div className="">
                    <CustomFileUploader 
                        register={registerForm.register}
                        fileType={ContentType.IMAGE}
                        label="profile_pic"
                        control={registerForm.control}
                        placeholder="Profile Picture "
                        //   setError={registerForm.setError}
                        //   clearErrors={registerForm.clearErrors}
                        setValue={registerForm.setValue}         
                    /> 
            </div>
        {/* <CustomInput type="text" placeholder={translate("first_name")} {...registerForm} label="first_name" options = {{
            required: "first name is required"
        }} />
        <CustomInput type="text" placeholder={translate("middle_name")} {...registerForm} label="middle_name" options = {{
            required: "middle name is required"
        }} />
        <CustomInput type="text" placeholder={translate("last_name")} {...registerForm} label="last_name" options = {{
            required: "last name is required"
        }} /> */}

        <CustomInput type="text" 
            placeholder={translate("full_name")} 
            register={registerForm.register} 
            label="full_name" 
            error={registerForm.formState.errors.full_name}
            options = {{
            required: "full name is required",
            validate:{
                validateNotOnlyNumber:validateNotOnlyNumber,
                validateNameIsFullName:(name) =>{
                return (name!).toString().split(" ").length === 3 || "Please enter a correct full name (e.g, Abebe Kebede Alemu)"
            }
        }
        }} />

        {/* <CustomInput type="date" val={valueD} 
            onValueChange={val=>{setValueD(val.target.value)}} placeholder={translate("birth_date")} 
            {...registerForm} label="date_of_birth"  options = {{
            required: "date of birth is required"
        }} /> */}
        <CustomInput type="text" placeholder={translate("username")} {...registerForm} label="username" options = {{
            required: "username is required"
        }} />
        <CustomInput type="email" placeholder={translate('email')} {...registerForm} label="email" 
        options = {{
            // required: "email is required",
            pattern:{
                value:emailRegexEmpty,
                message:"email is Invalid format"
            }
        }} 
        />
        {/* <CustomInput type="text" placeholder={translate("phone_number")} {...registerForm} label="phone_number" options = {{
            required: "phone number is required",
        }}  /> */}
        <div className="w-full">
            <label className="flex gap-1 text-xs text-slate-500" htmlFor="Phone number">{<FaStarOfLife style={{width:"7px",}} />}<span>{"phone number"}</span></label>
            <Controller
                name="phone_number"
                control={registerForm.control}
                rules={{
                    validate: (value) => isPhoneValid(value) || "Please enter valid phone number",
                    required:"Phone number is required"
                }}
                render={({ field: { onChange, value } }) => (
                    <PhoneInput
                        defaultCountry="et"
                        value={value}
                        onChange={onChange}
                        // style={window.innerWidth > 768?{width:'240px'}:{width:'300px'}}
                    />
                )}
                />
                {registerForm.formState.errors["phone_number"] && <CustomInputError msg={registerForm.formState.errors.phone_number?.message} />}
        </div>
                           
        <CustomDropdown 
            type="select"
            data={GenderOption}
            key="geneder"
            placeholder="Gender"
            {...registerForm}
            label="gender"
            options={
                {
                    required:"Gender is required"
                }
            }
            isSearchable={false}
            control={registerForm.control}
            error={registerForm.formState.errors.gender}
        />
        <div className="flex flex-col">
        <CustomInput  type={`${isVisible?"text":"password"}`} placeholder={translate('password')} {...registerForm} label="password1" options = {{
            required: "password is required"
        }}   onValueChange={(e)=>passwordStrength(e.target.value)} />
        <CustomProgress passStrength={passStrength}  className="w-full md:w-60" />
        <CustomShowPassword isVisible={isVisible} setIsVisible={setIsVisible}/>
         </div>
        <div className="mt-5">
            <CustomButton type="submit" text={translate("create_an_account")}  is_loading={<SmallLoading {...loading} />}/>
            <div className="flex justify-center p-3">
            <Link
                to="/login"
                className="block text-lg font-medium capitalize"
            >
                Log in
            </Link>
        </div>
        </div>
    </form>
    </>;
}

export default Register;