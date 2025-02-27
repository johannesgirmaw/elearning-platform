import { useState } from "react";
import { Bank } from "../../../types/BankItem";
import useToast from "../../customs/toast/ToastHook";
import useBankService from "./BankService"
import { TableSearchModel } from "../../customs/pagination/usePagination";

const useBankApi = () => {
  const [next, setNext] = useState("")
  const [prev, setPrev] = useState("")
  const { getBanks, deleteBank, addBank } = useBankService();
  const toast = useToast()

  const getBank = async (data: TableSearchModel, setBanksList: (lst: Bank[]) => void) => {
    if (data.cursor === "1") {
      data.cursor = next;
    } else if (data.cursor === "2") {
      data["cursor"] = prev;
    }

    await getBanks(data).then(({ data: response }) => {
      setBanksList(response.results)
      setNext(response.next["cursor"] || "");
      setPrev(response.previous["cursor"] || "");
    })
  };
  const deleteBank_ = async (data: {
    id: string,
    setOpenModel: (id: string) => void,
    setBanksList: (lst: Bank[]) => void
  }) => {
    let result
    try {

      result = await deleteBank(data.id);
      getBank({ ps: 5, cursor: "", search: "" }, data.setBanksList)
      data.setOpenModel("")
    } catch (error: any) {
      data.setOpenModel("")
      toast.warning(error?.response?.data?.error?.details[0]);
      result = error
    }

    return result
  };


  return { getBank, deleteBank_ }
}

export default useBankApi;