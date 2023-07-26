import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

// import { Kysely, MysqlDialect } from "kysely";
// import { createPool } from "mysql2";

import type { DB } from "./prisma/generated/types";

const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
  // dialect: new MysqlDialect({
  //   pool: async () =>
  //     createPool({
  //       uri: process.env.DATABASE_URL,
  //     }),
  // }),
});

export default db;
