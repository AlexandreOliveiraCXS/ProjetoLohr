import React from "react";
import "./styles.css";
import { Form, Button } from 'react-bootstrap';
import api from "../../../services/api";
import { useNavigate } from "react-router";

interface iGroup {
  id?: string,
  name: string,

}

function New() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    const name = target.name.value; // typechecks!

    const groupEdited: iGroup = {
      name
    }

    api.post('group/new', groupEdited).then((res) => {
      navigate(`/group/`);
    });
  }

  return (
    <div className="Conteiner">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome do Grupo</Form.Label>
          <Form.Control type="name" name="name" placeholder="Nome do Grupo" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div >

  );
}

export default New;
