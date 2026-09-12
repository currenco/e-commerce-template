import swaggerAutogen from 'swagger-autogen';
import { readFileSync, writeFileSync } from 'node:fs';

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'Auto-generated API documentation for the E-commerce backend.',
    version: '1.0.0',
  },
  host: `localhost:${process.env.PORT || 4000}`,
  schemes: ['http'],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication and password management',
    },
  ],
  securityDefinitions: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'token',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);

const swaggerDocument = JSON.parse(readFileSync(outputFile, 'utf8'));
delete swaggerDocument.paths['/api-docs.json'];
writeFileSync(outputFile, `${JSON.stringify(swaggerDocument, null, 2)}\n`);
