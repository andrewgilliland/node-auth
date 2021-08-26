import "./env.js";
import { fastify } from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./db.js";

// ESM specific features
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();
const port = process.env.PORT || 3000;

async function startApp() {
  try {
    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });

    // app.get("/", {}, (request, reply) => {
    //   reply.send({
    //     data: "hello world",
    //   });
    // });

    await app.listen(port);
    console.log(`🚀 Server Listening at port: ${port}`);
  } catch (e) {
    console.error(e);
  }
}

connectDb().then(() => {
  startApp();
});

