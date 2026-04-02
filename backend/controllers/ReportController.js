import Intern from "../models/Intern.js";
import Task from "../models/Task.js";

export const InternProgressReport = async (req, res) => {
    const report = await Task.aggregate([
        {
            $group: {
                _id: "$internId",
                totalTasks: { $sum: 1 },
                submittedTasks: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "Submitted"] }, 1, 0]
                    }
                }
            }
        },
        {
            $project: {
                progressPercentage: {
                    $multiply: [
                        { $divide: ["submittedTasks", "$totalTasks"] },
                        100
                    ]
                }
            }
        }
    ]);

    res.json(report);
};

export const ProgramWiseInterns = async (req, res) => {
    const report = await Intern.aggregate([
        {
            $group: {
                _id: "$programId",
                internCount: { $sum: 1 }
            }
        }
    ]);

    res.json(report);
};

export const MentorWorkloadReport = async (req, res) => {
    const report = await Intern.aggregate([
        {
            $group: {
                _id: "$mentorId",
                internCount: { $sum: 1 }
            }
        }
    ]);

    res.json(report);
};

export const TaskStatusReport = async (req, res) => {
    const report = await Task.aggregate([
        {
            $group: {
                _id: "$status",
                internCount: { $sum: 1 }
            }
        }
    ]);

    res.json(report);
};

export const CertificateEligibilityReport = async (req, res) => {
    const eligibleInterns = await Task.aggregate([
        {
            $group: {
                _id: "internId",
                totalTaks: { $sum: 1 },
                reviewedTasks: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "Reviewed"] }, 1, 0]
                    }
                }
            }
        },
        {
            $match: {
                $expr: { $eq: ["$totalTasks", "$reviewedTasks"]}
            }
        }
    ]);

    res.json(eligibleInterns);
};