// Import the express in typescript file
import express from "express";
import connection from "./src/config/connection";
import { register, login, registerAdmin } from "./src/controllers/authController";
import { carList, carCreate, carUpdate, carDelete, carAvailable } from './src/controllers/carController';
import { userList } from "./src/controllers/userController";
import { authenticate, isSuperAdmin, isNotMember, currentUser } from './src/middlewares/authMiddleware';
import { multerUpload } from "./src/utils/multer";

// Initialize the express engine
const app: express.Application = express();
app.use(express.json());

require("dotenv").config();

// Take a port 3000 for running server.
const port = process.env.PORT;

// Get All user
app.get("/users", authenticate, userList);

// Register user member role
app.post("/register", register);

// Register user Admin role
app.post("/admin/register", authenticate, isSuperAdmin, registerAdmin)

// Login
app.post("/login", login);

// Get All car
app.get("/cars", carList)

// Create data car
app.post("/cars", authenticate, isNotMember, multerUpload.single('image'), carCreate)

// Update data car
app.put("/cars/:id", authenticate, isNotMember, carUpdate)

// Delete data car
app.delete("/cars/:id", authenticate, isNotMember, carDelete)

// Current User
app.get("/current_user", authenticate, currentUser)

// Get By Status Available Car
app.get("/car_available", authenticate, carAvailable)

// Server setup
const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

void start();
