import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'

import './styles.scss'
import App from './App'

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDom.render(<Main />, document.querySelector('#root'))