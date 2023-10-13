/** Global imports */
import mongoose, { Model, Schema } from 'mongoose';

/** Schemas */
const cusromerSchemahema: Schema<unknown> = new mongoose.Schema(
  {},
  { strict: false }
);

/** Models */
export const Customer: Model<unknown> = mongoose.model(
  'Customer',
  cusromerSchemahema
);
