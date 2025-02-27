import useApi, { refreshKey } from '../../../utils/api';
import { AuthUser, ChangePassword, PartialUser, ResetPasswordForm, User, UserLogin, UserRegister, UserVerificationCode } from '../../../types/UserItem';

export const useUserService = () => {
    const { commonApi } = useApi()

    const authUser = () => {
        const response = commonApi.get<User>(
            'authorize/user/'
        );
        return response;
    };
    const getUser = (id: string) => {
        const response = commonApi.get<User>(`users/${id}/`);
        return response;
      };
    const instructor_register = (user: UserRegister) => {
        const response = commonApi.post<any>(
            'instructor_registration/',
            {
                ...user
            }
        );
        return response;
    };

    const student_register = (user: UserRegister) => {
        const response = commonApi.post<any>(
            'student_registration/',
            {
                ...user
            }
        );
        return response;
    };
    const updateUser = (id:string, data:PartialUser) => {
        const response = commonApi.patch<User>(`users/${id}/`,data);
        return response;
        }

    const login = (user: UserLogin) => {
        const response = commonApi.post<AuthUser>(
            'authorize/login/',
            {
                ...user
            }
        );
        return response;
    };

    const logout = () => {
        const refresh = localStorage.getItem(refreshKey);
        const response = commonApi.post<AuthUser>(
            'authorize/logout/',
            {refresh}
        );
        return response;
    }; 
    

    const emailVerificationCode = async (key: UserVerificationCode) => {
        const csrfToken = await getCSRF()
        console.log("csrfToken",csrfToken)
        const response = commonApi.post<AuthUser>(
            'account-confirm-email/'+key,
            {
                "key":key
            }, {
                headers: {
                'X-CSRFToken': csrfToken,
                }
            }
        );
        return response;
    };
    const getCSRF = async () => {
        const response = await commonApi.get(
            'csrf/', 
        );
        console.log("header",response.headers)
        return  response.headers['X-Csrftoken'];
    };
    const google = (access_token: string) => {
        const response = commonApi.post<AuthUser>(
            'authorize/google/',
            {
                access_token
            }
        );
        return response;
    };
    const github = (code: string) => {
        const response = commonApi.post<AuthUser>(
            'authorize/github/',
            {
                code,
            }
        );
        return response;
    };
    const telegram = ()=>{
        const response = commonApi.get<{}>('authorize/telegram-auth/');
        return response
    }
    const resetPassword = (email: string) => {
        const response = commonApi.post<AuthUser>(
            'authorize/password/reset/',
            {
                email
            }
        );
        return response;
    };
    const resetPasswordConfirm = (data:any, uuid:string|undefined, token:string|undefined) => {
        const response = commonApi.post<ResetPasswordForm>(
            'authorize/password/reset/confirm/',
            {
                "new_password1": data.new_password1,
                "new_password2": data.new_password2,
                "uid": uuid,
                "token": token
            }
        );
        return response;
    };

    const passwordChange = (data:any) => {
        const response = commonApi.post<ChangePassword>(
            'authorize/password/change/',
            {
                "new_password1": data.new_password1,
                "new_password2": data.new_password2,
            }
        );
        return response;
    }


    return { authUser, getUser, student_register, instructor_register,updateUser, login,logout, emailVerificationCode, google, github,telegram, resetPassword ,resetPasswordConfirm, passwordChange}
}
