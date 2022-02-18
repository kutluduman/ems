import { Router } from "express";
import {
  add,
  get,
  getAll,
  removeSome,
  remove,
  update,
} from "../controllers/employee";

const router: Router = Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", add);
router.put("/:id", update);
router.post("/deleteSome", removeSome);
router.delete("/:id", remove);

export default router;
