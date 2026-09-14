import express from 'express';
import './config/env.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createTables } from './utils/createTables.js';
import { errorMiddleware } from './middlewares/errorMiddlewares.js';
import swaggerUi from 'swagger-ui-express';

// import routers
import authRouter from './routes/auth.routes.js';
import productRouter from './routes/product.route.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const swaggerDocument = JSON.parse(
  readFileSync(resolve(__dirname, '../swagger-output.json'), 'utf8')
);

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api-docs.json', (_req, res) => {
  res.status(200).json(swaggerDocument);
});
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    tempFileDir: './uploads',
    useTempFiles: true,
  })
);

// All routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);

createTables();

app.use(errorMiddleware);

export default app;
