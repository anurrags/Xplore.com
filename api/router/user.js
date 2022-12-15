import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello User, you are authenticated");
// });
// router.get("/verifyuser/:id", verifyUser, (req, res, next) => {
//   res.send("You are verified user and can delete your account");
// });
// router.get("/verifyadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("You are Admin and can delete your account");
// });

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getUsers);

export default router;
