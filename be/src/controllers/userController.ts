import type { Request, RequestHandler, Response } from 'express';
import { db } from '../repositories/kysely';

export const getUserByEmpNo: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const empNo = req.params.empNo;
  const data = await db
    .selectFrom('CheckInOutStatusByDay')
    .where('CheckInOutStatusByDay.empNo', '=', empNo)
    .orderBy('updatedAt', 'desc')
    .limit(5)
    .selectAll()
    .execute();
  console.log('❄️ ~ res:', data);
  res.status(200).json(data);
};
