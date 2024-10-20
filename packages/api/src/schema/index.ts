import { builder } from "./builder";
import "./types";
import "./queries";
import "./mutations";
import "./errors";

export const schema = builder.toSchema();
