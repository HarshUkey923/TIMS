import Task from "../models/Task.js";
import Mentor from "../models/Mentor.js";
import Intern from "../models/Intern.js";
import User from "../models/User.js";

// ─── Helpers: resolve Mentor/Intern doc from JWT user id (via email match) ────
const getMentorFromUser = async (userId) => {
    let mentor = await Mentor.findOne({ userId });
    if (!mentor) {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        mentor = await Mentor.findOne({ email: user.email });
    }
    if (!mentor) throw new Error("Mentor profile not found");
    if (!mentor.userId) { mentor.userId = userId; await mentor.save(); }
    return mentor;
};

const getInternFromUser = async (userId) => {
    let intern = await Intern.findOne({ userId });
    if (!intern) {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        intern = await Intern.findOne({ email: user.email });
    }
    if (!intern) throw new Error("Intern profile not found");
    if (!intern.userId) { intern.userId = userId; await intern.save(); }
    return intern;
};

// ─── POST /task/mentor — mentor creates/assigns a task ────────────────────────
export const CreateTask = async (req, res) => {
    try {
        const mentor = await getMentorFromUser(req.user.id);
        const { title, description, internId, programId, dueDate } = req.body;

        if (!title || !description || !internId) {
            return res.status(400).json({ message: "title, description and internId are required" });
        }

        const task = await Task.create({
            title,
            description,
            internId,
            programId: programId || null,
            dueDate:   dueDate ? new Date(dueDate) : null,
            mentorId:  mentor._id,          // Mentor._id, not User._id
            fileUrl:   req.file ? req.file.path : null,
        });

        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// ─── GET /task/mentor — get all tasks assigned by this mentor ─────────────────
export const GetTasksByMentor = async (req, res) => {
    try {
        const mentor = await getMentorFromUser(req.user.id);

        const tasks = await Task.find({ mentorId: mentor._id })
            .populate("internId", "name email college")
            .sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── GET /task/intern — get all tasks assigned to this intern ─────────────────
export const GetTasksByIntern = async (req, res) => {
    try {
        const intern = await getInternFromUser(req.user.id);

        const tasks = await Task.find({ internId: intern._id })
            .populate("mentorId", "name email specialization")
            .sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── PUT /task/:taskId/status — intern updates task status ────────────────────
export const UpdateTaskStatus = async (req, res) => {
    try {
        const intern = await getInternFromUser(req.user.id);
        const { status } = req.body;

        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        if (task.internId.toString() !== intern._id.toString()) {  // fixed: was .toString without ()
            return res.status(403).json({ message: "Unauthorized access." });
        }

        task.status = status || "Submitted";
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
