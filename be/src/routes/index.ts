import express, { type Router } from 'express';
import * as checkInOutStatusController from '../controllers/checkInOutStatusController';
import * as userController from '../controllers/userController';
export const router: Router = express.Router();

router.post(
  '/update-records',
  checkInOutStatusController.updateCheckInOutStatusRecords,
);

router.get('/:empNo', userController.getUserByEmpNo);
