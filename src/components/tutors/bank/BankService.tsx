import useApi from "../../../utils/api";
import { Bank } from "../../../types/BankItem"
import { FetchData } from "../../../types/FetchData";
import { positions } from "slate";
import useToast from "../../customs/toast/ToastHook";
import { TableSearchModel } from "../../customs/pagination/usePagination";

interface BankSearchModel extends TableSearchModel {
  position?: null | string
  isHome?: boolean
}

const useBankService = () => {
  const { appApi } = useApi();

  const getBank = (id: string) => {
    const response = appApi.get<Bank>(`banks/${id}/`);
    return response;
  };
 
  const getBanks = (data:BankSearchModel) => {
    const response = appApi.get<FetchData<Bank>>(`banks/`, {
      params: {
        ...data
      }
    });
    return response;
  };
  const addBank = (data: Bank) => {
    const response = appApi.post<Bank>("banks/", data);
    return response;
  };
  const editBank = (data: Bank) => {
    const response = appApi.patch<Bank>(`banks/${data.id}/`, data);
    return response;
  };

  const deleteBank = (id: string) => {
    const response = appApi.delete<Bank>(`banks/${id}/`);
    return response;
  };

  return {getBanks,editBank,addBank, getBank,deleteBank }
};

export default useBankService
