import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { User } from "./user.js";

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

    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

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
    connectDB();
    console.log(`Api corriendo en http://localhost:${port}!`)
})


app.get('/', (req, res)=>{
    console.log('hola mi primer endpoint')
    res.status(200).send('Hola, la API esta funcionando correctamente');
});


app.post("/usuario", async (req, res) => {
  try {
    var data = req.body;

    const newUser = new User(data);

    const usuarios = await newUser.save();

    res.status(201).send({
        success: true,
        message: "Usuario creado correctamente",
        outcome: [usuarios]
    });

  } catch (error) {
    console.error(error);

    res.status(400).send({
      success: false,
      message: "Error creando el usuario",
      outcome: []
    });
  }
});

// Endpoint GET para obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  try {
    // Buscamos todos los documentos en la colección User
    var usuarios = await User.find().exec();

    res.status(200).send({
      success: true,
      message: "Usuarios obtenidos correctamente",
      outcome: [usuarios]
    });

  } catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      message: "Error obteniendo los usuarios",
        outcome: []
    });
  }
});

// Endpoint PATCH para actualizar un usuario
app.patch("/usuario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataToUpdate = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate, {
      new: true,          // devuelve el usuario actualizado
      runValidators: true // respeta las validaciones del schema
    });

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "Usuario no encontrado",
        outcome: []
      });
    }

    res.status(200).send({
      success: true,
      message: "Usuario actualizado correctamente",
      outcome: [updatedUser]
    });

  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error actualizando el usuario",
      outcome: []
    });
  }
});
