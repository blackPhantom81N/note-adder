import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import { green, red, black } from "@mui/material/colors";
import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import dateTimeFormat from "../utils/dateTimeFormat";

const SingleNote = ({
  id,
  text,
  date,
  handleDeleteNote,
  description,
  manageNote,
  setManageNote,
}) => {
  const handleNoteModal = () => {
    console.log("This is the id ", id);
    setManageNote({
      ...manageNote,
      openModal: true,
      action: "edit",
      record: {
        id: id,
        title: text,
        description: description,
        date: date,
      },
    });
  };

const [clicked, setClicked] = useState(true);

  return (
    <div className="note">
      <span>{text}</span>
      <div className="description">
        <h2>{description}</h2>
      </div>
      <div className="note-footer">
        <small>{dateTimeFormat(date)}</small>
        <Button className="fav">
          <FavoriteIcon 
          className="fav-btn" 
          size="small" 
          sx={{ 
            // Ternary operator used to change color of the Favourite button
            color: clicked? 'gray':'red', 
          }}
          onClick={()=>setClicked(!clicked)}
          />
        </Button>
        <Button onClick={handleNoteModal}>
          <UpdateIcon
            className="update-icon"
            size="1.3em"
            sx={{ color: green[500] }}
          />
        </Button>
        <Button>
          <DeleteForeverIcon
            className="delete-icon"
            size="1.3em"
            onClick={() => handleDeleteNote(id)}
            sx={{ color: "black" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default SingleNote;
