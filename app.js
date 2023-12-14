import express from "express";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import "dotenv/config.js";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";
import "dotenv/config";
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,

    origin: [
      "https://a6--quiet-haupia-5cdc5f.netlify.app",
      "https://a5--quiet-haupia-5cdc5f.netlify.app",
    ],
  })
);
app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);
