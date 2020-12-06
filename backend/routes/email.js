import { Router } from "express";
import { verify, confirm } from "../controllers/email";

const router = Router({ mergeParams: true });

router.post("/verify", verify);
router.post("/confirm", confirm);

export default router;
