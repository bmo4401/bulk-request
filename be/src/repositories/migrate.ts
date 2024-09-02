import { Kysely, sql } from 'kysely';
import { Database } from '../models/database';
import { db } from './kysely';

export async function createDatabaseSchema(
  db: Kysely<Database>,
): Promise<void> {
  // Drop the User table if it exists
  await db.schema.dropTable('user').ifExists().execute();
  await db.schema.dropTable('checkInOutStatusByDay').ifExists().execute();
  await db.schema.dropTable('department').ifExists().execute();
  // Create Department table
  /*   await db.schema
    .createTable('Department')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('departmentNm', 'text', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('updatedAt', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('deptCd', 'text', (col) => col.unique().notNull())
    .execute();

  // Create User table with a foreign key reference to Department
  await db.schema
    .createTable('User')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('empNo', 'text', (col) => col.unique().notNull())
    .addColumn('empNm', 'text', (col) => col.notNull())
    .addColumn('empNick', 'text', (col) => col.notNull())
    .addColumn('dispNm', 'text', (col) => col.notNull())
    .addColumn('departmentNm', 'text', (col) => col.notNull())
    .addColumn('organizationNm', 'text', (col) => col.notNull())
    .addColumn('photoEmp', 'text', (col) => col.notNull())
    .addColumn('role', 'text', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('updatedAt', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('deptCd', 'text', (col) =>
      col.references('Department.deptCd').onDelete('cascade').notNull(),
    )
    .execute();

  // Create CheckInOutStatusByDay table with a foreign key reference to User
  await db.schema
    .createTable('CheckInOutStatusByDay')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('empNo', 'text', (col) =>
      col.references('User.empNo').onDelete('cascade').notNull(),
    )
    .addColumn('checkinDate', 'timestamp', (col) => col.notNull())
    .addColumn('checkinTime', 'text', (col) => col.notNull())
    .addColumn('checkinIP', 'text', (col) => col.notNull())
    .addColumn('checkoutDate', 'timestamp', (col) => col.notNull())
    .addColumn('checkoutTime', 'text', (col) => col.notNull())
    .addColumn('checkoutIP', 'text', (col) => col.notNull())
    .addColumn('breakHours', 'text', (col) => col.notNull())
    .addColumn('workHours', 'text', (col) => col.notNull())
    .addColumn('workplace', 'text', (col) => col.notNull())
    .addColumn('day', 'text', (col) => col.notNull())
    .addColumn('holidayClassification', 'text', (col) => col.notNull())
    .addColumn('dateOfWorktime', 'timestamp', (col) => col.notNull())
    .addColumn('remarks', 'text')
    .addColumn('createdAt', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute(); */
}

createDatabaseSchema(db);
