import express from "express";
import * as projectController from "../controllers/projectController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { projectSchema } from "../validations/schemas";

const router = express.Router();

router.post("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validate(projectSchema), projectController.createProject);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.get("/slug/:slug", projectController.getProjectBySlug);
router.put("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validate(projectSchema), projectController.updateProject);
router.delete("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectController.deleteProject);

export default router;
