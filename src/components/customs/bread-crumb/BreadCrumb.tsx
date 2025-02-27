import { BreadCrumbItem } from "../../../types/BradCrumbItem";
import useBreadCrumbList from "./breadCrumbList";

function BreadCrumb(props: any) {
    const { activeTab } = props;
    const breadCrumbList = useBreadCrumbList()
    const list: BreadCrumbItem[] = [ breadCrumbList[ activeTab ] ];

    function addParent(id: string) {
        const bread = breadCrumbList[ id ];
        if (bread && bread.parent_id) {
            list.unshift(breadCrumbList[ bread.parent_id ]);
            addParent(bread.parent_id);
        }
    }

    addParent(activeTab);
    if(activeTab==='404Error'){
        return <>404Error</>;
    }else{
         return <ul className="mb-0 flex flex-wrap p-0">
        {list.map((value, idx) => {
            return <li className={"text-lg font-medium text-custom_black-200 relative last:text-custom_orange-900"
                + (idx ? " before:content-['//'] before:mx-2" : "")} key={idx}>
                <a href="#" className="capitalize">{value.name}</a>
            </li>;
        })}
    </ul>;
    }
   
}
export default BreadCrumb;