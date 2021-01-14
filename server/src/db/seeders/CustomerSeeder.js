/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { Customer } from "../../models/index.js"

class CustomerSeeder {
  static async seed() {
    const customersData = [
      {
        name: "Fang",
        phoneNumber: 3228,
        address: "By the river",
        schedule: "Tuesday & Thursday at 2pm"
      },
      {
        name: "AmyLynn",
        phoneNumber: 1357,
        address: "In the woods",
        schedule: "Tuesday, Wednesday, & Thursday at 11am",
        notes: "Dogs may appear intimidating, but they're sweethearts"
      },
      {
        name: "Pat",
        phoneNumber: 1010,
        address: "On the outskirts",
        schedule: "Wednesday & Friday at 1pm"
      },
      {
        name: "Casi",
        phoneNumber: 2468,
        address: "The other side of town",
        schedule: "Monday & Friday at 12:30pm"
      },
      {
        name: "Corinne",
        phoneNumber: 4949,
        address: "Germany",
        schedule: "Call me when you book a flight"
      }
    ]

    for (const singleCustomerData of customersData) {
      const currentCustomer = await Customer.query().findOne({ name: singleCustomerData.name })
      if (!currentCustomer) {
        await Customer.query().insert(singleCustomerData)
      }
    }
  }
}

export default CustomerSeeder
