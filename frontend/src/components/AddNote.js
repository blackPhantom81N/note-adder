import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { TextField, Modal, Box } from "@mui/material";
import { createNotes } from "../Services/notes";
import { AddCircleOutline } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import Snackbar from "@mui/material";

const AddNote = ({ refreshPage }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // The style for MUI components
  const style = {
    "& .MuiTextField-root": { m: 1, width: "25ch" },
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

  const handleClick = ()=>{
    setOpen(true);
  }

  const newAction = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  //The function for the handleSaveClick function.
  //It calles the API for creating new note by passing the Id, Title and Description
  //It also calls the setFormData function to initialize the data fields to empty strings.
  function handleSaveClick(e, close) {
    console.log(formData);
    createNotes({
      id: formData.id,
      title: formData.title,
      description: formData.description,
    })
    
    //Initializing the data fields for id, title, and description
      .then((data) => {
        setFormData({
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
  }

  return (
    <div>
      <div className="note-new">
        <div
          className="add-button"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "200px",
            maxHeight: "200px",
            minWidth: "200px",
            minHeight: "200px",
            paddingLeft: "20px",
          }}
        >
          <Button className="add-new-note-icon" onClick={handleOpen}>
            <div className="add-circle-icon">
              <AddCircleOutline color="primary" />
            </div>
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Typography id="modal-moda-title" variant="h6" component="h2">
            <Box component="form" sx={style}>
              <Box>
                <TextField
                  id="filled-basic"
                  label="Title"
                  variant="filled"
                  value={formData.title}
                  // The onChange function here, spreads the FormData, passing the user input into the description text area.
                  onChange={(event) => {
                    setFormData({ ...FormData, title: event.target.value });
                  }}
                ></TextField>
              </Box>
              <Box>
                <TextField
                  id="filled-basic"
                  multiline
                  rows={4}
                  label="Description"
                  variant="filled"
                  value={formData.description}
                  // The onChange function here, spreads the FormData, passing the user input into the description text area.
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    });
                  }}
                />
              </Box>
              <Container>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSaveClick}
                >
                  {/* <Snackbar 
                    open={open}
                    autoHideDuration={6000}
                    onClose = {handleClose}
                    message = "New Note Created"
                    action = {newAction}
                  /> */}
                  <Typography>Create</Typography>
                  <CreateIcon />
                </Button>
              </Container>
            </Box>
          </Typography>
        </Modal>
      </div>
    </div>
  );
};

export default AddNote;
