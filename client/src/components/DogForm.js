import React, { useState } from "react"
import _ from "lodash"

import ErrorList from "./ErrorList"

const DogForm = (props) => {
  const [dog, setDog] = useState({
    name: "",
    age: "",
    breed: "",
    notes: ""
  })
  const [errors, setErrors] = useState({})

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name"]

    requiredFields.forEach(field=>{
      if(dog[field].trim()===""){
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
    setDog({
      ...dog,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setDog({
      name: "",
      age: "",
      breed: "",
      notes: ""
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      props.addDog(dog)
      clearForm()
    }
  }


  return (
    <form onSubmit={handleSubmit} className="callout">
      <ErrorList errors={errors} />

      <label htmlFor="name">Name:
        <input
          id="name"
          type="text"
          name="name"
          value={dog.name}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>

      <label htmlFor="age">Age:
        <input
          id="age"
          type="number"
          name="age"
          value={dog.age}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="breed">Breed:
        <input
          id="breed"
          type="text"
          name="breed"
          value={dog.breed}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="notes">Notes:
        <input
          id="notes"
          type="text"
          name="notes"
          value={dog.notes}
          onChange={handleChange}
        />
      </label>

      <div className="button-group">
        <input className="button" type="submit" value="Add Dog" />
        <button className="button" type="button" onClick={clearForm}>Clear</button>
      </div>
    </form>
  )
}

export default DogForm