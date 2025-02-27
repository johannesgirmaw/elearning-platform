import { MenuItem } from '../../../types/MenuItems';
import LinkGenerator from '../../customs/custom-link/CustomLink';

interface Props {
  subMenu: MenuItem[]; 
  setVisibleMenuList: (visibleMenuList: boolean) => void;
}



  const DashboardSubMenu = (props: Props) => {
  
  if (props.subMenu.length) {
    return (
      <div className="flex flex-col w-full h-full px-3 py-10 md:w-64 md:static bg-custom_orange-100 ">
        {props?.subMenu.map((value: any) => {
          return value.visible && (
            <div key={value.keyId}  onClick={() => {
              !value.children && props.setVisibleMenuList(false)
            }}>
              <LinkGenerator name={value.name} url={value.link} />
              {value.children && <DashboardSubMenu subMenu={value.children} setVisibleMenuList={props.setVisibleMenuList} />}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

export default DashboardSubMenu;
