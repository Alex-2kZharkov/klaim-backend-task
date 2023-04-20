import { User } from '@prisma/client';

export const MOCK_USER: User = {
  id: '1',
  lastName: 'test',
  firstName: 'test',
  email: 'test@gmail.com',
  password: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};
