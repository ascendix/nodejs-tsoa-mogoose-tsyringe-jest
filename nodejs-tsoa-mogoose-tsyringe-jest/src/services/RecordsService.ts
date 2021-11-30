import { inject, injectable } from 'tsyringe';
import { Record } from 'src/models/Record';
import { WriteOperationResult } from 'src/models/Operations';
import {
  MapRecordResponse,
  RecordCreateRequest,
  RecordResponse,
} from '../api/dto/record';
import { UserSession } from '../api/dto/session';
import IRecordsRepository from '../interfaces/repositories/IRecordRepository';
import { IRecordsService } from '../interfaces/services/IRecordsService';
import { DebugNamespaces, log } from '../logger';
import { Roles } from '../models/Roles';
import { ServerError } from '../api/errors';

@injectable()
export default class RecordsService implements IRecordsService {
  constructor(
    @inject('IRecordsRepository')
    private repository: IRecordsRepository,
  ) {
    log(DebugNamespaces.APP, 'Created Records Service instance');
  }

  async create(
    userSession: UserSession,
    body: RecordCreateRequest,
  ): Promise<RecordResponse> {
    const record = await this.repository.create({
      ...body,
      createdBy: userSession.id,
      updatedBy: userSession.id,
      serviceField: 'some service value',
    });
    return MapRecordResponse(record);
  }

  async list(userSession: UserSession): Promise<RecordResponse[]> {
    let records: Record[] = [];
    if (userSession.roles.indexOf(Roles.ADMIN) >= 0) {
      records = await this.repository.list();
    } else {
      records = await this.repository.listByUser(userSession.id);
    }

    return records.map((_) => MapRecordResponse(_));
  }

  async update(
    userSession: UserSession,
    recordId: string,
    record: RecordCreateRequest,
  ): Promise<WriteOperationResult> {
    const existing = await this.repository.getById(recordId);
    if (!existing) {
      throw new ServerError('Record not found', 404);
    }

    existing.numericField = record.numericField;
    existing.stringField = record.stringField;
    existing.updatedBy = userSession.id;
    existing.updatedAt = Date.now();
    return this.repository.update(recordId, existing);
  }
}
