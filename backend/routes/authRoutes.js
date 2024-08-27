import { Router } from "express";
import { adminLogin } from "../controller/controller.js";

const router = Router();

router.post("/login", adminLogin);

export default router;
