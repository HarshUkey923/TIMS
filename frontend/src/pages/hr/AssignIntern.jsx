import { useEffect, useState } from "react";
import api from "../../services/api.js";
import { Link, useNavigate, useParams } from "react-router";
import Navbar from "../../components/Navbar.jsx";
import { ArrowLeftIcon } from "lucide-react";

const AssignIntern = () => {
    const [ interns, setInterns ] = useState([]);
    const [ program, setProgram ] = useState([]);
    const [ mentors, setMentors ] = useState([]);
    const [ internId, setInternId ] = useState("");
    const [ mentorId, setMentorId ] = useState("");
    const [ programId, setProgramId ] = useState("");

    const {id} = useParams();

    useEffect(() => {
        const FetchData = async (req, res) => {
            const getInterns = await api.get("/hr/intern");
            console.log(getInterns.data)

            const programs = await api.get(`/hr/findprogram/${id}`);
            console.log(programs.data)

            const mentors = await api.get("/hr/mentor");
            console.log(mentors.data);

            setProgram(programs.data)
            setInterns(getInterns.data);
            setMentors(mentors.data);
            
        };
        FetchData();
    }, []);

    const AssignInterns = async (e) => {
        e.preventDefault();
        try {
            await api.put("/hr/assign-program", {
                programId: id,
                internId: internId
            });
            alert("Intern assigned to program successfully");
            setInternId("");
            setProgramId("");
        } catch (error) {
            console.log(error);
        }
    };

    const AssignMentor = async (e) => {
        e.preventDefault();
        try {
            await api.put("/hr/assign-mentor", {
                programId: id,
                mentorId: mentorId
            });
            alert("Mentor assigned to program successfully");
            setMentorId("");
            setProgramId("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-primary/60 via-base-300 to-secondary/60">
            <Navbar/>
            <div className="mx-auto p-5 max-w-3xl">
                <Link to="/hr" className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5"/> Back to Dashboard</Link>
                <form onSubmit={AssignInterns} className="card glass shadow-lg p-4 mb-4">
                    <h2 className="font-bold text-lg mb-3 text-center">Assign Interns</h2>
                    <h2 className="font-bold text-lg mb-3 text-center">{program.title}</h2>
                    <select className="select select-primary mb-3"
                    value={internId}
                    onChange={(e) => setInternId(e.target.value)}
                    required>
                        <option value="">Select Intern</option>
                        {interns
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(interns => (
                            <option key = {interns._id} value={interns._id}>
                                {interns.name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-primary" type="submit">Assign</button>
                </form>

                <form onSubmit={AssignMentor} className="card glass shadow-lg p-4">
                    <h2 className="font-bold text-lg mb-3 text-center">Assign Mentor</h2>
                    <h2 className="font-bold text-lg mb-3 text-center">{program.title}</h2>
                    <select className="select select-primary mb-3"
                    value={mentorId}
                    onChange={(e) => setMentorId(e.target.value)}
                    required>
                        <option value="">Select Mentor</option>
                        {mentors
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(mentors => (
                            <option key = {mentors._id} value={mentors._id}>
                                {mentors.name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-primary" type="submit">Assign</button>
                </form>
            </div>
        </div>
    )
}

export default AssignIntern;