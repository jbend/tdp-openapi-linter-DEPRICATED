import dotenv from 'dotenv';
import build from './app';

dotenv.config();
const port = process.env.PORT;

const server = build({
  logger: {
    level: 'info',
    prettyPrint: true,
  },
});

server.listen(port, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
