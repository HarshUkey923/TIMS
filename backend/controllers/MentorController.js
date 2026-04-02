import Task from "../models/Task.js";
import Submission from "../models/Submission.js";
import Program from "../models/Program.js";

export const GetAssignedInterns = async (req, res) => {
    try {
        const mentorId = req.user.id;

        const programs = await Program.find({
            mentors: mentorId
        })
        .populate(
            { path: "mentors",
              model: "Program"
             }
        );
     res.json(programs);
    } catch (error) {
        console.log(error)
    }
};

export const AssignTask = async (req, res) => {
    const { title, description, internId } = req.body;

const task = await Task.create({
    title,
    description,
    internId,
    mentorId: req.user.id
});

res.status(201).json(task);
};

export const GetTasks = async (req, res) => {
    const Tasks = await Task.find({ mentorId: req.user.id})
        .populate("internId", "name email")

    res.json(Tasks);
}

export const ReviewSubmission = async (req, res) => {
    const {feedback, rating} = req.body;

    const submission = await Submission.findByIdAndUpdate(
        req.params.SubmissionId,
        { feedback, rating },
        { new: true}
    );

    await Task.findByIdAndUpdate(Submission.taskId,
        { status: "Reviewed"}
    );

    res.json(submission)
};