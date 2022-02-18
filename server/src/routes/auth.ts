import { Router } from "express";
import { employee, login, register } from "../controllers/auth";

import auth from "../middleware/auth";

const router: Router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/employee", auth, employee);

export default router;
