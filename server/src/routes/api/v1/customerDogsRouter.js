import express from "express"

import { Dog } from "../../../models/index.js"

const customerDogsRouter = new express.Router({ mergeParams: true })

customerDogsRouter.post("/", async (req, res) => {
  // debugger
  const { name, breed, age, notes } = req.body
  const { customerId } = req.params
  // const customerId = req.params.customerId
  
  try {
    const newDog = await Dog.query().insertAndFetch({ name, breed, age, notes, customerId })

    return res.status(201).json({ dog: newDog })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default customerDogsRouter