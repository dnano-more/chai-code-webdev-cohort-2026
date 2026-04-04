import "dotenv/config"  // dev → dotenv use karo aur prod → skip
import app from "./src/app.js";
import connectDB from "./src/common/config/db.js";
import dns from 'node:dns';

if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const PORT = process.env.PORT || 5000

// validate env
["MONGO_URI"].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env var: ${key}`);
  }
});

let server;

const start = async () => {
    // connect to database
    await connectDB();

    server = app.listen(PORT, () => {
        console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV} mode`)
    })
}

const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down...`);
  if (server) {
    server.close(() => console.log("HTTP server closed"));
  }
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);


start().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1); 
})
