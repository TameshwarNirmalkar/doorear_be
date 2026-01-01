import authRouter from "@api/auth/auth_routes";
import privateRouter from "@api/routes";
import { openAPIRouter } from "@apiDocs/openAPIRouter";
import CorsMiddleware from "@common/middleware/cors_middleware";
import CheckCrmTypes from "@common/middleware/crm_type_route_gaurd";
import SetCustomHeaders from "@common/middleware/custom_headers";
import errorHandler from "@common/middleware/errorHandler";
import HelmetMiddleware from "@common/middleware/helmet_middleware";
import rateLimiter from "@common/middleware/rateLimiter";
import requestLogger from "@common/middleware/requestLogger";
import SessionMiddleware from "@common/middleware/session_middleware";
import publicRouter from "@publicApi/public_routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import noCache from "nocache";
import passport from "passport";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(noCache());
app.use(fileUpload());
app.use(cookieParser());
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(passport.initialize());
app.use(SetCustomHeaders);
app.use(CorsMiddleware());
app.use(HelmetMiddleware());
app.use(rateLimiter);
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.noSniff());
// Session Maintain
app.use(SessionMiddleware());

// Request logging
app.use(requestLogger);

app.use(`/${process.env.API_PARAM}/api/v2/auth`, authRouter);

app.use(
  `/${process.env.API_PARAM}/api/v2/:crmtype`,
  CheckCrmTypes,
  privateRouter
);
app.use(`/${process.env.API_PARAM}/api/v2`, CheckCrmTypes, publicRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

// app.listen(env.PORT, () => {
//   console.log(`Server is running on port ${env.PORT}`);
//   console.log(`Environment: ${env.NODE_ENV}`);
//   console.log(`Host: ${env.HOST}`);
//   console.log(`CORS Origin: ${env.CORS_ORIGIN}`);
// });

export { app };
