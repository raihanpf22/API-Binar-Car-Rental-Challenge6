import carRepository from "../repositories/carRepository";
import { ICar } from "../interface/ICar";

class carService {
  static async list() {
    try {
      const getAll = await carRepository.list();
      if (!getAll) {
        return {
          status_code: 404,
          message: "Error can't find data !",
          data: "Null",
        };
      } else {
        return {
          status_code: 200,
          message: "Success OK!",
          data: getAll,
        };
      }
    } catch (error: any) {
      return {
        status_code: 400,
        message: error.message,
        data: "Null",
      };
    }
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
  }: ICar) {
    try {
      const createCar = await carRepository.create({
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

      if (!createCar) {
        return {
          status_code: 400,
          message: "Can't create data.",
          data: "Null",
        };
      } else {
        return {
          status_code: 201,
          message: "Success OK!",
          data: createCar,
        };
      }
    } catch (error: any) {
      return {
        status_code: 400,
        message: error.message,
        data: "Null",
      };
    }
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
  }: ICar) {
    try {
      const updateCar = await carRepository.update({
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

      if (!updateCar) {
        return {
          status_code: 400,
          message: "Can't update data car.",
          data: "Null",
        };
      } else {
        return {
          status_code: 201,
          message: "Success OK!",
          data: updateCar,
        };
      }
    } catch (error: any) {
      return {
        status_code: 400,
        message: error.message,
        data: "Null",
      };
    }
  }

  static async getById({ id }: ICar) {
    try {
      const getCar = await carRepository.getById({ id });

      if (!getCar) {
        return {
          status_code: 404,
          message: "Error can't find data !",
          data: "Null",
        };
      } else {
        return {
          status_code: 201,
          message: "Success OK!",
          data: getCar,
        };
      }
    } catch (error: any) {
      return {
        status_code: 400,
        message: error.message,
        data: "Null",
      };
    }
  }

  static async deleted({ id }: ICar) {
    try {
      const deleteCar = await carRepository.deleted({ id });

      if (!deleteCar) {
        return {
          status_code: 400,
          message: "Error data can't be deleted",
          data: "Null",
        };
      } else {
        return {
          status_code: 200,
          message: "Success OK!",
          data: "Successfully deleted data !",
        };
      }
    } catch (error: any) {
      return {
        status_code: 400,
        message: error.message,
        data: "Null",
      };
    }
  }

  static async getCarAvailable() {
    try {
      const getCar = await carRepository.getCarAvailable();

      if (!getCar) {
        return {
          status_code: 404,
          message: "Error can't find data !",
          data: "Null",
        };
      } else {
        return {
          status_code: 200,
          message: "Success OK!",
          data: getCar,
        };
      }
    } catch (error: any) {
      return {
        status_code: 400,
        message: error.message,
        data: "Null",
      };
    }
  }
}

export default carService;
