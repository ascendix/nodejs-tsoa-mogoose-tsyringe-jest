import { Record } from 'src/models/Record';

export type RecordResponse = {
  id?: string;
  stringField: string;
  numericField: number;
  createdBy: string;
  createdAt?: number;
};

export const MapRecordResponse = (record: Record): RecordResponse => ({
  stringField: record.stringField,
  numericField: record.numericField,
  createdBy: record.createdBy,
  createdAt: record.createdAt,
  id: record.id,
});

export type RecordCreateRequest = {
  stringField: string;
  numericField: number;
};
