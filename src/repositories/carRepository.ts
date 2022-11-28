import { Car } from "../../db/models/Car";
import { ICar } from "../interface/ICar";

class carRepository {
  static async list() {
    const list = await Car.findAll();

    return list;
  }

  static async create({
    no_police,
    brand,
    model,
    image,
    price_perday,
    capacity,
    status,
    transmision,
    type,
    createdBy,
    updatedBy,
  }: ICar) {
    const create = await Car.create({
      no_police,
      brand,
      model,
      image,
      price_perday,
      capacity,
      status,
      transmision,
      type,
      createdBy,
      updatedBy,
    });

    return create;
  }

  static async update({
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
    createdBy,
    updatedBy,
  }: ICar) {
    const updateCar = await Car.update(
      {
        no_police,
        brand,
        model,
        image,
        price_perday,
        capacity,
        status,
        transmision,
        type,
        createdBy,
        updatedBy,
      },
      { where: { id } }
    );

    return updateCar;
  }

  static async getById({ id }: ICar) {
    const getCar = await Car.findByPk(id);

    return getCar;
  }

  static async deleted({ id }: ICar) {
    const deleteCar = await Car.destroy({ where: { id } });

    return deleteCar;
  }

  static async getCarAvailable() {
    const status = true;
    const getCar = await Car.findAndCountAll({ where: { status: status } });

    return getCar;
  }
}

export default carRepository;
