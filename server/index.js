import express from "express";
import cors from "cors";
import helmet from "helmet";
import { apiRouter } from "./routes/apiRouter.js";
import { PORT_CLIENT, PORT_SERVER } from "./env.js";
import { getUserData } from "./middleware/getUserData.js";
import { cookieParser } from "./middleware/cookieParser.js";

const app = express();

app.use(express.static("public"));
app.use(helmet());
app.use(
  express.json({
    limit: "4kb",
  })
);

app.use(cookieParser);
app.use(getUserData);

app.use(
  "/api",
  cors({
    origin: "http://localhost:" + PORT_CLIENT,
    credentials: true,
  }),
  apiRouter
);

app.get("*error", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No such route",
  });
});

app.listen(PORT_SERVER, () => {
  console.log(`Server: http://localhost:${PORT_SERVER}`);
});
