import React, { useEffect, useState } from "react";
import "./styles.css";
import { ListGroup } from 'react-bootstrap';
import { BsFillPencilFill, BsFillArchiveFill, BsPeopleFill } from 'react-icons/bs';
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

interface iGroup {
  id: string,
  name: string,
}

function List() {
  const [groups, setGroups] = useState<iGroup[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('group/all').then((res) => {
      setGroups(res.data);
    });
  }, []);

  const handleClick = (group: iGroup) => {
    navigate(`/group/edit/${group.id}`);
  };

  const handleNew = () => {
    navigate(`/group/new`);
  };

  const handleDelete = (group: iGroup) => {
    api.delete('group/delete/', { params: { id: group.id } }).then((res) => {
      const newListGroup = groups.filter((cont) => cont.id != group.id);
      setGroups(newListGroup);
    });
  };

  return (
    <>
      <div className="Conteiner">
        <div className="PlusGroup">
          <BsPeopleFill size={40} onClick={handleNew} />
        </div>
        <ListGroup className="Content">
          {groups && groups.map((group) => (
            <ListGroup.Item action className="LineContent" key={group.id}>
              {group.name}
              <nav className="LineContentNav">
                <BsFillPencilFill className="Button" onClick={() => { handleClick(group) }} />
                <BsFillArchiveFill className="Button" onClick={() => { handleDelete(group) }} />
              </nav>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div >
    </>
  );
}

export default List;
