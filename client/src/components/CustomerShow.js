import React, { useState, useEffect } from "react"

import CustomerDetails from "./CustomerDetails"
import DogDetails from "./DogDetails"

const CustomerShow = (props) => {
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    schedule: "",
    notes: "",
    dogs: []
  })

  const getCustomer = async () => {
    let id = props.match.params.id
    try {
      const response = await fetch(`/api/v1/customers/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setCustomer(responseBody.customer)
    } catch (err) {
      console.error(`Error in fetch! ${err.message}`)
    }
  }

  useEffect(() => {
    getCustomer()
  }, [])
  
  let dogDetails 
  if (customer.dogs && customer.dogs.length > 0) {
    dogDetails = customer.dogs.map((dog) => {
      return (
        <DogDetails
          key={dog.id}
          dog={dog}
        />
      )
    })
  } else {
    dogDetails = <h5><i>None have been added</i></h5>
  }

  return (
    <div className="callout primary">
      <CustomerDetails 
        customer={customer}
      />
      <div className="callout secondary">
        <h2>Puppers</h2>
        {dogDetails}
      </div>
    </div>
  )
}

export default CustomerShow