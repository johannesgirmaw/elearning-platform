import { useSelector } from "react-redux"
import { RootState } from "../slicers/store"
import { Languages, Tranlsations } from "../types/Translation"

const useTranslation = () => {

  const words: Tranlsations = {
    all_courses: { amh: "ሁሉም ትምህርቶች", eng: "All Courses" },
    courses: { amh: "ትምህርቶች", eng: "Courses" },
    my_courses: { amh: "ትምህርቶች", eng: "My Courses" },
    course_detail: { amh: "Courses Detail", eng: "Courses Detail" },
    pages: { amh: "ገጾች", eng: "Pages" },
    login: { amh: "ግባ", eng: "Login" },
    register: { amh: "ተመዝገብ", eng: "Register" },
    about: { amh: "ስለ", eng: "About" },
    faq: { amh: "ተደጋግሞ የሚነሱ ጥያቄዎች", eng: "FAQ" },
    instructor_dashboard: {
      amh: "የአስተማሪ ቀዳሚ ገጽ",
      eng: "Instructor Dashboard",
    },
    blog: { amh: "Blog", eng: "Blog" },
    contact: { amh: "መገኛችን", eng: "Contact" },
    email: { amh: "ኢሜይል", eng: "Email" },
    phone_number:{amh:"", eng:"Phone Number"},
    password: { amh: "ይለፍ ቃል", eng: "Password" },
    confirm_password: { amh: "የይለፍ ቃል አረጋግጥ", eng: "Confirm Password" },
    reset: { amh: "አጥፋ", eng: "Reset" },
    reset_password: { amh: "የይለፍ ቃልን አጥፋ", eng: "Reset Password" },
    username: { amh: "የተጠቃሚ ሥም", eng: "Username" },
    first_name: { amh: "ስም", eng: "First Name" },
    middle_name: { amh: "የአባት ስም", eng: "Middle Name" },
    last_name: { amh: "የአያት ስም", eng: "Last Name" },
    birth_date: { amh: "የልደት ቀን", eng: "Birth Date" },
    create_an_account: { amh: "መለያ ፍጠር", eng: "Create an account" },
    prev: { amh: "ቀዳሚ", eng: "Prev" },
    next: { amh: "ቀጣይ", eng: "Next" },
    name: { amh: "ስም", eng: "Name" },
    title: { amh: "ርዕስ", eng: "Title" },
    chapter: { amh: "ምዕራፍ", eng: "Chapter" },
    content_type: { amh: "የይዘት አይነት", eng: "Content Type" },
    content: { amh: "ይዘት", eng: "Content" },
    add: { amh: "ጨምር", eng: "Add" },
    description: { amh: "ገለጻ", eng: "Description" },
    instruction: { amh: "ትዛዝ", eng: "Instruction" },
    course_code: { amh: "", eng: "Course Code" },
    price: { amh: "ዋጋ", eng: "Price" },
    submit: { amh: "አስገባ", eng: "Submit" },
    update: { amh: "", eng: "Update" },
    delete: { amh: "", eng: "Delete" },
    cancel: { amh: "", eng: "Cancel" },
    refund: { amh: "", eng: "Refund" },
    users_and_progress: { amh: "", eng: "Users and Progress" },
    files: { amh: "ማህደር", eng: "Files" },
    reports: { amh: "ሪፖርት", eng: "Reports" },
    now: { amh: "አሁን", eng: "Now" },
    languages: { amh: "ቋንቋዎች", eng: "Languages" },
    user_permission: { amh: "የተፈቀደለት ቦታ", eng: "User Permission" },
    youtubeurl: { amh: "የዩቲዩብ ዩአርኤል", eng: "Youtube Url" },
    verification_code: { amh: "ቨሪፊኬሽን ኮድ", eng: "Verification Code" },
    verify: { amh: "ቨሪፋይ", eng: "Click to verify your email" },
    verfication_error: {amh:"", eng: "Please check link sent to your email"},
    verified: {amh:"", eng: "Welcome to our platform"},
    change_password:{amh:"ፓስዋርድ ቀይር", eng:"Change Password"},
    home:{amh:"", eng:"Home"},
    profile:{amh:"", eng:"Profile"},
    start_date:{amh:"", eng:"Start Date"},
    year_of_graduation:{amh:"", eng:"Date of graduation"},
    setting:{amh:"", eng:"Setting"},
    acl:{amh:"", eng:"ACL"},
    group_acl:{amh:"", eng:"Group ACL"},
    user_acl:{amh:"", eng:"User ACL"},
    tobe_instructor_request:{amh:"", eng:"To Be Instructor Request"},
    instructor_request:{amh:"", eng:"Instructor Request"},
    tutor_request:{amh:"", eng:"Tutor Request"},
    tobe_tutor_request:{amh:"", eng:"To Be Tutor Request"},
    update_an_account:{amh:"", eng:"Update Account"},
    tutors:{amh:"", eng:"Tutors"},
    banks:{amh:"", eng:"Banks"},
    bank:{amh:"", eng:"Bank"},
    account_number:{amh:"", eng:"Account Number"},
    end_date:{amh:"", eng:"End Date"},
    full_name:{amh:"", eng:"Full Name, (e.g. Abebe Kebede Alemu)"},
    approve: {amh: "", eng: "Approve"},
    cash: {amh: "", eng: "Cash"}
  };

  const user = useSelector((state: RootState) => state.user)

  const translate = (key: string) => {
    return words[key] && words[key][(user.lang || Languages.ENG)]
  }

  return { translate }
}

export default useTranslation