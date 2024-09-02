import { sql } from 'kysely';
import {
  CheckInOutStatusByDayUpdate,
  NewUser,
  USER_ROLE,
} from '../models/database';
import { db } from '../repositories/kysely';

export const createUserIfNotExist = async ({
  records,
}: {
  records: CheckInOutStatusByDayUpdate[];
}) => {
  console.log('❄️ ~ records:', records);
  const empNos = [...new Set(records.map((record) => record.empNo))];
  const existingUsers = await db
    .selectFrom('User')
    .select('empNo')
    .where('empNo', 'in', empNos)
    .execute();

  const existingEmpNos = new Set(existingUsers.map((user) => user.empNo));
  console.log('❄️ ~ existingEmpNos:', existingEmpNos);
  const missingEmpNos = empNos.filter((empNo) => !existingEmpNos.has(empNo));

  if (missingEmpNos.length > 0) {
    console.log('Creating missing users:', missingEmpNos);
    const userData: NewUser[] = [];
    const departments = await db
      .selectFrom('Department')
      .select(['deptCd', 'departmentNm'])
      .execute();
    for (let e of missingEmpNos) {
      console.log('❄️ ~ e:', e);
      const department = departments[1];
      userData.push({
        empNo: e,
        empNm: `Employee ${e}`,
        empNick: `emp${e}`,
        dispNm: `Emp ${e}`,
        departmentNm: department.departmentNm,
        organizationNm: `Org ${e}`,
        photoEmp: `https://unsplash.com/photos/WLUHO9A_xik`,
        role: USER_ROLE.USER,
        deptCd: department.deptCd,
        updatedAt: new Date(),
      });
    }
    // Create missing users
    await db.insertInto('User').values(userData).execute();
  }
};
