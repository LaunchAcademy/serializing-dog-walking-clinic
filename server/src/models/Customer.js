const Model = require("./Model")

class Customer extends Model {
  static get tableName() {
    return "customers"
  }

  static get jsonSchema() {
    return  {
      type: "object",
      required: ["name", "phoneNumber", "address", "schedule"],
      properties: {
        name: { "type": "string", "minLength": 1},
        phoneNumber: { "type": ["integer", "string"] },
        address: { "type": "string", "minLength": 1 },
        schedule: { "type": "string", "minLength": 1 },
        notes: { "type": "string" }
      }
    }
  }
  
  static get relationMappings() {
    const Dog = require("./Dog")
    
    return {
      dogs: {
        relation: Model.HasManyRelation,
        modelClass: Dog,
        join: {
          from: "customers.id",
          to: "dogs.customerId"
        }
      }
    }
  }
}

module.exports = Customer