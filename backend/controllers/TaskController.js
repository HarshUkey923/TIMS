import Task from "../models/Task.js";

export const CreateTask = async (req, res) => {
    const { title, description, mentorId0 } = req.body

    const tast = await Task.create({
        title,
        description,
        internId,
        mentorId: req.user.id
    });

    res.status(201).json(task);
};

export const GetTasksByMentor = async (req, res) => {
    const tasks = await Task.find({ mentorId: req.user.id })
        .populate("internId", "name email");

    res.status(201).json(tasks);
};

export const GetTasksByIntern = async (req, res) => {
    const tasks = await Task.find({ internId: req.user.id })
        .populate("mentorId", "name email");

    res.status(201).json(tasks);
};

export const UpdateTaskStatus = async (req, res) => {
    const { status } = req.body;

    const task = await Task.findById( req.params.taskId );

    if(!task){
        return res.status(404).json({message: "Taks not found."});
    }

    if(task.internId.toString !== req.user.id){
        return res.status(403).json({ message: "Unauthorized access." })
    }

    task.status = status || "Submitted";
    await task.save();

    res.json(task);
};