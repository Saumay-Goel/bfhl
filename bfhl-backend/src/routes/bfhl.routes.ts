import { Router } from "express";
import { bfhlPost } from "../controllers/bfhl.controller";

const router = Router();

router.post("/", bfhlPost);

export default router;
