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
      url: "http://localhost:8080",
      description: "Local development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./**/*.router.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
