import { sql } from 'kysely';
import { CheckInOutStatusByDayUpdate } from '../models/database';
import { db } from '../repositories/kysely';

export const updateCheckInOutStatusRecords = async ({
  records,
}: {
  records: CheckInOutStatusByDayUpdate[];
}) => {
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
          updatedAt: sql`now()`,
        }),
    )
    .execute();
};
