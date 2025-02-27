import CustomInput from '../../customs/custom-input/CustomInput';
import CustomDropdown from '../../customs/custom-input/CustomDropdown';
import { useEffect, useState } from 'react';
import CustomButton from '../../customs/custom-button/CustomButton';
import CustomText from '../../customs/custom-text/CustomText';
import { ContentType } from '../../../types/ContentType';
import { BackEndError, User } from '../../../types/UserItem';
import CustomInputError from '../../customs/custom-input-error/CustomInputError';
import useTranslation from '../../../utils/translation';
import { RootState } from '../../../slicers/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useContentTypeApi from '../group/ContentTypeApi';
import { UserPermission } from '../../../types/UserPermission';
import CustomCheckbox from '../../customs/custom-input/CustomCheckbox';
import useUserApi from './UserApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectItem } from '../../../types/MenuItems';
import useContentTypeService from '../group/ContentTypeService';
import useUserService from './UserService';
import { usePagination } from '../../customs/pagination/usePagination';
import useLoading from '../../customs/loading/LoadingHook';
import Loading from '../../customs/loading/Loading';
import useUserPermissionService from './UserPermissionService';

function UserPermissionAdd(props: { cancel?: () => void; searchUserPermission: () => void }) {
  const [contentType, setContentType] = useState<ContentType>();
  const [ContentTypes, setContentTypes] = useState<SelectItem<string>[]>([]);
  const [usersData, setUsersData] = useState<SelectItem<string>[]>([]);
  const [userData, setUserData] = useState<User>();
  const { register, control, setError, handleSubmit, formState: { errors } } = useForm<UserPermission>();
  const userPermissionService = useUserPermissionService();
  const contentTypeService = useContentTypeService();
  const userService = useUserService();
  const paginator = usePagination();

  const loading = useLoading();
  const { translate } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const getContentTypeData = (newValue: string) => {
    contentTypeService.getContentTypes({
      pageSize: 5,
      cursor: '',
      searchText: newValue,
    }).then(({data: response}) => {
      setContentTypes(response.results.map((resp) => ({
        label: resp.model,
        value: resp.id
      })))
    });
  };

  const getUserData = (newValue: string) => {
    userService.getUsers(
      paginator.filterData
    ).then(({data: response}) => {
      setUsersData(response.results.map((resp) => ({
        label: `${resp.username}`,
        value: resp.id
      })))
    });
  };

  useEffect(() => {
    getContentTypeData('')
    getUserData('')
  }, [])

  const onSubmit: SubmitHandler<UserPermission>  = (data) => {
    if (!data.can_change && !data.can_create && !data.can_delete && !data.can_view) {
      setError("root", {
        type: "manual",
        message: "At least one of checkbox have to be checked"
      });
      return;
    }
    loading.startLoading();
    userPermissionService
      .addUserPermission(data)
      .then(({ data: value }) => {
        props.searchUserPermission();
        props.cancel?.();
        loading.stopLoading();
        // setContentTypes(undefined)
      })
      .catch((error) => {
        const errors = error.response.data.error.details;
        for (const err in errors){
            if (err === 'non_field_errors'){
                setError('root', {message: errors[err]})
            }else {
                setError(err as keyof UserPermission, {message: errors[err]})
            }
        }
        loading.stopLoading();
      });
  };


  return (
    <>
      <h1 className="text-center text-2xl my-2">
        Add <CustomText text="User Permission" />
      </h1>
      <div className="container relative mx-auto grid grid-cols-1">
        <Loading {...loading} />
        <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInputError msg={errors.root?.message} key={2}/>
          <div>
          <CustomDropdown
            placeholder="User"
            data={usersData}
              register={register}
              label='user'
              options={{
                required: 'User is required'
              }}
              isSearchable={true}
              error={errors.user}
              onInputChange={getUserData}
            control={control}
          />
          <CustomDropdown
            placeholder="Content type"
            data={ContentTypes}
            register={register}
            label='content_type'
            options={{
              required: 'Content Type is required'
            }}
            isSearchable={true}
            error={errors.content_type}
            onInputChange={getContentTypeData}
            control={control}
          />
            <div className="mt-5 p-5 gap-x-4 gap-y-2 flex flex-wrap  items-center   border  border-custom_orange-700 rounded-md justify-start">
                <CustomCheckbox
                  placeholder="Can View" className='w-fit' register={register} label='can_view' error={errors.can_view}
                />
                <CustomCheckbox
                  placeholder="Can Change" className='w-fit' register={register} label='can_change' error={errors.can_change}
                />
              <CustomCheckbox
                  placeholder="Can Create" register={register} label='can_create' error={errors.can_create}
                />
                <CustomCheckbox
                  placeholder="Can Delete" register={register} label='can_delete' 
                error={errors.can_delete}
                />
                <CustomCheckbox
                  placeholder="Can Other Action" register={register} label='other_action' 
                error={errors.other_action}
                />
            </div>

            <CustomButton type="submit" text="Add User Permission" />
          </div>
        </form>
      </div>
    </>
  );
}

export default UserPermissionAdd;
