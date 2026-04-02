import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import { Link, useParams } from "react-router";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";

const Details = () => {
    const [program, setProgram] = useState({});
    const [interns, setInterns] = useState([]);
    const [mentors, setMentors] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const details = async () => {
            try {
                const program = await api.get(`/hr/findprogram/${id}`);
                const intern = await api.get(`/hr/get-interns/${id}`);
                const mentor = await api.get(`/hr/get-mentor/${id}`);
                setProgram(program.data)
                setInterns(intern.data)
                setMentors(mentor.data);
                console.log(mentor.data)
            } catch (error) {
                console.log(error)
            }
        }
        details();
    }, []);

    const deleteProgram = async (req, res) => {
        try {
            const dltprg = await api.delete(`/hr/delete-program/${id}`)
            toast.success("Program Deleted!");
        } catch (error) {
            console.log(error);
            toast.error("Error deleting program!")
        }
    }

return(
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-base-200 to-secondary/30">
        <Navbar/>
        <div className="mx-auto p-5 max-w-3xl">
            <Link to="/hr" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"/> Back to Dashboard</Link>
            <div className="card p-10 shadow-xl border-2 glass items-center">
                <h2 className="font-bold text-lg">{program.title}</h2>
                <div className="mt-2">
                    <p className="font-semibold">Mentors:</p>

                    {program.mentors?.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {mentors.map((mentor) => (
                          <span key={mentor._id} className="badge badge-secondary">
                            {mentor.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm opacity-70">No mentors assigned</p>
                    )}
                </div>
                <p>Created on: {program.createdAt && new Date(program.createdAt).toLocaleDateString()}</p>
                <p className="font-bold">Duration: {program.duration}</p>
                <button className="btn btn-error btn-sm mt-2"
                    onClick={deleteProgram}>
                    <XIcon size={16}/> Delete
                </button>
                <div className="mt-10 w-full">

                <h2 className="text-xl font-bold mb-4">
                  Assigned Interns ({interns.length})
                </h2>

                {interns.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">

                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>College</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {interns.map((intern) => (
                          <tr key={intern._id}>
                            <td className="font-medium">{intern.name}</td>
                            <td>{intern.email}</td>
                            <td>{intern.college}</td>
                            <td>
                              <span className="badge badge-success">
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                ) : (
                  <p className="opacity-70">No interns assigned yet</p>
                )}

              </div>
            </div>
        </div>
    </div>
)}

export default Details;