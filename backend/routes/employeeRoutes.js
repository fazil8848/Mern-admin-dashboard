import { Router } from "express";
import { upload } from "../utils/muler.js";
import {
  createEmployee,
  editEmployee,
  getEmployees,
} from "../controller/controller.js";

const router = Router();

router.get("/getEmployees", getEmployees);

router.post("/createEmployee", upload.single("image"), createEmployee);

router.put("/editEmployee/:id", upload.single("image"), editEmployee);

export default router;
