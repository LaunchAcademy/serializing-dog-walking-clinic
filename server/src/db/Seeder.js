/* eslint-disable no-console */

import { connection } from "../boot.js"
import CustomerSeeder from "./seeders/CustomerSeeder.js"
import DogSeeder from "./seeders/DogSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding customers")
    await CustomerSeeder.seed()

    console.log("seeding dogs")
    await DogSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder