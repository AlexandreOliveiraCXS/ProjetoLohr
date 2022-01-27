import React, { useEffect, useState } from "react";
import "./styles.css";
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../services/api";

interface iContacts {
  id: string,
  name: string,
  email: string,
  last_Name: string,
  cel_Phone: string,
}

function Edit() {
  const [contact, setContact] = useState<iContacts>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.replace('/contact/edit/', '');

    api.get('contact/', { params: { id } }).then((res) => {
      setContact(res.data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      name: { value: string };
      cel_phone: { value: string };
    };
    const email = target.email.value; // typechecks!
    const name = target.name.value; // typechecks!
    const cel_phone = target.cel_phone.value; // typechecks!

    const contactEdited = {
      email, name, cel_phone
    }

    api.put('contact/edit', contactEdited, { params: { id: contact?.id } }).then((res) => {
      navigate(`/contact/`);
    });
  }

  return (
    <div className="Conteiner">
      {contact && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control defaultValue={`${contact.name} ${contact.last_Name}`} type="name" name="name" placeholder="Nome Completo" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control defaultValue={contact.email} type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Telefone Celular</Form.Label>
            <Form.Control defaultValue={contact.cel_Phone} type="cel_phone" name="cel_phone" placeholder="cel_phone" />
          </Form.Group>


          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
      )}

    </div >

  );
}

export default Edit;
