import { createApp } from "./app.js";
import { config } from "./config/index.js";
import { initializeStore } from "./data/database.js";

async function start() {
  await initializeStore();

  const app = createApp();

  app.listen(config.port, () => {
    console.log(`DineFlow API listening on http://localhost:${config.port}`);
    console.log("Structure: routes → controllers → services → models");
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
