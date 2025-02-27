import CustomInput from '../../customs/custom-input/CustomInput';
import CustomDropdown from '../../customs/custom-input/CustomDropdown';
import { useEffect, useState } from 'react';
import CustomButton from '../../customs/custom-button/CustomButton';
import CustomText from '../../customs/custom-text/CustomText';
import { ContentType } from '../../../types/ContentType';
import useGroupPermissionService from './GroupPermissionService';
import { BackEndError, User } from '../../../types/UserItem';
import CustomInputError from '../../customs/custom-input-error/CustomInputError';
import useLoading from '../../customs/loading/LoadingHook';
import Loading from '../../customs/loading/Loading';
import useTranslation from '../../../utils/translation';
import { useNavigate } from 'react-router-dom';
import CustomCheckbox from '../../customs/custom-input/CustomCheckbox';
import { Group, GroupPermission } from '../../../types/GroupPermission';
import { SubmitHandler, Validate, useForm } from 'react-hook-form';
import { SelectItem } from '../../../types/MenuItems';
import useGroupService from './GroupService';
import useContentTypeService from './ContentTypeService';

function GroupPermissionAdd(props: { cancel?: () => void; searchGroupPermission: () => void }) {
  const [ContentTypes, setContentTypes] = useState<SelectItem<string>[]>([]);
  const [groupsData, setGroupsData] = useState<SelectItem<string>[]>([])
  const { register, control, setError, handleSubmit, formState: { errors, dirtyFields } } = useForm<GroupPermission>();
  const useGroupPermission = useGroupPermissionService();
  const loading = useLoading();
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const groupService = useGroupService()
  const contentTypeService = useContentTypeService()

  const getContentTypeData = (newValue: string) => {
    console.log(groupsData)
    contentTypeService.getContentTypes({
      pageSize: 5,
      cursor: '',
      searchText: newValue,
    }).then(({data: response}) => {
      
      setContentTypes(response.results.map((resp) => ({
        label: resp.model,
        value: resp.model
      })))
    });
  };

  const getGroupsData = (newValue: string) => {
    groupService.getGroups({
      ps: 5,
      cursor: '',
      search: newValue,
    }).then(({data: response}) => {
      let data = response.results;
      setGroupsData(data.map((resp) => ({
        label: resp.name,
        value: resp.name
      })))
    });
  };

  const onSubmit: SubmitHandler<GroupPermission>  = (data) => {
    if (!data.can_change && !data.can_create && !data.can_delete && !data.can_view) {
      setError("root", {
        type: "manual",
        message: "At least one of checkbox have to be checked"
      });
      return;
    }
    loading.startLoading();
    useGroupPermission
      .addGroupPermission(data)
      .then(({ data: value }) => {
        props.searchGroupPermission()
        props.cancel?.();
        loading.stopLoading();
      })
      .catch((error) => {
        const errors = error.response.data.error.details;
        for (const err in errors){
            if (err === 'non_field_errors'){
                setError('root', {message: errors[err]})
            }else {
                setError(err as keyof GroupPermission, {message: errors[err]})
            }
        }
        loading.stopLoading()
    });
  };

  // useEffect(() => {
  //   getContentTypeData('')
  //   getGroupsData('')
  // }, [])


  return (
    <>
      <h1 className="text-center text-2xl my-2">
        Add <CustomText text="Group Permission" />
      </h1>
      <div className="container relative mx-auto grid grid-cols-1">
        <Loading {...loading} />
        <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInputError msg={errors.root?.message} key={2}/>
          <div>
          <CustomDropdown
            placeholder="Group"
            data={groupsData}
            register={register}
            label='group'
            options={{
              required: 'Group is required'
            }}
            isSearchable={true}
            error={errors.group}
            onInputChange={(value)=>getGroupsData(value)}
            
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
                  placeholder="Can View" register={register} label='can_view'
                />
                <CustomCheckbox
                  placeholder="Can Change" register={register} label='can_change' 
                />
              <CustomCheckbox
                  placeholder="Can Create" register={register} label='can_create'
                />
                <CustomCheckbox
                  placeholder="Can Delete" register={register} label='can_delete'
                />

                <CustomCheckbox
                  placeholder="Can Other Action" register={register} label='other_action' 
                error={errors.other_action} />
            </div>

            <CustomButton type="submit" text="Add Group Permission" />
          </div>
        </form>
      </div>
    </>
  );
}

export default GroupPermissionAdd;
