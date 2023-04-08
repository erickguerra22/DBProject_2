import React, { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Page from './pages'
import { AuthContext } from './services/Auth'

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('userToken' || ''))

  const sestUserToken = (token) => {
    localStorage.setItem('userToken', JSON.stringify(token))
    setAuthToken(token)
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ authToken, setAuthToken: sestUserToken }}>
      <div className="app">
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  )
}

export default App
