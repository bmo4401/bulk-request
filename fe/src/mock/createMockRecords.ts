'use server';

import { faker } from '@faker-js/faker';
import db from '../../prisma/db';

const generateRandomCheckInOutData = ({ empNo }: { empNo: string }) => {
  const checkinDate = faker.date.between({
    from: '2024-01-01',
    to: '2024-12-31',
  });
  const checkinTime = faker.date.past();
  const checkinIP = faker.internet.ip();
  const checkoutDate = faker.date.between({
    from: checkinDate,
    to: '2024-12-31',
  });
  const checkoutTime = faker.date.past();
  const checkoutIP = faker.internet.ip();
  const breakHours = `${faker.number.int({ min: 0, max: 2 })}h`; // Updated method
  const workHours = `${faker.number.int({ min: 7, max: 9 })}h`; // Updated method
  const workplace = faker.helpers.arrayElement(['Remote', 'Office']);
  const day = faker.date.weekday(); // Note: 'weekday' is still valid, but might change
  const holidayClassification = faker.helpers.arrayElement([
    'Regular',
    'Holiday',
    'Weekend',
  ]);
  const dateOfWorktime = faker.date.between({
    from: checkinDate,
    to: checkoutDate,
  });
  const remarks = faker.lorem.sentence();
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  return {
    empNo,
    checkinDate: checkinDate.toISOString(),
    checkinTime,
    checkinIP,
    checkoutDate: checkoutDate.toISOString(),
    checkoutTime,
    checkoutIP,
    breakHours,
    workHours,
    workplace,
    day,
    holidayClassification,
    dateOfWorktime: dateOfWorktime.toISOString(),
    remarks,
    createdAt,
    updatedAt,
  };
};

export const createMockRecords = async ({
  numberOfRecords,
}: {
  numberOfRecords: number;
}) => {
  const res = await db.user.findMany({ select: { empNo: true } });
  const empNos = res;
  const records = [];
  for (let i = 0; i < numberOfRecords; i++) {
    const empNo = empNos[Math.floor(Math.random() * empNos.length)].empNo;
    records.push(generateRandomCheckInOutData({ empNo }));
  }
  return records;
};
