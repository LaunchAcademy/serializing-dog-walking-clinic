import express from "express"
import objection from "objection"
const { ValidationError } = objection

import Dog from "../../../models/Dog.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const customerDogsRouter = new express.Router({ mergeParams: true })

customerDogsRouter.post("/", async (req, res) => {
  const { customerId } = req.params
  const { name, age, breed, notes } = req.body
  
  const cleanedData = await cleanUserInput({ name, age, breed, notes })
  
  const associatedData = {
    ...cleanedData,
    customerId
  }
  
  try {
    const newDog = await Dog.query().insertAndFetch(associatedData)
    return res.status(201).json({ dog: newDog})
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ errors: err.data })
    }
    return res.status(500).json({ errors: err })
  }
})

export default customerDogsRouter