import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'React User List API',
      version: '1.0.0',
      description: 'A simple Express API for managing users',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'emailAddress', 'role'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the user',
            },
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            emailAddress: {
              type: 'string',
              format: 'email',
              description: 'The email address of the user',
            },
            role: {
              type: 'string',
              enum: ['Admin', 'User', 'System'],
              description: 'The role of the user',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the user was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the user was last updated',
            },
          },
        },
        UserInput: {
          type: 'object',
          required: ['name', 'emailAddress', 'role'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            emailAddress: {
              type: 'string',
              format: 'email',
              description: 'The email address of the user',
            },
            role: {
              type: 'string',
              enum: ['Admin', 'User', 'System'],
              description: 'The role of the user',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/entities/user/*.ts'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
