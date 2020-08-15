import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Landing } from '../pages/Landing'
import { TeacherList } from '../pages/Teacher-List'
import { TeacherForm } from '../pages/Teacher-Form'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/study" component={TeacherList}/>
        <Route path="/give-classes" exact={true} component={TeacherForm}/>
      </Switch>
    </BrowserRouter>
  )
}
