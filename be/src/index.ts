import dotenv from 'dotenv';
import express from 'express';
import { db } from './lib/kysely';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  CheckInOutStatusByDay,
  CheckInOutStatusByDayUpdate,
  Database,
} from './lib/type';
import { Kysely, sql, InsertQueryBuilder, UpdateQueryBuilder } from 'kysely';
dotenv.config();
const app = express();

const PORT = process.env.PORT ?? 3001;
app.use(express.json({ limit: '50mb' })); // Example: Set limit to 50 MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
  }),
);
app.post('/api/update-records', async (req, res) => {
  const records = req.body as CheckInOutStatusByDayUpdate[];
  const start = performance.now();
  try {
    await db
      .insertInto('CheckInOutStatusByDay')
      .values(records)
      .onConflict((oc) =>
        oc
          .columns(['empNo', 'dateOfWorktime']) // Specify the column to check for conflicts
          .doUpdateSet({
            checkinDate: (eb) => eb.ref('excluded.checkinDate'),
            checkinTime: (eb) => eb.ref('excluded.checkinTime'),
            checkinIP: (eb) => eb.ref('excluded.checkinIP'),
            checkoutDate: (eb) => eb.ref('excluded.checkoutDate'),
            checkoutTime: (eb) => eb.ref('excluded.checkoutTime'),
            checkoutIP: (eb) => eb.ref('excluded.checkoutIP'),
            breakHours: (eb) => eb.ref('excluded.breakHours'),
            workHours: (eb) => eb.ref('excluded.workHours'),
            workplace: (eb) => eb.ref('excluded.workplace'),
            day: (eb) => eb.ref('excluded.day'),
            holidayClassification: (eb) =>
              eb.ref('excluded.holidayClassification'),
            remarks: (eb) => eb.ref('excluded.remarks'),
            updatedAt: sql`now()`, // Update the timestamp to the current time
          }),
      )
      .execute(); // Ensure to execute the query
    const end = performance.now();
    const duration = end - start;
    console.log(`Received ${records.length} records ${duration}ms.`);

    res.json({
      message: `${records.length} records updated successfully`,
      executionTime: `${duration}ms`,
    });
  } catch (error) {
    console.error('Transaction failed:', error);
    res.status(500).json({ message: 'Failed to update records', error });
  }
});

app.get('/hello', async (req, res) => {
  const data = await (
    await db.selectFrom('User').selectAll().execute()
  ).map((e) => e.empNo);
  console.log('❄️ ~ res:', data);
  res.status(200).json(data);
});

app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
