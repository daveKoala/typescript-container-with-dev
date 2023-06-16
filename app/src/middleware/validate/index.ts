/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction, RequestHandler } from "express";
import { List, ValidateFunction } from "./types";
import Ajv, { ErrorObject, Options } from "ajv";

export class Validator {
  ajv: Ajv;
  constructor(AjvOptions?: Options) {
    this.ajv = new Ajv(AjvOptions);
    this.validate = this.validate.bind(this);
  }

  validate(options: List<ValidateFunction>): RequestHandler {
    // Self is a reference to the current Validator instance
    const self = this;
    console.log({ options });

    const validateFunctions = Object.keys(options).map(function (
      requestProperty
    ) {
      // @ts-ignore
      const schema = options[requestProperty];
      if (typeof schema === "function") {
        return { requestProperty, schemaFunction: schema };
      }
      // @ts-ignore
      const validateFunction = this.ajv.compile(schema);
      return { requestProperty, validateFunction };
    },
    self);

    return (req: Request, res: Response, next: NextFunction) => {
      let validationErrors = {};

      for (let {
        requestProperty,
        validateFunction,
        schemaFunction,
      } of validateFunctions) {
        if (!validateFunction) {
          // Get the schema from the dynamic schema function
          const schema = schemaFunction(req);
          validateFunction = this.ajv.compile(schema);
        }

        // Test if property is valid
        // @ts-ignore
        const valid = validateFunction(req[requestProperty]);
        if (!valid) {
          // @ts-ignore
          validationErrors[requestProperty] = validateFunction.errors;
        }
      }

      if (Object.keys(validationErrors).length !== 0) {
        next(new ValidationError(validationErrors));
      } else {
        next();
      }
    };
  }
}

export class ValidationError extends Error {
  public validationErrors: List<ErrorObject[]>;

  constructor(validationErrors: List<ErrorObject[]>) {
    super();
    this.name = "JsonSchemaValidationError";
    this.validationErrors = validationErrors;
  }
}
