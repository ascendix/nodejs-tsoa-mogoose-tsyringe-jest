import { RecordCreateRequest, RecordResponse } from 'src/api/dto/record';
import { UserSession } from 'src/api/dto/session';

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
  ): Promise<{
    ok: number;
    n: number;
    nModified: number;
  }>;
}
