import express from "express";
import {PORT} from "./config/env.js";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import SubscriptionRouter from "./routes/subscription.route.js";
import authRoute from "./routes/auth.route.js";
import connectDataBase from "./database/mongodb.js";
import errorMiddleware from "./Middlewares/error.middleware.js";
import arcjetMiddleware from "./Middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions',SubscriptionRouter);
app.use('/api/v1/workflows',workflowRouter);

app.use(errorMiddleware)

app.get("/", (req, res) => {
    res.send("Welcome to the server");
})


app.listen(PORT, async ()=>{
    console.log(`Subscription Tracker API is running on:http://localhost:${PORT}`);
    await connectDataBase()
})

export default app;