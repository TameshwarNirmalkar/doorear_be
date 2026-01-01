import { config } from "dotenv";
import session from "express-session";

config({ override: true, path: "./.env" });

const SessionMiddleware = () => {
  return session({
    // Type-safe properties are now available on the session object
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      secure: process.env.NODE_ENV === "production", // Recommended for production
    },
  });
};

export default () => SessionMiddleware();
