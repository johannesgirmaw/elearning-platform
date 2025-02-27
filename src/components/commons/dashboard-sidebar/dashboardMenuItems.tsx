import { FiList, FiSettings, FiUserCheck, FiUsers } from 'react-icons/fi';
import { IoLibraryOutline } from "react-icons/io5";
import { MenuItem } from '../../../types/MenuItems';
import { checkIfAnyExist } from '../../../utils/array';
import useTranslation from '../../../utils/translation';
import DashboardSubMenu from './useSubMenu';
import { useState } from 'react';
import useAuthorization from '../../account/auth/authorization';
import useAuthentication from '../../account/auth/authentication';

export interface DashboardMenuItem extends MenuItem {
  id: string;
  name: string;
  children?: DashboardMenuItem[];
  active?: boolean;
  link: string;
  icon?: any;
  visible?: boolean;
  keyId: number;
}
const useDashboardMenuService = () => {
  const { translate } = useTranslation();
  const authorization = useAuthorization();
  const authentication = useAuthentication();

  const menu: DashboardMenuItem[] = [
    {
      id: 'setting',
      keyId: 1,
      name: translate('setting'),
      link: '#',
      icon: <FiSettings></FiSettings>,
      children:[
        {
          id:'profile',
          keyId:31,
          name: translate('profile'),
          link: '/instructor_dashboard/profile',
          visible: !authorization.isSysAdmin()
        },
        {
          id:'tobeinstructor_request',
          keyId:32,
          name: translate('tobe_instructor_request'),
          link: '/instructor_dashboard/tobe_instructor_request',
          visible: true
        },
        {
          id:'tobetutor_request',
          keyId:33,
          name: translate('tobe_tutor_request'),
          link: '/instructor_dashboard/tobe_tutor_request',
          visible: true
        },
        {
          id: 'enrolled_courses',
          keyId: 12,
          name: 'Enrolled Course',
          link: '/instructor_dashboard/enrolled_course',
          visible:true
        },
        {
          id: 'tutor_contract',
          keyId: 24,
          name: 'TutorContract',
          link: '/instructor_dashboard/tutor_contract',
        },
        {
          id: 'course_approval',
          keyId: 60,
          name: 'Course Publishment',
          link: '/instructor_dashboard/course_publish',
          visible: authorization.isSysAdmin(),
        },
      ]
    },    
    {
      id: 'all_courses',
      keyId: 2,
      name: translate('all_courses'),
      link: '#',
      icon: <FiList></FiList>,
      children: [
        {
          id: 'category',
          keyId: 13,
          name: 'Category',
          link: '/instructor_dashboard/category',
          visible:true
        },
        // {
        //   id: 'single_courses',
        //   keyId: 11,
        //   name: 'Courses',
        //   link: '/instructor_dashboard/courses',
        // },
      ],
    },
    {
      id: 'user_acl',
      keyId: 3,
      name: translate('acl'),
      link: '#',
      icon: <FiUserCheck></FiUserCheck>,
      children: [
        {
          id: 'list_user',
          keyId: 21,
          name: 'Users',
          link: '/instructor_dashboard/user_list',
          visible:true        },
        {
          id: 'permission_user',
          keyId: 22,
          name: 'User Permission',
          link: '/instructor_dashboard/user_permission_list',
          visible:true
        },
      ],
    },
    {
      id: 'group_acl',
      keyId: 4,
      name: translate('acl'),
      link: '#',
      icon: <FiUsers></FiUsers>,
      children: [
        {
          id: 'group',
          keyId: 23,
          name: 'Group',
          link: '/instructor_dashboard/group_list',
          visible:true
        },
        {
          id: 'group_permission',
          keyId: 24,
          name: 'Group Permission',
          link: '/instructor_dashboard/group_permission_list',
          visible:true
        },
        {
          id: 'advert',
          keyId: 24,
          name: 'Advert',
          link: '/instructor_dashboard/advert_list',
        },
      ],
    },
    {
      id: 'courses',
      keyId: 44,
      name: translate('courses'),
      link: '/instructor_dashboard/courses',
      icon: <IoLibraryOutline></IoLibraryOutline>,
      visible:true,
      children: []
    },
   ];

  const [menuList, setMenuList] = useState<DashboardMenuItem[]>(menu)

  // menuList.forEach((menu) => {
  //   menu.visible =
  //     menu.children && checkIfAnyExist(menu.children, 'visible', true);
  // });

  menuList.map((menu) => {
    if(menu && menu['children'] && menu["children"].length){
    //  menu.visible = false;
     if (menu['children'].some((child: any) => child.visible)){
       menu["children"] = menu["children"].filter((child: any) => child.visible);
       menu.visible = true;
     }
    }
     return menu
   })
 
  const [visibleMenuList, setVisibleMenuList] = useState(false);
  const [subMenuList, setSubMenuList] = useState<MenuItem[]>([]);
  const addMenuChildren = (menus: DashboardMenuItem[], id: string) => {
    const currentMenu = menuList.map(menu => {
      if(menu.id == id){
        menu.children = menus
        return menu
      }
      return menu
    })
    setMenuList(currentMenu)
    setVisibleMenuList(true)
    setSubMenuList(menus)
  }

  const resetMenu = (currentMenu: DashboardMenuItem) => {
    const filteredMenu = menu.find((m) => m.id === currentMenu.id);
    if(!filteredMenu?.children?.length){
      setSubMenuList([])
      setVisibleMenuList(false)
    } else {
      setSubMenuList(filteredMenu.children)
      setVisibleMenuList(true)
    }
    // setMenuList(menu)
  }

  return { menuList, addMenuChildren, visibleMenuList, setVisibleMenuList, subMenuList, setSubMenuList, resetMenu };
};

export default useDashboardMenuService;
