import React from 'react'
import { useAppSelector } from '../hooks'

import './Footer.scss'

const Footer = () => {
  const t = useAppSelector((state) => state.settings.translation)

  return (
    <footer className="footer">
      <p>{t['Footer']['moreInfo']} <a href={t['Footer']['wikiLink']} target="_blank">Wikipedia</a></p>
      <p>{t['Footer']['myGithub']} <a href="https://github.com/pashazzz" target="_blank">GitHub</a></p>
    </footer>
  )
}

export default Footer