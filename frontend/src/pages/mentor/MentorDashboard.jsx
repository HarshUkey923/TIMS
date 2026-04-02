import { useNavigate } from "react-router"
import Navbar from "../../components/Navbar"
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

const MentorDashboard = () => {
  const [programs, setPrograms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const program = async () => {
      try {
        const getProgram = await api.get("/mentor/programs");
        setPrograms(getProgram.data);
        console.log("Programs: ", getProgram.data)
      } catch (error) {
        console.log(error)
      }
    }
    program()
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/60 via-base-300 to-secondary/60">
      <Navbar/>
      
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex card glass p-8 gap-6 border-2 shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
                    <div className="flex gap-3 justify-end mt-4">
                        <button className="btn btn-ghost btn-w-xl" onClick={() => navigate()}> <PlusIcon size={18}/> Create Task</button>
                        <button className="btn btn-ghost btn-w-xl" onClick={() => navigate()}> <PlusIcon size={18}/> Assign Task</button>
                    </div>
                </div>
         </div>
         <div className="card p-8 gap-6 mt-5">
            <h1 className="divider opacity-70 text-center font-bold text-xl">Assigned Programs</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
                { programs.length > 0 ? (
                    programs.map(program => (
                        <div key={program._id} className="card p-3 pb-5 items-center">
                            <div className="card bg-base-100/20 backdrop-blur-lg text-base-content shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 h-full w-full">
                                <h2 className="text-lg font-bold truncate" title={program.title}>{program.title} </h2>
                                </div>
                            </div>

                    ))
                ) : ( <p>No active programs.</p> ) }
                </div>
         </div>
      </div>
    </div>
  )
}

export default MentorDashboard