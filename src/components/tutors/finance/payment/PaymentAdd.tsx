import { SubmitHandler, useForm } from "react-hook-form";
import usePaymentService, { PaymentType } from "./usePaymentService";
import { ContentType } from "../../../../types/Enums";
import CustomInput from "../../../customs/custom-input/CustomInput";
import CustomButton from "../../../customs/custom-button/CustomButton";
import { CustomFileUploader } from "../../../customs/custom-input/CustomFileUploader";
import { FaReceipt } from "react-icons/fa";
import CustomDropdown from "../../../customs/custom-input/CustomDropdown";
import { useEffect, useState } from "react";
import useBankService from "../../bank/BankService";
import { handleError } from "../../../../utils/api";

interface Props {
    detail?: PaymentType;
    cancel: () => void;
    searchPayment: () => void
}


const PaymentAdd = (props: Props) => {
    const paymentRegister = useForm<PaymentType>()
    const bankService = useBankService();
    const paymentService = usePaymentService();
    const [parentLocation, setParentLocation ] = useState<any[]>([]);
    const onSubmit: SubmitHandler<PaymentType> = (data: PaymentType) => {
        paymentService.paymentDo(data.id, "add_receipt", data).then((value) => {
          props.cancel()
        }).catch(error => {
          handleError(error, paymentRegister);
        })
    }

    const getBank = (search: string) => {
      bankService.getBanks({search}).then((value) => {
        setParentLocation(value.data.results.map((v) => ({ label: v.bank_name, value: v.id })))
    });
    };

    useEffect(() => {
      paymentRegister.reset({...props.detail})
      if(props.detail){
        setParentLocation([{label: props.detail.bank_name, value: props.detail?.bank}])
      }
    }, [])

    return (
      <>
        <div>
          <form
            onSubmit={paymentRegister.handleSubmit(onSubmit)}
            className="gap-3 sm:flex"
          >
            <div className="sm:w-1/2">
              <CustomFileUploader
                fileType={ContentType.IMAGE}
                file_id="payment_receipt"
                label="payment_receipt_url"
                placeholder="Payment Receipt"
                imagePlaceHolder={ <>
                    <p className="ant-upload-drag-icon">
                      <FaReceipt />
                    </p>
                    <p className="ant-upload-text">Click or picture to this area to upload</p>
                  </>}
                {...paymentRegister}
              />
            </div>
            <div className="flex flex-col justify-center sm:w-1/2">
              <CustomDropdown
        type="select"
        className="w-full "
        label="bank"
        options={{
          required: "Bank is required",
        }}
        isSearchable={true}
        data={parentLocation}
        placeholder="Bank"
        onInputChange={getBank}
        {...paymentRegister}
      />
              <CustomInput
                placeholder="Reference Number"
                label="reference_no"
                {...paymentRegister}
              />
              <div className="flex justify-end">
                <CustomButton type="submit" text="Submit" className="px-4 sm:leading-none sm:text-md" />
              </div>
            </div>
          </form>
        </div>
      </>
    );
}

export default PaymentAdd;