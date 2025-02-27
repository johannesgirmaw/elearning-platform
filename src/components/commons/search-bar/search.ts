
import { useEffect, useState } from "react";
import { componentType } from "../../../types/Enums";
import { SelectItem } from "../../../types/MenuItems";

interface SearchProps<T> {
    filteredData: T,
    setFilteredData: () => void
}

export interface SearchComponentProps {
    placeholder: string,
    // onChange: (e: string | number) => void,
    // value: string | number
    disableClear?: boolean;
    hidden?: boolean;
    key: string,
    type: componentType,
    options?: SelectItem<string|number>[]
    search?: (val: string) => void
    value?:any
    default?:string|number
}

const useSearch = <T>(props: SearchProps<T>) => {
    // const useSearch= <T extends TableSearchModel>(props: SearchProps<T>) => {

    // const 

    const [components, setComponents] = useState<SearchComponentProps[]>([])

    const addComponent = (props: SearchComponentProps) => {
        setComponents([...components, {...props}])
    }
      

    return {
        components,
        addComponent
    }



}

export default useSearch;