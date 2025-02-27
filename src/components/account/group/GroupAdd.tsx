import CustomInput from '../../customs/custom-input/CustomInput';
import { useEffect, useState } from 'react';
import CustomButton from '../../customs/custom-button/CustomButton';
import CustomText from '../../customs/custom-text/CustomText';
import useLoading from '../../customs/loading/LoadingHook';
import useTranslation from '../../../utils/translation';
import { useNavigate } from 'react-router-dom';
import { Group } from '../../../types/GroupPermission';
import useGroupService from './GroupService';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToast from '../../customs/toast/ToastHook';
import Loading from '../../customs/loading/Loading';

interface Props { 
  searchGroup: () => void, 
  detail?: Group 
  cancel?: () => void;
}
function GroupAdd(props: Props) {
  const [groupName, setGroupName] = useState<Group>();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Group>();

  useEffect(() => {
    props.detail?.name ? setValue("name",props.detail?.name) : setValue("name", "")
  },[props.detail])
  
  const useGroup = useGroupService();
  const loading = useLoading();
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();
  const onSubmit: SubmitHandler<Group> = (data) => {
    if (props.detail){
      useGroup
        .updateGroup(props.detail.id ,data)
        .then(({ data: value }) => {
          props.searchGroup();
          navigate(``);
          setGroupName(undefined);
          props.cancel?.()
          toast.success('Group is added');
          loading.stopLoading();
        })
        .catch((error) => {
          toast.warning(error.message);
          loading.stopLoading();
        });
    }
    else {
      useGroup
        .addGroup(data)
        .then(({ data: value }) => {
          props.searchGroup();
          navigate(``);
          setGroupName(undefined);
          props.cancel?.()
          toast.success('Group is added');
          loading.stopLoading();
        })
        .catch((error) => {
          const errors = error.response.data.error.details;
          for (let err in errors){
            toast.warning(errors[err]);
          }
          loading.stopLoading();
        });
    }
  };
  return (
    <>
      <h1 className="text-center text-2xl my-2">
        Add <CustomText text="Group" />
      </h1>
      <div className="container relative mx-auto grid grid-cols-1 mb-10">
        <Loading {...loading} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <CustomInput
              placeholder={translate('name')}
              register={register}
              label="name"
              options={{ required: 'Group Name is required' }}
              error={errors.name}
            />
            <CustomButton type="submit" text={(props.detail ? "Update" : "Add") +" Group"} />
          </div>
        </form>
      </div>
    </>
  );
}

export default GroupAdd;
