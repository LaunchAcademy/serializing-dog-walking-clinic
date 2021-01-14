import React from "react"

const CustomerDetails = (props) => {
  const { name, phoneNumber, address, schedule, notes, dogs} = props.customer

  let customerNotes = notes

  if (!notes) {
    customerNotes = <i>none</i>
  }

  return (
    <>
      <h1>{name}</h1>
      <ul>
        <li><b>Phone Number:</b> {phoneNumber}</li>
        <li><b>Address:</b> {address}</li>
        <li><b>Schedule:</b> {schedule}</li>
        <li><b>Notes:</b> {customerNotes}</li>
      </ul>
    </>
  )
}

export default CustomerDetails