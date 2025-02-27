import { Languages } from "./Translation";

export interface UserRegister {
    id: string;
    bio: string;
    profile_pic:string| FileList;
    username: string,
    email?: string,
    // date_of_birth: string,
    password1: string,
    password2: string,
    first_name: string,
    middle_name: string,
    last_name: string;
    phone_number:string;
    gender:number;
    is_staff?:boolean;
    full_name?:string
}

export type BackEndError<T> = {
    [ key in keyof T ]: string[];
} & {
    non_field_errors: string[]
}

export interface UserLogin {
    username: string,
    // email: string,
    password: string;
}

export interface UserVerificationCode {
    verification_code: string,
}

export interface User {
    email: string,
    first_name: string,
    last_name: string,
    middle_name:string;
    phone_number:string;
    pk: string,
    username: string;
    short_name: string;
    is_superuser: boolean;
    // date_of_birth: string;
    id: string;
    isMobile: boolean;
    is_active: boolean;
    profile_pic:string | FileList  ;
    profile_picture?:string,
    user_permission: PermissionModel[];
    converted_user_permission: {[id: string]: PermissionModel},
    lang: Languages,
    gender:number,
    password1: string,
    password2: string,
    status:number,
    is_staff:boolean,
    groups:{}[],
    groups_name:{}[]
    bio:string,
    full_name?:string,
}
export type PartialUser = Partial<User>;
export interface PermissionModel {
    content_type__model?: string,
    can_view: boolean,
    can_change: boolean,
    can_create: boolean,
    can_delete: boolean,
    other_action: boolean
}

export enum Permission {
    CAN_VIEW = "can_view",
    CAN_CHANGE = "can_change",
    CAN_CREATE = "can_create",
    CAN_DELETE = "can_delete",
    OTHER_ACTION = "other_action"
}

export interface AuthUser {
    access_token: string,
    refresh_token: string,
    user: User;
}

export interface RefreshToken {
    access: string,
    refresh : string,
}       

export interface ResetPasswordForm {
    new_password1: string,
    new_password2: string;
    email: string;
}

export interface ChangePassword {
    new_password1: string,
    new_password2: string;}

export interface PasswordResetConfirmation {
    new_password1: string;
    new_password2: string;
    uid: string;
    token: string;
}