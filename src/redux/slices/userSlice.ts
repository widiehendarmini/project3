import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

const initialState = {
  users: [] as User[],
  loggedInUser: null as User | null,
  status: "loggedOut",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      const newUser = action.payload;
      state.users.push(newUser);
      state.status = "Registered";
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const user = state.users.find((user) => user.email === email && user.password === password);
      if (user) {
        state.loggedInUser = user;
        state.status = "loggedIn";
      } else {
        state.status = "loginFailed";
      }
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.status = "loggedOut";
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state: any) => state.user.loggedInUser;
export const selectUserStatus = (state: any) => state.user.status;

export default userSlice.reducer;