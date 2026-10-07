import {
  DateError,
  FormatDateError,
  NoFieldExistsDateError,
} from "../errors/date-errors";
import { type Either, success, failure } from "../../shared/either";

export class Dates {
  private readonly _date: Date;
  private _stringDate: string;

  constructor(date: Date) {
    this._date = date;
    this._stringDate = date.toDateString();
  }

  public static create(date: string | Date): Either<DateError, Date> {
    if (date instanceof Date) {
      if (Number.isNaN(date.getTime())) {
        return failure(new DateError(date.toString()));
      }
      return success(date);
    }

    if (!Dates.noFieldExistsDataError(date)) {
      return failure(new NoFieldExistsDateError(date));
    }
    if (!Dates.formatDataError(date)) {
      return failure(new FormatDateError(date));
    }

    const [dia, mes, ano] = date.split("/").map(Number);

    return success(new Date(ano as number, (mes as number) - 1, dia as number));
  }

  public static noFieldExistsDataError(data: string): boolean {
    if (data.length === 0) {
      return false;
    }
    return true;
  }

  // Validação de formato de Data no padrão brasileiro
  public static formatDataError(data: string): boolean {
    const regExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regExp.test(data)) {
      return false;
    }
    return true;
  }

  public get value(): Date {
    return this._date;
  }
}
