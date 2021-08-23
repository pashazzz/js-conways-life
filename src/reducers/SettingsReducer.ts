import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import translations from '../translations'

interface Theme {
  class: string,
}

interface SiteState {
  lang: string,
  theme: Theme,
  translation: Object,
}

const initialState: SiteState = {
  lang: localStorage.getItem('settingsLanguage') || 'en',
  theme: {
    class: localStorage.getItem('settingsTheme') || 'light',
  },
  translation: translations[localStorage.getItem('settingsLanguage')] || translations.en,
}

export const siteSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      localStorage.setItem('settingsLanguage', action.payload)
      state.lang = action.payload
      state.translation = translations[action.payload]
    },
    changeSiteTheme: (state) => {
      localStorage.setItem('settingsTheme', state.theme.class === 'light' ? 'dark' : 'light')
      state.theme.class = state.theme.class === 'light' ? 'dark' : 'light'
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeLanguage, changeSiteTheme } = siteSlice.actions

export default siteSlice.reducer