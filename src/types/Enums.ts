import { SelectItem } from "./MenuItems";

export const ContentType = {
  VIDEO: 100,
  IMAGE: 101,
  DOCUMENT: 102,
  QUESTION: 103,
  YOUTUBE_VIDEO: 104
} as const;


export const ProgresStatus = {
  STARTED: 100,
  FINISHED: 102,
} as const;

export enum componentType {
  TEXT,
  DROPDOWN,
  DATE,
  SEARCH,
  TOGGLE,
}

export enum AttendanceStatus {
    SUBMITTED = 100,
    RESUBMITTED,
    ACCEPTED,
    REJECTED
}

export const FileTypes = {
  100: '.mp4,.avi,.Wmv,.mov,.Mkv',
  101: '.jpg,.jpeg,PNG,GIF,TIFF',
  102: '.pdf',
  103: '*',
  104: '*',
};

export const Position = {
  Top: '100',
  Middle: '101',
  Bottem: '102'
};


export const UserType = {
  TUTOR:"TUTOR",
  INSTRUCTOR:"INSTRUCTOR",
}

export const Gender = {
  MALE: 100,
  FEMALE: 101
};

export enum PaymentStatus {
  NOT_PAID = 100,
  PAID,
  CANCLLED,
  REFENDED,
  NEED_APPROVAL
}

export const paymentStatusOption: SelectItem<number>[] = [
  {value: PaymentStatus.NOT_PAID, label: "Not Paid"},
  {value: PaymentStatus.PAID, label: "Paid"},
  {value: PaymentStatus.CANCLLED, label: "Cancelled"},
  {value: PaymentStatus.REFENDED, label: "Refended"},
  {value: PaymentStatus.NEED_APPROVAL, label: "Need Approval"},
]


export const GenderOption: SelectItem<number>[] = [
  { value: 100, label: "Male" },
  { value: 101, label: "Female" }
];

export const EducationalLevel: SelectItem<number>[] = [
  { value: 100, label: "Elementary" },
  { value: 101, label: "Secondary" },
  { value: 102, label: "TVET_Level_III_Diploma" },
  { value: 103, label: "Bachelor_of_Education" },
  { value: 104, label: "Bachelor_of_Arts_or_Science" },
  { value: 105, label: "Master" },
  { value: 106, label: "Doctorate" },
];

export enum AnswerTypeEnum {
  SINGLE = 100,
  MULTIPLE,
}

export const AnswerTypeOptions: SelectItem<number>[] = [
  { value: AnswerTypeEnum.SINGLE, label: "Single Answer" },
  { value: AnswerTypeEnum.MULTIPLE, label: "Multiple Answer" }
];


export const courseLevel: SelectItem<number>[] = [
  { value: 100, label: "Beginner" },
  { value: 101, label: "Intermediate" },
  { value: 102, label: "Advanced" },
];

export enum courseTypeEnum {
  FREE = 100,
  PREMIUM,
  // SPONSOREED,
}

export const courseType: SelectItem<number>[] = [
  { value: courseTypeEnum.FREE, label: "Free" },
  { value: courseTypeEnum.PREMIUM, label: "Premium" },
  // { value: courseTypeEnum.SPONSOREED, label: "Sponsored" },
];

export enum Course_Status {
  DRAFT = 100,
  READY_FOR_PUBLISHING,
  PUBLISHED,
}

export const courseStatus: SelectItem<number>[] = [
  { value: Course_Status.DRAFT, label: "Draft" },
  { value: Course_Status.READY_FOR_PUBLISHING, label: "Ready For Publishing" },
  { value: Course_Status.PUBLISHED, label: "Published" },
];

export const Days: SelectItem<number>[] = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
];

export const daysOption: SelectItem<number>[] = [
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
  { value: 7, label: "Sun" },
];


export const tutorTypeOptions: SelectItem<string>[] = [
  { value: "1-4", label: "Grade 1-4" },
  { value: "5-8", label: "Grade 5-8" },
  { value: "9-10", label: "Grade 9-10" },
  { value: "11-12", label: "Grade 11-12" },
];

export enum location_type {
  region = 100,
  zone = 101,
  woreda = 102,

}

export const locationTypeOptions: SelectItem<number>[] = [
  {value:location_type.region, label: "Region / City"},
  {value:location_type.woreda, label: "Woreda"},
  {value:location_type.zone, label: "Zone / Sub city"},
]

export const getEnumName = (enumObject: any, enumValue: number): string | undefined => {
  const entry = Object.entries(enumObject).find(([ _, value ]) => value === enumValue);
  return entry ? entry[ 0 ] : undefined;
};

export const getEnum = <T>(array: SelectItem<T>[], value: T): string | undefined => {
  const entry = array.find(arr => arr.value === value);
  return entry ? entry.label : undefined;
};

export const ActionStatus: SelectItem<number>[] = [
  { value: 100, label: "RequestSubmitted" },
  { value: 101, label: "RequestApproved" },
  { value: 102, label: "RequestRejected" },
];

export const ActionStatusName = {
  RequestSubmitted: 100,
  RequestApproved: 101,
  RequestRejected: 102
};

export const ContractStatus = {
  REQUESTED: 100,
  ACCEPTED: 101,
  SUSPEND: 102,
  TERMINATED: 103,
  REJECTED: 104
};

export const AdvertStatus = {
  ACTIVE:100,
  INACTIVE:101
}

export const ContractStatusWithLable: SelectItem<number>[] = [
  { value: 100, label: "Request Submitted" },
  { value: 101, label: "Request Accepted" },
  { value: 102, label: "Suspend" },
  { value: 103, label: "Terminated" },
  { value: 104, label: "Rejected" },
];