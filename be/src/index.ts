import dotenv from 'dotenv';
import express from 'express';
import { db } from './repositories/kysely';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  CheckInOutStatusByDay,
  CheckInOutStatusByDayUpdate,
  Database,
} from './models/database';
import { Kysely, sql, InsertQueryBuilder, UpdateQueryBuilder } from 'kysely';
import { router } from './routes';
dotenv.config();
const app = express();

const PORT = process.env.PORT ?? 3001;
app.use(express.json({ limit: '50mb' })); // Example: Set limit to 50 MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use('/api', router);

app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
