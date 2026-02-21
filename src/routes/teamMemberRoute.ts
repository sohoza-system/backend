import express from "express";
import * as teamMemberController from "../controllers/teamMemberController";

const router = express.Router();

router.post("/", teamMemberController.createTeamMember);
router.get("/", teamMemberController.getAllTeamMembers);
router.get("/:id", teamMemberController.getTeamMemberById);
router.put("/:id", teamMemberController.updateTeamMember);
router.delete("/:id", teamMemberController.deleteTeamMember);

export default router;
