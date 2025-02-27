export interface ToastItem {
    msg: string;
    duration: number;
    type: 0|1|2|3|4;
    id?: number;
}

export enum ToastType {
    Success,
    Info,
    Alert,
    Warning,
    Secondary
}