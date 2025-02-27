import { useState } from "react";
import { Category } from "../../../types/Category";
import useToast from "../../customs/toast/ToastHook";
import useCategoryService from "./CategoryService"
import { TableSearchModel } from "../../customs/pagination/usePagination";

const useCategoryApi = () => {
  const [next,setNext]=useState("")
  const [prev,setPrev]=useState("")
 const {getCategories,deleteCategory} = useCategoryService();
 const toast = useToast()
 const getCat = async (data: TableSearchModel,   setCategoriesList:(lst: Category[]) => void) => {
  if(data.cursor==="1" ){
    data.cursor=next;
  }else if(data.cursor==="2"){
    data["cursor"]=prev;
  }

  await getCategories(data).then(({data: response}) => {
    setCategoriesList(response.results)
      setNext(response.next["cursor"] || "");
      setPrev(response.previous["cursor"] || "");
    })
 };
 const deleteCat = async(data:{id: string,
  setCategoriesList:(lst: Category[]) => void}) => {
  let result 
  try {
    
    result =  await deleteCategory(data.id);
   } catch (error:any) {
    toast.warning(error?.response?.data?.error?.details[0]);
    result = error
   }
 
  return result
};

 return {getCat,deleteCat}
}

 export default useCategoryApi ;