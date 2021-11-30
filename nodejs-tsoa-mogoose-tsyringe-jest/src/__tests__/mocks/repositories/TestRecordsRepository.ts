import { v4 as uuidv4 } from 'uuid';
import { Record } from 'src/models/Record';
import { Dictionary } from 'tsyringe/dist/typings/types';
import { WriteOperationResult } from 'src/models/Operations';
import IRecordsRepository from '../../../interfaces/repositories/IRecordRepository';

const IN_MEMORY_STORAGE: Dictionary<Record> = {};

export default class TestRecordsRepository implements IRecordsRepository {
  getById(recordId: string): Promise<Record | null> {
    return Promise.resolve(IN_MEMORY_STORAGE[recordId]);
  }

  create(record: Record): Promise<Record> {
    const id = uuidv4();
    IN_MEMORY_STORAGE[id] = record;
    return Promise.resolve({
      id,
      ...record,
    });
  }

  list(): Promise<Record[]> {
    const result = Object.keys(IN_MEMORY_STORAGE).map((_) => IN_MEMORY_STORAGE[_]);
    return Promise.resolve(result);
  }

  listByUser(userId: string): Promise<Record[]> {
    const result = Object.keys(IN_MEMORY_STORAGE)
      .map((_) => IN_MEMORY_STORAGE[_])
      .filter((_) => _.createdBy === userId);
    return Promise.resolve(result);
  }

  update(id: string, record: Record): Promise<WriteOperationResult> {
    IN_MEMORY_STORAGE[id] = record;
    return Promise.resolve({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedCount: 1,
    });
  }
}
