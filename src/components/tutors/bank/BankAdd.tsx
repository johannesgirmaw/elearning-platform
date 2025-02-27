import CustomInput from "../../customs/custom-input/CustomInput";
import { useEffect } from "react";
import CustomButton from "../../customs/custom-button/CustomButton";
import CustomText from "../../customs/custom-text/CustomText";
import { Bank } from "../../../types/BankItem";
import useLoading from "../../customs/loading/LoadingHook";
import useTranslation from "../../../utils/translation";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useBankService from "./BankService";
import SmallLoading from "../../customs/loading/SmallLoading";
import Loading from "../../customs/loading/Loading";

interface Props {
  searchBanks: () => void,
  bankDetail?: Bank
  cancel?: () => void;
}

function BankAdd(props: Props) {
  const bankForm = useForm<Bank>();
  const bankService = useBankService()
  const loading = useLoading()
  const { translate } = useTranslation()

  const navigate = useNavigate();

  const resetVal = () => {
    bankForm.reset({
      description: "",
      is_active: true
    })
  }

  useEffect(() => {

    if (props?.bankDetail) {
      bankForm.reset({ ...props.bankDetail })
    } else {
      resetVal()
    }
  }, [props.bankDetail, bankForm.reset])

  const onSubmit: SubmitHandler<Bank> = (data) => {

    loading.startLoading()
    if (props.bankDetail) {
      bankService.editBank(data)
        .then(({ data: value }) => {
          loading.stopLoading()
          props.searchBanks()
          props.cancel?.();
          resetVal()
          navigate(`/instructor_dashboard/bank_list`)
        }).catch(
          (error) => {
            loading.stopLoading()
            handleError(error)
            loading.stopLoading()
          }
        )
    } else {
      bankService.addBank(data)
        .then(({ data: value }) => {
          loading.stopLoading()
          props.searchBanks()
          props.cancel?.();
          resetVal()
          navigate(`/instructor_dashboard/bank_list`)
        }).catch(
          (error) => {
            loading.stopLoading()
            handleError(error)
            loading.stopLoading()
          }
        )
    }



  };
  const handleError = (error: any) => {

    const errors = error.response.data.error.details;
    for (const err in errors) {
      if (err === 'non_field_errors') {
        bankForm.setError('root', { message: errors[err] })
      } else {
        bankForm.setError(err as keyof Bank, { message: errors[err] })
      }
    }
  }
  // const cancelEdit = () => {
  //   bankForm.reset({})
  //   navigate('/instructor_dashboard/bank_list')
  // }

  return (
    <div className="relative">
      <Loading {...loading} />
      <h1 className="my-2 text-2xl font-bold text-left ml-7 ">
        {props?.bankDetail ? "Edit" : "Add"} <CustomText text="Bank" />
      </h1>
      <div className="container mx-auto ">
        <form onSubmit={bankForm.handleSubmit(onSubmit)}>
          <div className="px-7">
            <CustomInput
              {...bankForm}
              label="bank_name"
              options={{
                required: "Bank Name is required"
              }}
              placeholder="Bank Name"
            />
            <CustomInput
              type="number"
              placeholder={translate("account_number")}
              {...bankForm}
              label="account_number"
            />
            <CustomInput
              type="text"
              placeholder={translate("description")}
              {...bankForm}
              label="description"
            />

            {!props.bankDetail &&
              <CustomButton type="submit" text="Add Bank" />}
            {props.bankDetail &&
              <CustomButton type="submit" text="Edit Bank" is_loading={<SmallLoading {...loading} />} />}

          </div>
        </form>
      </div>
    </div>
  );
}

export default BankAdd;
