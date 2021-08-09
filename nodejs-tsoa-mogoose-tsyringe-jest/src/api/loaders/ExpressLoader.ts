import express, {
  Application,
  Response as ExResponse,
  Request as ExRequest,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { Config } from '../../config';
import IExpressLoader from '../../interfaces/loaders/IExpressLoader';
import { RegisterRoutes } from '../../../build/routes';
import { errorHandlingMiddleware } from '../middlewares/error';

export class ExpressLoader implements IExpressLoader {
  LoadApp(app: Application) {
    app.use(
      express.json({
        type: '*/json',
        limit: '10mb',
      }),
    );

    app.get(`${Config.virtualPath}/health`, (_req, res) => {
      res.status(200).send('healthy').end();
    });

    app.head(`${Config.virtualPath}/health`, (_req, res) => {
      res.status(200).send('healthy').end();
    });

    RegisterRoutes(app);
    app.use(errorHandlingMiddleware);

    app.use(
      `${Config.virtualPath}/swagger`,
      swaggerUi.serve,
      async (_req: ExRequest, res: ExResponse) => {
        return res.send(
          swaggerUi.generateHTML(await import('../../../build/swagger.json')),
        );
      },
    );
  }
}
