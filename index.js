import express from "express";
import http from "http";
import cors from "cors";
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import executeMiddleware from "./middlewareHandler.js";
import { getBlock,getFunctionEntryPaths } from "./utils.js";
import { env } from "@appblocks/node-sdk";

env.init()


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Open api documentation for appblocks',
    version: '1.0.0',
  },
  
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: getFunctionEntryPaths(),
  components:{
    securitySchemes:{bearerAuth:{type:"http",scheme:"bearer",
  bearerFormat:"JWT"},basicAuth:{type:"http",scheme:"basic"},
  apiKeyAuth:{type:"apiKey"}
}
  }
};

const swaggerSpec = swaggerJSDoc(options);

const appHandler = async (req, res, next) => {
  try {
    let url = req.params[0];

    if (url.includes("health")) {
      req.params.health = "health";
      url = url.replace("/health", "")
    }

    const { block, route } = getBlock(url);
    if (!block) {
      console.log("No block found for url -> ", url);
      res.send("requested function not registered in app.").status(404);
      res.end();
      return;
    }

    console.log("\nRequest to block ", block.name);
    // Execute middleware functions
    const continueNext = await executeMiddleware(block.middlewares, { req, res, next });
    if (!continueNext) return

    const isDev = process.env.NODE_ENV !== "production";
    const importPath = isDev ? route + "?update=" + Date.now() : route;
    const handler = await import(importPath);

    console.log("handler: ", handler);
    await handler.default({ req, res, next });
  } catch (err) {
    console.error(err);
    res.send("Something went wrong. Please check function log").status(500);
  }
};

const app = express();
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.all("/*", appHandler);

const server = http.createServer(app);
server.listen(5000);
console.log("Functions emulated on port 5000");