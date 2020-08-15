import Knex from 'knex'
import { resolve } from 'path'

export const database = Knex({
  client: 'sqlite3',
  connection: {
    filename: resolve(__dirname, 'db.sqlite')
  },
  useNullAsDefault: true
})
