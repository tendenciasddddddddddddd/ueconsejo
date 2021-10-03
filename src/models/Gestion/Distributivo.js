import {
    Schema,
    model
} from "mongoose";

const cantonesSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    icono: String,
    fnivel: {
        type: Schema.Types.ObjectId,
        ref: "Nivel",
    },
    fdocente: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    fmateria: {
        type: Schema.Types.ObjectId,//materia
        ref: "Materia",
    },
    facademicos: {
        type: Schema.Types.ObjectId,//periodo
        ref: "Academicos",
    },
    paralelo: String,
}, {
    timestamps: true,
    versionKey: false
});

export default model("Distributivo", cantonesSchema);