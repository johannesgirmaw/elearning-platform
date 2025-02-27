import { AvailableTime } from "../components/tutors/tutor/TutorInfoModel";
import { TableSearchModel } from "../utils/modal";
import { Commons } from "./Commons";
import { Languages } from "./Translation";

export interface ETutorContract extends Commons {
    id: string ,
    tutor: string | undefined,
    tutor_id: string | undefined,
    user: string | undefined, 
    payment_date:string,
    student: string,
    status: string | number,
    student_first_name: string,
    student_last_name : string,
    student_name : string,
    student_phone_num : string 
    student_subject: string,
    student_level:string,
    student_location:string,
    tutor_name: string; 
    end_date: Date | string;
    profile_pic: string;
    profile_picture?:string;
    contract_availabilty_times : AvailableTime[],
}

export interface ETutorContractFilterModel extends TableSearchModel{
	user_id:string | undefined
}

export interface PartialETutorContract extends Partial<ETutorContract>{
	
}






