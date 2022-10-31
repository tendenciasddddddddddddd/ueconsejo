"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteNoteById = exports.createFullProyectos = exports.createFullComportamiento = exports.createFullSupletorios = exports.createFullNote = exports.createNotaArbol2ById = exports.createNotaInicialesId = exports.createNotaArbol1ById = exports.getMatriculasNotaById = exports.getMatriculaAsistencia = exports.getMatriculaNota = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matricula/Matriculas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//---------------------------------------------------------SIRVE LISTA DE ESTUDIANTES A CALIFICAR [DOCENTES, ]
var getMatriculaNota = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var idCurso = req.query.curso;
      var distributivo = yield _Matriculas.default.find({
        fknivel: {
          $in: [idCurso]
        }
      }, {
        'curso': 1,
        'nombre': 1,
        'calificaciones': 1
      }) //aqui se produjo el error de 
      .lean();
      return res.json(distributivo);
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function getMatriculaNota(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //---------------------------------------------------------ASUGNAR ASISTENCIAS  [DOCENTES, ]


exports.getMatriculaNota = getMatriculaNota;

var getMatriculaAsistencia = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var idCurso = req.query.curso;
      var distributivo = yield _Matriculas.default.find({
        fknivel: {
          $in: [idCurso]
        }
      }).lean().select({
        curso: 1,
        nombre: 1
      });
      return res.json(distributivo);
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function getMatriculaAsistencia(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //---------------------------------------------------------REVISAR NOTAS DE CADA ESTUSIANTES [ESTUDIANTES, ]  


exports.getMatriculaAsistencia = getMatriculaAsistencia;

var getMatriculasNotaById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        matriculaId
      } = req.params;
      var matricula = yield _Matriculas.default.findOne({
        fkestudiante: matriculaId
      }).populate('fknivel', 'nombre').populate('academico', 'nombre');
      res.status(200).json(matricula);
    } catch (error) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function getMatriculasNotaById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //-------------------------------------------------------REFORMA DE CALIFICACIONES RESUELVE [DOCENTE, ]-------------------------------------


exports.getMatriculasNotaById = getMatriculasNotaById;

var createNotaArbol1ById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.matriculaId;
      var array = cadenaId.split(",");
      yield _Matriculas.default.updateMany({
        _id: {
          $in: array
        }
      }, {
        $push: {
          'calificaciones': req.body.calificaciones
        }
      }, {
        new: true
      });
      res.status(200).json('crearnote');
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function createNotaArbol1ById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //-------------------------------------------------------REFORMA DE INICIALES [DOCENTE, ]-------------------------------------


exports.createNotaArbol1ById = createNotaArbol1ById;

var createNotaInicialesId = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.matriculaId;
      var array = cadenaId.split(",");
      yield _Matriculas.default.updateMany({
        _id: {
          $in: array
        }
      }, {
        $push: {
          'iniciales': req.body.iniciales
        }
      }, {
        new: true
      });
      res.status(200).json('crearnote');
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function createNotaInicialesId(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.createNotaInicialesId = createNotaInicialesId;
var params = [{
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Comunica algunos datos de su identidad como: nombre, apellido, edad y nombres de los padres'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Identifica las características generales que diferencian a niños y niñas y se reconoce como parte de uno de esos grupos. '
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Reconoce algunas de sus características físicas como: color de pelo, ojos, piel tamaño, entre otros, como parte de proceso de su reconocimiento como ser único e irrepetible.'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Manifiesta sus emociones y sentimientos con mayor intencionalidad mediante expresiones orales y gestuales.'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Elige actividades, vestuarios entre otros demostrando sus gustos y preferencias.'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Se reconoce como parte integrante de una familia a la que pertenece'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Realiza acciones de lavado de manos, cara, dientes con la guía del adulto, como parte del proceso de la adquisición de hábitos de higiene.'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Acude al baño autónomamente, requiriendo la ayuda del adulto para su aseo'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Se saca y pone algunas prendas de vestir como: interior, pantalón o falda y medias sin ayuda del adulto'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Selecciona prendas de vestir de acuerdo a su preferencia'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Utiliza la cuchara y el vaso cuando se alimenta demostrando cada vez mayores niveles de independencia.'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Identifica las situaciones de peligro a las que se puede exponer en su entorno inmediato comprendiendo las normas de prevención planteadas por el adulto.'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Ejecuta acciones de seguridad para evitar accidentes que se pueden producir en su entorno inmediato'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Imita las acciones a seguir en situaciones de riesgo como: temblores, incendios, entre otros, determinadas en el plan de contingencia institucional'
}, {
  iden: 'IDENTIDAD Y AUTONOMÍA',
  des: 'Colabora en el mantenimiento del orden del aula ubicando los objetos en su lugar'
}, {
  iden: 'CONVIVENCIA',
  des: 'Demuestra preferencia por jugar con un niño específico estableciendo amistad en función de algún grado de empatía.'
}, {
  iden: 'CONVIVENCIA',
  des: 'Reconoce y practica normas de convivencia en el centro de educación inicial y en el hogar establecidas por el adulto.  '
}, {
  iden: 'CONVIVENCIA',
  des: 'Reconoce los oficios de personas que brindan servicio a la comunidad. '
}, {
  iden: 'CONVIVENCIA',
  des: 'Reconoce a los miembros de su familia y los roles que cumple cada uno '
}, {
  iden: 'CONVIVENCIA',
  des: 'Demuestra interés ante emociones y sentimientos de las personas de su entorno familiar y escolar'
}, {
  iden: 'CONVIVENCIA',
  des: 'Demuestra interés ante diferentes problemas que presentan sus compañeros y adultos de su entorno.'
}, {
  iden: 'CONVIVENCIA',
  des: 'Colabora espontáneamente con los adultos en actividades y situaciones sencillas. '
}, {
  iden: 'CONVIVENCIA',
  des: 'Se relaciona con sus compañeros sin discriminación de aspectos como: género y diversidad cultural, necesidades especiales, entre otros.  '
}, {
  iden: 'CONVIVENCIA',
  des: 'Establece relaciones con personas cercanas a su entorno familiar y escolar ampliando su campo de interacción. '
}, {
  iden: 'CONVIVENCIA',
  des: 'Se integra progresivamente en juegos grupales de reglas sencillas '
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Participa en algunas prácticas tradicionales de su entorno disfrutando de las diferentes manifestaciones culturales. '
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Reconoce y aprecia algunas expresiones culturales importantes de su localidad.'
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Apoya en el cuidado de plantas y animales de su entorno.'
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Realiza acciones que apoyan al cuidado del medio ambiente como: botar la basura en su lugar, no desperdiciar el agua, entre otras.  '
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Identifica los alimentos nutritivos reconociendo la importancia de éstos en su crecimiento.  '
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Reconoce las características de las plantas alimenticias comprendiendo su importancia en la alimentación '
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Identifica las características de los animales que pueden cumplir el rol de mascota y los cuidados que requieren.  '
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Reconoce diferentes elementos de su entorno natural mediante la discriminación sensorial. '
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Reconoce y diferencia entre elementos naturales y artificiales por medio de los sentidos. '
}, {
  iden: 'RELACIONES CON EL MEDIO NATURAL Y CULTURAL',
  des: 'Identifica a los seres vivos de su entorno a través de la exploración del mundo natural. '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Identifica las nociones de tiempo en acciones que suceden antes y ahora. '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Imita patrones simples con elementos de su entorno. '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Reconoce y compara objetos de acuerdo a su tamaño (grande/ pequeño)'
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Diferencia entre colecciones de más y menos objetos.'
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Clasifica objetos con un atributo (tamaño, color o forma). '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Comprende la relación de número cantidad hasta el 5. '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Reconoce la ubicación de objetos en relación a sí mismo según las nociones espaciales de: arriba/abajo, al lado, dentro/fuera, cerca/lejos. '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Cuenta oralmente del 1 al 10 con secuencia numérica, en la mayoría de veces '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Identifica características del día y la noche '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: ' Reconoce los colores primarios, el blanco y el negro en objetos e imágenes del entorno. '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Descubre formas básicas circulares, triangulares, rectangulares y cuadrangulares en objetos del entorno. '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'dentifica objetos de formas similares en el entorno'
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Identifica en los objetos las nociones de medida: alto/bajo, pesado/liviano '
}, {
  iden: 'RELACIONES LÓGICO MATEMÁTICAS',
  des: 'Ordena en secuencia lógica sucesos de hasta tres eventos, en actividades de la rutina diaria y en escenas de cuentos.  '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Se expresa oralmente de manera comprensible, presenta dificultades en la pronunciación de s, r, t, l, g, j, f. '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Se comunica utilizando en su vocabulario palabras que nombran personas, animales, objetos y acciones conocidas. '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Participa en conversaciones cortas repitiendo lo que el otro dice y haciendo preguntas.  '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Describe oralmente imágenes que observa en materiales gráficos y digitales empleando oraciones. '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Reproduce canciones y poemas cortos, incrementando su vocabulario y capacidad retentiva. '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Se expresa utilizando oraciones cortas en las que puede omitir o usar incorrectamente algunas palabras.'
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Sigue instrucciones sencillas que involucren la ejecución de dos actividades '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Relata cuentos, narrados por el adulto con la ayuda de los paratextos utilizando su propio lenguaje. '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Responde preguntas sobre un texto narrado por el adulto, basándose en los paratextos que observa. '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Identifica etiquetas y rótulos con la ayuda de un adulto y las asocia con el objeto o lugar que los representa '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Cuenta un cuento en base a sus imágenes sin seguir la secuencia de las páginas. '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Identifica su cuento preferido por la imagen de la portada.'
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Realiza movimientos articulatorios básicos: sopla, intenta inflar globos, imita movimientos de labios, lengua y mejillas'
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Repite rimas identificando los sonidos que suenan iguales. '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Identifica “auditivamente” el fonema (sonido) inicial de su nombre. '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Comunica a través de dibujos de objetos del entorno con algún detalle que lo vuelve identificable, como representación simbólica de sus ideas.  '
}, {
  iden: 'COMPRENSIÓN Y EXPRESIÓN DEL LENGUAJE',
  des: 'Comunica de manera escrita sus ideas a través de garabatos controlados, líneas, círculos o zigzag '
}, {
  iden: 'EXPRESIÓN ARTÍSTICA',
  des: 'Expresa sus vivencias y experiencias a través del dibujo libre'
}, {
  iden: 'EXPRESIÓN ARTÍSTICA',
  des: 'Experimenta a través de la manipulación de materiales y mezcla de colores la realización de trabajos creativos utilizando las técnicas grafoplásticas. '
}, {
  iden: 'EXPRESIÓN ARTÍSTICA',
  des: 'Canta canciones cortas asociando la letra con expresiones de su cuerpo'
}, {
  iden: 'EXPRESIÓN ARTÍSTICA',
  des: 'Imita pasos de baile intentando reproducir los movimientos y seguir el ritmo '
}, {
  iden: 'EXPRESIÓN ARTÍSTICA',
  des: 'Se integra durante la ejecución de rondas, bailes y juegos tradicionales '
}, {
  iden: 'EXPRESIÓN ARTÍSTICA',
  des: 'Representa a personas de su entorno asumiendo roles a través del juego simbólico.  '
}, {
  iden: 'EXPRESIÓN ARTÍSTICA',
  des: 'Expresa su gusto o disgusto al observar una obra artística relacionada a la plástica o a la escultura.  '
}, {
  iden: 'EXPRESIÓN ARTÍSTICA',
  des: 'Ejecuta patrones de hasta dos ritmos con partes del cuerpo y elementos o instrumentos sonoros. '
}, {
  iden: 'EXPRESIÓN ARTÍSTICA',
  des: 'Imita e identifica sonidos onomatopéyicos, naturales y artificiales del entorno. '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Utiliza frecuentemente una de las dos manos o pies al realizar las actividades. '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Representa la figura humana utilizando el monigote o renacuajo. '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Identifica en su cuerpo y en el de los demás partes gruesas del cuerpo humano y partes de la cara a través de la exploración sensorial. '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Realiza representaciones gráficas utilizando el garabateo con nombre '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Realiza movimientos de manos, dedos y muñecas que le permiten coger objetos utilizando la pinza trípode y digital.  '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Realiza actividades de coordinación visomotriz con materiales sencillos y de tamaño grande. '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Realiza ejercicios que involucran movimientos segmentados de partes gruesas del cuerpo (cabeza, tronco y extremidades) '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Mantiene control postural en diferentes posiciones del cuerpo (sentado, de pie, en cuclillas, de cúbito dorsal y cúbito ventral).  '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Mantiene el equilibro al caminar sobre líneas rectas, y curvas con altura (aprox. 5 cm) intentando mantener el control postural '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Realiza ejercicios de equilibrio dinámico y estático controlando los movimientos de las partes gruesas del cuerpo y estructurando motricidad facial y gestual según la consigna por lapsos cortos de tiempo. '
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Realiza actividades intentando controlar su fuerza y tonicidad muscular como: lanzar, atrapar y patear objetos y pelotas, entre otros.'
}, {
  iden: 'EXPRESIÓN CORPORAL Y MOTRICIDAD',
  des: 'Camina, corre y salta de un lugar a otro coordinadamente combinando estas formas de desplazamiento, a velocidades diferentes y en superficies planas e inclinadas '
}]; //------------------------------------- INSERTA LAS NOTAS-------------------------------------

var createNotaArbol2ById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      yield _Matriculas.default.updateOne({
        _id: req.params.matriculaId,
        'calificaciones._id': req.body.calificaciones._id
      }, {
        $push: {
          'calificaciones.$.notas': req.body.calificaciones.notas
        }
      }, {
        new: true
      });
      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createNotaArbol2ById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //----------------CGRABAR NOTAS DE FORMA MASIVA [DOCENTES, ]


exports.createNotaArbol2ById = createNotaArbol2ById;

var createFullNote = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.notas': array[i].notas,
            'calificaciones.$.promediof': array[i].promediof
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createFullNote(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //----------------CGRABAR NOTAS DE FORMA MASIVA [DOCENTES, ] PARA SUPLETORIOS


exports.createFullNote = createFullNote;

var createFullSupletorios = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.suple': array[i].suple,
            'calificaciones.$.reme': array[i].reme,
            'calificaciones.$.gracia': array[i].gracia,
            'calificaciones.$.pfinal': array[i].pfinal
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createFullSupletorios(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.createFullSupletorios = createFullSupletorios;

var createFullComportamiento = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.comportamiento': array[i].comportamiento
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createFullComportamiento(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.createFullComportamiento = createFullComportamiento;

var createFullProyectos = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.proyectos': array[i].proyectos
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function createFullProyectos(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}(); //------------------------------------- ELIMINAR NOTAS [DOCENTE, ]


exports.createFullProyectos = createFullProyectos;

var deleteNoteById = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      for (var i = 0; i < array.length; i++) {
        yield _Matriculas.default.updateOne({
          _id: array[i].id,
          'calificaciones._id': array[i].fora
        }, {
          $set: {
            'calificaciones.$.notas': []
          }
        }, {
          new: true
        });
      }

      res.status(200).json('crearnote');
    } catch (e) {
      res.status(500).json({
        message: "No mat found"
      });
    }
  });

  return function deleteNoteById(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.deleteNoteById = deleteNoteById;