/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { Dog } from "../../models/index.js"

class DogSeeder {
  static async seed() {
    const dogsData = [
      {
        name: "Piper",
        age: 2,
        breed: "Pitbull/Yorkie/Dachshund. (Not sure how much I believe the DNA test results)",
        notes: "Enjoys being burritoed in a blanket. If her teeth are showing, she's derping",
        customerId: 1,
      },
      {
        name: "Miss Islay Mae Arrington",
        age: 10,
        breed: "Boston Terribull",
        notes: "Potato shaped. Has own agenda. Not very interested in you.",
        customerId: 2,
      },
      {
        name: "Sir Geoffrey Drake Arrington",
        age: 10,
        breed: "Chocolabbabull",
        notes: "Tall, dark, handsome. Will work for pizza & beer.",
        customerId: 2,
      },
      {
        name: "MollyMauck",
        age: 1,
        breed: "A bunch mixed together",
        notes: "Terrified of literally everything.",
        customerId: 3,
      },
      {
        name: "Catniss",
        age: 9,
        breed: "Snowshoe cat",
        notes: "Adorbs, and may secretly be a dog",
        customerId: 4,
      },
      {
        name: "Bogey Babel",
        age: 13,
        breed: "Morkie",
        notes:
          "8 pound couch/bed/chair hog. Favorite food is blueberry pancakes. Can usually be found... right behind you",
        customerId: 5,
      },
    ]

    for (const singleDogData of dogsData) {
      const currentDog = await Dog.query().findOne({ name: singleDogData.name })
      if (!currentDog) {
        await Dog.query().insert(singleDogData)
      }
    }
  }
}

export default DogSeeder
