import { TableSearchModel } from "./modal";

export const method: string = "method"

export const notEmpty = (s: string) => s !== undefined && s !==null && s.length > 0  

export const getParamQuery= <T extends TableSearchModel | undefined=any>(search: T) => {
    let params: any = {...search}
    if(search?.ordering){
        let ordering = ""
        for(const order of search.ordering){
            if(order.so === 'asc'){
                ordering += order.sc.toString()
            } else {
                ordering += "-" + order.sc.toString()
            }
        }
        params['ordering'] = ordering
    }
    return params
}

export const currency = ' ETB'