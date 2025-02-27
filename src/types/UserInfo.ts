export interface Experience{
	id:string,
    user:string,
    job_title: string,
    company:string,
    start_date:string,
    end_date:string,
    experience_document:FileList | string,
    exp_document:FileList | string,
	currently_working?:boolean
}

// export interface EducationalBackground{
// 	id:string,
// 	user:string,
// 	level_of_education: number,
// 	school_of_education: string,
// 	document:FileList|string,
// 	start_date:string,
// 	year_of_graduation:string,
// 	currently_learning?:boolean
// }