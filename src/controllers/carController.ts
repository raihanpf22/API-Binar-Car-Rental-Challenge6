import express, { Request, response, Response } from "express";
import carService from "../services/carService";
import { IResponse } from "../interface/IResponse";
import jwt from "jsonwebtoken";
import { JWT } from "../lib/const";
const { Cloudinary } = require("../utils/cloudinary");

const app = express();
app.use(express.json());

export const carList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Result: IResponse = await carService.list();

  return res.status(200).send({
    status_code: Result.status_code,
    message: Result.message,
    data: Result.data,
  });
};

export const carCreate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const authHeader = req.get("Authorization");
  let token:string = "";

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).send({
      status_code: 401,
      message: "You must be login first, before access this endpoint.",
      data: "Null",
    });
  }
  const { email }: any = jwt.verify(token, JWT.SECRET as string);

  const {
    no_police,
    brand,
    model,
    price_perday,
    capacity,
    status,
    transmision,
    type,
  } = req.body;

  const result = await Cloudinary.uploader.upload(req.file?.path);
  const image = result.url;

  const { status_code, message, data }: IResponse = await carService.create({
    no_police,
    brand,
    model,
    image,
    price_perday,
    capacity,
    status,
    transmision,
    type,
    createdBy:email,
    updatedBy:email,
  });

  return res.status(201).send({
    status_code: status_code,
    message: message,
    data: data,
  });
};

export const carUpdate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const authHeader = req.get("Authorization");
  let token: string = "";

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).send({
      status_code: 401,
      message: "You must be login first, before access this endpoint.",
      data: "Null",
    });
  }
  const { email }: any = jwt.verify(token, JWT.SECRET as string);

  const update_at = new Date();

  const {
    no_police,
    brand,
    model,
    image,
    price_perday,
    capacity,
    status,
    transmision,
    type,
  } = req.body;
  await carService.update({
    id,
    no_police,
    brand,
    model,
    image,
    price_perday,
    capacity,
    status,
    transmision,
    type,
    updatedBy:email,
    UpdatedAt:update_at
  });

  const { status_code, message, data }: IResponse = await carService.getById({
    id,
  });

  return res.status(201).send({
    status_code: status_code,
    message: message,
    data: data,
  });
};

export const carDelete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const { status_code, message, data }: IResponse = await carService.deleted({
    id,
  });

  return res.status(200).send({
    status_code: status_code,
    message: message,
    data: data,
  });
};

export const carAvailable = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { status_code, message, data }: IResponse =
    await carService.getCarAvailable();

  return res.status(200).send({
    status_code: status_code,
    message: message,
    data: data,
  });
};
