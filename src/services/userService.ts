import userRepository from "../repositories/userRepository";
import { IUser } from '../interface/IUser';

class userService {
  static async list() {
    try {
      const getAll = await userRepository.list();
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
        data: "null",
      };
    }
  }

  static async create({ name, email, role, password }: IUser) {
    try {
      const createUser = await userRepository.create({
        name,
        email,
        role,
        password,
      });

      if (!createUser) {
        return {
          status_code: 400,
          message: "Can't Create User !",
          data: "Null",
        };
      } else {
        return {
          status_code: 201,
          message: "Success OK!",
          data: createUser,
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

export default userService;
