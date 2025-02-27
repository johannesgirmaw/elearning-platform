import { useSelector } from "react-redux";
import { MenuItem } from "../../types/MenuItems";
import { checkIfAnyExist } from "../../utils/array";
import useTranslation from '../../utils/translation'
import useAuthentication from "../account/auth/authentication";
import useAuthorization from "../account/auth/authorization";
import { RootState } from "../../slicers/store";
import { useEffect, useState } from "react";
import useCategoryService from "../courses/category/CategoryService";
import { Category } from "../../types/Category";

const useMenuService = () => {
    const {translate} = useTranslation()
    const categoryService = useCategoryService();
    const [categories, setCategories] = useState<Category[]>([])
    const authorization = useAuthorization()
    const authentication = useAuthentication()
    const user = useSelector((state:RootState)=>state.user) 


  useEffect(() => {
    categoryService.getCategories({pinned: true}).then(({data: response}) => {
      setCategories(response.results);
    })
  },[])

    
    const menuList: MenuItem[] = [
        {
            id: 'tutorlist',
            name: "Find a tutor",
            link: '/tutors',
            visible: true
        },
        {
            id:"student_register", 
            link:"/student_register", 
            name:"Become a Student", 
            visible:!authorization.isLoggedIn()
        }
        ,{
            id: 'tutor_register',
            name: "Become a tutor",
            link: '/tutor_register',
            visible:  !user.is_staff
        },
        {
            id: 'instructor_register',
            name: "Become an instructor",
            link: '/instructor_register',
            visible:  !user.is_staff
        },
            ...categories.map(value => (
        {
            id: value.id,
            name: value.category_name,
            link: '/#courses',
            visible:  true
        }
        )),
        {
            id: 'instructor',
            name: "Instructor",
            link: '/instructor_dashboard/courses',
            visible: authentication.isLoggedIn() && user.is_staff
        },
        {
            id:"my_portal",
            name:"My Portal",
            link:"/portal#my_course",
            visible:authentication.isLoggedIn(),
        },
        // {
        //     id: 'courses',
        //     name: translate('courses'),
        //     link: '/#courses',
        //     visible: true
        // }
    ];

    menuList.forEach(menu => {
        menu.visible = menu.children ? checkIfAnyExist(menu.children, 'visible', true) : menu.visible;
        menu.children = menu?.children?.filter(value => value.visible)
    })
    return {menuList: menuList.filter(value => value.visible)}
}

export default useMenuService
