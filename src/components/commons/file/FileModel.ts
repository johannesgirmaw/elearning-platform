import { TableSearchModel } from "../../customs/pagination/usePagination"

export interface FileModel{
    file_name: string
    content_type:number,
    target:string,
    is_downloaded:boolean,
    url:string,
    file_url:string,
    file_type:number,
    file_size:number
}

export interface FileModelSearch extends TableSearchModel{


}