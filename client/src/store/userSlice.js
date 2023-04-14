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
      localStorage.removeItem('token')
    },
    login(state, action) {
      state.loggedIn = !state.loggedIn
      state.token = action.token
      console.log("login ....");
      return state
    }
  }
})



export default userSlice.reducer

export const userAction = userSlice.actions