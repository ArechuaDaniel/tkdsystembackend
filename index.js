import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {PORT} from "./config.js";


import asoRoutes from "./routes/asociacion/asoRoutes.js";
import asoRoutesAso from "./routes/asociacion/asoRoutesAso.js";
import clubRoutesAso from "./routes/asociacion/clubRoutesAso.js";


import clubRoutes from "./routes/club/clubRoutes.js";
import clubRoutesClub from "./routes/club/clubRoutesClub.js";
import usuarioRoutesClub from "./routes/club/usuarioRoutesClub.js";
import instructorRoutesClub from "./routes/club/instructorRoutesClub.js";
import alumnoRoutesClub from "./routes/club/alumnoRoutesClub.js";

import instructorRoutes from "./routes/instructorRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import alumnoRoutes from "./routes/alumnoRoutes.js";
import horarioRoutes from "./routes/horarioRoutes.js";
import asistenciaRoutes from "./routes/asistenciaRoutes.js";
import asensoRoutes from "./routes/asensoRoutes.js";
import cinturonRoutes from "./routes/cinturonRoutes.js"
import pagosRoutes from "./routes/pagosRoutes.js"
import ubicacionRoutes from "./routes/ubicacionRoutes.js"


const app = express();

app.use(express.json());

dotenv.config();

//const servidor = process.env.FRONTEND_URL , 'http://127.0.0.1:5173'
//CONFIGURAR CORS
const whitelist=[ process.env.FRONTEND_URL, 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175'];
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

app.use("/api/ubicacion", ubicacionRoutes);


// Routing Asociacion
app.use("/api/asociacion/usuario-asociacion", asoRoutes);
app.use("/api/asociacion/usuario", asoRoutesAso);
app.use("/api/asociacion/usuarios-club", clubRoutesAso);

// Routing Club
app.use("/api/club/club", clubRoutes);
app.use("/api/club/usuario-club", clubRoutesClub);
app.use("/api/club/usuarios-instructor", usuarioRoutesClub);
app.use("/api/club/instructor", instructorRoutesClub);
app.use("/api/club/alumnos", alumnoRoutesClub);


// Routing Instructor
app.use("/api/instructor", instructorRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/horarios", horarioRoutes);
app.use("/api/asistencias", asistenciaRoutes);
app.use("/api/asensos", asensoRoutes);
app.use("/api/cinturones", cinturonRoutes);
app.use("/api/pagos", pagosRoutes);

//NOT FOUND
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Página no Encontrada'
    })
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
