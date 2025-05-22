import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { defaultService } from '../services';
import pick from '../utils/pick';
import { fetch, coreFetch } from '../services/core.client.service'
import { CoreRequestCode } from '../utils/apiCode';

const fetchDataFromCore = catchAsync(async (req: Request, res: Response) => {
    const data = await fetch(CoreRequestCode.winAcnt, req.data);
    const data1 = await coreFetch.winAcnt(req.data);
    res.send({
        code: 0,
        response: [
            data,
            data1
        ]
    });
});

const getObject = catchAsync(async (req: Request, res: Response) => {
    const object = await defaultService.getObjectById(+req.params.id);
    res.send({
        code: 0,
        response: object,
    });
});

const getObjects = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['name', 'id']);
    const options = pick(req.query, ['orderBy', 'take', 'skip']);

    const objects = await defaultService.queryObjects(filter, options);
    res.send({
        code: 0,
        response: objects,
    });
});

const create = catchAsync(async (req: Request, res: Response) => {
    await defaultService.create(req.body);
    res.send({
        code: 0,
        response: 'Created',
    });
});

const update = catchAsync(async (req: Request, res: Response) => {
    const updObject = await defaultService.updateObjectById(+req.params.id, req.body);
    res.send({
        code: 0,
        response: updObject,
    });
});

export { getObject, getObjects, create, update };
