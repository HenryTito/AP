import { Schema,model } from "mongoose";
import UsuarioInterface from "../interfaces/usuario.interface";

interface UsuarioModel extends UsuarioInterface, Document{

}


const UsuarioSchema = new Schema({
    nome:{
        type:String,
        required: true
    },
    senha:{
        type:String,
        required: true
    },
    avatar:{
        type:String,
        requried:false
    }
});


export default model<UsuarioModel>('Usuario', UsuarioSchema)