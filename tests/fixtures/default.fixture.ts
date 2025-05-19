import { faker } from '@faker-js/faker';
import { prisma } from '../utils/setupTestDB';

const objectOne = {
    id: 1,
    objName: faker.person.firstName(),
    objContent: faker.internet.email().toLowerCase(),
    createdAt: new Date(),
    createdUserId: 1,
    updatedAt: null,
    updatedUserId: null,
};

const objectTwo = {
    id: 2,
    objName: faker.person.lastName(),
    objContent: faker.internet.email().toLowerCase(),
    createdAt: new Date(),
    createdUserId: 2,
    updatedAt: null,
    updatedUserId: null,
};

const insertObjects = async (data: any) => {
    await prisma.object.createMany({
        data,
        skipDuplicates: true,
    });
};

export { objectOne, objectTwo, insertObjects };
