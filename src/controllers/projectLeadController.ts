import { Request, Response } from "express";
import * as projectLeadService from "../services/projectLeadService";
import { getPagination } from "../utils/pagination";

export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await projectLeadService.createLead(req.body);
    // Ideally, trigger an email here (e.g., sendNewExpertInquiry template)
    res.status(201).json({ message: "Inquiry submitted successfully", lead });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const { skip, take } = getPagination(req.query);
    const status = req.query.status as string | undefined;
    const leads = await projectLeadService.getAllLeads({ skip, take, status });
    res.status(200).json({ data: leads });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await projectLeadService.getLeadById(Number(req.params.id));
    res.status(200).json(lead);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { status, notes } = req.body;
    const lead = await projectLeadService.updateLeadStatus(Number(req.params.id), status, notes);
    res.status(200).json({ message: "Lead updated successfully", lead });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    await projectLeadService.deleteLead(Number(req.params.id));
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
