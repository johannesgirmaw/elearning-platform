export interface MenuItem {
    id: string;
    name: string;
    children?: MenuItem[];
    active?: boolean;
    link: string;
    icon?:any;
    visible?: boolean;
}

export interface SelectItem<T> {
    value: T;
    label: string
}