/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericHelpers } from '@common/helpers';
import { Injectable, NestMiddleware } from '@nestjs/common';
import requestIp from 'request-ip';

const logger = GenericHelpers.logger('IpMiddleware');

@Injectable()
export class IpMiddleware implements NestMiddleware {
  async use(
    req: Request & { userIpAddress: string },
    _res: Response,
    next: () => void,
  ) {
    try {
      req.userIpAddress = requestIp.getClientIp(req.headers as any);
    } catch (error) {
      logger.warn(error);
    }
    next();
  }
}
