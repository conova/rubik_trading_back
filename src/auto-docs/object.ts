import { SwaggerGenerator } from '../utils/swaggerGenerator';
import { getObject, create, object } from '../validations/default.validation';
import { transferBodyValidate, transferResponse } from '../validations/transfer.validation';

const getObjectRoute = {
    path: '/service',
    method: 'get' as const,
    validation: {
        response: object,
    },
    summary: 'Get object',
    tags: ['Object'],
};

const postObjectRoute = {
    path: '/service',
    method: 'post' as const,
    validation: {
        body: create.body,
        response: getObject.params,
    },
    summary: 'Get object',
    tags: ['Object'],
};

const executeTransactionRoute = {
    path: '/transfer/',
    method: 'post' as const,
    validation: {
        body: transferBodyValidate,
        response: transferResponse,
    },
    summary: 'Execute transfer',
    tags: ['Transfer'],
};

SwaggerGenerator.addRoute(getObjectRoute);
SwaggerGenerator.addRoute(postObjectRoute);

SwaggerGenerator.addRoute(executeTransactionRoute);
