const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB local
mongoose.connect('mongodb://localhost:27017/clikacaps_db');
// 3. Definición del Esquema y Modelo de datos
const contactoSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    telefono: String,
    mensaje: String,
    fechaRegistro: {type: Date, default: Date.now }
});

const Contacto = mongoose.model('Contacto', contactoSchema);

// 4. Ruta POST para recibir y almacenar el formulario
app.post("/guardar", async (req, res) => {
    const nuevoContacto = new Contacto({
        nombre:req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        mensaje: req.body.mensaje
    });

        // Guardar en la base de datos de MongoDB
await nuevoContacto.save();
    res.send("datos guardados correctamente");

})
// 5. Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("🚀 Servidor de Clika Caps corriendo en http://localhost:3000");
});