import Fastify from "fastify";
import { handlers } from './linter/core';
import { adapter as requestAdapter } from "./linter/request-adapter";


const fastify = Fastify({
  logger: true,
});

fastify.removeAllContentTypeParsers();
fastify.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (_req, body, done) => {
    try{
      const json = JSON.parse(body as string);
      done(null, json);
    } catch(err) {
      console.error(err);
      // err.statusCode = 400;
      // done(err, undefined);
    }
  }
);

// const handler = () => {
//   return {
//     statusCode: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/home+json",
//     },
//     body: JSON.stringify({
//       title: "Still Open API Linter"
//     })
//   }
// }

fastify.all("/", async(request, reply) => {
  const response = await handlers.home(requestAdapter(request));
  reply.code(response.statusCode);
  reply.headers(response.headers);
  reply.send(response.body);
})

fastify.all("/linter", async (request, reply) => {
  const response = await handlers.linter(requestAdapter(request));
  reply.code(response.statusCode);
  reply.headers(response.headers);
  reply.send(response.body);
});

fastify.listen(process.env.PORT || 3000, "0.0.0.0");
