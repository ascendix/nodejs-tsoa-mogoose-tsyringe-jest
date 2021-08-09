import { inject, injectable } from 'tsyringe';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  Route,
  Security,
  Tags,
  Response,
} from 'tsoa';
import { IRecordsService } from 'src/interfaces/services/IRecordsService';
import { AuthRequest } from '../dto/session';
import { RecordCreateRequest, RecordResponse } from '../dto/record';

@injectable()
@Route('/api/v1/record')
@Tags('RecordController')
export class RecordController extends Controller {
  constructor(
    @inject('IRecordsService') private recordsService: IRecordsService
  ) {
    super();
  }

  /**
   * Create record
   */
  @Post()
  @Security('jwt')
  post(
    @Request() request: AuthRequest,
    @Body() body: RecordCreateRequest
  ): Promise<RecordResponse> {
    return this.recordsService.create(request.user, body);
  }

  /**
   * Get records
   */
  @Get()
  @Security('jwt')
  get(@Request() request: AuthRequest): Promise<Array<RecordResponse>> {
    return this.recordsService.list(request.user);
  }

  /**
   * Update record
   * @minLength recordId 1 Record ID param is empty
   * @pattern recordId `[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}` invalid GUID value
   */
  @Put('/{recordId}')
  @Response('202', 'Updated')
  @Security('jwt', ['ADMIN'])
  async updateRecord(
    @Request() request: AuthRequest,
    recordId: string,
    @Body() record: RecordCreateRequest
  ): Promise<void> {
    const result = await this.recordsService.update(
      request.user,
      recordId,
      record
    );
    if (result.n > 0) {
      this.setStatus(result.nModified ? 202 : 204);
    }
  }
}

export default { RecordController };
