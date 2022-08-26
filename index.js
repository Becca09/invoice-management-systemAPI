import mongoose from "mongoose";
import dotenv from 'dotenv'
import app from './app.js';

dotenv.config({path: "./config.env"})

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Database connected"))
.catch((error)=>console.log(error))


const port = process.env.PORT || 4000;
const server  = app.listen(port, ()=>{
    console.log(`App running on port ${port} ...`)
})

process.on('unhandledRejection', (err)=>{
    console.log('unhandled rejection, shutting down ...');
    console.log(err.name, err.message);
    server.close(()=> {
        process.exit(1)
    });
});
