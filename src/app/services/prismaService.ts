'use server';

import { User } from '@/app/models/user';
import prisma from '@/app/db/db';

export async function createNewUser(userId: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (user) return user;

  const email = `${userId}@anony.mous`;
  const newUser = prisma.user.create({
    data: {
      id: userId,
      email,
    }
  });
  console.log("User created", user);
  return newUser;
}