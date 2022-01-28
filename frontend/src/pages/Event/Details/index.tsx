import React, { useEffect, useState } from "react";
import "./styles.css";
import { Container, Row, Col } from 'react-bootstrap';
import api from "../../../services/api";
import { useLocation } from "react-router";
import { BsLayerBackward, BsLayerForward } from "react-icons/bs";

interface iEvents {
  id?: string,
  name: string,
  appointment: Date
}

interface iEventDetail {
  name: string,
  Event_Contacts: [
    {
      Contact: iContact
    }
  ]
}
interface iContact {
  id: string,
  name: string,
  last_Name: string,
  cel_Phone: string,
  email: string,
}

function Details() {
  const [idEvent, setIdEvent] = useState<string>();
  const [event, setEvent] = useState<iEvents>();
  const [listContacts, setListContacts] = useState<iEventDetail>();
  const [listNotContacts, setListNotContacts] = useState<iContact[]>();
  const [hourString, setHourString] = useState<string>();



  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.replace('/event/detail/', '');
    setIdEvent(id);

    api.get('event/', { params: { id } }).then((res) => {
      const { appointment, name, id }: iEvents = res.data;

      setEvent({ appointment, name, id });

      const dateResponse = new Date(appointment);

      setHourString(`${dateResponse.getHours()}:${(dateResponse.getMinutes() < 10 ? '0' : '') + dateResponse.getMinutes()} ${dateResponse.getDate()}/${dateResponse.getMonth()}/${dateResponse.getFullYear()}`);
    });

    api.get('eventContacts/', { params: { id } }).then((res) => {
      const result: iEventDetail = res.data;

      setListContacts(result);

    });

    api.get('eventContacts/notContact/', { params: { id } }).then((res) => {
      const result: iContact[] = res.data;
      setListNotContacts(result);
    });

  }, []);


  const handleAddContacts = (contact: iContact) => {
    const contacts: string[] = [];

    contacts.push(contact.id);

    api.post('eventContacts/addContacts', { contacts }, { params: { id: idEvent } }).then((res) => {
      api.get('eventContacts/', { params: { id: idEvent } }).then((res) => {
        const result: iEventDetail = res.data;
        setListContacts(result);
      });

      var newNotArray = listNotContacts?.filter((c) => c.id != contact.id);
      setListNotContacts(newNotArray);
    });

  };

  const handleRemoveContact = (contact: iContact) => {
    const contacts: string[] = [];

    contacts.push(contact.id);

    api.delete('eventContacts/removeContacts', { data: { contacts }, params: { id: idEvent } }).then((res) => {
      api.get('eventContacts/', { params: { id: idEvent } }).then((res) => {
        const result: iEventDetail = res.data;
        setListContacts(result);
      });

      var newNotArray = listNotContacts?.filter((c) => c);
      newNotArray?.push(contact)
      setListNotContacts(newNotArray);
    });

  };

  return (
    <div className="Conteiner">
      <div className="Content">
        {event && (
          <Container>
            <Row>
              <Col>
                <Row className="Titule">
                  Nome do Evento:
                </Row>
                <Row className="TituleInfo">
                  {event.name}
                </Row>
              </Col>
              <Col>
                <Row className="Titule">
                  Horário do Evento:
                </Row>
                <Row className="TituleInfo">
                  {hourString}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="SubTitule">
                Participantes
              </Col>
            </Row>
            {listContacts && (listContacts.Event_Contacts.map((contact) => (
              <Row key={contact.Contact.id} className="ContactInfo">
                <Col className="Name">{`${contact.Contact.name} ${contact.Contact.last_Name}`}</Col>
                <Col className="Icons"><BsLayerBackward onClick={() => { handleRemoveContact(contact.Contact) }} /></Col>

              </Row>
            )))}

            <Row>
              <Col className="SubTitule">
                Convidar
              </Col>
            </Row>
            {listNotContacts && (listNotContacts.map((contact) => (
              <Row key={contact.id} className="ContactInfo">
                <Col className="Name" >{`${contact.name} ${contact.last_Name}`}</Col>
                <Col className="Icons"><BsLayerForward onClick={() => { handleAddContacts(contact) }} /></Col>
              </Row>
            )))
            }

          </Container >

        )}
      </div >
    </div >

  );
}

export default Details;
