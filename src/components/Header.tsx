import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { changeLanguage, changeSiteTheme } from '../reducers/SettingsReducer'

import './Header.scss'

const Header = () => {
  const settings = useAppSelector((state) => state.settings)
  const t = settings.translation
  const dispatch = useAppDispatch()

  const langs = [
    {val: 'en', caption: 'English'},
    {val: 'ru', caption: 'Русский'},
    {val: 'ua', caption: 'Украïнська'},
    {val: 'fi', caption: 'Finnish'},
  ]

  return (
    <header className="header">
      <span className="title">{t['Header']['title']}
        <span className="author">{t['Header']['author']}</span>
      </span>
      <span className="theme-changer" onClick={() => dispatch(changeSiteTheme())}>
        {settings.theme.class === 'light' ? `\u263E ${t['Header']['dark']}` : `\u263C ${t['Header']['light']}`}
      </span>
      <span className="language-changer">
        <select onChange={(e) => dispatch(changeLanguage(e.target.value))}>
          {langs.map(lang => (
            <option value={lang.val} selected={settings.lang === lang.val}>{lang.caption}</option>
          ))}
        </select>
      </span>
      <div style={{ clear: 'both' }} />
    </header>
  )
}

export default Header