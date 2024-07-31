import { createConnection } from 'mysql';

const dbConnection = createConnection({
    host:"localhost",
    user:"root",
    password:"1234qwer$",
    database:"notes"
})

export default dbConnection;