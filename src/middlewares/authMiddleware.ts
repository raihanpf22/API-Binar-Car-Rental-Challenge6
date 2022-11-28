import { ROLES } from "../lib/const";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "../lib/const";
import userRepository from "../repositories/userRepository";

export const authenticate = async (req: any, res: any, next: any) => {
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

  try {
    const { email }: any = jwt.verify(token, JWT.SECRET as string);

    const getUser = await userRepository.getByEmail({ email });

    req.user = getUser;

    next();

    return;
  } catch (error: any) {
    return res.status(401).send({
      status_code: 401,
      message: error.message,
      data: "Null",
    });
  }
};

export const isSuperAdmin = async (req: any, res: any, next: any) => {
  const user = req.user;

  if (user.role === ROLES.SUPERADMIN) return next();

  return res.status(401).send({
    status_code: 401,
    message: "You are unauthorized, Please go back !",
    data: "Null",
  });
};

export const isNotMember = async (req: any, res: any, next: any) => {
  const user = req.user;

  if (user.role !== ROLES.MEMBER) return next();

  return res.status(401).send({
    status_code: 401,
    message: "You're role is member, can't create new data.",
    data: "Null",
  });
};

export const currentUser = async (req: any, res: any, next: any) => {
  return res.status(200).send(req.user);
};
