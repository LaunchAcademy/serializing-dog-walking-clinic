import express from "express"

import customerDogsRouter from "./customerDogsRouter.js"
import { Customer } from "../../../models/index.js"

const customersRouter = new express.Router()

customersRouter.use("/:customerId/dogs", customerDogsRouter)

customersRouter.get("/", async (req, res) => {
  try {
    const customers = await Customer.query()
    return res.status(200).json({ customers: customers })
  } 
  catch (error) {
    return res.status(500).json({ errors: error })
  }
})

customersRouter.get("/:id", async (req, res) => {
  const customerId = req.params.id

  try {
    const customer = await Customer.query().findById(customerId)
    console.log(customer)

    customer.dogs = await customer.$relatedQuery("dogs")
    console.log(customer)

    return res.status(200).json({ customer: customer })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default customersRouter
