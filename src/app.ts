import Fastify from 'fastify';
import { handlers } from './linter/core';
import { adapter as requestAdapter } from './linter/request-adapter';

export default function build(opts = {}) {
  const app = Fastify(opts);

  app.removeAllContentTypeParsers();
  app.addContentTypeParser(
    'application/json',
    { parseAs: 'string' },
    (_req, body, done) => {
      try {
        const json = JSON.parse(body as string);
        done(null, json);
      } catch (err) {
        console.error(err);
        // err.statusCode = 400;
        // done(err, undefined);
      }
    },
  );

  app.all('/', async (request, reply) => {
    const response = await handlers.home(requestAdapter(request));
    reply.code(response.statusCode);
    reply.headers(response.headers);
    reply.send(response.body);
  });

  app.all('/linter', async (request, reply) => {
    const response = await handlers.linter(requestAdapter(request));
    reply.code(response.statusCode);
    reply.headers(response.headers);
    reply.send(response.body);
  });

  return app;
}
