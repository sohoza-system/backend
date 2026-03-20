import { Request, Response } from "express";
import * as projectService from "../services/projectService";
import { getPagination } from "../utils/pagination";

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(400).json({ message: "Slug must be unique" });
    res.status(500).json({ message: error.message });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { skip, take } = getPagination(req.query);
    const projects = await projectService.getAllProjects({ skip, take });
    res.status(200).json({ data: projects });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectById(Number(req.params.id));
    res.status(200).json(project);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectBySlug(String(req.params.slug));
    res.status(200).json(project);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await projectService.updateProject(Number(req.params.id), req.body);
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    await projectService.deleteProject(Number(req.params.id));
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
