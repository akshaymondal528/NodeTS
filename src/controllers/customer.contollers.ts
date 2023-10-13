/** Global imports */
import { Request, Response } from 'express';

/** Local imports */
import {
  successResponse,
  serverErrorResponse,
  clientErrorResponse,
} from '../utils/response.utils';
import { Customer } from '../models/customer.models';
import mongoose from 'mongoose';

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
    const customers: object = await Customer.find(
      { isDeleted: false },
      { name: 1, contact_no: 1 }
    );
    return successResponse(res, 'Customers', customers);
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
