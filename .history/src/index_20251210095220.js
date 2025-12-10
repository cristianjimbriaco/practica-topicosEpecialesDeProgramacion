import mongoose from ' mongoose ';
import cors from 'cors';
import dotenv from 'dotenv ';
import express from 'express';

const app = express()
dotenv.config()

const connectDB = () => {
    const {
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_PORT,
        MONGO_DB,
        MONGO_HOSTNAME,
    } = process.env

    const url = `mongodb:// ${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}
    /${MONGO_DB}?authSource=admin`

    mongoose.connect(url).then(function () {
        console.log('MongoDB esta conectado')
    })
    .catch(function (err) {
        console.log(err)
    })
}



const port = 3005
app.use(cors({ origin: '*' })) // cors
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.listen(port, function () {
    console.log(`Api corriendo en http://localhost:${port}!`)
})

app.get('/', (req, res)=>{
    console.log('hola mi primer endpoint')
    res.status(200).send('Hola, la API esta funcionando correctamente');
});