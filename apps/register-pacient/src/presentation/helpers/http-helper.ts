// Helpers com as respostas mais eeperadas pelo sistema
import type { HttpResponse } from "../protocol-interfaces/http";
import { ServerError } from "../errors/server-errors";

// Responses 2XX
export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const noContent = (): HttpResponse => {
  return {
    statusCode: 204,
    body: null,
  };
};

// Responses 4XX
export const badRequest = (error: Error | Error[]): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const forbidden = (error: Error): HttpResponse => {
  return {
    statusCode: 403,
    body: error,
  };
};

export const notFound = (error: Error): HttpResponse => {
  return {
    statusCode: 404,
    body: error,
  };
};

export const conflict = (error: Error): HttpResponse => {
  return {
    statusCode: 409,
    body: error,
  };
};

// Responses 5XX
export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: error,
  };
};
