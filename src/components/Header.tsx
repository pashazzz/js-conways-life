import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { changeSiteTheme } from '../reducers/SettingsReducer'

import './Header.scss'

const Header = () => {
  const settings = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()

  return (
    <header className="header">
      <span className="title">Conway's Life Game
        <span className="author">by Pavlo Malyshkin @2021</span>
      </span>
      <span className="theme-changer" onClick={() => dispatch(changeSiteTheme())}>
        {settings.theme.class === 'light' ? '\u263E Dark' : '\u263C Light'} theme
      </span>
      <div style={{ clear: 'both' }} />
    </header>
  )
}

export default Header