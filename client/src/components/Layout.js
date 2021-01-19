import React from 'react'
import { Switch, Route, Link } from "react-router-dom"

import CustomersIndex from "./CustomersIndex"
import CustomerShow from "./CustomerShow"

const Layout = (props) => {
  return(
    <div className="layout">
      <div className="top-bar grid-x">
        <h5 className="top-bar-left"><Link to="/">View All Customers</Link></h5>
      </div>

      <div className="callout">
        <Switch>
          <Route exact path="/" component={CustomersIndex} />
          <Route exact path="/customers" component={CustomersIndex} />
          <Route exact path="/customers/:id" component={CustomerShow} />
        </Switch>
      </div>
    </div>
  )
}

export default Layout
