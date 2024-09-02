import type { Request, RequestHandler, Response } from 'express';
import * as checkInOutStatusService from '../services/checkInOutStatusService';
import { CheckInOutStatusByDayUpdate } from '../models/database';
import * as userService from '../services/userService';

export const updateCheckInOutStatusRecords: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const records = req.body as CheckInOutStatusByDayUpdate[];
  console.log('❄️ ~ records:', records);
  await userService.createUserIfNotExist({ records });
  const start = performance.now();
  try {
    await checkInOutStatusService.updateCheckInOutStatusRecords({ records });
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
};
