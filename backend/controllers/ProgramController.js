import Program from "../models/Program.js";

export const CreateProgram = async (req, res) => {
    const { title, description, duration } = req.body;

    const program = await Program.create({
        title,
        description,
        duration,
        createdBy: req.user.id
    });
    res.status(201).json(program);
};

export const GetPrograms = async (req, res) => {
    const programs = await Program.find().populate("createdBy", "name email");
    res.status(200).json(programs);
};

export const UpdateProgram = async (req, res) => {
    const { title, description, duration } = req.body;
    const program = await Program.findById(req.params.programId);

    if (!program) {
        return res.status(404).json({ message: "Program not found." });
    }
    program.name = name || program.name;
    program.description = description || program.description;
    program.duration = duration || program.duration;
    await program.save();

    res.json(program);
};