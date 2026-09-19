const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Backend API documentation for all routes",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Relative and Absolute path both covered for reliability
  apis: [
    path.resolve(__dirname, "../routes/*.js"),
    path.resolve(__dirname, "../routes/**/*.js"),
    "./routes/*.js"
  ],
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUI,
  specs,
};