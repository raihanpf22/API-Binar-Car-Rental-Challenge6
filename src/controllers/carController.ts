import express, { Request, response, Response } from "express";
import carService from "../services/carService";
import { IResponse } from "../interface/IResponse";
import { request } from "http";
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
