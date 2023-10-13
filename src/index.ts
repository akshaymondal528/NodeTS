/** Global imports */
import express, { Express } from 'express';
import { Server, createServer } from 'http';
import cluster from 'cluster';
import os from 'os';
import mongoose from 'mongoose';

/** Local imports */
import { ENV } from './config/env.config';
import customerRoutes from './routes/customer.routes';

const app: Express = express();
const server: Server = createServer(app);
const port: number = Number(ENV.PORT);
const totalCPU: number = os.cpus().length;

/** Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** API routes */
app.use('/api/v1', customerRoutes);

if (cluster.isPrimary) {
  for (let i: number = 0; i < totalCPU; i++) {
    cluster.fork();
  }
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  (async () => {
    try {
      await mongoose.connect(ENV.MONGO_URI);
      server.listen(port, () =>
        console.log(
          `Server running | port(${port}) | Database connected | pid(${process.pid})`
        )
      );
    } catch (error) {
      console.log(`Database not connect`);
    }
  })();
}
