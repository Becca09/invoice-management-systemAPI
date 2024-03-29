import express from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './router/userRouter.js'
import invoiceRouter from './router/invoceRouter.js'

dotenv.config({path: "./config.env"})

const app = express();
app.use(cors())
app.use(express.json({limit: '10kb'}))
app.use(bodyParser.urlencoded({limit:'10kb',extended: false}))

app.use("/user", userRouter);
app.use("/invoice", invoiceRouter)


export default app;