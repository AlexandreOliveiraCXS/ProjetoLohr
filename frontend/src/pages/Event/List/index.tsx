import React, { useEffect, useState } from "react";
import "./styles.css";
import { ListGroup } from 'react-bootstrap';
import { BsFillPencilFill, BsFillArchiveFill, BsFillPersonPlusFill } from 'react-icons/bs';
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

interface iContacts {
  id: string,
  name: string,
  email: string,
  last_Name: string,
  cel_Phone: string,
}

function List() {
  const [contacts, setContacts] = useState<iContacts[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('contact/all').then((res) => {
      setContacts(res.data);
    });
  }, []);

  const handleClick = (contact: iContacts) => {
    navigate(`/contact/edit/${contact.id}`);
  };

  const handleNew = () => {
    navigate(`/contact/new`);
  };

  const handleDelete = (contact: iContacts) => {
    api.delete('contact/delete/', { params: { id: contact.id } }).then((res) => {
      const newListContact = contacts.filter((cont) => cont.id != contact.id);
      setContacts(newListContact);
    });
  };

  return (
    <>
      <div className="Conteiner">
        <div className="plusContact">
          <BsFillPersonPlusFill size={40} onClick={handleNew} />
        </div>
        <ListGroup className="Content">
          {contacts && contacts.map((contact) => (
            <ListGroup.Item action className="LineContent" key={contact.id}>
              {`${contact.name} ${contact.last_Name}`}
              <nav className="LineContentNav">
                <BsFillPencilFill className="Button" onClick={() => { handleClick(contact) }} />
                <BsFillArchiveFill className="Button" onClick={() => { handleDelete(contact) }} />
              </nav>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div >
    </>
  );
}

export default List;
