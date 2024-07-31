import express from "express";
import mysql from "mysql";
import cors from 'cors';

import noteRouter from './routes/notes.route.js';

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234qwer$",
    database:"notes"
})

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());

app.use('/notes', noteRouter)

app.get("/", (req,res)=>{
    res.json("hello this is the backend");
})

app.post("/createNote", (req,res)=>{
    

    const query = 
        `INSERT INTO note(id, title, description,status)
        VALUES(UUID_SHORT(), '${req.body.title}', '${req.body.description}','ACTIVE');`
        

    const values = [
        req.body.id,
        req.body.title,
        req.body.description,
        req.body.created_time,
        req.body.updated_time,
        req.body.status,
    ]

    
    db.query(query,(err,data)=>{
        console.log('query',query)
        if(err){
            return res.json(err);
        }
        return res.json("Note has been added successfully");

    })
})

app.put(`/updateNote`, (request, response)=>{
    
    console.log(request.body)
    const query = `
    UPDATE note
    SET 
        title = '${request.body.title}',
        description = '${request.body.description}'
    WHERE id = '${request.body.id}'
    `

    db.query(query,(err,data)=>{
        console.log('query',query)
        if(err){
            return response.status(400).json({message:'Internal Server error'});
        }
        return response.status(200).json({message:"Note has been updated successfully"});

    })
})


app.post("/deleteNote", (request, response)=>{
    const query = 
    `UPDATE note
    SET status='INACTIVE'
    WHERE id = '${request.body.id}'`;

    db.query(query, (error, data)=>{
        console.log('Query', query)
        if(error){
            return response.json(error);
        }
        return response.json(error)
    })
    return("Note has been deleted successfully!")
})



app.listen(3002, ()=>{
    console.log("Connected to Backend");
})