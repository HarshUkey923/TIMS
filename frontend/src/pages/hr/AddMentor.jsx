import { useState } from "react";
import Navbar from "../../components/Navbar";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import api from "../../services/api";


const AddMentor = () => {
    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
        specialization:""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/hr/add-mentor",
            form);
            toast.success("Mentor added successfully");
            setForm({
            name: "",
            email: "",
            password: "",
            specialization: ""
            });
        } catch (err) {
            toast.error(err.message,"Error adding mentor");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
     };
    
    return (
        <div className="min-h-screen bg-gradient-to-r from-primary/60 via-base-300 to-secondary/60">
            <Navbar/>
            <div className="mx-auto p-5 max-w-3xl">
            <Link to= "/hr" className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5"/> Back to Dashboard
            </Link>

            <form
                onSubmit={handleSubmit}
                className="card glass border-2 shadow-lg p-3">
                <h2 className="font-bold text-lg mb-3 text-center">Add Mentor</h2>

                <input name="name" placeholder="Name"
                    className="input w-full bg-base-100/30 backdrop-blur border border-base-300 mb-3"
                    onChange={handleChange} required />

                <input name="email" type="email" placeholder="Email"
                    className="input w-full bg-base-100/30 backdrop-blur border border-base-300 mb-3"
                    onChange={handleChange} required />

                <input name="password" type="password" placeholder="Password"
                    className="input w-full bg-base-100/30 backdrop-blur border border-base-300 mb-3"
                    onChange={handleChange} required />

                <input name="specialization" placeholder="Specialization"
                    className="input w-full bg-base-100/30 backdrop-blur border border-base-300 mb-3"
                    onChange={handleChange} required />

                <button name="submit" type="submit" className="btn btn-outline w-full bg-base-100/30 backdrop-blur border border-base-300">Add Mentor</button>
                </form>
            </div>
        </div>
    )
};

export default AddMentor;