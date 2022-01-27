import React, { useEffect, useState } from "react";
import "./styles.css";
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../services/api";

interface iGroup {
  id: string,
  name: string,
  email: string,
  last_Name: string,
  cel_Phone: string,
}

function Edit() {
  const [group, setGroup] = useState<iGroup>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.replace('/group/edit/', '');

    api.get('group/', { params: { id } }).then((res) => {
      setGroup(res.data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    const name = target.name.value; // typechecks!

    const groupEdited = {
      name
    }

    api.put('group/edit', groupEdited, { params: { id: group?.id } }).then((res) => {
      navigate(`/group/`);
    });
  }

  return (
    <div className="Conteiner">
      {group && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control defaultValue={group.name} type="name" name="name" placeholder="Nome Completo" />
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
