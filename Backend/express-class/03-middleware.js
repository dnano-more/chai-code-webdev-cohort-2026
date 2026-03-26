const express = require("express");

function block_1_httpMethods() {
  return new Promise((resolve) => {
    const app = express(); 
    
    const logs = [];
    
    // app.use(express.json()); 
    app.use(express.json({ limit: "1mb" })); 
    app.use(express.urlencoded({ extended: true, limit: "1mb" }));
    app.use(express.static(root, {
        dotfiles: "ignore", // ignore, allow, deny
        index: "index.html", // false, index.html, home.html
        maxAge: "1d", // cache control header
        // other options like redirect, setHeaders, ...
    }))

    // request logger

    app.use((req, res, next) => {
        // add to database
        // console log everything
        // write in some file
        const logEntry = `${req.method} : ${req.url}`;
        logs.push(logEntry);
        console.log(`[LOG] -- ${logEntry}`);

        // if your request hangs forever
        next();
    });
    
    app.use((req, res, next) => {
        req.startTime = Date.now();

        res.on('finish', () => {
            const duration = Date.now() - req.startTime;
            console.log(`[TIMER] - ${req.method} - ${req.url} took ${duration}ms`)
        })

        next();
    })

    function authMe(req, res, next) {
        const token = req.headers['x-auth-token'];

        if(!token) {
            return res.status(401).json({error: "No Token, please login"})
        }

        if(!token) {
            return res.status(403).json({error: "Invalid token"})
        }

        // token --> extract data from token --> userID, email, admin

        req.user = {id: 1, name: "Dnano", role: "admin"}

        next();
    }

    // custom middleware
    function getRole(role) {
        return (req, res, next) => {
            if(!req.user || req.user.role !== role) {
                return res.status(403).json({error: `Role ${role} required`})
            }

            next();
        }
    }

    function getArrRole(role) {
        return (req, res, next) => {
            
            if(!req.user || !role.includes(req.user.role) ) {
                return res.status(403).json({error: `Role ${role} required`})
            }

            next();
        }
    }

    // Own rate limiter middleware
    function rateLimit(maxRequest, timeWindowMs) {
        let count = 0;
        let startTime = Date.now();

        return (req, res, next) => {
            let now = Date.now();

            if(now - startTime > timeWindowMs) {
                count = 0;
                startTime= now;
            }

            count++
            if(count > maxRequest) {
                return res.status(429).json({
                    error: "Too many request, please try after sometime"
                })
            }
            next();
        }   
    }

    const limitedEndPoint = rateLimit(5, 10000); // 5 requests per 10 seconds

    app.get("/limited", limitedEndPoint, (req, res) => {
        res.json({message: "This is a rate limited endpoint"})
    }); 

    app.get("/profile", authMe, getRole("admin"), (req, res) => {
        res.json({ message: "Welcome to profile" });
    }) 
    //note: Jab /profile route pe req aati hain to Express automatically call karta hain authMe, getRole, ... in saare function ko serial me.

    app.get("/profile", authMe, getRole("teacher"), (req, res) => {
        res.json({ message: "Welcome to profile" });
    }) 
    app.get("/profile", authMe, getRole("student"), (req, res) => {
        res.json({ message: "Welcome to profile" });
    }) 
    app.get("/profile", authMe, getArrRole(["admin", "teacher", "student"]), (req, res) => {
        res.json({ message: "Welcome to profile" });
    }) 


    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        //TODO: Test all the above routes using fetch or any HTTP client
        
      } catch (error) {
        console.error("Error:", error);
      }

      server.close(() => {
        console.log("Block 1 served...");
        resolve();
      });
    });
  });
}

async function main() {
  await block_1_httpMethods();

  process.exit();
}

main();
