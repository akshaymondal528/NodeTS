/** Global imports */
import express, { Router } from 'express';

/** Local imports */
import * as customer from '../controllers/customer.contollers';

const router: Router = express.Router();

router.get('/customers', customer.getAllCustomers);
router.get('/customers/:id', customer.getCustomerById);

export default router;
