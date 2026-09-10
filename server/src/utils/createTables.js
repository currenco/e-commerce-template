import logger from '../config/logger.js';
import { createOrderTable } from '../models/createOrder.table.js';
import { createOrderItemTable } from '../models/orderItems.table.js';
import { createPaymentsTable } from '../models/payments.table.js';
import { createProductTable } from '../models/product.table.js';
import { createProductReviewTable } from '../models/productReviews.table.js';
import { createShippingInfoTable } from '../models/shippinginfo.table.js';
import { createUserTable } from '../models/user.table.js';

export const createTables = async () => {
  try {
    await createUserTable();
    await createProductTable();
    await createProductReviewTable();
    await createOrderTable();
    await createOrderItemTable();
    await createShippingInfoTable();
    await createPaymentsTable();

    logger.info('All Tables Created Successfully.');
  } catch (error) {
    logger.error('Error creating tables!', error);
  }
};
