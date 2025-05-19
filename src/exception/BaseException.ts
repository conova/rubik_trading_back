import { BaseExceptionInterface } from './BaseException.interface';
import { ErrorCode, CustomExceptionInterface } from '../exception/ErrorCode';

class BaseException extends Error implements BaseExceptionInterface {
    static TEXT_DEFAULT_ERROR = 'Unexpected error';
    static CODE_DEFAULT_ERROR = 1000;

    errorCode = BaseException.CODE_DEFAULT_ERROR;
    exception = this.constructor.name;
    isOperational = false;

    constructor(message?: any, errorCode?: number, exception = '', isOperational = true) {
        super(message);

        type ObjectKey = keyof typeof ErrorCode;
        if (exception !== '') this.exception = exception;

        const actualException = ErrorCode[this.exception as ObjectKey] as CustomExceptionInterface;

        this.isOperational = isOperational;
        this.errorCode = errorCode || (actualException ? actualException.code : BaseException.CODE_DEFAULT_ERROR);
        Error.captureStackTrace(this, this.constructor);
    }
}

export default BaseException;
