export class RequestValidator {
  private StatusCode;

  constructor(private tools: Tools) {
    this.StatusCode = tools.enums.StatusCode;
  }

  validateBody = (schemaName: string) => {
    return (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      const results = this.tools.validator(req.body, schemaName);
      if (!results.valid) return this.tools.res.send(res, this.tools.enums.StatusCode.BAD_REQUEST, results);

      return next();
    }
  }

  validateParams = (schemaName: string) => {
    return (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      const results = this.tools.validator(req.params, `${schemaName}Param`);
      if (!results.valid) return this.tools.res.send(res, this.tools.enums.StatusCode.BAD_REQUEST, results);

      return next();
    }
  }
}