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
    paralelo: String,
}, {
    timestamps: true,
    versionKey: false
});

export default model("Tutor", cantonesSchema);