export interface UserPage {
    // user_type: number;
    [ id: string ]: UserPageItem;
}

export interface UserPageItem {
    title: string;
    element?: JSX.Element;
}
