import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

if (process.env.NODE_ENV != 'test') {
    dotenv.config({ path: path.join(__dirname, '../.env') });
} else {
    dotenv.config({ path: path.join(__dirname, '../.env.test') });
}

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('prod', 'dev', 'test').required(),
        PORT: Joi.number().default(3000),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    CORE_API_BASE_URL: envVars.CORE_API_BASE_URL,
    CORE_API_PATH: envVars.CORE_API_PATH,
    CORE_API_KEY: envVars.CORE_API_KEY,
    env: envVars.NODE_ENV,
    port: envVars.PORT,
};
