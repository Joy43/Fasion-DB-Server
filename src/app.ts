import cors from "cors";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import os from "os";
import path from "path";
import { StatusCodes } from "http-status-codes";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { authDocs } from "./swagger/authDocs";
import { orderSwaggerDoc } from "./app/modules/order/orderSwaggerDoc";
import { userDocs } from "./swagger/userDoc";

// Example env variable
const configs = { env: process.env.NODE_ENV || "development" };

const app: Application = express();

// ------------------- Swagger Setup -------------------

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Fahad Pervez API - Team Future-Stack",
            version: "1.0.0",
            description: "Express API with auto-generated Swagger docs",
        },
        paths: {
            ...authDocs,
            ...userDocs,
            ...orderSwaggerDoc
        },
        servers: configs.env === "production" ? [
            { url: "https://fahadpervez-backend.onrender.com" },
            { url: "http://localhost:5000" },
        ] : [
            { url: "http://localhost:5000" },
            { url: "https://fahadpervez-backend.onrender.com" },
        ],
        components: {
            securitySchemes: {
                AuthorizationToken: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "Put your accessToken here ",
                },
            },
        },
        security: [
            {
                AuthorizationToken: []
            },
        ],
    },
    apis: [
        path.join(
            __dirname,
            configs.env === "production" ? "./**/*.js" : "./**/*.ts"
        ),
    ],
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ------------------- Middleware -------------------
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------- Routes -------------------
app.use("/api/v1", router);

// ------------------- Test Route -------------------
app.get("/", (req, res) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>FasionDB Server Info</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f2f2f2; padding: 20px; }
        .container { background: white; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; }
        h1 { color: #FFA500; }
        pre { background: #eee; padding: 10px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to FasionDB Server</h1>
        <p><strong>Version:</strong> 1.0.0</p>

        <h2>Client Details</h2>
        <pre>
IP Address: ${clientIp}
Accessed At: ${currentDateTime}
        </pre>

        <h2>Server Details</h2>
        <pre>
Hostname: ${serverHostname}
Platform: ${serverPlatform}
Uptime: ${Math.floor(serverUptime / 3600)}h ${Math.floor(
    (serverUptime % 3600) / 60
  )}m
        </pre>

        <h2>Developer Contact</h2>
        <pre>
Email: ssjoy43@gmail.com
Website: https://shahsultan-islam-joy.vercel.app/
        </pre>
      </div>
    </body>
    </html>
  `;

  res.status(StatusCodes.OK).send(htmlContent);
});

// ------------------- Error Handlers -------------------
app.use(globalErrorHandler);
app.use(notFound);

export default app;
