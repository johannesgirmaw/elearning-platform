import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Languages } from "../types/Translation";
import { User } from "../types/UserItem";
import { arrayToObject } from "../utils/array";

const initialState = {} as User;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      getUser: (state: User, action: PayloadAction<User>) => {
          action.payload.converted_user_permission = action.payload.user_permission ? arrayToObject(action.payload.user_permission, 'content_type__model') : state.converted_user_permission
          state = action.payload;
          return state;
      },
      removeUser:(state:User)=>{
        state = initialState
        return state
      },
      setLanguage: (state: User, action: PayloadAction<Languages>) => {
          state.lang = action.payload;
          return state;
      },
      setSize: (state: User, action: PayloadAction<boolean>) => {
        state.isMobile = action.payload
        return state;
      }
  },
  extraReducers: {
  },
});

export default userSlice.reducer;
export const { getUser,removeUser, setLanguage, setSize } = userSlice.actions;