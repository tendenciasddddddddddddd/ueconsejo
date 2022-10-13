const path = require('path');
import express from 'express';
import morgan from "morgan";
import compression from "compression"

import authRoutes from "./routes/auth.routes";
import provinciasRoutes from "./routes/Zonas/provincias.routes";
import cantonesRoutes from "./routes/Zonas/cantones.routes";
import parroquiasRoutes from "./routes/Zonas/parroquias.routes";
import nacionalidadRoutes from "./routes/Zonas/nacionalidad.routes";
import estudiantesRoutes from "./routes/Registros/estudiantes.routes"
import docentesRoutes from "./routes/Registros/docentes.routes"
import etniasRoutes from "./routes/Zonas/etnias.routes";
import uploads from "./routes/Archivos/upload"
import usuarios from "./routes/user.routes"
import nivelRoutes from "./routes/Gestion/nivel.routes";
import materiaRoutes from "./routes/Gestion/materia.routes"
import periodoRoutes from "./routes/Matricula/matriculas.routes"
import matriculaRoutes from "./routes/Matricula/matri.routes"
import userdetallesRoutes from "./routes/userdetalles.routes"
import distributivoRoutes from "./routes/Gestion/distributivo.routes"
import notasRoutes from "./routes/Notas/notas.routes"
import aulasRoutes from "./routes/AulaVirtual/aulas.routes"
import taskRoutes from "./routes/AulaVirtual/task.routes"
import migracion from "./routes/Migracion/migracion.routes";
import quizzRoutes from "./routes/AulaVirtual/quizz.routes";
import galeria from "./routes/settings/galeria.routes";
import configure from "./routes/settings/configure.routes"

//PUBLIC
import publico from "./public/routes/index"

//SITEMA
 import sitemapRouter from "./service/sitemap"


import { createRoles, createAdmin, userdev, userest, config} from "./libs/initialSetup";

const app = express();
//createRoles();
//createAdmin();
//userdev();
//userest();
//config();
import cors from "cors";

var corsOptions = {
  origin: [ 'https://plataforma-uemah.netlify.app', 'http://localhost:8080', ], // http://localhost:8080
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


// settings
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

//app.use(express.static(__dirname+'/static'));
//var filepath = __dirname+'/static/'

app.use(compression())

//app.use('/static', express.static(__dirname +'/static'));

app.use(express.static(__dirname + '/public/assets'));
app.use('/', publico);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/provincias", provinciasRoutes);
app.use("/api/upload", uploads);
app.use("/api/users", usuarios);
app.use("/api/cantones", cantonesRoutes);
app.use("/api/parroquias", parroquiasRoutes);
app.use("/api/nacionalidad", nacionalidadRoutes);
app.use("/api/etnias", etniasRoutes);
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/docentes", docentesRoutes);
app.use("/api/niveles", nivelRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/periodos", periodoRoutes);
app.use("/api/matriculas", matriculaRoutes);
app.use("/api/userdelles", userdetallesRoutes);
app.use("/api/distributivo", distributivoRoutes);
app.use("/api/notas", notasRoutes);
app.use("/api/aulas", aulasRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/migracion", migracion);
app.use("/api/quizz", quizzRoutes)
app.use("/api/galeria", galeria)
app.use("/api/configure", configure)
//migracion
//sitemap
app.use("/sitemap.xml", sitemapRouter);

export default app;