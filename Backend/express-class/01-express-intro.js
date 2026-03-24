const express = require("express");

function block_1_basicServer() {
  return new Promise((resolve) => {
    const app = express(); // server app create karti hai

    app.use(express.json()); // Deserialize karega (JSON string → JS object)

    app.get("/menu", (req, res) => {
      res.json({
        // Serialize karega (JS object → JSON string)
        items: ["thali", "biryani"],
      });
    });

    // chaicode.com/cart?q=biryani&limit=5
    app.get("/search", (req, res) => {
      const { q, limit } = req.query;
      res.json({
        query: q,
        limit: limit || "10",
      });
    });

    app.get("/menu/:id", (req, res) => {
      const { id } = req.params;
      res.json({
        item: id,
        price: 148,
      });
    });

    app.post("/order", (req, res) => {
      const order = req.body;
      res.status(201).json({
        status: "created",
        order,
      });
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        const menuRes = await fetch(`${base}/menu`);
        const menuData = await menuRes.json();
        console.log("GET /menu", JSON.stringify(menuData));

        console.log("+++++++++++++++++++++++++++++++++++++++++");

        const searchRes = await fetch(`${base}/search?q=biryani&limit=5`);
        const searchData = await searchRes.json();
        console.log("GET /search", JSON.stringify(searchData));

        console.log("+++++++++++++++++++++++++++++++++++++++++");

        const menuIdRes = await fetch(`${base}/menu/123`);
        const menuIdData = await menuIdRes.json();
        console.log("GET /menu/:id", JSON.stringify(menuIdData));

        console.log("+++++++++++++++++++++++++++++++++++++++++");

        const orderRes = await fetch(`${base}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({
              item: "biryani",
              quantity: 2,
            }),
          },
        });

        const orderData = await orderRes.json();
        console.log("POST /order", JSON.stringify(orderData));
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
  await block_1_basicServer();

  process.exit();
}

main();
