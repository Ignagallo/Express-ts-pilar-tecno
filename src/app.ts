import  express from "express";
import { router as starsRouter } from "./routes/starsRouter";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use('/stars', starsRouter)
app.get('/stars/:id', starsRouter)
app.post('/stars', starsRouter)


app.listen(PORT, () => {
    console.log('servidor iniciado');
})
