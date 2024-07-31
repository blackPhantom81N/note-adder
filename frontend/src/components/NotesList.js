import SingleNote from "./SingleNote";
import { useState } from "react";
import ManageNoteModal from "./ManageNoteModal";
import { AddCircleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";

const NotesList = ({ notes, handleDeleteNote, refreshPage }) => {
  //manage note : edit note or create note
  const [manageNote, setManageNote] = useState({
    openModal: false,
    action: undefined,
    record: undefined, 
  });
 
  //(notes).map((note) => (
  return (
    <div className="notes-list">
              <div
          className="add-button"
          style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            paddingLeft: "20px",
          }}
        >
          {/* The State is changed with the button click 
            action is changed to as 'create' and the record is stated as "undefined"
          */}
          <Button className="add-new-note-icon" onClick={()=>{
            setManageNote({
              openModal:true,
              action:"create",
              record:undefined
            })
          }}>
            <div
              className="add-circle-icon"
            >
              <AddCircleOutline color="primary" />
            </div>
          </Button>
        </div>

      {/* <AddNote refreshPage={refreshPage} /> */}

      {/* Displaying each note
          Each data value for fields in a single note(id, title, description etc.) is passed into the function.
      */}
      {Array.isArray(notes) && notes.length>0 && notes.map((note)=>(
        <SingleNote
          key={note.id}
          id={note.id}
          text={note.title}
          date={note.created_time}
          description={note.description}
          handleDeleteNote={handleDeleteNote}
          //manage note : edit
          manageNote={manageNote}
          setManageNote={setManageNote}
        />
      ))}
      {manageNote.openModal && (
        <ManageNoteModal
          isVisible={manageNote.openModal}
          record={manageNote.record}
          action={manageNote.action}
		  close={()=>{
			setManageNote({
				openModal: false,
    			action: undefined,
   				record: {id:1, title:"new title", description:"not old data"}, //Changed from undefined to literal data
			})
		  }}
        />
      )}
    </div>
  );
};

export default NotesList;
