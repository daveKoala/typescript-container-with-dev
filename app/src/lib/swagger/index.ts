import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Dave Clare",
      url: "https://kola-moon.com",
      email: "mr.d.clare@gmail.com",
    },
  },
  servers: [
    {
      url: `${process.env.BASE_URL}${process.env.PORT}`,
      description: "Local development server",
    },
  ],
  components: {
    schemas: {
      NewUser: {
        description: "User object",
        type: "object",
        properties: {
          firstName: {
            type: "string",
            example: "Dave",
            required: true,
          },
          lastName: {
            type: "string",
            example: "Clare",
            required: true,
          },
          email: {
            type: "string",
            example: "dona@wavey.com",
            required: true,
          },
        },
      },
      User: {
        description: "User object",
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "6481f61fa894d7a46212c072",
          },
          firstName: {
            type: "string",
            example: "Dave",
          },
          lastName: {
            type: "string",
            example: "Clare",
          },
          email: {
            type: "string",
            example: "dona@wavey.com",
          },
          __v: {
            type: "integer",
            format: "int32",
            example: "0",
          },
        },
      },
      AllUsersResponse: {
        description: "Activity details. E.g. Webinar, post, goal",
        properties: {
          data: {
            type: "array",
            // $ref: "#/components/schemas/User",
            items: { $ref: "#/components/schemas/User" },
          },
          continuationToken: {
            type: "string",
            example: "6481f6cea894d7a46212c07c",
          },
          continuationURL: {
            type: "string",
            example:
              "http://localhost:8080/user/all?continuationToken=6481f6cea894d7a46212c07c",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./**/*.router.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
