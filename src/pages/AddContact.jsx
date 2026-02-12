import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddContact = () => {
    // 1. Estados locales para capturar lo que el usuario escribe
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate(); // Para redirigir al usuario después de guardar
    const slug = "agenda"; // 💡 Debe ser el mismo que usaste en Contact.jsx

    const handleSave = (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 2. Crear el objeto con los datos del nuevo contacto
        const newContact = {
            name: name,
            email: email,
            phone: phone,
            address: address
        };

        // 3. Hacer el fetch POST a la API
        fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        })
        .then(response => {
            if (response.ok) {
                navigate("/"); // Si todo salió bien, vuelve a la lista
            }
        })
        .catch(error => console.error("Error guardando contacto:", error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Add a new contact</h1>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                        type="text" className="form-control" placeholder="Full Name" 
                        onChange={(e) => setName(e.target.value)} required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" className="form-control" placeholder="Enter email" 
                        onChange={(e) => setEmail(e.target.value)} required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input 
                        type="text" className="form-control" placeholder="Enter phone" 
                        onChange={(e) => setPhone(e.target.value)} required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input 
                        type="text" className="form-control" placeholder="Enter address" 
                        onChange={(e) => setAddress(e.target.value)} required 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save</button>
                <Link to="/" className="mt-3 d-block text-center">or get back to contacts</Link>
            </form>
        </div>
    );
};