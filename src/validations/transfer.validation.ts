import Joi from 'joi';

const transactionSchema = Joi.object({
    amount: Joi.number().required(),
    accountNumber: Joi.string().required(),
    bankCode: Joi.string().required(),
    accountName: Joi.string().required(),
    additionalInfo: Joi.string(),
});

const transferBodyValidate = Joi.object({
    transactions: Joi.array().items(transactionSchema).required(),
});

const getTransferValidate = Joi.object().keys({
    transactionNumber: Joi.string(),
});

const transferResponse = Joi.array().items(
    Joi.object({
        id: Joi.number().description('The ID of the user to fetch.'),
        amount: Joi.string().description('Transfer amount'),
        accountNumber: Joi.string(),
        bankCode: Joi.string(),
        accountName: Joi.string(),
        additionalInfo: Joi.string(),
        requestId: Joi.string(),
        transactionNumber: Joi.string().description('Unique identifier for the transfer'),
        createdAt: Joi.date().iso(),
        effectiveAt: Joi.date().iso().allow(null),
        status: Joi.string().valid('FAILED', 'SUCCESS'),
    })
);

export { transferBodyValidate, getTransferValidate, transferResponse };
