import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Theme {
  class: string,
}

interface SiteState {
  theme: Theme,
}

const initialState: SiteState = {
  theme: {
    class: localStorage.getItem('settingsTheme') || 'light',
  }
}

export const siteSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSiteTheme: (state) => {
      localStorage.setItem('settingsTheme', state.theme.class === 'light' ? 'dark' : 'light')
      state.theme.class = state.theme.class === 'light' ? 'dark' : 'light'
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeSiteTheme } = siteSlice.actions

export default siteSlice.reducer