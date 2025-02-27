import { PermissionModel } from "../types/UserItem";

export const validateNotOnlyNumber = (fieldValue:string | number | boolean | {} | FileList  | {}[] | undefined)=>{
    return (fieldValue&&isNaN(parseInt(fieldValue?.toString()))) || "Please enter string only!"
  }