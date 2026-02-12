import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Contact } from "./pages/Contact"; // La lista de contactos
import { AddContact } from "./pages/AddContact"; // El formulario

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} >
        {/* Vista principal: La lista */}
        <Route path="/" element={<Contact />} />
        {/* Vista para agregar: El formulario */}
        <Route path="/add-contact" element={<AddContact />} />
        {/* Vista para editar: Reutilizamos el formulario pero con un ID */}
        <Route path="/edit-contact/:id" element={<AddContact />} />
      </Route>
    )
);