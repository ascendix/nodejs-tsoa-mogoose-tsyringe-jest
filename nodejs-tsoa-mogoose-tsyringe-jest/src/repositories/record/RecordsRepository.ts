import { model, QueryOptions, FilterQuery } from 'mongoose';
import IRecordsRepository from 'src/interfaces/repositories/IRecordRepository';
import { MongoRecord, mongoRecordSchema } from './RecordSchema';
import { Record } from 'src/models/Record';
import { DebugNamespaces, log } from '../../logger';
import { WriteOperationResult } from 'src/models/Operations';

export class RecordsRepository implements IRecordsRepository {
  constructor() {
    log(DebugNamespaces.APP, 'Created RecordsRepository instance');
  }

  schema = mongoRecordSchema;

  model = model<MongoRecord>('MongoRecord', this.schema, 'records');

  getById(recordId: string): Promise<Record | null> {
    return this.model.findOne({ _id: recordId }).exec();
  }

  create(record: Record): Promise<Record> {
    return this.model.create(record);
  }
  list(): Promise<Record[]> {
    const options: QueryOptions = {
      skip: 0,
      limit: 50,
      sort: { createdAt: -1 },
    };

    return this.model.find({}, null, options).exec();
  }

  listByUser(userId: string): Promise<Record[]> {
    const options: QueryOptions = {
      skip: 0,
      limit: 50,
      sort: { createdAt: -1 },
    };

    const query: FilterQuery<Record> = {
      createdBy: userId,
    };
    return this.model.find(query, null, options).exec();
  }

  update(
    id: string,
    record: Record
  ): Promise<WriteOperationResult> {
    return this.model
      .updateOne({ _id: id }, {$set: record })
      .exec();
  }
}
