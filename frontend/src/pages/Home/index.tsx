import React from "react";
import "./styles.css";
import { Form, Button, Row, Container, Col } from 'react-bootstrap';

interface iData {
  password?: string,
  email?: string
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const target = e.target as typeof e.target & {
    email: { value: string };
    password: { value: string };
  };
  const email = target.email.value; // typechecks!
  const password = target.password.value; // typechecks!

  console.log({ email, password })
}

function Home() {
  return (
    <div className="Conteiner">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>


    </div >

  );
}

export default Home;
