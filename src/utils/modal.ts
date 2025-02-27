export class TCId {
    id: string ;
  
    constructor(idVal?: string) {
      if (idVal) {
        this.id = idVal;
      }
    }
  }



  export class EnumType {
    id: number ;
    value?: string | number;
  
    constructor(idVal?: number, value?: string) {
      if (idVal) {
        this.id = idVal;
        this.value = value
      }
    }
  }

  export interface TableSearchModel<T = any> {
    search?: string
    view_type?: string
    ps?: number
    pn?: number
    id?: string;
    ordering?: {
      so: "asc" | "desc";
      sc: keyof T;
    }[]
  } 

  export const isMObile = () => window.innerWidth < 768

  export const assignOrsetNull = (setter: (value: any) => void, previous_value: any, current_value:any) => {
      if (previous_value === current_value) 
        setter(null)
      else
        setter(current_value)
  }

  export const extractTime = (value: any) => {

    value = value?.split(" ");
    return value?.pop()
  }
     
  export const changeDuration = (value: any ) => {
    value = value?.split(" ");
    let days = +((value?.length === 2 && value.shift()) || 0)
    value = value?.[0].split(":")
    let hours = +(value?.[0] || 0)
    let minutes =  +(value?.[1] || 0)
    return {days, hours, minutes}
  }
