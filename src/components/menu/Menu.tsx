import { Link, useNavigate } from "react-router-dom";
import { MenuItem } from "../../types/MenuItems";
import useMenuListService from "./menuItems";

function Menu() {

    const {menuList} = useMenuListService();
    const navigate = useNavigate();
    const is_mobile = () => {

    }

    const handleClick = (link: string, id?: any) => {
        navigate(link, {state: {id}})
    }

    return (
        <ul className="flex justify-center">
            {menuList.map(value => {
                return value.visible && <li className="relative py-4 px-4 group-menu" key={value.id}>
                    <button onClick={() => handleClick(value.link, value.id)} className="font-medium text-md text-custom_black-200 
                    before:absolute before:w-20 before:h-1 before:bg-center before:bg-no-repeat before:bg-cover 
                    before:-bottom-4 before:left-[50%] before:translate-x-[50%] group-menu-hover:text-custom_orange-900
                    after:contents">
                        {value.name}
                    </button>
                </li>;
            })}
        </ul>
    );
}

export function SubMenu(subMenus: MenuItem[], sub: boolean = false) {
    return (
        <ul className={"absolute w-56 bg-white border-t-2 border-solid border-custom_black-200 py-4 px-0 shadow-md right-auto z-10 transition-all duration-300 ease-in opacity-0 invisible " + (sub ? ' group-sub-hover:visible left-full top-0 group-sub-hover:top-[-18px] group-sub-hover:opacity-100' : ' group-menu-hover:visible left-0 top-[110%] group-menu-hover:top-full group-menu-hover:opacity-100')}>
            {subMenus.map(value => {
                return value.visible && <li className="relative group-sub" key={value.id}>
                    <Link to={value.link} className={`font-medium text-md text-custom_black-200
                    before:absolute before:w-20 before:h-1 before:bg-center before:bg-no-repeat before:bg-cover 
                    before:-bottom-4 before:left-[50%] before:translate-x-[50%] py-2 px-5 block relative transition-all duration-300 ease-linear 
                    hover:text-custom_orange-900 ` + (value.children ? 'after:content-[">"] after:ml-1 after:text-xl after:block after:float-right' : '') + (sub ? '' : ' group-sub-hover:pl-6 group-sub-hover:text-custom_orange-900')}>
                        {value.name}
                    </Link>
                    {value.children && SubMenu(value.children, true)}
                </li>;
            })}
        </ul>
    );
}

export default Menu;