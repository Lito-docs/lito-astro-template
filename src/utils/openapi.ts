/**
 * OpenAPI Parser Utility
 * Parses and dereferences OpenAPI/Swagger specs for API documentation
 */
import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

export interface APIEndpoint {
    method: string;
    path: string;
    summary?: string;
    description?: string;
    operationId?: string;
    tags?: string[];
    parameters?: APIParameter[];
    requestBody?: APIRequestBody;
    responses?: Record<string, APIResponse>;
    security?: any[];
}

export interface APIParameter {
    name: string;
    in: 'query' | 'header' | 'path' | 'cookie';
    description?: string;
    required?: boolean;
    schema?: any;
    example?: any;
}

export interface APIRequestBody {
    description?: string;
    required?: boolean;
    content?: Record<string, { schema?: any; example?: any }>;
}

export interface APIResponse {
    description?: string;
    content?: Record<string, { schema?: any; example?: any }>;
}

export interface ParsedOpenAPI {
    info: {
        title: string;
        version: string;
        description?: string;
    };
    servers?: { url: string; description?: string }[];
    endpoints: APIEndpoint[];
    schemas?: Record<string, any>;
}

/**
 * Parse an OpenAPI spec file (YAML or JSON)
 */
export async function parseOpenAPIFile(filePath: string): Promise<ParsedOpenAPI> {
    const absolutePath = resolve(filePath);
    const content = await readFile(absolutePath, 'utf-8');

    // Parse YAML or JSON
    let spec: any;
    if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
        spec = yaml.load(content);
    } else {
        spec = JSON.parse(content);
    }

    // Dereference all $ref pointers
    const api = await SwaggerParser.dereference(spec);

    return transformSpec(api);
}

/**
 * Parse an OpenAPI spec from a string
 */
export async function parseOpenAPIString(content: string, isYaml = true): Promise<ParsedOpenAPI> {
    let spec: any;
    if (isYaml) {
        spec = yaml.load(content);
    } else {
        spec = JSON.parse(content);
    }

    const api = await SwaggerParser.dereference(spec);
    return transformSpec(api);
}

/**
 * Transform OpenAPI spec to our internal format
 */
function transformSpec(api: any): ParsedOpenAPI {
    const endpoints: APIEndpoint[] = [];

    // Extract all endpoints from paths
    if (api.paths) {
        for (const [path, methods] of Object.entries(api.paths)) {
            for (const [method, operation] of Object.entries(methods as any)) {
                if (['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].includes(method)) {
                    const op = operation as any;
                    endpoints.push({
                        method: method.toUpperCase(),
                        path,
                        summary: op.summary,
                        description: op.description,
                        operationId: op.operationId,
                        tags: op.tags,
                        parameters: op.parameters?.map(transformParameter),
                        requestBody: op.requestBody ? transformRequestBody(op.requestBody) : undefined,
                        responses: op.responses ? transformResponses(op.responses) : undefined,
                        security: op.security,
                    });
                }
            }
        }
    }

    return {
        info: {
            title: api.info?.title || 'API',
            version: api.info?.version || '1.0.0',
            description: api.info?.description,
        },
        servers: api.servers,
        endpoints,
        schemas: api.components?.schemas,
    };
}

function transformParameter(param: any): APIParameter {
    return {
        name: param.name,
        in: param.in,
        description: param.description,
        required: param.required,
        schema: param.schema,
        example: param.example,
    };
}

function transformRequestBody(body: any): APIRequestBody {
    return {
        description: body.description,
        required: body.required,
        content: body.content,
    };
}

function transformResponses(responses: any): Record<string, APIResponse> {
    const result: Record<string, APIResponse> = {};
    for (const [code, response] of Object.entries(responses)) {
        const res = response as any;
        result[code] = {
            description: res.description,
            content: res.content,
        };
    }
    return result;
}

/**
 * Get a specific endpoint by method and path
 */
export function getEndpoint(
    parsed: ParsedOpenAPI,
    method: string,
    path: string
): APIEndpoint | undefined {
    return parsed.endpoints.find(
        (e) => e.method === method.toUpperCase() && e.path === path
    );
}

/**
 * Get all endpoints for a specific tag
 */
export function getEndpointsByTag(
    parsed: ParsedOpenAPI,
    tag: string
): APIEndpoint[] {
    return parsed.endpoints.filter((e) => e.tags?.includes(tag));
}
