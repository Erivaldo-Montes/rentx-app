import { Database } from "@nozbe/watermelondb";
import SQliteAdpter from "@nozbe/watermelondb/adapters/sqlite";
import migrations from "./migration";

import { schemas } from "./schema";
import { User } from "./models/user";
import { Car } from "./models/car";

const adapter = new SQliteAdpter({
  schema: schemas,
  migrations,
});

export const database = new Database({
  adapter,
  modelClasses: [User, Car],
});
