import React, { useEffect, useState } from "react";
import "./styles.css";
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router";
import DatePicker from "react-date-picker";

interface iEvents {
  id?: string,
  name: string,
  appointment: Date
}

function Home() {
  const navigate = useNavigate();


  const handleContacts = () => {
    navigate(`/contact`);

  };

  const handleGroup = () => {
    navigate(`/group`);

  };

  const handleEvent = () => {
    navigate(`/event`);

  };

  return (
    <div className="Conteiner">
      <div className="Content d-grid gap-2">
        <Button variant="primary" size="lg" onClick={handleContacts}>
          Contatos
        </Button>
        <Button variant="primary" size="lg" onClick={handleGroup}>
          Grupos
        </Button>
        <Button variant="primary" size="lg" onClick={handleEvent}>
          Eventos
        </Button>
      </div >
    </div >

  );
}

export default Home;
