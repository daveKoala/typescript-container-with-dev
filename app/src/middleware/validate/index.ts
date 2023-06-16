import { Request, Response, NextFunction } from "express";

enum OptionEnum {
  body,
  header,
  query,
}

export type OptionKey = keyof typeof OptionEnum;

export type ValidateOptions = {
  [key in OptionKey]?: object;
};

export default (option: ValidateOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log({ option });
    next();
  };
};
