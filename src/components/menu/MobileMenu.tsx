import { MenuItem } from "../../types/MenuItems";
import useMenuListService from "./menuItems";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface InputProps{
    level:number;
    menu:MenuItem[];
}

function MobileMenu(prop: any) {
    const {menuList} = useMenuListService()
    const { level = 0, menu = menuList } = prop;
    const [ menuState, setMenuState ] = useState<MenuItem[]>(menu);
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    function update(idx: number) {
        const newMenuState = [ ...menuState ];
        newMenuState[ idx ].active = !newMenuState[ idx ].active;
        setMenuState(newMenuState);
        navigate(`/${url}`);
    }

    
    const handleClick = (link: string, id?: any) => {
        navigate(link, {state: {id}})
    }

    return <div className={level ? '' : "py-7"}>
            <ul className={level ? 'transition-all duration-1000 ease-in' : "border-t border-solid border-custom_orange-100"}>
                {menuList.map((value: MenuItem, idx) => {
                    return value.visible && <li className="relative" key={value.id} >
                        <button  onClick={()=>{handleClick(value.link, value.id); setUrl(value.link)}} className={"block w-full text-left py-4 px-5 border-b border-solid border-custom_orange-100 text-medium font-medium text-custom_black-200 "
                            + (level ? level === 1 ? 'pl-10' : 'pl-14' : '')}>
                            {value.name}
                        </button>
                        {value.children ? <span className="absolute right-5 top-3 cursor-pointer">
                            {value.active ? <i><FaMinus size={15} /></i> : <i><IoMdAdd size={20} /></i>}
                        </span> : ''}
                    </li>;
                })}
            </ul>
        </div>;
    }


export default MobileMenu;