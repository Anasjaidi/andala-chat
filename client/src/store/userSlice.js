import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token')

const initialState = {
  loggedIn: !!initialToken,
  token: initialToken
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
      state.loggedIn = true
      state.token = action.token
    //   localStorage.setItem('token', state.token);
      return state
    }
  }
})



export default userSlice.reducer

export const userAction = userSlice.actions