import { execSync } from 'child_process';
import { join } from 'path';
import { URL } from 'url';
import { PrismaClient } from '@prisma/client';

const generateDatabaseURL = (schema: string) => {
    if (!process.env.DATABASE_URL) {
        throw new Error('please provide a database url');
    }
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.append('schema', schema);
    return url.toString();
};

const schemaId = 'test';
const prismaBinary = join(__dirname, '..', '..', 'node_modules', '.bin', 'prisma');

const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;

export const prisma = new PrismaClient({
    datasources: { db: { url } },
});

const setupTestDB = () => {
    beforeAll(async () => {
        execSync(`${prismaBinary} db push`, {
            env: {
                ...process.env,
                DATABASE_URL: generateDatabaseURL(schemaId),
            },
        });
    });

    afterEach(async () => {
        await prisma.object.deleteMany();
    });

    afterAll(async () => {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS ${schemaId} CASCADE;`);
        await prisma.$disconnect();
    });
};

export default setupTestDB;
