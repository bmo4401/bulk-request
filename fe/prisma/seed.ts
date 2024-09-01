import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create 20 Departments
  const departmentData = [];
  for (let i = 1; i <= 100; i++) {
    departmentData.push({
      departmentNm: `Department ${i}`,
      deptCd: `DEPT${i.toString().padStart(3, '0')}`,
    });
  }

  await prisma.department.createMany({
    data: departmentData,
  });

  console.log('20 departments created.');

  // Fetch all departments to use their deptCd for user creation
  const departments = await prisma.department.findMany();

  // Create 50 Users
  const userData: Prisma.UserCreateInput[] = [];
  for (let i = 1; i <= 1000; i++) {
    const department = departments[i % departments.length]; // Distribute users among departments
    userData.push({
      empNo: `EMP${i.toString().padStart(3, '0')}`,
      empNm: `Employee ${i}`,
      empNick: `emp${i}`,
      dispNm: `Emp ${i}`,
      departmentNm: department.departmentNm,
      organizationNm: `Org ${i}`,
      photoEmp: `https://unsplash.com/photos/WLUHO9A_xik`,
      role: i % 3 === 0 ? 'SUPER_ADMIN' : i % 2 === 0 ? 'ADMIN' : 'USER', // Assign roles in a pattern
      // @ts-ignore
      deptCd: department.deptCd,
    });
  }

  await prisma.user.createMany({
    // @ts-ignore
    data: userData,
  });

  console.log('50 users created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
