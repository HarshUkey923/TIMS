import Submission from "../models/Submission.js"
import Task from "../models/Task.js"

export const SubmitTask = async (req, res) => {
    const task = await Task.findById(req.params.taskId);

    if(!task){
        return res.status(404).json({message: "Task not found."});
    }

    if(task.internId.toString() !== req.user.id){
        return res.stauts(403).json({message: "Unauthorized"});
    }

    const submission = await Submission.create({
        taskId: task._id,
        internId: req.user.id,
        fileUrl: req.file?.path
    });

    task.status = "Submitted";
    await task.save();

    res.status(201).json(submission);
};

export const GetSubmissionForMentor = async (req, res) => {
    const submissions = await Submission.find()
        .populate("internId", "name email")
        .populate({
            path: "taskId",
            match: {mentorId: req.user.id}
        });

    res.json(submissions.filter(s => s.taskId !== null));
}
