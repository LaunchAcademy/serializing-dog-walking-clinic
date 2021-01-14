import React from "react"

const DogDetails = (props) => {
  const {name, age, breed, notes} = props.dog

  let pupAge = age
  let pupBreed = breed
  let pupNotes = notes

  if (!age) {
    pupAge = <i>N/A</i>
  }

  if (!breed) {
    pupBreed = <i>N/A</i>
  }

  if (!notes) {
    pupNotes = <i>N/A</i>
  }

  return (
    <div className="callout">
      <h5>{name}</h5>
      <ul>
        <li><b>Age:</b> {pupAge}</li>
        <li><b>Breed:</b> {pupBreed}</li>
        <li><b>Notes:</b> {pupNotes}</li>
      </ul>
    </div>
  )
}

export default DogDetails
