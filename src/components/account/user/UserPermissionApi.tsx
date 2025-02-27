import { useState } from "react";
import useUserPermissionService from "./UserPermissionService"
import { UserPermission } from "../../../types/UserPermission";

const useContentTypeApi = () => {
  const [next,setNext]=useState("")
  const [prev,setPrev]=useState("")
  const {getUserPermissions} = useUserPermissionService();


 const getUserPermission = (data: { pageSize:number,cursor:string, searchText: string,  setUserPermissionsList:(lst: UserPermission[]) => void}) => {
  if(data.cursor==="1" ){
    data.cursor=next;
  }else if(data.cursor==="2"){
    data["cursor"]=prev;
  }else{
    data.cursor = next
  }
  // getUserPermissions(data).then(({data: response}) => {
  //   data.setUserPermissionsList(response)
  //   })
 };
 return {getUserPermission}
}

 export default useContentTypeApi ;