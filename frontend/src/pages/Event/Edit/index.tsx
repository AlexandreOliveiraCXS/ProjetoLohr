import React, { useEffect, useState } from "react";
import "./styles.css";
import { Form, Button } from 'react-bootstrap';
import api from "../../../services/api";
import { useLocation, useNavigate } from "react-router";
import DatePicker from "react-date-picker";

interface iEvents {
  id?: string,
  name: string,
  appointment: Date
}

function New() {
  const [date, setDate] = useState(new Date());
  const [initialHour, setInitialHour] = useState<number>();
  const navigate = useNavigate();
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  const [event, setEvent] = useState<iEvents>();
  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.replace('/event/edit/', '');

    api.get('event/', { params: { id } }).then((res) => {
      const { appointment, name, id }: iEvents = res.data;
      setEvent({ appointment, name, id });

      const dateResponse = new Date(appointment);
      setDate(dateResponse);

      setInitialHour(dateResponse.getHours());
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      hour: { value: number };
    };
    const hour = target.hour.value; // typechecks!
    const name = target.name.value; // typechecks!   
    const dataEvent = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour);

    const eventsEdited: iEvents = {
      name, appointment: dataEvent
    }

    api.put('event/edit', eventsEdited, { params: { id: event?.id } }).then((res) => {
      navigate(`/event/`);
    });
  }

  return (
    <div className="Conteiner">
      {event && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome do Evento</Form.Label>
            <Form.Control defaultValue={event.name} type="name" name="name" placeholder="Nome do Evento" />
          </Form.Group>

          <DatePicker value={date} format={"dd/MM/y"} onChange={setDate} />

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Select aria-label="Default select example" name="hour">
              <option>Hora do Evento</option>
              {hours.map((hour) => (
                <option key={hour} value={hour} selected={hour === initialHour}>{hour}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
      )}
    </div >

  );
}

export default New;
