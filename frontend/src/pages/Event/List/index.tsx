import React, { useEffect, useState } from "react";
import "./styles.css";
import { ListGroup } from 'react-bootstrap';
import { BsFillPencilFill, BsFillArchiveFill, BsJournalPlus } from 'react-icons/bs';
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

interface iEvent {
  id: string,
  name: string,
  appointment: Date,

}

function List() {
  const [events, setEvents] = useState<iEvent[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('event/all').then((res) => {
      setEvents(res.data);
    });
  }, []);

  const handleClick = (event: iEvent) => {
    navigate(`/event/edit/${event.id}`);
  };

  const handleNew = () => {
    navigate(`/event/new`);
  };

  const handleDelete = (event: iEvent) => {
    api.delete('event/delete/', { params: { id: event.id } }).then((res) => {
      const newListEvent = events.filter((cont) => cont.id != event.id);
      setEvents(newListEvent);
    });
  };
  
  const handleDetail = (id: string) => {
    navigate(`/event/detail/${id}`);
  };
  
  return (
    <>
      <div className="Conteiner">
        <div className="plusContact">
          <BsJournalPlus size={40} onClick={handleNew} />
        </div>
        <ListGroup className="Content">
          {events && events.map((event) => (
            <ListGroup.Item action className="LineContent" key={event.id} onClick={() => { handleDetail(event.id) }}>
              {event.name}
              <nav className="LineContentNav">
                <BsFillPencilFill className="Button" onClick={() => { handleClick(event) }} />
                <BsFillArchiveFill className="Button" onClick={() => { handleDelete(event) }} />
              </nav>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div >
    </>
  );
}

export default List;
