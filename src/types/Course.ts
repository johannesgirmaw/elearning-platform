import { TCId, TableSearchModel } from "../utils/modal";
import { Category } from "./Category";
import { FileTypes } from "./Enums";
import { User } from "./UserItem";

export interface Course {
    name: string;
    invalid?: boolean
    id: string,
    course_code: string,
    description: string,
    categorys: string,
    category: string[],
    category_names:string[],
    course_price: number,
    enrolled_count: number;
    course_status?: number
    rating?: number
    chapters?: number;
    contents?: number;
    durations?: string;
    course_level: string,
    time_limit: string,
    course_image: FileList | string,
    course_type: number,
    instructor: []
    progress: number
}

export interface CourseMissingType  {
    invalid: boolean;
    chap_no_cont: {id:string, chapter_name: string }[];
    cont_no_ques: {id: string, chapter_name: string, title: string}[]
    ques_no_ans: {id: string, question: string, chapter_name: string,  content_title: string}[]
}

export interface  CourseTableSearchModel extends TableSearchModel {
    category_id?: string;
    course_status?: number;
    method?: string;
}

export interface Content {
    id: string;
    chapter: string,
    title: string,
    description: string,
    duration: string;
    no_question: number;
    passing_percent: number;
    re_examination_waiting: string;
    file_field: any| null,
    url: string,
    absolute_url: string,
    progress_id: string;
    content_name: string,
    content_type: keyof typeof FileTypes,
    content_number: number,
    question_content: Question[]
}

export interface Reviewer{
    id?:string;
    rating:number;
    comment:string;
    response?: string;
    responsed_by?: string;
    responsed_by_name?: string;
    response_date?: Date | string;
    target?: string;
    review_date?:string
    reviewer?:string
    reviewer_name?: string
    profile_pic?: string;
    profile_picture?: string
}

export interface Rating {
    rate: number;
    percent: number
}
export interface TotalReview {
    rating: number;
    course: string;
    ratings: Rating[]
}

export interface Question {
    id: string;
    content: string;
    question: string;
    options_questions : QuestionOption[];
    answers: Answer[]
    answer_type: number
    answer?: string;
    is_correct?: boolean;
    answer_question: Answer[]
}

export interface Answer {
    id: string;
    question: string,
    answer: string
}

export interface QuestionOption {
    id: string;
    key: string;
    question: string,
    value: string
    answer_option?: string;
}

export interface Chapter {
    id: string;
    chapter_name: string,
    chapter_title: string,
    course: string
    contents: number;
    durations: string;

}

export class CourseDetailModel {
    course_id: string;
    course_category: string;
    course_description: string;
    course_price_id: string;
    assisitant_instructor_id: string;
    course_video_id: string;
    course_type: number;
    course_level: number;
}
export interface CoursePriceModel {
    course_id: string,
    price: number,
    instructor_price: number,
}

export interface ChapterModel {
    id: string,
    course_id: string,
    chapter_name: string,
    chapter_title: string,
    chapter_number: number,
    contents: number;
    durations: string;
    progress_id: string;
}

export interface CourseCartModel {
    user_id: string,
    course_id: string,
    status: string,
}

export interface CourseCartModel {
    user_id: string,
    course_id: string,
    enrol_start_date: Date,
    enrol_end_date: Date,

}

export interface CourseEnrollment {
    user: string,
    course: string | Course,
    enroll_start_date: Date,
    enroll_end_date: Date,
    progress: number
    rating?: number
    apply_rating?: number
}

export interface CourseProgress {
    id: string;
    course: string,
    user: string,
    user_name: string;
    progress: number;
    course_progress_status: number;
    result: number;
}

export interface ChapterProgress {
    chapter: string,
    user: string,
    chapter_progress_status: number
}

export interface ContentProgress {
    id: string,
    content: string,
    user: string,
    content_progress_status: number
}

export interface UserAnswers {
    id: string;
    user: string;
    question: string;
    answer: string;
}

export interface UserQuizeResultsType {
    id: string;
    user: string;
    is_passed: boolean;
    result: number;
    total: number;
    content: number;
    content_title: string;
    chapter_title: string;
    create_date: Date

}

export interface QuestionSideNav {
    id: string
    content: string,
    question: string,
    options_questions: QuestionOption[]
    answers: Answer[]
    answer_question: Answer
}
export interface ContentSideNav extends Content {
    id: string;
    content_progress: ContentProgress,
    // question_content: QuestionSideNav[]
    // answers: Answer[]
    answer_quesion: Answer[]
}

export interface ChapterModelSideNav extends ChapterModel {
    content_chapter: ContentSideNav[],
    chapter_progress: number,
}

export interface CourseEnrolled extends Course {
    is_enrolled: boolean;
    enrolled_count: number;
    last_chapter: string;
    last_content: string;
    chapter_course: ChapterModelSideNav[]
}

export interface ReviewTableSearchModel extends TableSearchModel {
    method?: string;
    target?: string;
}