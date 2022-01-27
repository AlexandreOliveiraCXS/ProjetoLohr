import React from "react";
import "./styles.css";
import { Form, Button } from 'react-bootstrap';
import api from "../../../services/api";
import { useNavigate } from "react-router";

interface iContacts {
  id?: string,
  email: string,
  name: string,
  cel_phone: string,
}

function New() {
  const navigate = useNavigate();

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

    const contactEdited: iContacts = {
      email, name, cel_phone
    }

    api.post('contact/new', contactEdited).then((res) => {
      navigate(`/contact/`);
    });
  }

  return (
    <div className="Conteiner">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control type="name" name="name" placeholder="Nome Completo" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Telefone Celular</Form.Label>
          <Form.Control type="cel_phone" name="cel_phone" placeholder="cel_phone" />
        </Form.Group>


        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div >

  );
}

export default New;
