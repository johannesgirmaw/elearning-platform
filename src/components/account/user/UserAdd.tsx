import CustomInput from "../../customs/custom-input/CustomInput";
import { useEffect, useState } from "react";
import CustomButton from "../../customs/custom-button/CustomButton";
import CustomText from "../../customs/custom-text/CustomText";
import CustomImageFileInput from "../../customs/custom-input/CustomImageFileInput";
import { User } from "../../../types/UserItem";
import useLoading from "../../customs/loading/LoadingHook";
import useTranslation from "../../../utils/translation";
import { RootState } from "../../../slicers/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectItem } from "../../../types/MenuItems";
import useFileService from "../../commons/file/FileService";
import useUserService from "./UserService";
import CustomCheckbox from "../../customs/custom-input/CustomCheckbox";
import useGroupService from "../group/GroupService";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { Select, SelectProps } from "antd";
import CustomTextArea from "../../customs/custom-input/CustomTextArea";
import { ContentType, GenderOption } from "../../../types/Enums";
import useAuthentication from "../auth/authentication";
import { CustomFileUploader } from "../../customs/custom-input/CustomFileUploader";
import SmallLoading from "../../customs/loading/SmallLoading";

interface Props { 
  searchUsers: () => void, 
  userDetail?: User 
  onClose?: ()=> void;
}

function UserAdd(props:Props) {
  const registerForm = useForm<User>();

  const userService = useUserService()
  const loading = useLoading()
  const {translate} = useTranslation()
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const fileService = useFileService()
  const groupService = useGroupService()
  const [groupsData, setGroupsData] = useState<SelectItem<string>[]>([])
  const auth = useAuthentication()

  const userLevel: SelectItem<number>[] = [
    { value: 100, label: "Beginner" },
    { value: 101, label: "Intermediate" },
    { value: 102, label: "Advanced" },
  ];
  const userType: SelectItem<number>[] = [
    { value: 100, label: "Free" },
    { value: 101, label: "Premium" },
    { value: 102, label: "Sponsored" },
  ];

  const resetVal = ()=>{
    registerForm.reset(
      {
        "username":"",
        "first_name":"",
        "middle_name":"",
        "last_name":"",
        "email":"",
        // "date_of_birth":"",
        "profile_pic":"",
        "phone_number":"",
        "is_staff":undefined,
        "is_superuser":undefined,
        "bio":"",
        "groups":[]
      }
        )
          }

  useEffect(()=>{
    getGroupsData()
    if(props?.userDetail){
      registerForm.reset({...props.userDetail})
    }else{
    resetVal()
    }
  },[ props.userDetail, registerForm.reset])

  

  const onSubmit : SubmitHandler<User> = (data) => {
    const image_name = (data.profile_pic[0] as File)?.name
    const formData = new FormData()
    formData.append("file_type",'101');
    if(image_name){
      loading.startLoading()
      formData.append("url",data.profile_pic[0] as Blob,(data.profile_pic[0] as File)?.name);
      fileService.addFile(formData).then(({data:value})=>{
      data.profile_pic = value.url;
       addEdit(data)
      })
    }else{
        loading.startLoading()
        addEdit(data)
    }
  };
  
  const addEdit = (data:User)=>{
   if(props.userDetail){
          userService.editUser(data)
          .then(({data: value}) => {
            loading.stopLoading()
            props.searchUsers()
            props.onClose?.();
            resetVal()
            navigate(`/instructor_dashboard/user_list`)
          }).catch(
          (error) => {
            loading.stopLoading()
            handleError(error)
            loading.stopLoading()
          }
          )
        }else{
          userService.addUser(data)
          .then(({data: value}) => {
            loading.stopLoading()
            props.searchUsers()
            props.onClose?.();
            resetVal()
            navigate(`/instructor_dashboard/user_list`)
          }).catch(
          (error) => {
            loading.stopLoading()
            handleError(error)
            loading.stopLoading()
          }
          )
        }
  }

  const getGroupsData = (newValue: string="") => {
    groupService.getGroups({
      ps: 5,
      cursor: '',
      search: newValue,
    }).then(({data: response}) => {
      let data = response.results;
      setGroupsData(data.map((resp) => ({
        label: resp.name,
        value: resp.id
      })))
    });
  };

  const handleError = (error: any) => {
    const errors = error.response.data.error.details;
    for (const err in errors){
        if (err === 'non_field_errors'){
          registerForm.setError('root', {message: errors[err]})
        }else {
          registerForm.setError(err as keyof User, {message: errors[err]})
        }
  }}

  return (
    <div className="">
      <h1 className="text-center text-4xl my-2">
        {props?.userDetail?"Edit":"Add"} <CustomText text="User" />
      </h1>
      <div className="">
        <form onSubmit={registerForm.handleSubmit(onSubmit)}>
          {/* <CustomImageFileInput 
              {...registerForm}
              className="w-20 mx-10 h-20"
              label="profile_pic"
              placeholder="Profile picture"
              options={
                {
                  required:"Profile picture is required!"
                }
              }
              val={props?.userDetail?.id?registerForm.getValues().profile_pic:null}
              error={registerForm.formState.errors?.profile_pic} /> */}

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
                
            <CustomInput
              {...registerForm}
              label="first_name"
              error={registerForm.formState.errors.first_name}
              options={{
                required: "First name is required"
              }}
              placeholder="First Name"
            />
            <CustomInput 
              {...registerForm}
              type="text" 
              placeholder={translate("middle_name")} 
              label="middle_name" 
              error={registerForm.formState.errors.middle_name} options = {{
              required: "middle name is required"
              }} />
            <CustomInput
              {...registerForm}
              label="last_name"
              error={registerForm.formState.errors.last_name}
              options={{
                required: "Last name is required"
              }}
              placeholder="Last Name"
            />

            {
            !props?.userDetail?.id && <>
              <CustomInput
              {...registerForm}
              label="username"
              error={registerForm.formState.errors.username}
              options={{
                required: "Username is required"
              }}
              placeholder={translate("username")+", Eg: john(you will login with it)"} 

            />
            <CustomInput
              {...registerForm}
              label="email"
              error={registerForm.formState.errors.email}
              options={{
                required: "Email is required"
              }}
              placeholder="Email"
            />
              </>
            }
            <CustomInput
              {...registerForm}
              label="phone_number"
              error={registerForm.formState.errors.phone_number}
              options={{
                required: "Phone number is required"
              }}
              placeholder="Phone number"
            />
            {
              user.id !== props.userDetail?.id &&
              <>
            <CustomCheckbox 
              {...registerForm}
              label="is_superuser"
              placeholder="Is Superuser"
              error={registerForm.formState.errors.is_superuser}
              />
            <CustomCheckbox 
              {...registerForm}
              label="is_staff"
              placeholder="Is Staff"
              error={registerForm.formState.errors.is_staff}
              />
              </>
            }
            <CustomDropdown 
              {...registerForm}
              data={GenderOption}
              key="geneder"
              placeholder="Gender"
              label="gender"
              options={
                  {
                      required:"Gender is required"
                  }
              }
              val={props?.userDetail?.id?registerForm.getValues().gender:null}
              isSearchable={false}
              error={registerForm.formState.errors.gender}
            />
            <CustomDropdown
              placeholder="Groups"
              data={groupsData}
              multiple
              register={registerForm.register}
              label='groups'
              options={{
                required: 'Group is required'
              }}
              control={registerForm.control}
              isSearchable={true}
              onInputChange={getGroupsData}
          />
            {/* <CustomInput 
              {...registerForm}
              type="date" 
              placeholder={translate("birth_date")} 
              label="date_of_birth" 
              error={registerForm.formState.errors.date_of_birth} 
              options = {{
              required: "date of birth is required"
               }} /> */}
            <CustomTextArea
                {...registerForm}
                label="bio"
                error={registerForm.formState.errors.bio}
                options={{
                required: "Bio is required"
                }}
                placeholder="Bio"
                className=""
            />
          
            {!props.userDetail &&
            <CustomButton type="submit" text="Add User" is_loading={<SmallLoading {...loading} />}/>}
            {props.userDetail &&
            <CustomButton type="submit" text="Edit User" is_loading={<SmallLoading {...loading} />}/>}
        </form>
      </div>
    </div>
  );
}

export default UserAdd;
