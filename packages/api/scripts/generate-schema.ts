import { printSchema } from "graphql";
import { schema } from "../src/schema";
import * as fs from "fs";

fs.writeFileSync("./schema.graphql", printSchema(schema));
