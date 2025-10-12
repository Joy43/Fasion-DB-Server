import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import os from "os";
import { StatusCodes } from "http-status-codes";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
// import seedAdmin from './app/DB/seed';
// import { sslService } from './app/modules/sslcommerz/sslcommerz.service';

const app: Application = express();

// Middleware setup
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

// Test route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
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

app.use(globalErrorHandler);

//---------Not Found----------
app.use(notFound);

export default app;
