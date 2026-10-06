import express from "express"
import dotenv from "dotenv"
dotenv.config()

import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import itemRouter from "./routes/item.routes.js"
import shopRouter from "./routes/shop.routes.js"
import orderRouter from "./routes/order.routes.js"
import http from "http"
import { Server } from "socket.io"
import { socketHandler } from "./socket.js"

const app = express()
const server = http.createServer(app)

// --------------------------------------------------
// FRONTEND URL
// --------------------------------------------------

// During development:
// FRONTEND_URL is not required, so localhost will be used.
//
// During production:
// FRONTEND_URL will be provided by Render.
//
// Example:
// FRONTEND_URL=https://your-app.netlify.app

const frontendUrl =
    process.env.FRONTEND_URL || "http://localhost:5173"


// --------------------------------------------------
// SOCKET.IO
// --------------------------------------------------

const io = new Server(server, {
    cors: {
        origin: frontendUrl,
        credentials: true,
        methods: ["GET", "POST"]
    }
})

app.set("io", io)


// --------------------------------------------------
// PORT
// --------------------------------------------------

const port = process.env.PORT || 8000


// --------------------------------------------------
// CORS
// --------------------------------------------------

app.use(cors({
    origin: frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}))


// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

app.use(express.json())
app.use(cookieParser())


// --------------------------------------------------
// ROUTES
// --------------------------------------------------

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)


// --------------------------------------------------
// SOCKET HANDLER
// --------------------------------------------------

socketHandler(io)


// --------------------------------------------------
// START SERVER
// --------------------------------------------------

server.listen(port, "0.0.0.0", () => {
    connectDb()
    console.log(`server started at ${port}`)
    console.log(`Allowed frontend origin: ${frontendUrl}`)
})