import { Commons } from "./Commons";
import { User } from "./UserItem";

export interface Attendance extends Commons {
  tutor_contract_request: string,
  tutor: string | User,
  student: string | User | undefined,
  student_name: string,
  tutor_name: string,
  starting_time: string,
  ending_time: string,
  starting_hour:Date | string,
  ending_hour:Date | string,
  total_daily_hour:number,
  status:number,
  remark: string,
}

