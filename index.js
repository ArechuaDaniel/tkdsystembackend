import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {PORT} from "./config.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import alumnoRoutes from "./routes/alumnoRoutes.js";
import horarioRoutes from "./routes/horarioRoutes.js";
import asistenciaRoutes from "./routes/asistenciaRoutes.js";
import { pool } from "./db.js";



const app = express();

app.use(express.json());

dotenv.config();

//const servidor = process.env.FRONTEND_URL , 'http://127.0.0.1:5173'
//CONFIGURAR CORS
const whitelist=[ process.env.FRONTEND_URL, 'http://127.0.0.1:5173'];
const corsOptions = {
    origin: function (origin, callback){
        if (whitelist.includes(origin)) {
            // Puede consultar la API
            callback(null, true);
        } else {
            // No esta permitido
            callback(new Error("Error de Cors"));
        }
    }
}

app.use(cors(corsOptions));


app.get("/ping", async(req,res) => {
    const [result] = await pool.query('SELECT "Pong" AS result')
    res.json(result[0])
});
// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/horarios", horarioRoutes);
app.use("/api/asitencias", asistenciaRoutes);


//NOT FOUND
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoit not found'
    })
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})