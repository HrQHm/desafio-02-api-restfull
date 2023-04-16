import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password_hash: string
      created_at: string
    },

    meals: {
      id: string
      name: string
      description: string
      on_diet: boolean
      date_meal: string
      user_id: string
      created_at: string
    }
  }
}


declare module "knex/types/result" {
  interface Registry {
    Count: number;
  }
}