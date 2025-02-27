import { useState } from "react";
import {ContentType} from "../../../types/ContentType"
import useContentTypeService from "./ContentTypeService"

const useContentTypeApi = () => {
  const [next,setNext]=useState("")
  const [prev,setPrev]=useState("")
  const {getContentTypes} = useContentTypeService();


 const getContentType = (data: { pageSize:number,cursor:string, searchText: string}) => {
  if(data.cursor==="1" ){
    data.cursor=next;
  }else if(data.cursor==="2"){
    data["cursor"]=prev;
  }else{
    data.cursor = next
  }
  getContentTypes(data).then(({data: response}) => {
    // data.setContentTypesList(response.results)
    
    if(response?.next!==null){
      // setNext(response.next["cursor"]);
     }
      if(response?.previous!==null){
        // setPrev(response.prev["cursor"]);
       
      }
    })
 };
 return {getContentType}
}

 export default useContentTypeApi ;