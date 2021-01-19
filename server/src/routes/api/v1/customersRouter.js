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

export default customersRouter
