// This is the main js file of our React Application. Components are mounted into this Js file provided a situation.
//So it is VERY IMPORTANT that, the file is not bloated with unwanted or unneccessary code. 
//Instead, have each component in separate files, and load/mount them into the main js file.

import { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import { createNotes, deleteNotes, getAllNotes } from "./Services/notes";
import image from "./img/app-background.jpg";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [ForceReload, setForceReload] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  //A useEffect is used here, with calling the getAllNotes() function, which returns all the notes saved in the Database
  useEffect(() => {
    getAllNotes()
      .then((response) => {
        console.log("data", response.data);
        console.log(response.data);
        setNotes(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [ForceReload]);

  //create the filterfunction as a UseEffect so that 
  // useEffect(() => {
    
  //   return () => {
      
  //   }
  // }, [])
  
  const deleteNote = (id) => {
    deleteNotes({ id })
      .then((response) => {
        setForceReload(!ForceReload);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ backgroundImage:`url(${image})`}}>
      <div>
        <h1>Note Adder</h1>
        <h3> A Personal Note App for your needs </h3>
      </div>
      <div className="header"></div>
      <div className="container">
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes}
          // {
          //   Object.values(notes).filter((note) => 
          //   {
          //   return Object.values(note).join('').toLowerCase().includes(searchText.toLowerCase())
          //   // note?.text? note?.text?.toLowerCase().includes(searchText):note?.title?.toLowerCase().includes(searchText)
          // })}
          handleDeleteNote={deleteNote}
          //Here the refreshPage function calls the setForceReload function, changing the value of ForceReload. This change triggers 
          //the useEffect, as it recognizes the dependency value change.
          refreshPage={() => {
            setForceReload(!ForceReload);
          }}
        />
      </div>
    </div>
  );
};

export default App;

