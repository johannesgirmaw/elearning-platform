import useApi from "../../../../utils/api";
import { FetchData } from "../../../../types/FetchData";
import { TableSearchModel } from "../../../../utils/modal";
import { getParamQuery } from "../../../../utils/stringUtils";
export interface PaymentType {
  id: string;
  student: string;
  student_name: string;
  tutor_contract: string;
  tutor: string;
  tutor_name: string;
  payment_type: number;
  status: number;
  hourly_rate: number;
  total_hour: number;
  total_price: number;
  payment_date: Date | string;
  additional_price: number;
  discount_price: number;
  payment_receipt: string;
  payment_receipt_url: string;
  attendance_file: string;
  reference_no: string;
  bank: string;
  bank_name: string;
}

export interface PaymentTableSearchModel extends TableSearchModel {
  method?: string;
  tutor_contract?: string;
}

const usePaymentService = () => {
  const { appApi } = useApi();

  const getPayment = (id: string) => {
    const response = appApi.get<PaymentType>(`finance/${id}/`);
    return response;
  };


  const addPayment = (payment: PaymentType) => {
    const response = appApi.post<PaymentType>("finance/",
      payment);
    return response;
  };

  const editPayment = (payment: PaymentType) => {
    const response = appApi.put<PaymentType>(`finance/${payment.id}/`,
      payment);
    return response;
  };

  const paymentDo = (id: string, method: string, payload?: any) => {
    const response = appApi.patch<PaymentType>(`finance/${id}/?method=${method}`, { payload});
    return response;
  }

  const paymentsDo = (method: string, payload?: any) => {
    const response = appApi.patch<PaymentType>(`finance/?method=${method}`, { ...payload});
    return response;
  }

  const paymentAdminDo = (id: string, method: string, payload?: any) => {
    const response = appApi.patch<PaymentType>(`finance/admin/${id}/?method=${method}`, { payload});
    return response;
  }

  const getPayments = (filterData?: PaymentTableSearchModel) => {

    const response = appApi.get<FetchData<PaymentType>>("finance/", {
      params: getParamQuery(filterData),
    
    });
    return response;
  };

  const deletePayment = (data:{id: string,
   }) => {
    const response = appApi.delete<PaymentType>(`finance/${data.id}`);
    return response;
  };


  return {getPayments, getPayment, addPayment, deletePayment, editPayment, paymentDo, paymentsDo, paymentAdminDo}
};

export default usePaymentService;
