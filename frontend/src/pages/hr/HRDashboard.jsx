import { useNavigate, useParams } from "react-router"
import Navbar from "../../components/Navbar.jsx"
import { useEffect, useState } from "react";
import api from "../../services/api.js";
import { InfoIcon, PenIcon, PlusIcon } from "lucide-react";

const HRDashboard = () => {
    const [ program, setProgram ] = useState([]);
    const [ intern, setIntern ] = useState([]);

    useEffect(() => {
        const prog = async () => {
        try {
            const res = await api.get("/hr/program");
            const intern = await api.get("/hr/intern")
            setProgram(res.data);
            setIntern(intern.data);
        } catch (error) {
            console.log(error)
        }
    }
    prog();
    },[])

    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col max-w-screen bg-gradient-to-r from-primary/60 via-base-300 to-secondary/60">
        <Navbar/>

        <div className="mx-auto max-w-7xl p-6">
            <div className="flex card glass p-8 gap-6 border-2 shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">HR Dashboard</h1>
                    <div className="flex gap-3 justify-end mt-4">
                        <button className="btn btn-ghost btn-w-xl" onClick={() => navigate("/program")}> <PlusIcon size={18}/> Create Program</button>
                        <button className="btn btn-ghost btn-w-xl" onClick={() => navigate("/add-intern")}> <PlusIcon size={18}/> Add Intern</button>
                        <button className="btn btn-ghost btn-w-xl" onClick={() => navigate("/add-mentor")}> <PlusIcon size={18}/> Add Mentor</button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="stat bg-base-100/40 shadow rounded-lg">
                        <div className="stat-title text-sm opacity-70">
                                Programs
                        </div>
                        <div className="stat-value text-3xl font-bold">
                            {program.length}
                        </div>
                    </div>
                    <div className="stat bg-base-100/40 shadow rounded-lg">
                        <div className="stat-title text-sm opacity-70">
                                Interns
                        </div>
                        <div className="stat-value text-3xl font-bold">
                            {intern.length}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card p-8 gap-6 mt-5">
                <h1 className="divider opacity-70 text-center font-bold text-xl">Active Programs</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                { program.length > 0 ? (
                    program.map(program => (
                        <div key={program._id} className="card p-3 pb-5 items-center">
                            <div className="card bg-base-100/20 backdrop-blur-lg text-base-content shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 h-full w-full">
                                <h2 className="text-lg font-bold truncate" title={program.title}>{program.title} </h2>
                                
                                <p className="text-sm opacity-70">
                                    Duration: {program.duration}
                                </p>
                                <p className="text-sm">
                                    Interns: {program.interns?.length || 0}
                                </p>
                                <p className="text-xs opacity-50">
                                    Created: {new Date(program.createdAt).toLocaleDateString()}
                                </p>
                                <div className="flex gap-3 mt-4">
                                    <button className="btn btn-ghost btn-sm"
                                    onClick={() => {navigate(`/assign-program/${program._id}`)}}>
                                    <PenIcon size={16}/> Assign
                                    </button>
                                    <button className="btn btn-ghost btn-sm"
                                    onClick={() => {navigate(`/details/${program._id}`)}}>
                                    <InfoIcon size={16}/> Details
                                    </button>
                                </div>
                                </div>
                            </div>

                    ))
                ) : ( <p>No active programs.</p> ) }
                </div>
            </div>
        </div>
        <footer>
            <div className="w-full mx-auto glass border-t p-2">
                <h2 className="font-bold pl-6">AetherByte IT Solutions. Inc.</h2>
            </div>
        </footer>
    </div>

  )
}

export default HRDashboard