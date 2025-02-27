import { SubmitHandler, useForm } from "react-hook-form";
import CustomFileInput from "../../../customs/custom-input/CustomFileInput";
import { PaymentType } from "./usePaymentService";
import { ContentType } from "../../../../types/Enums";

interface Props {
    detail?: PaymentType;
    cancel: () => void;
    searchPayment: () => void
}


const PaymentGenerate = (props: Props) => {
    const paymentRegister = useForm<PaymentType>()
    const onSubmit: SubmitHandler<PaymentType> = (data: PaymentType) => {
        console.log(data)
    }

    return <>
        <div>
            <form onSubmit={paymentRegister.handleSubmit(onSubmit)}>
                <CustomFileInput label="payment_receipt" fileType={ContentType.DOCUMENT} register={paymentRegister.register} options={{
                    required: true
                }} placeholder="Payment Receipt" />
            </form>
        </div>
    </>
}

export default PaymentGenerate;