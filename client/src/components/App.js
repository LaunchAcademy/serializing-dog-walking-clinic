import React from "react"
import { hot } from "react-hot-loader/root"
import { BrowserRouter, Route } from "react-router-dom"

import Layout from "./Layout"

import "../assets/scss/main.scss"

const App = (props) => {
  return (
    <BrowserRouter>
      <Route path="/" component={Layout} />
    </BrowserRouter>
  )
}

export default hot(App)
