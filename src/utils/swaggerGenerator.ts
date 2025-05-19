import * as joi from 'joi';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import joiToSwagger from 'joi-to-swagger';

interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    validation?: {
        body?: joi.ObjectSchema;
        query?: joi.ObjectSchema;
        params?: joi.ObjectSchema;
        response?: joi.ObjectSchema | joi.ArraySchema;
    };
    summary?: string;
    tags?: string[];
    responseExample?: any;
}

interface PathMethodObject {
    tags: string[];
    summary: string;
    parameters: Array<{
        name: string;
        in: string;
        required: boolean;
        schema: any;
    }>;
    requestBody?: {
        content: {
            'application/json': {
                schema: any;
            };
        };
    };
    responses: {
        [key: string]: {
            description: string;
            content?: {
                'application/json': {
                    schema?: any;
                    example?: any;
                };
            };
        };
    };
}

export class SwaggerGenerator {
    public static routes: RouteDefinition[] = [];
    private readonly baseInfo = {
        openapi: '3.0.0',
        info: {
            title: 'TEMPLATE GATEWAY API Documentation',
            version: '1.0.0',
            description: 'TBF FINANCE API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Local Development',
            },
            {
                url: 'http://192.168.10.97:3001/api',
                description: 'Server Development',
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                BadRequestError: {
                    type: 'string',
                    example: 'Invalid input parameters',
                },
                UnauthorizedError: {
                    type: 'string',
                    example: 'Authentication required',
                },
                NotFoundError: {
                    type: 'string',
                    example: 'Transfer or resource not found',
                },
                ServiceUnavailableError: {
                    type: 'string',
                    example: 'Service is temporarily down for maintenance',
                },
            },
        },
        paths: {},
        headers: {
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, api_key, Authorization',
            'Content-Type': 'application/json',
            'Content-Length': '0',
        },
    };

    public static addRoute(route: RouteDefinition) {
        SwaggerGenerator.routes.push(route);
    }

    private convertJoiToSwagger(schema?: joi.ObjectSchema | joi.ArraySchema, title?: string) {
        if (!schema) return {};
        const { swagger } = joiToSwagger(schema);
        if (title) {
            swagger.title = title;
        }
        return swagger;
    }

    private generateExampleFromSchema(schema: any): any {
        if (!schema) return {};

        if (schema.type === 'object' && schema.properties) {
            const example: any = {};
            for (const [key, prop] of Object.entries(schema.properties) as [string, any][]) {
                if (prop.type === 'object' && prop.properties) {
                    example[key] = this.generateExampleFromSchema(prop);
                } else if (prop.type === 'array' && prop.items) {
                    example[key] = [this.generateExampleFromSchema(prop.items)];
                } else {
                    if (prop.example !== undefined) {
                        example[key] = prop.example;
                    } else if (prop.enum) {
                        example[key] = prop.enum[0];
                    } else {
                        switch (prop.type) {
                            case 'string':
                                if (prop.format === 'date-time') {
                                    example[key] = new Date().toISOString();
                                } else {
                                    example[key] = 'example string';
                                }
                                break;
                            case 'number':
                            case 'integer':
                                example[key] = 123;
                                break;
                            case 'boolean':
                                example[key] = true;
                                break;
                            default:
                                example[key] = prop.nullable ? null : 'unknown';
                        }
                    }
                }
            }
            return example;
        } else if (schema.type === 'array' && schema.items) {
            return [this.generateExampleFromSchema(schema.items)];
        }

        return schema.example || {};
    }

    private generatePathsAndCollectSchemas() {
        const paths: Record<string, Record<string, PathMethodObject>> = {};
        const responseSchemas: Map<joi.ObjectSchema | joi.ArraySchema, string> = new Map();
        const schemaDefinitions: Record<string, any> = {};

        SwaggerGenerator.routes.forEach((route) => {
            const pathKey = route.path.replace(/:([^/]+)/g, '{$1}');

            if (!paths[pathKey]) {
                paths[pathKey] = {};
            }

            let responseSchema: any;
            let schemaName: string | undefined;

            if (route.validation?.response) {
                if (!responseSchemas.has(route.validation.response)) {
                    const tag = route.tags?.[0] || 'Default';
                    const summary = route.summary?.replace(/[^a-zA-Z0-9]/g, '') || 'Unnamed';
                    const method = route.method.toUpperCase();
                    schemaName = `${tag}${summary}${method}Response`;
                    responseSchemas.set(route.validation.response, schemaName);
                    schemaDefinitions[schemaName] = this.convertJoiToSwagger(
                        route.validation.response,
                        `${tag}Response`
                    );
                } else {
                    schemaName = responseSchemas.get(route.validation.response);
                }
                responseSchema = { $ref: `#/components/schemas/${schemaName}` };
            } else {
                responseSchema = { type: 'object', additionalProperties: true };
            }

            const responseExample =
                route.responseExample ||
                this.generateExampleFromSchema(responseSchema.$ref ? schemaDefinitions[schemaName!] : responseSchema);

            const pathMethod: PathMethodObject = {
                tags: route.tags || ['default'],
                summary: route.summary || '',
                parameters: [],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: responseSchema,
                                example: responseExample,
                            },
                        },
                    },
                },
            };

            if (route.validation?.params) {
                const paramsSchema = this.convertJoiToSwagger(route.validation.params);
                Object.keys(paramsSchema.properties || {}).forEach((paramName) => {
                    pathMethod.parameters.push({
                        name: paramName,
                        in: 'path',
                        required: paramsSchema.required?.includes(paramName) ?? false,
                        schema: paramsSchema.properties[paramName],
                    });
                });
            }

            if (route.validation?.query) {
                const querySchema = this.convertJoiToSwagger(route.validation.query);
                Object.keys(querySchema.properties || {}).forEach((paramName) => {
                    pathMethod.parameters.push({
                        name: paramName,
                        in: 'query',
                        required: querySchema.required?.includes(paramName) ?? false,
                        schema: querySchema.properties[paramName],
                    });
                });
            }

            if (route.validation?.body) {
                pathMethod.requestBody = {
                    content: {
                        'application/json': {
                            schema: this.convertJoiToSwagger(route.validation.body),
                        },
                    },
                };
            }

            paths[pathKey][route.method] = pathMethod;
        });

        return { paths, schemaDefinitions };
    }

    generateSpec() {
        const { paths, schemaDefinitions } = this.generatePathsAndCollectSchemas();

        const spec = {
            ...this.baseInfo,
            components: {
                ...this.baseInfo.components,
                schemas: {
                    ...this.baseInfo.components.schemas,
                    ...schemaDefinitions,
                },
            },
            paths,
        };

        return spec;
    }

    setup(app: Express) {
        const swaggerSpec = this.generateSpec();
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}
