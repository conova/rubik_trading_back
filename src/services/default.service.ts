import { Prisma } from '@prisma/client';
import exceptions from '../exception/Exceptions';
import prisma from '../utils/prisma';
import { DataType } from '../utils/types';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const create = async (data: DataType) => {
    const existingObject = await prisma.object.findFirst({
        where: {
            objName: data.name,
        },
    });

    if (existingObject) {
        throw new exceptions.NameDuplicatedException();
    }

    return await prisma.object.create({
        data: {
            objName: data.name,
            objContent: data.content,
            createdUserId: 1,
        },
    });
};

/**
 * Query for users
 * @param {Object} filter - Query filter
 * @param {Object} options - Query options
 * @param {string} [options.orderBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.take] - Maximum number of results per page (default = 10)
 * @param {number} [options.skip] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryObjects = async (filter: any = {}, options: { orderBy?: string; take?: number; skip?: number } = {}) => {
    const args: Prisma.ObjectFindManyArgs = {};

    if (filter) {
        args.where = {
            objName: filter.name,
            id: filter.id,
        };
    }

    if (options.orderBy) {
        type fields = keyof typeof Prisma.ObjectScalarFieldEnum;
        type sorts = keyof typeof Prisma.SortOrder;
        const [orderBy, orderType] = options.orderBy.split(':');
        const model = Object.keys(Prisma.ObjectScalarFieldEnum);

        args.orderBy = {};
        if (model.includes(orderBy)) {
            args.orderBy[orderBy as fields] = orderType as sorts;
        }
    }
    args.skip = options.skip ? +options.skip : undefined;
    args.take = options.take ? +options.take : undefined;

    const objects = await prisma.object.findMany(args);

    return objects;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getObjectById = async (id: number) => {
    return await prisma.object.findUnique({
        where: {
            id,
        },
    });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateObjectById = async (id: number, data: DataType) => {
    const object = await prisma.object.findUnique({
        where: {
            id,
        },
    });

    if (!object) {
        throw new exceptions.ObjectNotFoundException();
    }

    const updatedObject = await prisma.object.update({
        where: {
            id,
        },
        data: {
            objName: data.name,
            objContent: data.content,
            updatedUserId: data.updatedUserId,
        },
    });

    return updatedObject;
};

export { create, queryObjects, getObjectById, updateObjectById };
