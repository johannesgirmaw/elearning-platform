import { MenuItem } from "../../types/MenuItems";


function ContextMenu(options: MenuItem[], targetId: string, id: string) {
    var show: boolean = (targetId === id);
    var menu = <ul className="flex flex-col justify-center bg-[rgba(48,146,85,0.9)] px-[10px] py-[20px] rounded-[10px] min-w-[180px] z-[-1] absolute top-[-20px] left-auto right-[15px] translate-x-0 translate-y-[37px] text-white">
        {options.map(option => {
            return <li className="relative group-sub text-white hover:bg-[rgba(48,146,85,0.9)] text-[13px] font-normal whitespace-nowrap pb-1" key={option.id}><a href={option.link} className="flex place-items-center gap-1">{option.icon} {option.name}</a></li>;
        })}

    </ul>
    return show ? menu : '';
}


export default ContextMenu;