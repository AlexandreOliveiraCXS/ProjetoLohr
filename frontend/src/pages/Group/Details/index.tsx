import React, { useEffect, useState } from "react";
import "./styles.css";
import { Container, Row, Col } from 'react-bootstrap';
import api from "../../../services/api";
import { useLocation } from "react-router";
import { BsLayerBackward, BsLayerForward } from "react-icons/bs";

interface iGroup {
  id?: string,
  name: string
}

interface iGroupDetail {
  name: string,
  Group_Contacts: [
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
  const [idGroup, setIdGroup] = useState<string>();
  const [group, setGroup] = useState<iGroup>();
  const [listContacts, setListContacts] = useState<iGroupDetail>();
  const [listNotContacts, setListNotContacts] = useState<iContact[]>();



  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.replace('/group/detail/', '');
    setIdGroup(id);

    api.get('group/', { params: { id } }).then((res) => {
      const { name, id }: iGroup = res.data;

      setGroup({ name, id });
    });

    api.get('groupContacts/', { params: { id } }).then((res) => {
      const result: iGroupDetail = res.data;

      setListContacts(result);
    });

    api.get('groupContacts/notContact/', { params: { id } }).then((res) => {
      const result: iContact[] = res.data;
      setListNotContacts(result);
    });

  }, []);


  const handleAddContacts = (contact: iContact) => {
    const contacts: string[] = [];

    contacts.push(contact.id);

    api.post('groupContacts/addContacts', { contacts }, { params: { id: idGroup } }).then((res) => {
      api.get('groupContacts/', { params: { id: idGroup } }).then((res) => {
        const result: iGroupDetail = res.data;
        setListContacts(result);
      });

      var newNotArray = listNotContacts?.filter((c) => c.id != contact.id);
      setListNotContacts(newNotArray);
    });

  };

  const handleRemoveContact = (contact: iContact) => {
    const contacts: string[] = [];

    contacts.push(contact.id);

    api.delete('groupContacts/removeContacts', { data: { contacts }, params: { id: idGroup } }).then((res) => {
      api.get('groupContacts/', { params: { id:idGroup } }).then((res) => {
        const result: iGroupDetail = res.data;
  
        setListContacts(result);
      });
  
      api.get('groupContacts/notContact/', { params: { id:idGroup } }).then((res) => {
        const result: iContact[] = res.data;
        setListNotContacts(result);
      });
    });

  };

  return (
    <div className="Conteiner">
      <div className="Content">
        {group && (
          <Container>
            <Row>
              <Col>
                <Row className="Titule">
                  Nome do Grupo:
                </Row>
                <Row className="TituleInfo">
                  {group.name}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="SubTitule">
                Participantes
              </Col>
            </Row>
            {listContacts && (listContacts.Group_Contacts?.map((contact) => (
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
