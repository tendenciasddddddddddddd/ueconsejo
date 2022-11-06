const path = require('path');
import express from 'express';
import morgan from "morgan";
import compression from "compression"

import authRoutes from "./routes/auth.routes";
import estudiantesRoutes from "./routes/Registros/estudiantes.routes"
import docentesRoutes from "./routes/Registros/docentes.routes"
import uploads from "./routes/Archivos/upload"
import usuarios from "./routes/user.routes"
import nivelRoutes from "./routes/Gestion/nivel.routes";
import materiaRoutes from "./routes/Gestion/materia.routes"
import tutorRoutes from "./routes/Gestion/tutor.routes"
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


import { createRoles, createAdmin, config, aplicaciones} from "./libs/initialSetup";

const app = express();
//createRoles();
//createAdmin();
//config();
//aplicaciones();
import cors from "cors";

var corsOptions = {
  origin: '*', // http://localhost:8080
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb'}));


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
app.use("/api/upload", uploads);
app.use("/api/users", usuarios);
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/docentes", docentesRoutes);
app.use("/api/niveles", nivelRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/periodos", periodoRoutes);
app.use("/api/matriculas", matriculaRoutes);
app.use("/api/userdelles", userdetallesRoutes);
app.use("/api/distributivo", distributivoRoutes);//materiaTutor
app.use("/api/tutores", tutorRoutes);
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