export interface BreadCrumb {
    [ id: string ]: BreadCrumbItem;
}

export interface BreadCrumbItem {
    name: string;
    parent_id?: string;
}
