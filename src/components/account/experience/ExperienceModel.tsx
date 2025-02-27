import { TableSearchModel } from "../../customs/pagination/usePagination";

export interface Experience{
	id:string,
    user:string,
    job_title: string,
    company:string,
    start_date:string,
    end_date:string|undefined,
    experience_document:FileList | string,
    currently_working:boolean
}

export interface ExperienceFilterModel extends TableSearchModel {
	user_id?:string
}