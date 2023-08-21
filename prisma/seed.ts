const { db } = require('@/lib/db');
import { TASK_STATUS } from '@prisma/client';

const randomTaskStatus = () => {
  const status = [
    TASK_STATUS.COMPLETED,
    TASK_STATUS.IN_PROGRESS,
    TASK_STATUS.NOT_STARTED,
  ];
  return status[Math.floor(Math.random() * status.length)];
};

const main = async () => {
  const user = await db.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      email: 'user@email.com',
      firstName: 'User',
      lastName: 'Person',
      password: 'password',
      projects: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          due: new Date(2022, 11, 25),
        })),
      },
    },
    include: {
      projects: true,
    },
  });

  const tasks = await Promise.all(
    user.projects.map((p) =>
      db.task.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Task ${i}`,
            creatorId: user.id,
            projectId: p.id,
            description: `Everything that describes Task ${i}`,
            status: randomTaskStatus(),
          };
        }),
      })
    )
  );

  console.log({ user, tasks });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
