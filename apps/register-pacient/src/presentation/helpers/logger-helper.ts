import { pino } from "pino";

export interface ILogger {
  info: (data: any) => void;
  error: (data: any) => void;
}

export class Logger implements ILogger {
  private readonly _pino = pino();
  info(data: any) {
    this._pino.info(data);
  }
  error(data: any) {
    this._pino.error(data);
  }
}
