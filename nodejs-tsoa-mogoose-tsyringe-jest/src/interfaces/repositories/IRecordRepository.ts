import { WriteOperationResult } from 'src/models/Operations';
import { Record } from 'src/models/Record';

export default interface IRecordsRepository {
  getById(recordId: string): Promise<Record | null>;
  create(record: Record): Promise<Record>;
  list(): Promise<Record[]>;
  listByUser(userId: string): Promise<Record[]>;
  update(
    id: string,
    record: Record
  ): Promise<WriteOperationResult>;
}
