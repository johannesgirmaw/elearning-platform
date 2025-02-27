import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDashboardMenuService, { DashboardMenuItem } from './dashboardMenuItems';
import { MenuItem } from '../../../types/MenuItems';
import DashboardSubMenu from './useSubMenu';
import { isMObile } from '../../../utils/modal';

interface Props {
  setPathName: (pathname: string) => void;
  dashBoardMenuService: {
    menuList: DashboardMenuItem[]
    visibleMenuList: boolean;
    setVisibleMenuList: (visibleMenuList: boolean) => void;
    subMenuList: MenuItem[],
    setSubMenuList: (menus: MenuItem[]) => void,
    resetMenu: (menu: DashboardMenuItem) => void,
  }
}

function DashboardSidebar(props: Props) {
  const { setPathName} = props
  const [activeLink, setActiveLink] = useState('');
  const [parentMenuId, setParentMenuId] = useState(0);
  const { visibleMenuList, setVisibleMenuList, menuList, subMenuList, setSubMenuList, resetMenu } = props.dashBoardMenuService;

  useEffect(() => {
    let link : string = window.location.pathname
    let activeMenu = menuList.find(value => value.children?.some(value => value.link === link))
    setPathName(link);
    if (activeMenu) {
      setActiveLink(activeMenu?.id!)
      setParentMenuId(activeMenu?.keyId!)
      setSubMenuList(activeMenu?.children!)

    }
  }, [window.location.pathname, menuList]);

  return (
    <>
    <div className='sticky flex h-screen overflow-y-auto md:flex'>   
    <div className="fixed bottom-0 z-50 w-full bg-custom_orange-900 md:static md:w-24">
      <div className="flex flex-row items-center justify-between pr-5 md:flex-col md:justify-around">
        {menuList.map((value) => {
          return value.visible && (
            <div
              key={value.keyId}
              className="flex flex-col items-center justify-between w-full pb-1 md:flex-row h-11 md:mt-7 "
            >
              <span
                className={`w-full h-1 pt-0 md:h-10 md:w-1 ${
                  activeLink === value.id ? 'bg-slate-300' : ''
                }`} 
              ></span>
              <Link
                to={value.link}
                relative="path"
                className={ `md:ml-5 mx-3 md:mr-0 hover:bg-custom_orange-800 border-gree bg-custom_orange-900 text-white w-7 h-7 md:w-14 md:h-14 border-2 rounded-lg
                  flex items-center justify-center relative text-base transition-all duration-300 ease-in `}
                onClick={() => {
                  setActiveLink(value.id);
                  resetMenu(value);
                  setParentMenuId(value.keyId);

                  // if (value.children) {
                  //   setSubMenuList(value.children);
                  //   if (parentMenuId === value.keyId || parentMenuId === 0) {
                  //     setVisibleMenuList(!visibleMenuList);
                  //   } else {
                  //     setVisibleMenuList(true);
                  //   }
                  // } else {
                  //   setVisibleMenuList(false);
                  // }
                }}
              >
                <i>{value.icon}</i>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
    {
    (visibleMenuList || !isMObile()) &&  <DashboardSubMenu subMenu={subMenuList}  setVisibleMenuList={setVisibleMenuList} />}
     </div>
    </>
  );
}

export default DashboardSidebar;
