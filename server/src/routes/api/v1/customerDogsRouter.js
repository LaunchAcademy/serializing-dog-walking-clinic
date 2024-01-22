import express from "express"

import Dog from "../../../models/Dog.js"

const customerDogsRouter = new express.Router({ mergeParams: true })

customerDogsRouter.post("/", async (req, res) => {
  try {
    console.log(req.params)
    console.log(req.body)
    // const name = req.body.name
    // const age = req.body.age

    const dogData = {
      ...req.body,
      customerId: req.params.customerId,
    }
    console.log(dogData)

    const newDog = await Dog.query().insertAndFetch(dogData)
    console.log(newDog)

    return res.status(201).json({ dog: newDog })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default customerDogsRouter
