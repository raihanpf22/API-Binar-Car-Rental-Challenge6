import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");
import { IUser } from "../interface/IUser";
import { JWT } from "../lib/const";
import userRepository from "../repositories/userRepository";

class authService {
  static async register({ name, email, password }: IUser) {
    const salt = bcrypt.genSaltSync(10);
    try {
      // Payload Validation
      if (!name) {
        return {
          status_code: 400,
          messsage: "Name can't be null.",
          data: null,
        };
      } else if (!email) {
        return {
          status_code: 400,
          message: "Email can't be null",
          data: null,
        };
      } else if (!password) {
        return {
          status_code: 400,
          message: "Password can't be null",
          data: null,
        };
      } else if (password.length < 8) {
        return {
          status_code: 400,
          message: "Password atleast 8 character",
          data: "null",
        };
      }

      const getUserByEmail = await userRepository.getByEmail({ email });

      if (getUserByEmail) {
        return {
          status_code: 400,
          message: "Email has been registered, try another email !",
          data: "null",
        };
      } else {
        const hash = bcrypt.hashSync(password, salt);
        const role = "Member";
        const createdUser = await userRepository.create({
          name,
          email,
          role: role,
          password: hash,
        });

        return {
          status_code: 201,
          message: "Success OK !",
          data: createdUser,
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

  static async registerAdmin({ name, email, password }: IUser) {
    const salt = bcrypt.genSaltSync(10);

    try {
      if (!name) {
        return {
          status_code: 400,
          message: "Name can't be null",
          data: "Null",
        };
      } else if (!email) {
        return {
          status_code: 400,
          message: "Email can't be null",
          data: "Null",
        };
      } else if (!password) {
        return {
          status_code: 400,
          message: "Pasword can't be null",
          data: "Null",
        };
      } else if (password.length < 8) {
        return {
          status_code: 400,
          message: "Password must be at least 8 character",
          data: "Null",
        };
      }

      const getUser = await userRepository.getByEmail({ email });

      if (getUser) {
        return {
          status_code: 400,
          message: "Email has registered, try another email !",
          data: "Null",
        };
      } else {
        const hash = bcrypt.hashSync(password, salt);
        const role = "Admin";

        const createAdmin = await userRepository.create({
          name,
          email,
          role: role,
          password: hash,
        });

        return {
          status_code: 201,
          message: "Success OK !",
          data: createAdmin,
        };
      }
    } catch (error: any) {
      return {
        status_code: 400,
        message: error.message,
        data:"Null"
      };
    }
  }

  static async login({ email, password }: IUser) {
    try {
      if (!email) {
        return {
          status_code: 400,
          message: "Email required.",
          data: "Null",
        };
      } else if (!password) {
        return {
          status_code: 400,
          message: "Password required",
          data: "Null",
        };
      }

      const getUser = await userRepository.getByEmail({ email });

      if (!getUser) {
        return {
          status_code: 404,
          message: "Email can't be found, are your register yet ?",
          data: "Null",
        };
      } else {
        const comparePassword = await bcrypt.compare(
          password,
          getUser.password
        );
        if (comparePassword) {
          const istoken = jwt.sign(
            {
              id: getUser.id,
              email: getUser.email,
            },
            JWT.SECRET as string,
            { expiresIn: JWT.EXPIRED }
          );

          return {
            status_code: 200,
            message: "Success OK !",
            token: istoken,
            data: getUser,
          };
        } else {
          return {
            status_code: 400,
            message: "Password Invalid !",
            data: "Null",
          };
        }
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

export default authService;
