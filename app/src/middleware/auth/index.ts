import express, { Request, Response, NextFunction } from 'express'

export default (option: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log({ option })
      next()
  }
};
