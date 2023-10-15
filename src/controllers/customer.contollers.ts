/** Global imports */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { RedisClientType } from 'redis';

/** Local imports */
import {
  successResponse,
  serverErrorResponse,
  clientErrorResponse,
} from '../utils/response.utils';
import { Customer } from '../models/customer.models';
import { Redis } from '../config/redis.config';

/**
 * @function getAllCustomers
 * @description function to get all customers
 * @method get
 * @author Akshay
 */
export const getAllCustomers = async (
  req: Request,
  res: Response
): Promise<object> => {
  try {
    const client: RedisClientType = await Redis();
    const getRD: string | null = client
      ? await client.get('/api/v1/customers')
      : null;
    let result: Array<object> = [];
    if (!getRD) {
      const customers: Array<object> = await Customer.find(
        { isDeleted: false },
        { name: 1, contact_no: 1 }
      );
      await client.set('/api/v1/customers', JSON.stringify(customers), {
        EX: 60 * 60, // 1 hour
      });
      result = customers;
    } else {
      result = JSON.parse(getRD);
    }
    return successResponse(res, 'Customers', result);
  } catch (error) {
    return serverErrorResponse(res);
  }
};

/**
 * @function getCustomerById
 * @description function to customer by id
 * @method get
 * @author Akshay
 */
export const getCustomerById = async (
  req: Request,
  res: Response
): Promise<object> => {
  try {
    const id: string = req.params.id;
    if (!mongoose.isValidObjectId(id))
      return clientErrorResponse(res, 'Invalid id');
    const customer: object | null = await Customer.findOne(
      { _id: id, isDeleted: false },
      { name: 1, contact_no: 1 }
    );
    if (!customer) return clientErrorResponse(res, 'Invalid id');
    return successResponse(res, 'Customers', customer);
  } catch (error) {
    return serverErrorResponse(res);
  }
};
