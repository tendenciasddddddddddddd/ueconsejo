import {
    Schema,
    model
} from "mongoose";

const cantonesSchema = new Schema({
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
    paralelo: String,
    planificacion: [{
        url: String,
        nombre: String,
    }],
    ifComplementarias : String
}, {
    timestamps: true,
    versionKey: false
});

export default model("Distributivo", cantonesSchema);