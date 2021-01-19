import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const CustomersIndex = (props) => {
  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/v1/customers")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      } else {
        const responseBody = await response.json()

        if (responseBody.customers) {
          setCustomers(responseBody.customers)
        }
      }
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    fetchCustomers()
  }, [])

  const customerLinks = customers.map((customer) => {
    return(
      <h3 key={customer.id} >
        <Link to={`/customers/${customer.id}`}>
          {customer.name}
        </Link>
      </h3>
    )
  })

  return (
    <div>
      <h1>Customers</h1>
      {customerLinks}
    </div>
  )
}

export default CustomersIndex
