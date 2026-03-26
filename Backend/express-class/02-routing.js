const express = require("express");

function block_1_httpMethods() {
  return new Promise((resolve) => {
    const app = express(); // server app create karti hai

    app.use(express.json()); // Deserialize karega (JSON string → JS object)

    const routes = {
      1: {
        id: 1,
        name: "Dadar -Anderi Express",
        direction: "North",
      },

      2: {
        id: 2,
        name: "Bandra-Kurla Shuttle",
        direction: "East",
      },
    };

    let nextId = 3;

    // list all train
    app.get("/routes", (req, res) => {
      res.json(Object.values(routes));
    });

    // single route by id
    app.get("/routes:id", (req, res) => {
      // const {id} = req.params;
      // const route = routes[id];

      const route = routes[req.params.id];
      if (!route) return res.status(404).json({ error: "No train on this id" });
      res.json(route);
    });

    app.post("/routes", (req, res) => {
      //no validation, no zod
      const newRoute = { id: nextId++, ...req.body };
      routes[newRoute.id] = newRoute
      res.status(201).json(newRoute)
    });

    app.put("/routes/:id", (req, res) => {
        const id = req.params.id
        if(!routes[id]) return res.status(404).json({error: "Route not found"})
        routes[id] = {id: Number(id), ...req.body}
    })

    app.patch("/routes/:id", (req, res) => {
        const id = req.params.id
        if(!routes[id]) return res.status(404).json({error: "Route not found"})
        // TODO: Complete this route
        // For now, we'll just update the existing route with the provided fields
        routes[id] = { ...routes[id], ...req.body, id: Number(id) }
        res.json(routes[id])
    })

    app.delete("/routes/:id", (req, res) => {
        const id = req.params.id
        if(!routes[id]) return res.status(404).json({error: "Route not found"})
        delete routes[id]
        res.status(204).send() // No content to send back, but indicates successful deletion
    })

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        //TODO: Test all the above routes using fetch or any HTTP client
        const listRes = await fetch(`${base}/routes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: 3,
                name: "Test Route",
                direction: "West"
            })
        });
        const listData = await listRes.json();

        const createRes = await fetch(`${base}/routes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({  
                    name: "Colaba-Worli",
                    direction: "South"
                })
            }
        });
        const createData = await createRes.json();
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

function block_1_httpMethods() {
  return new Promise((resolve) => {
    const app = express(); // server app create karti hai

    app.use(express.json()); // Deserialize karega (JSON string → JS object)

    app.get("/files/*filepath", (req, res) => {
        const filepath = req.params.filepath
        res.json({filepath, type: "wildcard"})
    })

    app
        .route("/schedule")
        .get((req, res) => {})
        .post((req, res) => {})
        .put((req, res) => {})
        .delete((req, res) => {})

    app.use("/api", (req, res) => {
        //its a prefetch match
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
