import express from 'express';
import validate from '../../middlewares/validate';
import * as defaultController from '../../controllers/default.controller';
import * as defaultValidator from '../../validations/default.validation';

const router = express.Router();

router
    .route('/service')
    .get(validate(defaultValidator.getObjects), defaultController.getObjects)
    .post(validate(defaultValidator.create), defaultController.create);

router
    .route('/service/:id')
    .get(validate(defaultValidator.getObject), defaultController.getObject)
    .put(validate(defaultValidator.update), defaultController.update);

export default router;
