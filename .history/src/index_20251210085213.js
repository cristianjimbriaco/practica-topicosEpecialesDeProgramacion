import cors from 'cors';
import express from 'express';

const app = express()

const port = 3005
app.use(cors({ origin: '*' })) // cors
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.listen(port, function () {
    console.log(`Api corriendo en http://localhost:${port}!`)
})

app.get('/', (req, res)=>{
    console.log('hola endpoint')
    res.status(200).send('Hola otra vez, la API funciona crack');
});