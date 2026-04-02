import Intern from "../models/Intern.js";

export const CreateIntern = async (req, res) => {
  const intern = await Intern.create(req.body);
  res.status(201).json(intern);
};

export const GetInterns = async (req, res) => {
  const interns = await Intern.find().populate("userId programId mentorId");
  res.json(interns);
}; 
