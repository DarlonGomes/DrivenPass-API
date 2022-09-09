import { Response, Request, NextFunction} from "express";
import { stripHtml } from "string-strip-html";

export const stripRequestBody = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const output = { ...data };
  for (let param in data) {
    if (typeof output[param] === "string") {
      output[param] = stripHtml(data[param]).result.trim();
    }
  }
  res.locals.strippedRequestBody = output
  next();
};