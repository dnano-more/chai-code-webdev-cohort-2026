import "dotenv/config"  // dev → dotenv use karo aur prod → skip
import app from "./src/app.js";
import connectDB from "./src/common/config/db.js";
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
const PORT = process.env.PORT || 5000

const start = async () => {
    // connect to database
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is runnig at ${PORT} in ${process.env.NODE_ENV} mode`)
    })
}

start().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1); 
})
