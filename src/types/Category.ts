import { TableSearchModel } from "../components/customs/pagination/usePagination";

export interface Category {
    id: string,
    category_name: string,
    description: string,
    category_image: string,
    parent_id: string,
    pinned: boolean,
}

export interface CategoryTableSearchModel extends TableSearchModel {
    pinned?: boolean;
}