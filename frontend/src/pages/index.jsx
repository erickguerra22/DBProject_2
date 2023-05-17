/* eslint-disable import/no-cycle */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Home from './Home'
import { useAuth } from '../services/Auth'
import Binnacle from './Binnacle/Binnacle'
import Assignment from './Assignment/Assignment'
import Report from './Reports/Report'
import ReportDetail from './ReportDetail/ReportDetail'
import History from './History/History'

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
      <Route path="/history">
        {authToken ? <History /> : <Redirect to="/log-in" />}
      </Route>
      <Route path="/binnacle">
        {authToken ? <Binnacle /> : <Redirect to="/log-in" />}
      </Route>
      <Route exact path="/report">
        {authToken ? <Report /> : <Redirect to="/log-in" />}
      </Route>
      <Route path="/report">
        {authToken ? <ReportDetail /> : <Redirect to="/log-in" />}
      </Route>
      <Route path="/assignments">
        {authToken ? <Assignment /> : <Redirect to="/log-in" />}
      </Route>
      <Route path="/">
        {authToken ? <Home /> : <Redirect to="/log-in" />}
      </Route>

    </Switch>
  )
}

export { navigate }
export default Page
