import express from "express";
import authRoutes from "./modules/auth/auth.routes.js"

const app = express();
// const app = fastify();
// const app = hono();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth", authRoute);

export default app;