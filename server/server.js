import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import artistRouter from './routes/artistsRoutes.js'
import inquiriesRouter from './routes/inquiriesRoutes.js'

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

app.use('/', artistRouter);
app.use('/inquiries', inquiriesRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));