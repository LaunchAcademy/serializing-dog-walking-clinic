import React, { useState, useEffect } from "react"

import CustomerDetails from "./CustomerDetails"
import DogDetails from "./DogDetails"
import DogForm from "./DogForm"
import translateServerErrors from "../services/translateServerErrors"

const CustomerShow = (props) => {
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    schedule: "",
    notes: "",
    dogs: [],
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

  const addDog = async (newDog) => {
    debugger
    const id = props.match.params.id
    try {
      // make fetch request to server

      // const response = await fetch(`/api/v1/dogs`)

      const response = await fetch(`/api/v1/customers/${id}/dogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDog),
      })

      if (!response.ok) {
        if (response.status == 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      }

      // do something with the server response
      debugger
      const parsedResponse = await response.json()
      const newDogsArray = [...customer.dogs, parsedResponse.dog]
      setCustomer({
        ...customer,
        dogs: newDogsArray,
      })

      // setCustomer({
      //   ...customer,
      //   dogs: [...customer.dogs, parsedResponse.dog],
      // })
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  let dogDetails
  if (customer.dogs && customer.dogs.length > 0) {
    dogDetails = customer.dogs.map((dog) => {
      return <DogDetails key={dog.id} dog={dog} />
    })
  } else {
    dogDetails = (
      <h5>
        <i>None have been added</i>
      </h5>
    )
  }

  return (
    <div className="callout primary">
      <CustomerDetails customer={customer} />

      <div className="callout secondary">
        <h2>Puppers</h2>
        <h3>Add a Dog for {customer.name}</h3>
        <DogForm addDog={addDog} />
        {dogDetails}
      </div>
    </div>
  )
}

export default CustomerShow
