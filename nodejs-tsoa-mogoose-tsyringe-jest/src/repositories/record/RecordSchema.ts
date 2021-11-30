import { LeanDocument, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Record } from 'src/models/Record';

export type MongoRecord = LeanDocument<Record>;

export const mongoRecordSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    stringField: {
      type: String,
      index: true,
    },
    numericField: Number,
    createdBy: String,
    createdAt: {
      type: Number,
      index: true,
    },
    updatedBy: String,
    updatedAt: {
      type: Number,
      index: true,
    },
    serviceField: String,
  },
  { timestamps: { currentTime: () => Math.round(Date.now()) } },
);
