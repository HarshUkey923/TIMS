import Task from "../models/Task.js";
import Submission from "../models/Submission.js";
import Program from "../models/Program.js";
import Mentor from "../models/Mentor.js";
import User from "../models/User.js";

const getMentorFromUser = async (userId) => {
    let mentor = await Mentor.findOne({ userId });

    if (!mentor) {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        mentor = await Mentor.findOne({ email: user.email });
    }

    if (!mentor) throw new Error("Mentor profile not found");

    if (!mentor.userId) {
        mentor.userId = userId;
        await mentor.save();
    }

    return mentor;
};

export const GetAssignedPrograms = async (req, res) => {
    try {
        const mentor = await getMentorFromUser(req.user.id);

        const programs = await Program.find({ mentors: mentor._id })
            .populate({
                path: "interns",
                model: "Intern",
                options: { sort: { name: 1 } }
            })
            .populate({
                path: "mentors",
                model: "Mentor",
            });

        res.json(programs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const AssignTask = async (req, res) => {
    try {
        const mentor = await getMentorFromUser(req.user.id);
        const { title, description, dueDate, internId, programId } = req.body;

        const task = await Task.create({
            title,
            description,
            dueDate:   dueDate ? new Date(dueDate) : undefined,
            internId,
            programId: programId || undefined,
            mentorId:  mentor._id,
            fileUrl:   req.file ? req.file.path : null,
        });

        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const GetTasks = async (req, res) => {
    try {
        const mentor = await getMentorFromUser(req.user.id);

        const tasks = await Task.find({ mentorId: mentor._id })
            .populate("internId", "name email");

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const ReviewSubmission = async (req, res) => {
    try {
        const { feedback, rating } = req.body;

        const submission = await Submission.findByIdAndUpdate(
            req.params.submissionId,
            { feedback, rating, status: "Reviewed" },
            { new: true }
        );

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        await Task.findByIdAndUpdate(submission.taskId, { status: "Reviewed" });

        res.json(submission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
