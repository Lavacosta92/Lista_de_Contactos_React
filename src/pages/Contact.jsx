import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();
    // 💡 IMPORTANTE: Usa un nombre único para tu agenda
    const slug = "agenda"; 

    const loadContacts = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`)
            .then(response => {
                if (response.status === 404) {
                    // Si la agenda no existe, hay que crearla primero
                    createAgenda();
                }
                return response.json();
            })
            .then(data => {
                if (data.contacts) {
                    dispatch({ type: "set_contacts", payload: data.contacts });
                }
            })
            .catch(error => console.error("Error cargando contactos:", error));
    };

    const createAgenda = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
            method: "POST"
        })
        .then(() => loadContacts()) // Una vez creada, intenta cargar de nuevo
        .catch(error => console.error("Error creando agenda:", error));
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const deleteContact = (id) => {
    const slug = "agenda"; // Asegúrate que sea tu slug

    fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
        method: "DELETE",
    })
    .then(response => {
        if (response.ok) {
            // Si la API lo borró con éxito, volvemos a cargar la lista
            loadContacts();
        }
    })
    .catch(error => console.error("Error borrando contacto:", error));
};

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-4">
                <h1>My Contacts</h1>
                <Link to="/add-contact">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>
            
            <ul className="list-group">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <div className="d-flex align-items-center">
                                <img 
                                    src="https://via.placeholder.com/80" 
                                    className="rounded-circle me-3" 
                                    alt="profile" 
                                />
                                <div>
                                    <h5 className="mb-1">{contact.name}</h5>
                                    <p className="mb-1 text-secondary"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
                                    <p className="mb-1 text-secondary"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
                                    <p className="mb-0 text-secondary"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
                                </div>
                            </div>
                            <div>
                                <Link to={`/edit-contact/${contact.id}`} className="btn btn-link text-dark">
                                    <i className="fas fa-pencil-alt"></i>
                                </Link>
<button 
    className="btn btn-link text-danger"
    onClick={() => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            deleteContact(contact.id);
        }
    }}
>
    <i className="fas fa-trash"></i>
</button>
                            </div>




                        </li>
                    ))
                ) : (
                    <p className="text-center">No contacts found. Add your first one!</p>
                )}
            </ul>
        </div>
    );
};
