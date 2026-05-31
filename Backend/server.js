import express from "express";
import {
  analytics,
  billing,
  kitchenBoard,
  menuItems,
  operations,
  overview,
  publicMenu,
  reservations,
  staff,
} from "../Frontend/src/data/dineflow-data.js";

const app = express();
const port = Number(process.env.PORT || 4000);

let orders = [];
let menu = [...menuItems];

app.use(express.json());

app.use((request, response, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN || "*";
  response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
});

app.get("/api/health", (_request, response) => {
  response.json({
    service: "DineFlow API",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/app", (_request, response) => {
  response.json({
    overview,
    menu,
    operations,
    kitchen: kitchenBoard,
    analytics,
    staff,
    billing,
    reservations,
    publicMenu,
    orders,
  });
});

app.get("/api/overview", (_request, response) => response.json(overview));
app.get("/api/menu", (_request, response) => response.json(menu));
app.get("/api/operations", (_request, response) => response.json(operations));
app.get("/api/kitchen", (_request, response) => response.json(kitchenBoard));
app.get("/api/analytics", (_request, response) => response.json(analytics));
app.get("/api/staff", (_request, response) => response.json(staff));
app.get("/api/billing", (_request, response) => response.json(billing));
app.get("/api/reservations", (_request, response) => response.json(reservations));
app.get("/api/public-menu", (_request, response) => response.json(publicMenu));
app.get("/api/orders", (_request, response) => response.json(orders));

app.post("/api/orders", (request, response) => {
  const order = {
    id: `DF-${Date.now()}`,
    status: "received",
    createdAt: new Date().toISOString(),
    ...request.body,
  };

  orders = [order, ...orders];
  response.status(201).json(order);
});

app.post("/api/menu", (request, response) => {
  const item = {
    id: request.body.id || request.body.name?.toLowerCase().replaceAll(" ", "-"),
    orders: 0,
    satisfaction: 0,
    rating: 4.8,
    status: "In Stock",
    margin: 50,
    ...request.body,
  };

  if (!item.id || !item.name || !item.price) {
    response.status(400).json({
      error: "Menu item requires name and price.",
    });
    return;
  }

  menu = [item, ...menu];
  response.status(201).json(item);
});

app.patch("/api/menu/:id", (request, response) => {
  const index = menu.findIndex((item) => item.id === request.params.id);

  if (index === -1) {
    response.status(404).json({ error: "Menu item not found." });
    return;
  }

  menu[index] = { ...menu[index], ...request.body };
  response.json(menu[index]);
});

app.use((request, response) => {
  response.status(404).json({
    error: `Route ${request.method} ${request.path} was not found.`,
  });
});

app.listen(port, () => {
  console.log(`DineFlow API listening on http://localhost:${port}`);
});
