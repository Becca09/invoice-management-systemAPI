import mongoose from "mongoose";
import dotenv from 'dotenv'
import app from './app.js';

dotenv.config({path: "./config.env"})
let url = process.env.NODE_ENV === "production" ? process.env.DATABASE_URL_PROD : process.env.DATABASE_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Database connected"))
.catch((error)=>console.log(error))


const port = process.env.PORT || 4000;
const server  = app.listen(port, ()=>{
    console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode `)
})

process.on('unhandledRejection', (err)=>{
    console.log('unhandled rejection, shutting down ...');
    console.log(err.name, err.message);
    server.close(()=> {
        process.exit(1)
    });
});
