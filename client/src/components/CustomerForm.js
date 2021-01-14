import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"

import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const CustomerForm = (props) => {
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    schedule: "",
    notes: ""
  })
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "phoneNumber", "address", "schedule"]

    requiredFields.forEach(field=>{
      if(customer[field].trim()===""){
        submitErrors = {
          ...submitErrors, 
          [field]: 'is blank'
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setCustomer({
      name: "",
      phoneNumber: "",
      address: "",
      schedule: "",
      notes: ""
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (validForSubmission()) {
      try {
        const response = await fetch("/api/v1/customers", {
          method: "POST",
          credentials: "same-origin",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(customer)
        })
        if (!response.ok) {
          if (response.status === 422) {
            const body = await response.json()
            const newErrors = translateServerErrors(body.errors)
            setErrors(newErrors)
          } else {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw(error)
          }
        } else {
          const responseBody = await response.json()
          if (responseBody.customer) {
            clearForm()
            setShouldRedirect(true)
          }
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   if (validForSubmission()) {
  //     addNewCustomer(customer)
  //     // setCustomer({
  //     //   name: "",
  //     //   phoneNumber: "",
  //     //   address: "",
  //     //   schedule: "",
  //     //   notes: ""
  //     // })
  //     clearForm()
  //   }
  // }


  if (shouldRedirect) {
    return(
      <Redirect to="/" />
    )
  }

  return (
    <div>
      <h1>New Customer</h1>
      
      <form onSubmit={handleSubmit} className="callout primary">
        <ErrorList errors={errors} />

        <label htmlFor="name">Name:
          <input
            id="name"
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <label htmlFor="phoneNumber">Phone Number:
          <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="address">Address:
          <input
            id="address"
            type="text"
            name="address"
            value={customer.address}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="schedule">Schedule:
          <input
            id="schedule"
            type="text"
            name="schedule"
            value={customer.schedule}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="notes">Notes:
          <textarea
            id="notes"
            name="notes"
            value={customer.notes}
            onChange={handleChange}
          >
          </textarea>
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Add New Customer" />
          <button className="button" type="button" onClick={clearForm}>Clear</button>
        </div>
      </form>
    </div>
  )
}

export default CustomerForm