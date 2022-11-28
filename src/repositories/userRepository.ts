import { User } from "../../db/models/User";
import { IUser } from "../interface/IUser";

class userRepository {
  static async list() {
    const list = await User.findAll();

    return list;
  }

  static async create({ name, email, role, password }: IUser) {
    const create = await User.create({
      name,
      email,
      role,
      password,
    });

    return create;
  }

  static async getByEmail({ email }: any) {
    const getUser = await User.findOne({ where: { email } });

    return getUser;
  }
}

export default userRepository;
