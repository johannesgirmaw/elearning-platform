import { TableSearchModel } from "../../customs/pagination/usePagination";

export interface ToBeInstructorRequest {
	id:string,
	user:string,
	cover_letter:string,
	status:number,
	responder:string,
	comment:string,
	request_date:string,
	profile_pic:string,
	profile_picture?:string
	username:string,
	first_name:string,
	middle_name:string,
}

export interface ToBeInstructorRequestFilterModel extends TableSearchModel{
	user_id?:string,
	status?:number,
	get_data?:string,
}

export interface PartialToBeInstructorRequest extends Partial<ToBeInstructorRequest>{
	
}
