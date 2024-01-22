/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("dogs", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.string("breed")
    table.integer("age")
    table.text("notes")
    table.bigInteger("customerId").notNullable().unsigned().index().references("customers.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("dogs")
}
