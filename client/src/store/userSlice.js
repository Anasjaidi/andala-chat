import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: null
}

const userSlice = createSlice({
  name :"user",
  initialState,
  reducers:  {
    logout(state) {
      state.loggedIn = false
      state.token = null
    },
    login(state, action) {
      state.loggedIn = true
      state.token = action.token
    }
  }
})



export default userSlice.reducer

export const userAction = userSlice.actions