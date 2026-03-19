import express from "express";
import * as skillController from "../controllers/skillController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { skillSchema } from "../validations/schemas";

const router = express.Router();

router.post("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validate(skillSchema), skillController.createSkill);
router.get("/", skillController.getAllSkills);
router.get("/:id", skillController.getSkillById);
router.put("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validate(skillSchema), skillController.updateSkill);
router.delete("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), skillController.deleteSkill);

export default router;
