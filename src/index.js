import express from "express";
import cookieParser from "cookie-parser";
import consola from "consola";
import colors from "colors";
import morgan from "morgan";
import helmet from "helmet";
import config from "./utils/config.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { userSignIn, userSignUp } from "./controllers/auth.js";
import { getUser } from "./controllers/user.js";
import userValidation from "./validations/user.js";
import { protect } from "./middleware/auth.js";

const app = express();

/* Custom Middlewares */
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* Apis */
app.post("/signup", userValidation(), userSignUp);
app.post("/signin", userSignIn);
app.get("/user/me", protect, getUser);

app.get("/", (_, res) => res.send("Welcome to Authenticator API!"));

/* ERROR HANDLER */
app.use(notFound);
app.use(errorHandler);

/* Server */
const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  consola.success(
    `Server running in ${config.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

process.on("unhandledRejection", (err) => {
  consola.error(`Logged Error: ${err}`);
  process.exit(1);
});
