import { useContext, useEffect, useState } from 'react';
import { Button, Card, Divider, Modal, Switch } from 'antd';
import useLoading from '../../customs/loading/LoadingHook';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../slicers/store';
import useUserService from '../user/UserService';
import { PartialUser, User } from '../../../types/UserItem';
import { Language, Languages } from '../../../types/Translation';
import { SelectItem } from '../../../types/MenuItems';
import { getUser, setLanguage } from "../../../slicers/user";
import CustomDropdown from '../../customs/custom-input/CustomDropdown';
import useTranslation from '../../../utils/translation';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordChange from '../auth/PasswordChange';
import CustomImageFileInput from '../../customs/custom-input/CustomImageFileInput';
import useFileService from '../../commons/file/FileService';
import CustomButton from '../../customs/custom-button/CustomButton';
import ProfileUpdate from './ProfileUpdate';
import { UserContext } from '../../../pages/course/ProfileInstructor';
import SmallLoading from '../../customs/loading/SmallLoading';


export const languages: SelectItem<string | number>[] = [
  { label: "Amharic", value: Languages.AMH },
  { label: "English", value: Languages.ENG },
];
const enum componentEnum {
  profile_pic = 100,
  password,
  edit
};
const ProfileDetail = () => {
  const { register, control, formState: { errors } } = useForm<Language>();
  const [open, setOpen] = useState(false)
  const user = useSelector((state: RootState) => state.user)
  const registerForm = useForm<User>({ defaultValues: user })
  const fileService = useFileService()
  const [component, setComponent] = useState(100)
  const loading = useLoading();
  const userService = useUserService();
  const dispatch = useDispatch();
  const { translate } = useTranslation();
  const { userId } = useContext(UserContext)

  const applyLanguage: (val: string) => void = (val: string) => {
    let data: PartialUser = { lang: val as Languages }
    userService.updateUser(user.id, data).then((val) => {
      dispatch(setLanguage(val.data.lang));
    })
  };

  useEffect(()=>{

  }, [])

  const onSubmit: SubmitHandler<User> = (data) => {
    loading.startLoading();
    const formData = new FormData()
    formData.append("url", data.profile_pic[0] as Blob, (data.profile_pic[0] as File)?.name);
    formData.append("file_type", '101');
    fileService.addFile(formData).then(({ data: value }) => {
      data.profile_pic = value.id;
      userService.editUser(data).then(({ data: value }) => {
        onClose()
        value && dispatch(getUser(value));
        loading.stopLoading()
      }
      ).catch((error) => loading.stopLoading())
    });
  }

  const onClose = () => {
    setOpen(false);
    setComponent(100)
  }


  return (
    <>
      <div className='flex gap-2 flex-wrap pb-2 w-full'>
        <div key={user?.id}
          className='group relative w-full flex items-center justify-center'>
          <Card className="hover:border-gray-200">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-row flex-wrap max-w-80 gap-2 items-start text-xl">
                  <Button onClick={() => { setOpen(true); setComponent(componentEnum.profile_pic) }} >Change Profile Pic</Button>
                <div className="h-24 mt-2 mx-1 w-full md:-order-1  text-white 
                        place-items-center flex">
                  {user?.profile_picture
                    ? <img src={user?.profile_picture as string} alt="Logo" className="w-24 h-24 lg:w-29 bg-custom_orange-800 rounded-full border-white" />
                    : <span className="font-bold w-24 rounded-full py-7 shadow-sm text-center bg-custom_orange-800 text-3xl">{user?.first_name?.[0]}{user?.last_name?.[0]}</span>
                  }
                </div>
                {/* <div className='flex gap-2'> */}
                  <Button onClick={() => { setOpen(true); setComponent(componentEnum.password) }} className={`bg-gray-400`} children="Change Password" />
                {/* </div> */}
                <CustomDropdown
                  placeholder={translate("languages")}
                  data={languages}
                  val={user?.lang}
                  onValueChange={(value) => applyLanguage(value)}
                  id="id"
                  label="language"
                  control={control}
                  isSearchable={false}
                  register={register} />
              </div>
              <Divider type={window.innerWidth <= 768 ? "horizontal" : "vertical"} className="" />
              <div className="mx-5">
                <div className="my-3"><span className="font-bold">Full Name:</span> {user?.first_name} {user?.middle_name} {user?.last_name}</div>
                <div className="my-3"><span className="font-bold">Username:</span> {user?.username}</div>
                <div className="my-3"><span className="font-bold">Phone No:</span> {user?.phone_number}</div>
                <div className="my-3"><span className="font-bold">Email: </span>{user?.email}</div>
                {/* <div className="my-3"><span className="font-bold">Birth Date: </span>{user?.date_of_birth}</div> */}
              </div>
              <Divider type={window.innerWidth <= 768 ? "horizontal" : "vertical"} className="" />
              <div className="mx-5 lg:w-48">
                <div className="my-1"><div className="font-bold">About</div> {user?.bio}</div>
                <Button className="my-3" onClick={() => { setOpen(true); setComponent(componentEnum.edit) }}>Edit</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Modal open={open} onCancel={() => onClose()} footer={[]}>
        {component === componentEnum.edit ? <ProfileUpdate onClose={onClose} /> :
          component === componentEnum.password ? <PasswordChange onClose={onClose} /> :
            <form onSubmit={registerForm.handleSubmit(onSubmit)} className='flex flex-col items-center'>
              <div className="w-fit">
                <CustomImageFileInput
                  {...registerForm}
                  label="profile_pic"
                  placeholder="Profile picture"
                  options={{
                    required: "profile picture is required!"
                  }
                  }
                  className="mx-20"
                  val={user ? user.profile_pic : ""}
                  error={registerForm.formState.errors.profile_pic}
                />
              </div>

              <div className="mt-5 w-full">
                <CustomButton type="submit" text={"Change Profile"} is_loading={<SmallLoading {...loading} />} />
              </div>
            </form>}
      </Modal>
    </>
  );
};

export default ProfileDetail;
