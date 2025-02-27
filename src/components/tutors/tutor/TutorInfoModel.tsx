import {  Experience } from "../../../types/UserInfo";
import { TableSearchModel } from "../../customs/pagination/usePagination";
import { EducationalBackground } from "../../account/educational-background/EducationBackgroundModel";

export interface LocationTableSearchModel extends TableSearchModel {
	location_type?: number;
	parent? : string;
  }
  
  export interface TutorTableSearchModel extends TableSearchModel {
	tutor_type?: string;
	get_data?:string;
  }
  
  export interface Tutor {
	  id: string;
	  tutor: string;
	  availabilty_times : AvailableTime[],
	  tutor_name: string;
	  profile_pic: string;
	  profile_picture: string;
	  no_of_review: number
	  region_name:string,
	  zone_name: string;
	  woreda_name: string;
	  region: string;
	  zone: string;
	  location: string;
	  hourly_rate: number;
	  tutor_type: string;
	  introduction: string;
	  rating: number;
	  reviews: number;
	  average_rate_value: number;
	  status:number,
	  comment:string,
	  request_date:string,
	  experiences?:Experience[]
	  educations?:EducationalBackground[]
	  is_contracted:boolean;
	  nearest_location?:string;
	  preferred_subject?:string;
	  preferred_subject_names?:string[];
	}
  
  export interface Location {
	id: string;
	location_type: number;
	address: string;
	parent: string;
  }
  
  export interface AvailableTime {
	id?: string;
	start_time: string;
	end_time: string
	day: number;
  } 
  
export interface TutorInfoFilterModel extends TableSearchModel{
	user_id?:string,
	status?:number
}
export interface PartialTutorRequest extends Partial<Tutor>{
	
}
