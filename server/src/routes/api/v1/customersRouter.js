import express from "express"

import { Customer } from "../../../models/index.js"

import customerDogsRouter from "./customerDogsRouter.js"

const customersRouter = new express.Router()

customersRouter.get("/", async (req, res) => {
  try {
    const customers = await Customer.query()
    return res.status(200).json({ customers: customers })
    // return res.status(200).json({ customers })
  } catch (error) {
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

    return res.status(200).json({ customer })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

// /api/v1/customers/:id of customer/dogs
customersRouter.use("/:customerId/dogs", customerDogsRouter)

export default customersRouter
