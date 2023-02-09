import { makeSchema, asNexusMethod } from "nexus";
import { join } from "path";
import { DateTimeResolver, JSONResolver } from "graphql-scalars";
import { applyMiddleware } from "graphql-middleware";

const jsonScalar = asNexusMethod(JSONResolver, "json");
const dateTimeScalar = asNexusMethod(DateTimeResolver, "date");

import * as types from "./graphql";
import { permissions } from "./permissions";

export const schema = makeSchema({
  types: [types, jsonScalar, dateTimeScalar],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});

export const protectedSchema = applyMiddleware(schema, permissions);
