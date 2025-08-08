import { Schema } from "ajv"

const schemas: { [key: string]: Schema } = {
  userIdParam: {
    type: "object",
    additionalProperties: false,
    required: ["userId"],
    properties: {
      userId: {
        type: "string",
        pattern: "^[0-9]+$",
        errorMessage: {
          pattern: "User ID must be a number"
        }
      }
    }
  },
  user: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1,
        errorMessage: {
          minLength: "Name cannot be empty"
        }
      },
      emailAddress: {
        type: "string",
        format: "email",
        errorMessage: {
          format: "Email address is invalid"
        }
      },
      role: {
        type: "string",
        enum: ["Admin", "User"],
        errorMessage: {
          enum: "Role must be either 'Admin' or 'User'"
        }
      }
    },
    required: ["name", "emailAddress", "role"]
  },
}

export default schemas;