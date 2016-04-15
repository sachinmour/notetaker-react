import React from "react";

const NotesList = ({notes}) => {
  return (
    <ul className="list-group">
      {notes.map((note, index) => {
        return <li className="list-group-item" key={index}>{note}</li>;
      })}
    </ul>
  );
};

export default NotesList;

// check video 13 4:10