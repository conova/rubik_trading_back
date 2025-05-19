import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import setupTestDB from '../utils/setupTestDB';
import { objectOne, objectTwo, insertObjects } from '../fixtures/default.fixture';
import { ErrorCode } from '../../src/exception/ErrorCode';

setupTestDB();

describe('Default routes', () => {
    const prefix = '/api/';
    describe('GET /api/service', () => {
        test('should return 200 and apply the default query options', async () => {
            await insertObjects([objectOne, objectTwo]);

            const res = await request(app)
                .get(prefix + 'service')
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                response: expect.any(Array),
            });

            expect(res.body.response).toHaveLength(2);

            const { createdAt, ...body } = res.body.response[0];
            expect(createdAt).toBeDefined();
            expect(body).toEqual({
                id: objectOne.id,
                objName: objectOne.objName,
                objContent: objectOne.objContent,
                createdUserId: objectOne.createdUserId,
                updatedAt: objectOne.updatedAt,
                updatedUserId: objectOne.updatedUserId,
            });
        });

        test('should correctly apply filter on name field', async () => {
            await insertObjects([objectOne, objectTwo]);

            const res = await request(app)
                .get(prefix + 'service')
                .query({ name: objectOne.objName })
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                response: expect.any(Array),
            });

            expect(res.body.response).toHaveLength(1);
            expect(res.body.response[0].id).toBe(objectOne.id);
        });

        test('should correctly sort the returned array if descending sort param is specified', async () => {
            await insertObjects([objectOne, objectTwo]);

            const res = await request(app)
                .get(prefix + 'service')
                .query({ orderBy: 'id:desc' })
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                response: expect.any(Array),
            });

            expect(res.body.response).toHaveLength(2);
            expect(res.body.response[0].id).toBe(objectTwo.id);
            expect(res.body.response[1].id).toBe(objectOne.id);
        });

        test('should limit returned array if limit param is specified', async () => {
            await insertObjects([objectOne, objectTwo]);

            const res = await request(app)
                .get(prefix + 'service')
                .query({ take: 1 })
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                response: expect.any(Array),
            });
            expect(res.body.response).toHaveLength(1);
            expect(res.body.response[0].id).toBe(objectOne.id);
        });
    });

    describe('GET /api/service/:objectId', () => {
        test('should return 200 and the object if data is ok', async () => {
            await insertObjects([objectTwo]);
            const route = 'service/' + objectTwo.id;

            const res = await request(app)
                .get(prefix + route)
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                response: expect.any(Object),
            });

            const { createdAt, ...body } = res.body.response;
            expect(createdAt).toBeDefined();
            expect(body).toEqual({
                id: objectTwo.id,
                objName: objectTwo.objName,
                objContent: objectTwo.objContent,
                createdUserId: objectTwo.createdUserId,
                updatedAt: objectTwo.updatedAt,
                updatedUserId: objectTwo.updatedUserId,
            });
        });

        test('should return 200 error if objectId is not a valid id', async () => {
            await insertObjects([objectTwo]);

            const res = await request(app)
                .get(prefix + 'service/parameter')
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 400,
                response: '"id" must be a number',
            });
        });

        test('should return 200 error if object is not found', async () => {
            await insertObjects([objectTwo]);

            const res = await request(app)
                .get(prefix + 'service/3')
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                response: null,
            });
        });
    });

    describe('POST /api/service', () => {
        test('should return 200 and create object', async () => {
            const object = {
                name: 'objName',
                content: 'objContent',
            };

            const res = await request(app)
                .post(prefix + 'service')
                .send(object)
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                response: 'Created',
            });
        });

        test('should return 200 error if data is not a valid', async () => {
            const object = {
                name: 'objName',
                content: 1,
            };

            const res = await request(app)
                .post(prefix + 'service')
                .send(object)
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 400,
                response: '"content" must be a string',
            });
        });

        test('should return 200 error if data has not allowed parameter', async () => {
            const object = {
                name: 'objName',
                content: 'objContent',
                notAllowed: true,
            };

            const res = await request(app)
                .post(prefix + 'service')
                .send(object)
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 400,
                response: '"notAllowed" is not allowed',
            });
        });

        test('should return 200 and throw NameDuplicated exception', async () => {
            await insertObjects([objectTwo]);

            const object = {
                name: objectTwo.objName,
                content: objectTwo.objContent,
            };

            const res = await request(app)
                .post(prefix + 'service')
                .send(object)
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: ErrorCode.NameDuplicatedException.code,
                response: ErrorCode.NameDuplicatedException.message,
            });
        });
    });

    describe('PUT /api/service/:objectId', () => {
        test('should return 200 and create object', async () => {
            await insertObjects([objectTwo]);
            const route = 'service/' + objectTwo.id;

            const object = {
                name: 'updated',
                content: 'updatedContent',
                updatedUserId: 1,
            };

            const res = await request(app)
                .put(prefix + route)
                .send(object)
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                response: expect.any(Object),
            });

            const { createdAt, updatedAt, ...body } = res.body.response;
            expect(createdAt).toBeDefined();
            expect(updatedAt).toBeDefined();
            expect(body).toEqual({
                id: objectTwo.id,
                objName: object.name,
                objContent: object.content,
                createdUserId: objectTwo.createdUserId,
                updatedUserId: object.updatedUserId,
            });
        });

        test('should return 200 and throw ObjectNotFound exception', async () => {
            const object = {
                name: 'updated',
                content: 'updatedContent',
                updatedUserId: 1,
            };

            const res = await request(app)
                .put(prefix + 'service/3')
                .send(object)
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: ErrorCode.ObjectNotFoundException.code,
                response: ErrorCode.ObjectNotFoundException.message,
            });
        });
    });
});
