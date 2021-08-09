import { v4 as uuidv4 } from 'uuid';
import { Record } from 'src/models/Record';
import { Dictionary } from 'tsyringe/dist/typings/types';
import IRecordsRepository from '../../../interfaces/repositories/IRecordRepository';

const IN_MEMORY_STORAGE: Dictionary<Record> = {};

export class TestRecordsRepository implements IRecordsRepository {
  getById(recordId: string): Promise<Record | null> {
    return Promise.resolve(IN_MEMORY_STORAGE[recordId]);
  }
  create(record: Record): Promise<Record> {
    record.id = uuidv4();
    IN_MEMORY_STORAGE[record.id] = record;
    return Promise.resolve(record);
  }
  list(): Promise<Record[]> {
    return Promise.resolve(
      Object.keys(IN_MEMORY_STORAGE).map((_) => IN_MEMORY_STORAGE[_])
    );
  }
  listByUser(userId: string): Promise<Record[]> {
    return Promise.resolve(
      Object.keys(IN_MEMORY_STORAGE)
        .map((_) => IN_MEMORY_STORAGE[_])
        .filter((_) => _.createdBy === userId)
    );
  }
  update(
    id: string,
    record: Record
  ): Promise<{ ok: number; n: number; nModified: number }> {
    IN_MEMORY_STORAGE[id] = record;
    return Promise.resolve({
      n: 1,
      nModified: 1,
      ok: 1,
    });
  }
}