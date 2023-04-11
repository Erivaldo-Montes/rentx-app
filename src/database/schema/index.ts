import { appSchema } from "@nozbe/watermelondb";

import { userSchema } from "./userSchema";
import { carSchema } from "./carSchema";

const schemas = appSchema({
  version: 1,
  tables: [userSchema, carSchema],
});

export { schemas };
