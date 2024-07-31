//module imports
import dbConnection from "../utils/dbConnection.js";

//Get All Notes
const getAllNotes = (request, response) => {
  try {
    const query = `SELECT * FROM note WHERE status NOT IN ('INACTIVE')
    ORDER BY created_time DESC`;
    dbConnection.query(query, (err, data) => {
      if (err) {
        return response.status(400).json({ message: err });
      }
      return response.status(200).json({ data: data });
    });
  } catch (error) {
    return response.status(400).json({ error: error });
  }
};


//Create a New Note
const createNewNote = (request, response) => {
  // destructuring object
  const { title, description } = request.body;

  try {
    const query = `
    INSERT INTO note(id, title, description)
    VALUES(UUID(), '${title}', '${description}');`;

    dbConnection.query(query, (err, data) => {
      if (err) {
        return response
          .status(400)
          .json({ message: "Internal Server Error", error: err });
      }
      return response
        .status(200)
        .json({ message: "Note has been added successfully", data: data });
    });
  } catch (error) {
    return response.status(400).json({ error: error });
  }
};


//Delete a note by ID
const deleteNoteById = (request, response) => {
  //destructuring object
  const { id } = request.body;
  const query = `
  UPDATE note 
    SET 
        status='INACTIVE' 
    WHERE id = '${id}'`;

  dbConnection.query(query, (error, data) => {
    console.log("Query", query);
    if (error) {
      return response
        .status(500)
        .json({ message: "Internal Server Error", data: data });
    }
    return response
      .status(200)
      .json({ message: "Note has been successfully deleted", error: error });
  });
  return "Note has been deleted successfully!";
};


//Update Note by ID
const updateNoteById = (request, response) => {
  const { id, title, description } = request.body;

  const query = `
    UPDATE note
    SET 
        title = '${title}',
        description = '${description}'
    WHERE id = '${id}'`;

  dbConnection.query(query, (err, data) => {
    console.log("query", query);
    if (err) {
      return response
        .status(400)
        .json({ message: "Internal Server error", error: err });
    }
    return response
      .status(200)
      .json({ message: "Note has been updated successfully", data: data });
  });
};

export default {
  getAllNotes,
  createNewNote,
  deleteNoteById,
  updateNoteById,
};




















/**
 * --------|NOT IN USE|----------

app.post("/createNote", (req,res)=>{
    
    //q is identified as query
    //inserting data into the table using query
    const query = 
        `INSERT INTO note(id, title, description,status)
        VALUES(UUID_SHORT(), '${req.body.title}', '${req.body.description}','ACTIVE');`
        
    // const values = ["id", "title from backend","description from backend", "2023-07-20", "2023-07-20", "ACTIVE"];
    const values = [
        req.body.id,
        req.body.title,
        req.body.description,
        req.body.created_time,
        req.body.updated_time,
        req.body.status,
    ]

    //VALUES ('${4}','${`sample4`}','${`this is sampkle 4`}','${`2023-07-22`}','${'2023-07-22'}','${'ACTIVE'}')`; <Backup>
    
    db.query(query,(err,data)=>{
        console.log('query',query)
        if(err){
            return res.json(err);
        }
        return res.json("Note has been added successfully");

    })
})*/
