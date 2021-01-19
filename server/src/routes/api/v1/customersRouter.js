import express from "express"

import { Customer } from "../../../models/index.js"

const customersRouter = new express.Router()

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
  try {
    const customer = await Customer.query().findById(req.params.id)
    customer.dogs = await customer.$relatedQuery("dogs")

    return res.status(200).json({ customer: customer })
  } catch(err) {
    return res.status(422).json({ errors: err })
  }
})

export default customersRouter
