import { builder } from "./builder";
import {
  AuthenticationError,
  AuthorizationError,
  InsufficientFundsError,
  AccountNotFoundError,
  UserExistsError,
  InvalidCredentialsError,
} from "../errors";
import { ZodError, ZodFormattedError } from "zod";

const ErrorInterface = builder.interfaceRef<Error>("Error").implement({
  fields: (t) => ({
    error: t.exposeString("message"),
  }),
});

builder.objectType(Error, {
  name: "BaseError",
  interfaces: [ErrorInterface],
});

builder.objectType(AuthenticationError, {
  name: "AuthenticationError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    error: t.exposeString("message"),
    code: t.exposeString("code"),
  }),
});

builder.objectType(AuthorizationError, {
  name: "AuthorizationError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    error: t.exposeString("message"),
    code: t.exposeString("code"),
  }),
});

builder.objectType(InsufficientFundsError, {
  name: "InsufficientFundsError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    error: t.exposeString("message"),
    code: t.exposeString("code"),
  }),
});

builder.objectType(AccountNotFoundError, {
  name: "AccountNotFoundError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    error: t.exposeString("message"),
    code: t.exposeString("code"),
  }),
});

builder.objectType(UserExistsError, {
  name: "UserExistsError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    error: t.exposeString("message"),
    code: t.exposeString("code"),
  }),
});

builder.objectType(InvalidCredentialsError, {
  name: "InvalidCredentialsError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    error: t.exposeString("message"),
    code: t.exposeString("code"),
  }),
});

const ZodFieldError = builder
  .objectRef<{
    message: string;
    path: string[];
  }>("ZodFieldError")
  .implement({
    fields: (t) => ({
      message: t.exposeString("message"),
      path: t.exposeStringList("path"),
    }),
  });

function flattenErrors(
  error: ZodFormattedError<unknown>,
  path: string[]
): { path: string[]; message: string }[] {
  const errors = error._errors.map((message) => ({
    path,
    message,
  }));

  Object.keys(error).forEach((key) => {
    if (key !== "_errors") {
      errors.push(
        ...flattenErrors(
          (error as Record<string, unknown>)[key] as ZodFormattedError<unknown>,
          [...path, key]
        )
      );
    }
  });

  return errors;
}

builder.objectType(ZodError, {
  name: "ZodError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    fieldErrors: t.field({
      type: [ZodFieldError],
      resolve: (err) => flattenErrors(err.format(), []),
    }),
  }),
});
