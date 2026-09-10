import './src/config/env.js';
import app from './src/app.js';
import logger from './src/config/logger.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`);
});
