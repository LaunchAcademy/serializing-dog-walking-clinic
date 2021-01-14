import express from "express"
import objection from "objection"
const { ValidationError } = objection

import Customer from "../../../models/Customer.js"
import CustomerSerializer from "../../../serializers/CustomerSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const customersRouter = new express.Router()

customersRouter.get("/", async (req, res) => {
  try {
    const customers = await Customer.query()

    const serializedCustomers = []

    for (const customer of customers) {
      const serializedCustomer = await CustomerSerializer.getSummary(customer)
      serializedCustomers.push(serializedCustomer)
    }

    return res.status(200).json({ customers: serializedCustomers })
  } 
  catch (error) {
    return res.status(500).json({ errors: error })
  }
})

customersRouter.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.query().findById(req.params.id)
    const serializedCustomer = await CustomerSerializer.getSummary(customer)

    return res.status(200).json({ customer: serializedCustomer })
  } catch(err) {
    return res.status(422).json({ errors: err })
  }
})

customersRouter.post("/", async (req, res) => {
  const body = req.body
  const formInput = cleanUserInput(body)

  try {
    const newCustomer = await Customer.query().insertAndFetch(formInput)
    return res.status(201).json({ customer: newCustomer})
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ errors: err.data })
    }
    return res.status(500).json({ errors: err })
  }
})



export default customersRouter
