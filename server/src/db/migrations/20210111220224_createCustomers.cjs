/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("customers", (table) => {
    table.bigIncrements("id").primary()
    table.string("name").notNullable()
    table.integer("phoneNumber").notNullable()
    table.string("address").notNullable()
    table.text("schedule").notNullable()
    table.text("notes")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("customers")
};
