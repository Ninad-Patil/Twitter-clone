import express from "express";
import {
  Login,
  Register,
  Logout,
  bookmark,
  getMyProfile,
  getOtherUsers,
  follow,
  unfollow,
} from "../controller/userController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.put("/bookmark/:id", isAuthenticated, bookmark);
router.get("/profile/:id", isAuthenticated, getMyProfile);
router.get("/otherUsers/:id", isAuthenticated, getOtherUsers);
router.post("/follow/:id", isAuthenticated, follow);
router.post("/unfollow/:id", isAuthenticated, unfollow);
export default router;
