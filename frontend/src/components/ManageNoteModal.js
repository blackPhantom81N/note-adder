import { Description, Update } from "@mui/icons-material";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { createNotes, updateNotes } from "../Services/notes";

//record-{id, title, desc,} action = undefined/edit
const ManageNoteModal = ({ isVisible, record, action, close }) => {
  const [formData, setformData] = useState({
    id: "",
    title: " ",
    description: " ",
  });

  // The useEffect is executed first. A dependancy is used to render the at any time the state changes
  //In here, if action is 'edit', the data fields are alredy filled with current existing data, with proving the user the ability to change the data
  useEffect(() => {
    if (action === "edit") {
      console.log(
        "This is the ID ",
        record.id,
        "This is the title",
        record.title,
        "This is the  description",
        record.description
      );
      setformData({
        ...formData,
        id: record.id,
        title: record.title,
        description: record.description,
      });
    }
  }, [action]);

  const handleContentUpdate = ({ id, title, description }) => {
    console.log(id, title, description);
    updateNotes({ id, title, description }) 
      .then((response) => {
        close();
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 5,
  };
  
  return (
    //Modal Design
    <Modal
      open={isVisible}
      onClose={() => close()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <Box>
            <TextField
              value={formData.title}
              id="standard-basic"
              label="Title here..."
              variant="standard"
              //Here, the setFormData function is called; the title is updated with the user entered values.
              onChange={(e) =>
                setformData({ ...formData, title: e.target.value })
              }
            />
          </Box>
          <Box>
            <TextField
              value={formData.description}
              id="filled-basic"
              label="Text"
              variant="standard"
              margin="dense"
              color="warning"
              //Here, the setFormData function is called; the description is updated with the user entered values.
              onChange={(e) =>
                setformData({ ...formData, description: e.target.value })
              }
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => {
                // If the action is 'create', the createNotes service is called.
                if (action === "create") {
                  createNotes({
                    id: formData.id,
                    title: formData.title,
                    description: formData.description,
                  })
                  //Then the setFormData function is called, initializing the id, title, and description fields with empty strings
                    .then((data) => {
                      setformData({
                        id: "",
                        title: " ",
                        description: " ",
                      });
                    })
                    .then((response) => {
                      close();
                    })
                    .catch((error) => {
                      console.log("Here", error);
                    });
                    
                    //If the action is 'edit', the handleContentUpdate function is called 
                } else if (action === "edit") {
                  handleContentUpdate({
                    id: formData.id,
                    title: formData.title,
                    description: formData.description,
                  });
                }
              }}
              startIcon={<Update />}
            >
              {/* A ternary operator is used here */}
              {/* When the action prop is 'create', display "Create" title */}
              {/* When the action prop is 'update' display "Update" title */}
              {action === "create" ? "Create" : "Update"}
            </Button>
          </Box>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ManageNoteModal;
