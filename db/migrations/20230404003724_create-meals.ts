import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary(),
      table.text('name').notNullable().unique,
      table.text('description'),
      table.boolean('on_diet'),
      table.dateTime('date_meal'),
      table.uuid('user_id'),
      table.foreign('user_id').references('users.id').onDelete('CASCADE'),
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}

