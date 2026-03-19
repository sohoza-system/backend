import express from "express";
import * as projectLeadController from "../controllers/projectLeadController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { projectLeadSchema } from "../validations/schemas";

const router = express.Router();

router.post("/", validate(projectLeadSchema), projectLeadController.createLead);
router.get("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectLeadController.getAllLeads);
router.get("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectLeadController.getLeadById);
router.patch("/:id/status", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectLeadController.updateLeadStatus);
router.delete("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectLeadController.deleteLead);

export default router;
