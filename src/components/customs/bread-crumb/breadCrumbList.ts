import { BreadCrumb } from "../../../types/BradCrumbItem";
import useTranslation from "../../../utils/translation";


const useBreadCrumbList = () => {
    const {translate} = useTranslation()
    const breadCrumbList: BreadCrumb = {
        home: {
            name: translate('home'),
        },
        login: {
            name: translate('login'),
            parent_id: 'home'
        },
        register: {
            name: translate('register'),
            parent_id: 'home'
        },
        reset_pwd: {
            name: translate("reset_password"),
            parent_id: 'home'
        },
        about: {
            name: translate('about'),
            parent_id: "home"
        },
        faq: {
            name: translate('faq'),
            parent_id: "home"
        },
        course_detail: {
            name: translate('course_details'),
            parent_id: "home"
        },
        courses: {
            name: translate('courses'),
            parent_id: "home"
        },
        courses_cart: {
            name: 'Course Cart',
            parent_id: "home"
        },
        categories: {
            name: 'Categories',
            parent_id: "home"
        }
        
        
        
    };

    return breadCrumbList
}

export default useBreadCrumbList;

