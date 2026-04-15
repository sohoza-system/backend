import { Request, Response } from "express";
import * as skillService from "../services/skillService";

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = await skillService.createSkill(req.body);
    res.status(201).json({ message: "Skill created successfully", skill });
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(400).json({ message: "Skill already exists" });
    res.status(500).json({ message: error.message });
  }
};

export const getAllSkills = async (req: Request, res: Response) => {
  try {
    const skills = await skillService.getAllSkills();
    res.status(200).json({ data: skills });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSkillById = async (req: Request, res: Response) => {
  try {
    const skill = await skillService.getSkillById(Number(req.params.id));
    res.status(200).json(skill);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skill = await skillService.updateSkill(Number(req.params.id), req.body);
    res.status(200).json({ message: "Skill updated successfully", skill });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    await skillService.deleteSkill(Number(req.params.id));
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
