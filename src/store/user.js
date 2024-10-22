import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false,
  id: 0,
  name: "",
  email: "",
  isAdmin: false,
  URLImage: "https://i.ibb.co/NmMYhQN/i.jpg",
  settingDarkMode: 0,
  preferredLanguage: 0,
  seeAllQuizzes: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.URLImage = action.payload.URLImage
      state.settingDarkMode = action.payload.settingDarkMode
      state.preferredLanguage = action.payload.preferredLanguage
    },
    toggleQuizzes: (state) => {
      state.seeAllQuizzes = !state.seeAllQuizzes
    }
  },
})



// Action creators are generated for each case reducer function
export const { login, toggleQuizzes } = userSlice.actions
export default userSlice.reducer