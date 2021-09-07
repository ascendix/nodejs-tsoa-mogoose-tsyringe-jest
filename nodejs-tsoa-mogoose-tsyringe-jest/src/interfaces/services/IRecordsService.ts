import { RecordCreateRequest, RecordResponse } from 'src/api/dto/record';
import { UserSession } from 'src/api/dto/session';
import { WriteOperationResult } from 'src/models/Operations';

export interface IRecordsService {
  create(
    userSession: UserSession,
    body: RecordCreateRequest
  ): Promise<RecordResponse>;
  list(userSession: UserSession): Promise<RecordResponse[]>;
  update(
    userSession: UserSession,
    recordId: string,
    record: RecordCreateRequest
  ): Promise<WriteOperationResult>;
}
