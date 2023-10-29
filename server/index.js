import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import DalleRoutes from './routes/dalle.routes.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json({limit: "50mb"}));

app.use('/api/v1/dalle', DalleRoutes);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello from dalle.ai'});
})

const PORT =  8080;
app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));
