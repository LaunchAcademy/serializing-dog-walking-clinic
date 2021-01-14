class CustomerSerializer {
  static async getSummary(customer) {
    const allowedAttributes = ["id", "name", "phoneNumber", "address", "schedule", "notes"]

    let serializedCustomer = {}
    for (const attribute of allowedAttributes) {
      serializedCustomer[attribute] = customer[attribute]
    }

    serializedCustomer.dogs = await customer.$relatedQuery("dogs")
    return serializedCustomer
  }
}

export default CustomerSerializer