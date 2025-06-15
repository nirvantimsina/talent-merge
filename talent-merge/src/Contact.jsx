import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Contact() {
    const [members, setMembers] = useState([]);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/members");
            setMembers(res.data);
        }

        catch (err) {
            console.error("Error fetching members: ", err);
        }
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/members", { name, role });
            alert("Post created!");
            setName("");
            setRole("");
            fetchPosts();
        }
        catch (err) {
            console.error("Error creating members: ", err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
  return (
    <div>
        <h1>React + Axios + Mock Backend</h1>

        <form onSubmit={handelSubmit}>
            <input 
                type="text"
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder='Role'
                value={role}
                onChange={(e) => setRole(e.target.value)}
            />

        <button type='submit'>Create Member</button>
        </form>

        <div>
            <h2>Posts</h2>
            {members.map((member) => (
                <div key={member.id}>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                </div>
            ))}
        </div>
    </div>
  );
}

export default Contact