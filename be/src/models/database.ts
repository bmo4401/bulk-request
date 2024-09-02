import { Insertable, Selectable, Updateable } from 'kysely';

export enum WORK_PLACE {
  Remote = 'Remote',
  Office = 'Office',
}

export enum USER_ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface UserTable {
  id: number;
  empNo: string;
  empNm: string;
  empNick: string;
  dispNm: string;
  departmentNm: string;
  organizationNm: string;
  photoEmp: string;
  role: USER_ROLE;
  createdAt: Date;
  updatedAt: Date;
  deptCd: string;
}

interface DepartmentTable {
  id: number;
  departmentNm: string;
  createdAt: Date;
  updatedAt: Date;
  deptCd: string;
}

interface CheckInOutStatusByDayTable {
  empNo: string;
  checkinDate: Date;
  checkinTime: string;
  checkinIP: string;
  checkoutDate: Date;
  checkoutTime: string;
  checkoutIP: string;
  breakHours: string;
  workHours: string;
  workplace: WORK_PLACE;
  day: string;
  holidayClassification: string;
  dateOfWorktime: Date;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types for Selectable, Insertable, and Updateable entities
export type User = Selectable<UserTable> & {
  Department?: Department; // One-to-Many relation (Department to User)
  CheckInOut?: CheckInOutStatusByDay[]; // One-to-Many relation (User to CheckInOutStatusByDay)
};

export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type Department = Selectable<DepartmentTable> & {
  Users?: User[]; // One-to-Many relation (Department to Users)
};

export type NewDepartment = Insertable<DepartmentTable>;
export type DepartmentUpdate = Updateable<DepartmentTable>;

export type CheckInOutStatusByDay = Selectable<CheckInOutStatusByDayTable> & {
  User?: User; // Many-to-One relation (CheckInOutStatusByDay to User)
};

export type NewCheckInOutStatusByDay = Insertable<CheckInOutStatusByDayTable>;
export type CheckInOutStatusByDayUpdate =
  Updateable<CheckInOutStatusByDayTable>;

export interface Database {
  User: User;
  Department: Department;
  CheckInOutStatusByDay: CheckInOutStatusByDay;
}
