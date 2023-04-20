/* eslint-disable import/no-cycle */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Home from './Home'
import { useAuth } from '../services/Auth'

const navigate = (page) => {
  window.location = `/${page}`
}

// escoger la pagina
const Page = () => {
  const { authToken } = useAuth()

  return (
    <Switch>
      <Route path="/log-in">
        {authToken ? <Redirect to="/" /> : <LogIn />}
      </Route>
      <Route path="/sign-up">
        {authToken ? <Redirect to="/" /> : <SignUp />}
      </Route>

      <Route path="/">
        {authToken ? <Home /> : <Redirect to="/log-in" />}
      </Route>
      
    </Switch>
  )
}

export { navigate }
export default Page
