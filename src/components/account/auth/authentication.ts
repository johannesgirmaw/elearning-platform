import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../slicers/store";
import { getUser, removeUser } from "../../../slicers/user";
import { Languages } from "../../../types/Translation";
import axios, {  AxiosRequestConfig } from "axios";
import { commonURL, host, refreshKey, refresh_token, requestConfig, tokenKey, useRefreshToken,  } from "../../../utils/api";
import { User } from "../../../types/UserItem";

const useAuthentication = () => {
    const user = useSelector((state: RootState) => state.user)
    const refreshToken = useRefreshToken()
    const dispatch = useDispatch();

    const isLoggedIn = (): boolean => {
        return user.username !== undefined;
    }

    const api = () => {

        const api = axios.create({
            baseURL: commonURL,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        api.interceptors.request.use((config: any) => requestConfig(api, config), error => Promise.reject(error))

         api.interceptors.response.use((response) => response, (error) => refreshToken.addRefreshToken(error, api))
        return api
    }


    const authUser = () => {
        const response = api().get<User>(
            'authorize/user/'
        );
        return response;
    };

    const requireLogin = () => {
        if (!isLoggedIn()) {
            return authUser().then(({ data: result }) => {
                dispatch(getUser({ ...result, lang: result.lang }));
            });
        }
    }



    return { isLoggedIn, requireLogin, }
}

export default useAuthentication