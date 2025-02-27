import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import { useUserService } from "./UserService";
import { Languages } from "../../../types/Translation";
import { User } from "../../../types/UserItem";
import { getUser } from "../../../slicers/user";
import useLoading from "../../customs/loading/LoadingHook";
// import { useNavigate } from 'react-router-dom';

const AuthProvider = (props: { children: any }) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const userService = useUserService();
  const loading = useLoading()
  // const navigate = useNavigate()

  useEffect(() => {
    if (!user.username) {
      loading.startLoading()
      userService.authUser().then(({ data: result })=>{
        dispatch(getUser({...result, lang: Languages.ENG}));
      });
      loading.stopLoading()
  }}, []);
  return props.children
};

export default AuthProvider;
