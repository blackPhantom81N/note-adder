import baseAxios from "../utils/baseAxios";

// const key = "note"

//We have functions defined for each CRUD operation, named as services.
//Each service will or will not contain params, and they will call the APIs implemented in the Backend
//Further async/await is used in these functions.

//The GetAllNotes service
export const getAllNotes = async () => {
  const response = await baseAxios.get(`http://localhost:3002/notes/getAllNotes`);
  return response.data;
};

//The Create Notes service
export const createNotes = async ({ id, title, description }) => {
  const response = await baseAxios.post(`/createNote`, {  title, description });
  console.log(response.data);
  return response.data;
};
//Create axios delete and update apis

//The Delete Notes Service
export const deleteNotes = async({id})=>{
  console.log(id)
    const response = await baseAxios.post(`/deleteNote`, {id});
    return response.data;
};

//The Update Notes Service
export const updateNotes = async({id, title, description})=>{
  console.log(id,title,description);
  console.log("So far working")
  const response = await baseAxios.put(`/updateNote`, {id, title, description});
  console.log(response.data);
  return response.data;
}