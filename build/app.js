"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _compression = _interopRequireDefault(require("compression"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _provincias = _interopRequireDefault(require("./routes/Zonas/provincias.routes"));

var _cantones = _interopRequireDefault(require("./routes/Zonas/cantones.routes"));

var _parroquias = _interopRequireDefault(require("./routes/Zonas/parroquias.routes"));

var _nacionalidad = _interopRequireDefault(require("./routes/Zonas/nacionalidad.routes"));

var _estudiantes = _interopRequireDefault(require("./routes/Registros/estudiantes.routes"));

var _docentes = _interopRequireDefault(require("./routes/Registros/docentes.routes"));

var _etnias = _interopRequireDefault(require("./routes/Zonas/etnias.routes"));

var _upload = _interopRequireDefault(require("./routes/Archivos/upload"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _nivel = _interopRequireDefault(require("./routes/Gestion/nivel.routes"));

var _materia = _interopRequireDefault(require("./routes/Gestion/materia.routes"));

var _matriculas = _interopRequireDefault(require("./routes/Matricula/matriculas.routes"));

var _matri = _interopRequireDefault(require("./routes/Matricula/matri.routes"));

var _userdetalles = _interopRequireDefault(require("./routes/userdetalles.routes"));

var _distributivo = _interopRequireDefault(require("./routes/Gestion/distributivo.routes"));

var _notas = _interopRequireDefault(require("./routes/Notas/notas.routes"));

var _aulas = _interopRequireDefault(require("./routes/AulaVirtual/aulas.routes"));

var _task = _interopRequireDefault(require("./routes/AulaVirtual/task.routes"));

var _migracion = _interopRequireDefault(require("./routes/Migracion/migracion.routes"));

var _quizz = _interopRequireDefault(require("./routes/AulaVirtual/quizz.routes"));

var _galeria = _interopRequireDefault(require("./routes/settings/galeria.routes"));

var _configure = _interopRequireDefault(require("./routes/settings/configure.routes"));

var _index = _interopRequireDefault(require("./public/routes/index"));

var _sitemap = _interopRequireDefault(require("./service/sitemap"));

var _initialSetup = require("./libs/initialSetup");

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var app = (0, _express.default)(); //createRoles();
//createAdmin();
//userdev();
//userest();
//config();

var corsOptions = {
  origin: '*',
  // http://localhost:8080
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use((0, _cors.default)(corsOptions));
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json({
  limit: '50mb'
}));
app.use(_express.default.urlencoded({
  limit: '50mb'
})); // settings

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs'); //app.use(express.static(__dirname+'/static'));
//var filepath = __dirname+'/static/'

app.use((0, _compression.default)()); //app.use('/static', express.static(__dirname +'/static'));

app.use(_express.default.static(__dirname + '/public/assets'));
app.use('/', _index.default); // Routes

app.use("/api/auth", _auth.default);
app.use("/api/provincias", _provincias.default);
app.use("/api/upload", _upload.default);
app.use("/api/users", _user.default);
app.use("/api/cantones", _cantones.default);
app.use("/api/parroquias", _parroquias.default);
app.use("/api/nacionalidad", _nacionalidad.default);
app.use("/api/etnias", _etnias.default);
app.use("/api/estudiantes", _estudiantes.default);
app.use("/api/docentes", _docentes.default);
app.use("/api/niveles", _nivel.default);
app.use("/api/materias", _materia.default);
app.use("/api/periodos", _matriculas.default);
app.use("/api/matriculas", _matri.default);
app.use("/api/userdelles", _userdetalles.default);
app.use("/api/distributivo", _distributivo.default);
app.use("/api/notas", _notas.default);
app.use("/api/aulas", _aulas.default);
app.use("/api/tasks", _task.default);
app.use("/api/migracion", _migracion.default);
app.use("/api/quizz", _quizz.default);
app.use("/api/galeria", _galeria.default);
app.use("/api/configure", _configure.default); //migracion
//sitemap

app.use("/sitemap.xml", _sitemap.default);
var _default = app;
exports.default = _default;