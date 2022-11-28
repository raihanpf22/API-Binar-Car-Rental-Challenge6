import express, { Request, Response } from "express";
import authService from "../services/authService";
import { IResponse } from "../interface/IResponse";
import { IUser } from "../interface/IUser";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, password } = req.body;

  const { status_code, message, data } = await authService.register({
    name,
    email,
    password,
  });

  return res.status(201).send({
    status_code: status_code,
    message: message,
    data: data,
  });
};

export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, password } = req.body;

  const { status_code, message, data } = await authService.registerAdmin({
    name,
    email,
    password,
  });

  return res.status(201).send({
    status_code: status_code,
    message: message,
    data: data,
  });
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: IUser = req.body;

  const { status_code, message, data, token }: IResponse =
    await authService.login({
      email,
      password,
    });

  return res.status(200).send({
    status_code: status_code,
    message: message,
    token: token,
    data: data,
  });
};

