import { describe, it, expect } from "vitest";
import { createTestClient, gql } from "./utils";
import * as bcrypt from "bcrypt";
import { prisma } from "../src/db";

describe("Authentication", () => {
  const client = createTestClient();

  const REGISTER_MUTATION = gql`
    mutation Register($email: String!, $password: String!) {
      register(email: $email, password: $password) {
        ... on MutationRegisterSuccess {
          data
        }
        ... on Error {
          __typename
          error
        }
        ... on ZodError {
          fieldErrors {
            message
            path
          }
          error
        }
      }
    }
  `;

  const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        ... on MutationLoginSuccess {
          data
        }
        ... on Error {
          __typename
          error
        }
      }
    }
  `;

  it("should register a new user", async () => {
    const input = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await client.query(REGISTER_MUTATION, input);
    expect(response.errors).toBeUndefined();
    expect(response.data?.register.data).toBeDefined();
    expect(response.data?.register.__typename).toBeUndefined();

    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    expect(response.errors).toBeUndefined();
    expect(user).toBeDefined();
    expect(user?.email).toBe(input.email);
  });

  it("should not register a user with existing email", async () => {
    const input = {
      email: "test@example.com",
      password: "password123",
    };

    await prisma.user.create({
      data: {
        email: input.email,
        password: await bcrypt.hash(input.password, 10),
      },
    });

    const response = await client.query(REGISTER_MUTATION, input);

    expect(response.errors).toBeUndefined();
    expect(response.data?.register.__typename).toBe("UserExistsError");
  });

  it("should not register a user with invalid email", async () => {
    const input = {
      email: "invalid-email",
      password: "password123",
    };

    const response = await client.query(REGISTER_MUTATION, input);

    expect(response.errors).toBeUndefined();
    expect(response.data?.register.__typename).toBe("ZodError");
    expect(response.data?.register.fieldErrors).toBeDefined();
    expect(response.data?.register.fieldErrors[0].path[0]).toBe("email");
  });

  it("should not register a user with invalid password", async () => {
    const input = {
      email: "test@example.com",
      password: "invalid",
    };

    const response = await client.query(REGISTER_MUTATION, input);

    expect(response.errors).toBeUndefined();
    expect(response.data?.register.__typename).toBe("ZodError");
    expect(response.data?.register.fieldErrors).toBeDefined();
    expect(response.data?.register.fieldErrors[0].path[0]).toBe("password");
  });

  it("should login with correct credentials", async () => {
    const input = {
      email: "test@example.com",
      password: "password123",
    };

    await prisma.user.create({
      data: {
        email: input.email,
        password: await bcrypt.hash(input.password, 10),
      },
    });

    const response = await client.query(LOGIN_MUTATION, input);

    expect(response.errors).toBeUndefined();
    expect(response.data?.login.data).toBeDefined();
  });

  it("should not login with incorrect password", async () => {
    const input = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    await prisma.user.create({
      data: {
        email: input.email,
        password: await bcrypt.hash("password123", 10),
      },
    });

    const response = await client.query(LOGIN_MUTATION, input);

    expect(response.errors).toBeUndefined();
    expect(response.data?.login.data).toBeUndefined();
    expect(response.data?.login.__typename).toBe("InvalidCredentialsError");
  });
});
