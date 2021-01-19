const Model = require("./Model")

class Dog extends Model {
  static get tableName() {
    return "dogs"
  }

  static get jsonSchema() {
    return  {
      type: "object",
      required: ["name"],
      properties: {
        name: { "type": "string", "minLength": 1 },
        breed: { "type": "string" },
        age: { "type": [ "number", "string" ] },
        notes: { "type": "string" }
      }
    }
  }
}

module.exports = Dog