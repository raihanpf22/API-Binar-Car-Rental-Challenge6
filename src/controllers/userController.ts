import express, { Request, Response } from "express";
import userService from "../services/userService";
import { IResponse } from "../interface/IResponse";

const app = express();
app.use(express.json());

export const userList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Result: IResponse = await userService.list();

  return res.status(Result.status_code).send({
    status_code: Result.status_code,
    message: Result.message,
    data: Result.data,
  });
};


